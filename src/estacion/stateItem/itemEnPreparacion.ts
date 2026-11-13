import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";
import { ItemListo } from "./itemListo";

/**
 * Clase concreta que se encarga de representar un Item en Preparación
 */
export class ItemEnPreparacion extends EstadoItem {
    /**
     * Inicializa el estado con con valores propios del estado.
     * @param itemPedido = Item que tiene el estado.
     */
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.nombre = "EN_PREPARACION";
        this.estaEnPreparacion = true;
        this.motivoNoPuedePrepararse = "El item ya esta en preparación";
    }

    /**
     * Tranciciona al estado Listo
     */
    public listo(): void {
        this.itemPedido.cambiarEstado(new ItemListo(this.itemPedido));
    }
}