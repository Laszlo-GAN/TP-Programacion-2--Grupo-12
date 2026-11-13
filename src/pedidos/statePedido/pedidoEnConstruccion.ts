import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";
import PedidoConfirmado from "./pedidoConfirmado";

export default class PedidoEnConstruccion extends EstadoPedido {
    public constructor(pedido: Pedido) {
        super(pedido);
        this.nombre = "EN_CONSTRUCCION";
        this.confirmarModificacion = true;
        this.motivoNoPuedeFinalizarse = "El pedido aún esta en construcción y no puede finalizarse.";
    }

    public confirmarPedido(): void {
        this.pedido.cambiarEstado(new PedidoConfirmado(this.pedido));
    }
}