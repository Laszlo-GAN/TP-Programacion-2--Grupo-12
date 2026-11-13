import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";

/**
 * Clase concreta que representa un Pedido en Construcción
 */
export default class PedidoFinalizado extends EstadoPedido {
    /**
     * Crea una instancia del estado confirmado.
     * @param pedido - Pedido del Estado.
     */
    public constructor(pedido: Pedido) {
        super(pedido);
        this.nombre = "FINALIZADO";
        this.motivoNoPuedeFinalizarse = "El pedido ya ha sido finalizado.";
        this.motivoNoPuedeConfirmarse = "El pedido fue confirmado con anterioridad y finalizo correctamente.";
    }
}