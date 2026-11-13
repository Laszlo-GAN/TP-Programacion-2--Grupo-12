import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";

export class ItemListo extends EstadoItem {
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.nombre = "LISTO";
        this.estaListo = true;
        this.motivoNoPuedeTerminarse = "El item ya esta listo";
        this.motivoNoPuedePrepararse = "La preparación del item fue finalizada con anterioridad";
    }
}