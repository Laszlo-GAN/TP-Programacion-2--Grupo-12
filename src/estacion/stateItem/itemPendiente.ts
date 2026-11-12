import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";
import { ItemEnPreparacion } from "./itemEnPreparacion";

export class ItemPendiente extends EstadoItem {
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.nombre = "PENDIENTE";
        this.puedeModificarse = true;
        this.estaPendiente = true;
        this.motivoNoPuedeTerminarse = "El item aún no fue preparado";
    }

    public enPreparacion(): void {
        this.itemPedido.cambiarEstado(new ItemEnPreparacion(this.itemPedido));
    }
}