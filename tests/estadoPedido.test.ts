import { beforeEach, describe, expect, test } from "@jest/globals";
import PedidoFinalizado from "../src/pedidos/statePedido/pedidoFinalizado";
import PedidoConfirmado from "../src/pedidos/statePedido/pedidoConfirmado";
import PedidoEnConstruccion from "../src/pedidos/statePedido/pedidoEnConstruccion";
import { PedidoMock } from "./mocks";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";

describe("Test para la clases de EstadoPedido", () => {
    class EstadoPedidoConcreto extends EstadoPedido {
        public finalizarPedido(): void {
            throw new Error("La clase abstracta no puede finalizar el pedido");
        }
        public confirmarPedido(): void {
            throw new Error("La clase abstracta no puede confirmar el pedido");
        }
        
    }

    let estadoEnConstruccion: PedidoEnConstruccion;
    let estadoConfirmado: PedidoConfirmado;
    let estadoFinalizado: PedidoFinalizado;

    let instance: EstadoPedido;

    beforeEach(() => {
        instance = new EstadoPedidoConcreto(PedidoMock);

        estadoEnConstruccion = new PedidoEnConstruccion(PedidoMock);
        estadoConfirmado = new PedidoConfirmado(PedidoMock);
        estadoFinalizado = new PedidoFinalizado(PedidoMock);
    });

    test("Verifico que sea una instancia de EstadoPedido", ()=> {
        expect(instance).toBeInstanceOf(EstadoPedido);
    })

    test("Verifico que sea una instancia de PedidoEnConstruccion", () => {
        expect(estadoEnConstruccion).toBeInstanceOf(EstadoPedido);
        expect(estadoEnConstruccion).toBeInstanceOf(PedidoEnConstruccion);
    });

    test("Verifico que sea una instancia de PedidoConfirmado", () => {
        expect(estadoEnConstruccion).toBeInstanceOf(EstadoPedido);
        expect(estadoConfirmado).toBeInstanceOf(PedidoConfirmado);
    });

    test("Verifico que sea una instancia de PedidoFinalizado", () => {
        expect(estadoEnConstruccion).toBeInstanceOf(EstadoPedido);
        expect(estadoFinalizado).toBeInstanceOf(PedidoFinalizado);
    });

    test("Verifico que setee su Pedido correctamente", () => {
        instance.setPedido(PedidoMock);
        expect(instance.getPedido()).toBe(PedidoMock);
    })

    test("Verifico que solo confirme facturación cuando se esta confirmando", () => {
        expect(estadoConfirmado.getConfirmarFacturacion()).toBe(true);
        
        expect(instance.getConfirmarFacturacion()).toBe(false);
        expect(estadoEnConstruccion.getConfirmarFacturacion()).toBe(false);
        expect(estadoFinalizado.getConfirmarFacturacion()).toBe(false);
    })

    test("Verifico que solo se pueda modificar cuando el pedido esta en Construcción", ()=> { 
        expect(estadoEnConstruccion.getConfirmarModificacion()).toBe(true);

        expect(instance.getConfirmarModificacion()).toBe(false);
        expect(estadoConfirmado.getConfirmarModificacion()).toBe(false);
        expect(estadoFinalizado.getConfirmarModificacion()).toBe(false);
    });

    test("Verifico que pase de en Construcción a Confirmado correctamente", () => {
        estadoEnConstruccion.confirmarPedido();

        expect(PedidoMock.cambiarEstado).toHaveBeenCalled;
    });

    test("Verifico que pase de Confirmado a Finalizado correctamente", () => {
        estadoConfirmado.finalizarPedido();

        expect(PedidoMock.cambiarEstado).toHaveBeenCalled;
    });

    test("Verifico que no permita pasar de Construcción a listo", () => {
        expect(() => estadoEnConstruccion.finalizarPedido()).toThrow("El pedido aún esta en construcción y no puede finalizarse.");
    });

    test("Verifico que no se pueda volver a confirmar el pedido", () => {
        expect(() => estadoConfirmado.confirmarPedido()).toThrow("El pedido ya fue confirmado.");
    });

    test("Verifico que no se pueda finalizar un pedido dos veces", () => {
        expect(() => estadoFinalizado.finalizarPedido()).toThrow("El pedido ya ha sido finalizado.");
    });

    test("Verifico que no intente confirmar un pedido si ya fue finalizado", () => {
        expect(() => estadoFinalizado.confirmarPedido()).toThrow("El pedido fue confirmado con anterioridad y finalizo correctamente.");
    });
});