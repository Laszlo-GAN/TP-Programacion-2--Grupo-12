import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";
import { ItemListo } from "./itemListo";

export class ItemEnPreparacion extends EstadoItem {
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.estaEnPreparacion = true;
    }
    public listo(): void {
        this.itemPedido.cambiarEstado(new ItemListo(this.itemPedido));
    }

    public enPreparacion(): void {
        throw new Error("El item ya esta en preparación");
    }
}