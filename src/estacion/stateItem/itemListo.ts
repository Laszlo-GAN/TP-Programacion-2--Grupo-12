import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";

export class ItemListo extends EstadoItem {
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.estaListo = true;
    }
    public listo(): void {
        throw new Error("El item ya esta listo");
    }

    public enPreparacion(): void {
        throw new Error("La preparación del item fue finalizada con anterioridad");
    }
}