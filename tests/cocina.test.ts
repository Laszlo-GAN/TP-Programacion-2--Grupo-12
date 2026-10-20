import { Cocina } from "../src/estacion/Cocina";
import Combo from "../src/estacion/combo";
import { Parrilla } from "../src/estacion/parrilla";
import { Barra } from "../src/estacion/barra";
import { CocinaFria } from "../src/estacion/cocinaFrea";
import { CocinaDulce } from "../src/estacion/cocinaDulce";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { EstadoItem } from "../src/estacion/estadoItem";
import { ItemPedido } from "../src/estacion/itemPedido";
import { PrecioFijo } from "../src/estacion/precioFijo";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase Cocina", () => {
    const PRECIO = 1000;
    const UNA_UNIDAD = 1;
    let parrilla: Parrilla;
    let barra: Barra;
    let dulce: CocinaDulce;
    let cocina: Cocina;

    function productoPara(tipo: TipoEstacion): ProductoUnico {
        return new ProductoUnico(PRECIO, tipo);
    }

    function itemPara(tipo: TipoEstacion): ItemPedido {
        return new ItemPedido("I001", productoPara(tipo), UNA_UNIDAD);
    }

    function comboParrillero(): ItemPedido {
        const combo = new Combo(
            [productoPara(TipoEstacion.PARRILLA), productoPara(TipoEstacion.BARRA), productoPara(TipoEstacion.COCINA_DULCE)],
            new PrecioFijo(PRECIO),
        );
        return new ItemPedido("C001", combo, UNA_UNIDAD);
    }

    beforeEach(() => {
        parrilla = new Parrilla("Parrilla", EstadoEstacion.LIBRE);
        barra = new Barra("Barra", EstadoEstacion.LIBRE);
        dulce = new CocinaDulce("Cocina dulce", EstadoEstacion.LIBRE);
        cocina = new Cocina([parrilla, new CocinaFria("Cocina fría", EstadoEstacion.LIBRE), dulce, barra]);
    });

    test("Un producto de parrilla va a la Parrilla", () => {
        expect(cocina.aQueEstacionVa(productoPara(TipoEstacion.PARRILLA))).toBe(parrilla);
    });

    test("Un producto de barra va a la Barra", () => {
        expect(cocina.aQueEstacionVa(productoPara(TipoEstacion.BARRA))).toBe(barra);
    });

    test("Si no hay una estación del tipo pedido, falla", () => {
        const cocinaIncompleta = new Cocina([parrilla]);

        expect(() => cocinaIncompleta.aQueEstacionVa(productoPara(TipoEstacion.BARRA))).toThrow();
    });

    test("Enviar un ítem lo manda a su estación y empieza a prepararse", () => {
        const item = itemPara(TipoEstacion.BARRA);

        cocina.enviarItem(item);

        expect(item.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    test("Dos ítems de la misma estación: el segundo espera", () => {
        const primero = itemPara(TipoEstacion.PARRILLA);
        const segundo = itemPara(TipoEstacion.PARRILLA);

        cocina.enviarItem(primero);
        cocina.enviarItem(segundo);

        expect(primero.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(segundo.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    test("Ítems de estaciones distintas se preparan a la vez", () => {
        const deParrilla = itemPara(TipoEstacion.PARRILLA);
        const deBarra = itemPara(TipoEstacion.BARRA);

        cocina.enviarItem(deParrilla);
        cocina.enviarItem(deBarra);

        expect(deParrilla.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(deBarra.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    describe("Combos", () => {
        test("Un combo llega a cada una de sus estaciones", () => {
            cocina.enviarItem(comboParrillero());

            const otro = itemPara(TipoEstacion.PARRILLA);
            cocina.enviarItem(otro);
            // la Parrilla ya estaba ocupada con la parte del combo
            expect(otro.getEstado()).toBe(EstadoItem.PENDIENTE);
        });

        test("El combo está EN_PREPARACION mientras sus estaciones trabajan", () => {
            const combo = comboParrillero();

            cocina.enviarItem(combo);

            expect(combo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });

        test("Si una estación termina y las otras no, el combo sigue EN_PREPARACION", () => {
            const combo = comboParrillero();
            cocina.enviarItem(combo);

            parrilla.terminarItemActual();

            expect(combo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });

        test("El combo está LISTO cuando todas sus estaciones terminaron", () => {
            const combo = comboParrillero();
            cocina.enviarItem(combo);

            parrilla.terminarItemActual();
            barra.terminarItemActual();
            dulce.terminarItemActual();

            expect(combo.getEstado()).toBe(EstadoItem.LISTO);
        });

        test("Si una estación está ocupada, esa parte del combo espera", () => {
            cocina.enviarItem(itemPara(TipoEstacion.BARRA));
            const combo = comboParrillero();

            cocina.enviarItem(combo);
            parrilla.terminarItemActual();
            dulce.terminarItemActual();

            expect(combo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });
    });
});
