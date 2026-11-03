import { PedidoEnvio } from "../src/pedidos/pedidoEnvio";
import { Pedido } from "../src/pedidos/pedido";
import { EstadoPedido } from "../src/pedidos/estadoPedido";
import { beforeEach, describe, expect, test } from "@jest/globals";

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
        expect(instance.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    test("Los datos incluyen la dirección y el costo de envío", () => {
        expect(instance.datosDelPedido()).toBe("Envío a Calle Falsa 123 (costo de envío: $800)");
    });
});
