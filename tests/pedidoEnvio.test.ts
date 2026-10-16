import { PedidoEnvio } from "../src/pedidos/pedidoEnvio";
import { Pedido } from "../src/pedidos/pedido";
import { EstadoItem } from "../src/estacion/estadoItem";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

describe("Test clase PedidoEnvio", () => {

    let instance: PedidoEnvio;

    beforeEach(() => {
        instance = new PedidoEnvio("pedido1", new Date(), EstadoItem.PENDIENTE, TipoEstacion.PARRILLA);
    });

    test("Verificar que sea instancia de PedidoEnvio", () => {
        expect(instance).toBeInstanceOf(PedidoEnvio);
    });

    test("Verificar que sea instancia de Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Verificar que el estado inicial sea PENDIENTE", () => {
        expect(instance.getEstadoItem()).toBe(EstadoItem.PENDIENTE);
    });

    test("Verificar que pueda cambiar a EN_PREPARACION", () => {
        instance.enPreparacion();

        expect(instance.getEstadoItem()).toBe(EstadoItem.EN_PREPARACION);
    });

    test("Verificar que pueda cambiar a LISTO", () => {
        instance.enListo();

        expect(instance.getEstadoItem()).toBe(EstadoItem.LISTO);
    });

    test("Verificar que obtenga correctamente el tipo de estación", () => {
        expect(instance.getTipoEstacion()).toBe(TipoEstacion.PARRILLA);
    });

    test("Verifico los datos del pedido", () => {
        expect(instance.DatosDelPedido()).toBe("");
    });

    test("Verifico que pueda facturarse", () => {
        expect(instance.puedeFacturarse()).toBe(true);
    });

    test("Verifico que el total de productos sea 0", () => {
        expect(instance.calcularTotalProductos()).toBe(0);
    });
});