import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";

/**
 * Clase concreta que representa el Estado Listo de un Item.
 */
export class ItemListo extends EstadoItem {
    /**
     * Inicializa el Estado Listo con valores propios.
     * @param itemPedido = El item que tiene el Estado.
     */
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.nombre = "LISTO";
        this.estaListo = true;
        this.motivoNoPuedeTerminarse = "El item ya esta listo";
        this.motivoNoPuedePrepararse = "La preparación del item fue finalizada con anterioridad";
    }
}