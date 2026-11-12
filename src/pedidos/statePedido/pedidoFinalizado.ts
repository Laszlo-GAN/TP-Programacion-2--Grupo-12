import { Pedido } from "../pedido";
import { EstadoPedido } from "./estadoPedido";

export default class PedidoFinalizado extends EstadoPedido {
    public constructor(pedido: Pedido) {
        super(pedido);
        this.nombre = "FINALIZADO";
        this.motivoNoPuedeFinalizarse = "El pedido ya ha sido finalizado.";
        this.motivoNoPuedeConfirmarse = "El pedido fue confirmado con anterioridad y finalizo correctamente.";
    }
}