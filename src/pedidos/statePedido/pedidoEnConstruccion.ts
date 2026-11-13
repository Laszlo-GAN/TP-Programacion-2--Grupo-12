import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";
import PedidoConfirmado from "./pedidoConfirmado";

/**
 * Clase concreta que representa un Pedido en Construcción
 */
export default class PedidoEnConstruccion extends EstadoPedido {
    /**
     * Crea una instancia del estado confirmado.
     * @param pedido - Pedido del Estado.
     */
    public constructor(pedido: Pedido) {
        super(pedido);
        this.nombre = "EN_CONSTRUCCION";
        this.confirmarModificacion = true;
        this.motivoNoPuedeFinalizarse = "El pedido aún esta en construcción y no puede finalizarse.";
    }

    /**
     * Tranciciona a estado Confirmado.
     */
    public confirmarPedido(): void {
        this.pedido.cambiarEstado(new PedidoConfirmado(this.pedido));
    }
}