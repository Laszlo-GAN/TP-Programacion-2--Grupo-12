import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";
import PedidoFinalizado from "./pedidoFinalizado";

/**
 * Clase concreta que representa un Pedido Confirmado
 */
export default class PedidoConfirmado extends EstadoPedido {
    /**
     * Crea una instancia del estado confirmado.
     * @param pedido - Pedido del Estado.
     */
    public constructor(pedido: Pedido) {
        super(pedido);
        this.nombre = "CONFIRMADO";
        this.confirmarFacturacion = true;
        this.motivoNoPuedeConfirmarse = "El pedido ya fue confirmado.";
    }

    /**
     * Tranciciona a estado Finalizado.
     */
    public finalizarPedido(): void {
        this.pedido.cambiarEstado(new PedidoFinalizado(this.pedido));
    }
}