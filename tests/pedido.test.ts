import { Pedido } from "../src/pedidos/pedido";
import { EstadoPedido } from "../src/pedidos/estadoPedido";
import { EstadoItem } from "../src/estacion/estadoItem";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { Cocina } from "../src/estacion/Cocina";
import { Parrilla } from "../src/estacion/parrilla";
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
    let parrilla: Parrilla;
    let cocina: Cocina;

    // Termina en la parrilla todos los ítems que le llegaron
    function terminarTodoEnLaParrilla(cantidad: number): void {
        for (let vuelta = 0; vuelta < cantidad; vuelta++) {
            parrilla.terminarItemActual();
        }
    }

    beforeEach(() => {
        instance = new PedidoMock("P001", new Date());
        parrilla = new Parrilla("Parrilla", EstadoEstacion.LIBRE);
        cocina = new Cocina([parrilla]);
    });

    test("Verificar que sea instancia de Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Un pedido nuevo está EN_CONSTRUCCION", () => {
        expect(instance.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    test("Devuelve los datos del pedido", () => {
        expect(instance.datosDelPedido()).toBe("Pedido de prueba");
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

            expect(instance.calcularTotalProductos()).toBe(
                (PRECIO * DOS_UNIDADES - PRECIO * DOS_UNIDADES / DIEZ_PORCIENTO) * DOS_UNIDADES,
            );
        });
    });

    describe("Quitar y deshacer (pedido en construcción)", () => {
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

        test("No se puede quitar un ítem que ya está en preparación", () => {
            const item = crearItem("I001", PRECIO);
            instance.agregarItem(item);
            cocina.enviarItem(item);

            expect(() => instance.quitarItem(item)).toThrow();
        });
    });

    describe("Confirmar", () => {
        test("Al confirmar, el pedido pasa a CONFIRMADO", () => {
            instance.agregarItem(crearItem("I001"));

            instance.confirmar(cocina);

            expect(instance.getEstado()).toBe(EstadoPedido.CONFIRMADO);
        });

        test("Al confirmar, los ítems se mandan a la cocina", () => {
            const item = crearItem("I001");
            instance.agregarItem(item);

            instance.confirmar(cocina);

            expect(item.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });

        test("No se puede confirmar un pedido sin ítems", () => {
            expect(() => instance.confirmar(cocina)).toThrow();
            expect(instance.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
        });

        test("No se puede confirmar dos veces", () => {
            instance.agregarItem(crearItem("I001"));
            instance.confirmar(cocina);

            expect(() => instance.confirmar(cocina)).toThrow();
        });

        test("Confirmar dos veces no vuelve a mandar los ítems a la cocina", () => {
            const primero = crearItem("I001");
            const segundo = crearItem("I002");
            instance.agregarItem(primero);
            instance.agregarItem(segundo);
            instance.confirmar(cocina);

            expect(() => instance.confirmar(cocina)).toThrow();
            parrilla.terminarItemActual();
            parrilla.terminarItemActual();

            // si se hubieran duplicado, la parrilla todavía tendría ítems en la cola
            expect(primero.getEstado()).toBe(EstadoItem.LISTO);
            expect(segundo.getEstado()).toBe(EstadoItem.LISTO);
        });
    });

    describe("Después de confirmar no se corrige", () => {
        beforeEach(() => {
            instance.agregarItem(crearItem("I001"));
            instance.confirmar(cocina);
        });

        test("No se pueden agregar ítems", () => {
            expect(() => instance.agregarItem(crearItem("I002"))).toThrow();
        });

        test("No se pueden quitar ítems", () => {
            expect(() => instance.quitarItem(crearItem("I002"))).toThrow();
        });

        test("No se puede deshacer", () => {
            expect(() => instance.deshacerUltimaModificacion()).toThrow();
        });
    });

    describe("Facturación", () => {
        test("Un pedido en construcción no se puede facturar", () => {
            instance.agregarItem(crearItem("I001"));

            expect(instance.puedeFacturarse()).toBe(false);
        });

        test("Un pedido sin ítems no se puede facturar", () => {
            expect(instance.puedeFacturarse()).toBe(false);
        });

        test("Confirmado con ítems sin terminar no se puede facturar", () => {
            instance.agregarItem(crearItem("I001"));
            instance.confirmar(cocina);

            expect(instance.puedeFacturarse()).toBe(false);
        });

        test("Si uno de varios ítems no está listo, no se puede facturar", () => {
            instance.agregarItem(crearItem("I001"));
            instance.agregarItem(crearItem("I002"));
            instance.confirmar(cocina);

            terminarTodoEnLaParrilla(1);

            expect(instance.puedeFacturarse()).toBe(false);
        });

        test("Confirmado y con todos los ítems listos se puede facturar", () => {
            instance.agregarItem(crearItem("I001"));
            instance.agregarItem(crearItem("I002"));
            instance.confirmar(cocina);

            terminarTodoEnLaParrilla(DOS_UNIDADES);

            expect(instance.puedeFacturarse()).toBe(true);
        });
    });

    describe("Finalizar", () => {
        test("Se puede finalizar un pedido listo para facturar", () => {
            instance.agregarItem(crearItem("I001"));
            instance.confirmar(cocina);
            terminarTodoEnLaParrilla(1);

            instance.finalizar();

            expect(instance.getEstado()).toBe(EstadoPedido.FINALIZADO);
        });

        test("No se puede finalizar con ítems sin terminar", () => {
            instance.agregarItem(crearItem("I001"));
            instance.confirmar(cocina);

            expect(() => instance.finalizar()).toThrow();
        });

        test("No se puede finalizar un pedido en construcción", () => {
            expect(() => instance.finalizar()).toThrow();
        });

        test("Un pedido finalizado ya no se puede facturar de nuevo", () => {
            instance.agregarItem(crearItem("I001"));
            instance.confirmar(cocina);
            terminarTodoEnLaParrilla(1);
            instance.finalizar();

            expect(instance.puedeFacturarse()).toBe(false);
        });
    });
});
