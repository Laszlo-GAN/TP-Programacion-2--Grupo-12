import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";
import PedidoFinalizado from "./pedidoFinalizado";

export default class PedidoConfirmado extends EstadoPedido {
    public constructor(pedido: Pedido) {
        super(pedido);
        this.nombre = "CONFIRMADO";
        this.confirmarFacturacion = true;
        this.motivoNoPuedeConfirmarse = "El pedido ya fue confirmado.";
    }

    public finalizarPedido(): void {
        this.pedido.cambiarEstado(new PedidoFinalizado(this.pedido));
    }
}