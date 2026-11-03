import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";
import PedidoConfirmado from "./pedidoConfirmado";

export default class PedidoEnConstruccion extends EstadoPedido {
    public constructor(pedido: Pedido) {
        super(pedido);
        this.confirmarModificacion = true;
    }

    public getConfirmarModificacion(): boolean {
        return this.confirmarModificacion;
    }

    public finalizarPedido(): void {
        throw new Error("El pedido aún esta en construcción y no puede finalizarse.");
    }

    public confirmarPedido(): void {
        this.pedido.cambiarEstado(new PedidoConfirmado(this.pedido));
    }
}