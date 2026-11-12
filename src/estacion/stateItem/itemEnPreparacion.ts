import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";
import { ItemListo } from "./itemListo";

export class ItemEnPreparacion extends EstadoItem {
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.nombre = "EN_PREPARACION";
        this.estaEnPreparacion = true;
        this.motivoNoPuedePrepararse = "El item ya esta en preparación";
    }

    public listo(): void {
        this.itemPedido.cambiarEstado(new ItemListo(this.itemPedido));
    }
}