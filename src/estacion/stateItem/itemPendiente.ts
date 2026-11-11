import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";
import { ItemEnPreparacion } from "./itemEnPreparacion";

export class ItemPendiente extends EstadoItem {
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.puedeModificarse = true;
        this.estaPendiente = true;
    }
    public listo(): void {
        throw new Error("El item aún no fue preparado");
    }

    public enPreparacion(): void {
        this.itemPedido.cambiarEstado(new ItemEnPreparacion(this.itemPedido));
    }
}