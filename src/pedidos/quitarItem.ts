import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";

const UN_ELEMENTO = 1;
const NINGUN_ELEMENTO = 0;
const SIN_POSICION = 0;

/**
 * Clase concreta encargada de eliminar un item de la lista de items de un pedido,
 */
export class QuitarItem implements Acciones {
    private items: ItemPedido[];
    private item: ItemPedido;
    private seQuito: boolean;
    private posicion: number;

    /**
     * Crea una instancia de la acción de quitar item.
     * @param items = Array de items del pedido.
     * @param item = Item a eliminar.
     */
    public constructor(items: ItemPedido[], item: ItemPedido) {
        this.items = items;
        this.item = item;
        this.seQuito = false;
        this.posicion = SIN_POSICION;
    }
    
    /**
     * Busca el item, guarda su indice y lo elimina.
     * Si el item no esta presente, no realiza ninguna operación.
     */
    public aplicar(): void {
        if (!this.items.includes(this.item)) {
            return;
        }
        this.posicion = this.items.indexOf(this.item);
        this.items.splice(this.posicion, UN_ELEMENTO);
        this.seQuito = true;
    }

    /**
     * Restaura el item en su posición original dentro de la colección.
     */
    public deshacer(): void {
        if (!this.seQuito) {
            return;
        }
        this.items.splice(this.posicion, NINGUN_ELEMENTO, this.item);
        this.seQuito = false;
    }
}
