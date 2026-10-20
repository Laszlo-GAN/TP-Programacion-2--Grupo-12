import { Pedido } from "../src/pedidos/pedido";
import { EstadoItem } from "../src/estacion/estadoItem";
import { ItemPedido } from "../src/estacion/itemPedido";
import Combo from "../src/estacion/combo";
import { DescuentoPorcentual } from "../src/estacion/descuentoPorcentual";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { PedidoMock, crearItem } from "./mocks";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase Pedido", () => {
    const PRECIO = 100;
    const DOS_UNIDADES = 2;
    const TRES_UNIDADES = 3;
    const PRECIO_SEGUNDO = 50;
    const DIEZ_PORCIENTO = 10;
    let instance: PedidoMock;

    beforeEach(() => {
        instance = new PedidoMock("P001", new Date());
    });

    test("Verificar que sea instancia de Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("El estado inicial es PENDIENTE", () => {
        expect(instance.getEstadoItem()).toBe(EstadoItem.PENDIENTE);
    });

    test("El pedido pasa a EN_PREPARACION", () => {
        instance.enPreparacion();

        expect(instance.getEstadoItem()).toBe(EstadoItem.EN_PREPARACION);
    });

    test("El pedido pasa a LISTO", () => {
        instance.enListo();

        expect(instance.getEstadoItem()).toBe(EstadoItem.LISTO);
    });

    test("Devuelve los datos del pedido", () => {
        expect(instance.datosDelPedido()).toBe("Pedido de prueba");
    });

    describe("Facturación", () => {
        test("Con todos los ítems LISTO se puede facturar", () => {
            const item = crearItem("I001");
            item.listo();
            instance.agregarItem(item);

            expect(instance.puedeFacturarse()).toBe(true);
        });

        test("Con un ítem PENDIENTE no se puede facturar", () => {
            instance.agregarItem(crearItem("I001"));

            expect(instance.puedeFacturarse()).toBe(false);
        });

        test("Con un ítem EN_PREPARACION no se puede facturar", () => {
            const item = crearItem("I001");
            item.enPreparacion();
            instance.agregarItem(item);

            expect(instance.puedeFacturarse()).toBe(false);
        });

        test("Si uno de varios ítems no está listo, no se puede facturar", () => {
            const listo = crearItem("I001");
            listo.listo();
            instance.agregarItem(listo);
            instance.agregarItem(crearItem("I002"));

            expect(instance.puedeFacturarse()).toBe(false);
        });
    });

    describe("Total de productos", () => {
        test("Un pedido sin ítems tiene total 0", () => {
            expect(instance.calcularTotalProductos()).toBe(0);
        });

        test("El total es la suma de precio por cantidad de cada ítem", () => {
            instance.agregarItem(crearItem("I001", PRECIO, DOS_UNIDADES));
            instance.agregarItem(crearItem("I002", PRECIO_SEGUNDO, TRES_UNIDADES));

            expect(instance.calcularTotalProductos()).toBe(PRECIO * DOS_UNIDADES + PRECIO_SEGUNDO * TRES_UNIDADES);
        });

        test("El total usa el precio del combo, con su beneficio", () => {
            const combo = new Combo(
                [new ProductoUnico(PRECIO, TipoEstacion.PARRILLA), new ProductoUnico(PRECIO, TipoEstacion.BARRA)],
                new DescuentoPorcentual(DIEZ_PORCIENTO),
            );
            instance.agregarItem(new ItemPedido("C001", combo, DOS_UNIDADES));

            expect(instance.calcularTotalProductos()).toBe((PRECIO * DOS_UNIDADES - PRECIO * DOS_UNIDADES / DIEZ_PORCIENTO) * DOS_UNIDADES);
        });
    });

    describe("Quitar y deshacer", () => {
        test("Quitar un ítem baja el total", () => {
            const item = crearItem("I001", PRECIO);
            instance.agregarItem(item);

            instance.quitarItem(item);

            expect(instance.calcularTotalProductos()).toBe(0);
        });

        test("Deshacer un quitar vuelve a poner el ítem", () => {
            const item = crearItem("I001", PRECIO);
            instance.agregarItem(item);
            instance.quitarItem(item);

            instance.deshacerUltimaModificacion();

            expect(instance.calcularTotalProductos()).toBe(PRECIO);
        });

        test("Deshacer un agregar saca el ítem", () => {
            instance.agregarItem(crearItem("I001", PRECIO));

            instance.deshacerUltimaModificacion();

            expect(instance.calcularTotalProductos()).toBe(0);
        });

        test("Deshacer sin modificaciones previas no hace nada", () => {
            instance.deshacerUltimaModificacion();

            expect(instance.calcularTotalProductos()).toBe(0);
        });

        test("Quitar un ítem que no estaba y deshacer no lo agrega", () => {
            instance.quitarItem(crearItem("I001", PRECIO));

            instance.deshacerUltimaModificacion();

            expect(instance.calcularTotalProductos()).toBe(0);
        });

        test("Cada deshacer revierte una sola modificación, de la última a la primera", () => {
            instance.agregarItem(crearItem("I001", PRECIO));
            instance.agregarItem(crearItem("I002", PRECIO_SEGUNDO));

            instance.deshacerUltimaModificacion();

            expect(instance.calcularTotalProductos()).toBe(PRECIO);
        });
    });
});
