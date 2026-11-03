import { PedidoSalon } from "../src/pedidos/pedidoSalon";
import { Pedido } from "../src/pedidos/pedido";
import { Mesa } from "../src/pedidos/Mesa";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";

describe("Test clase PedidoSalon", () => {
    const NUMERO_MESA = 5;
    const LUGARES = 4;
    let instance: PedidoSalon;

    beforeEach(() => {
        instance = new PedidoSalon("P001", new Date(), new Mesa(NUMERO_MESA), LUGARES, "Juan");
    });

    test("Verificar que sea instancia de PedidoSalon", () => {
        expect(instance).toBeInstanceOf(PedidoSalon);
    });

    test("Verificar que sea un Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Los datos incluyen la mesa, los lugares y el mozo", () => {
        expect(instance.datosDelPedido()).toBe("Mesa 5 (4 lugares) - Mozo: Juan");
    });
});
