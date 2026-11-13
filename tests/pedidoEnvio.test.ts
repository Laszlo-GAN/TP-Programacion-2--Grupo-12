import { PedidoEnvio } from "../src/pedidos/pedidoEnvio";
import { Pedido } from "../src/pedidos/pedido";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";

describe("Test clase PedidoEnvio", () => {
    const COSTO_ENVIO = 800;
    let instance: PedidoEnvio;

    beforeEach(() => {
        instance = new PedidoEnvio("P001", new Date(), "Calle Falsa 123", COSTO_ENVIO);
    });

    test("Verificar que sea instancia de PedidoEnvio", () => {
        expect(instance).toBeInstanceOf(PedidoEnvio);
    });

    test("Verificar que sea un Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("El estado inicial es EN_CONSTRUCCION", () => {
        expect(instance.getEstado()).toBeInstanceOf(EstadoPedido);
    });

    test("Los datos incluyen la dirección y el costo de envío", () => {
        expect(instance.datosDelPedido()).toBe("Su Pedido sera enviado a Calle Falsa 123, El envio sale: $800, ¡Gracias por su compra!");
    });
});
