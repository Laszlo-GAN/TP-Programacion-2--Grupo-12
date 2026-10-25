import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";
import PedidoFinalizado from "./pedidoFinalizado";

export default class PedidoConfirmado extends EstadoPedido {
    public constructor(pedido: Pedido) {
        super(pedido);
        this.confirmarFacturacion = true
    }

    public getConfirmarFacturacion(): boolean {
        return this.confirmarFacturacion;
    }

    public finalizarPedido(): void {
        this.pedido.cambiarEstado(new PedidoFinalizado(this.pedido));
    }

    public confirmarPedido(): void {
        throw new Error("El pedido ya fue confirmado.");
    }
}