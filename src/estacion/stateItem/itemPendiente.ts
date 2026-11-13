import { ItemPedido } from "../itemPedido";
import { EstadoItem } from "./estadoItem";
import { ItemEnPreparacion } from "./itemEnPreparacion";

/**
 * Clase concreta que se encarga de representar el estado Pendiente de un Item.
 */
export class ItemPendiente extends EstadoItem {
    /**
     * Inicializa el Estado Pendiente con valores propios.
     * @param itemPedido = Item que tiene el Estado.
     */
    public constructor(itemPedido: ItemPedido) {
        super(itemPedido);
        this.nombre = "PENDIENTE";
        this.puedeModificarse = true;
        this.estaPendiente = true;
        this.motivoNoPuedeTerminarse = "El item aún no fue preparado";
    }

    /**
     * Tranciciona al estado En Preparación.
     */
    public enPreparacion(): void {
        this.itemPedido.cambiarEstado(new ItemEnPreparacion(this.itemPedido));
    }
}