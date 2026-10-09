import { Pedido } from "../src/pedidos/pedido";
import { EstadoItem } from "../src/estacion/estadoItem";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { PedidoMock } from "./mocks"


describe("Test clase Pedido", () => {

    let instance: PedidoMock;
    let fecha: Date;

    beforeEach(() => {
        fecha = new Date();

        instance = new PedidoMock(
            "pedido1",
            fecha,
            EstadoItem.PENDIENTE,
            TipoEstacion.PARRILLA
        );
    });

    test("Verificar que sea instancia de PedidoMock", () => {
        expect(instance).toBeInstanceOf(PedidoMock);
    });

    test("Verificar que sea instancia de Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Verificar que el estado inicial sea PENDIENTE", () => {
        expect(instance.getEstadoItem()).toBe(EstadoItem.PENDIENTE);
    });

    test("Verificar que el pedido pase a EN_PREPARACION", () => {
        instance.enPreparacion();

        expect(instance.getEstadoItem()).toBe(EstadoItem.EN_PREPARACION);
    });

    test("Verificar que el pedido pase a LISTO", () => {
        instance.enListo();

        expect(instance.getEstadoItem()).toBe(EstadoItem.LISTO);
    });

    test("Verificar que obtenga correctamente el tipo de estación", () => {
        expect(instance.getTipoEstacion()).toBe(TipoEstacion.PARRILLA);
    });

    test("Verificar que pueda facturarse", () => {
        expect(instance.puedeFacturarse()).toBe(true);
    });

    test("Verificar que el total de productos sea 0", () => {
        expect(instance.calcularTotalProductos()).toBe(0);
    });

    test("Verificar los datos del pedido", () => {
        expect(instance.DatosDelPedido()).toBe("Pedido de prueba");
    });
});