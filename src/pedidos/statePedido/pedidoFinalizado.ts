import { EstadoPedido } from "./estadoPedido";

export default class PedidoFinalizado extends EstadoPedido {
    public finalizarPedido(): void {
        throw new Error("El pedido ya ha sido finalizado.");
    }

    public confirmarPedido(): void {
        throw new Error("El pedido fue confirmado con anterioridad y finalizo correctamente.");
    }
}