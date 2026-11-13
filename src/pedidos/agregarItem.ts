import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";
import { QuitarItem } from "./quitarItem";

/**
 * Clase concreta encargado de agregar un item a la lista de items de un pedido
 */
export class AgregarItem implements Acciones {
    private items: ItemPedido[];
    private item: ItemPedido;

    /**
     * Crea una instancia de la acción de agregar item.
     * @param items = Arreglo de items del pedido.
     * @param item = Item a agregar.
     */
    public constructor(items: ItemPedido[], item: ItemPedido) {
        this.items = items;
        this.item = item;
    }

    /**
     * Añade el ítem al final de la colección de items del pedido.
     */
    public aplicar(): void {
        this.items.push(this.item);
    }

    /**
     * Revierte la incorporación y elimina el item de la colección.
     */
    public deshacer(): void {
        const inversa = new QuitarItem(this.items, this.item);
        inversa.aplicar();
    }
}
