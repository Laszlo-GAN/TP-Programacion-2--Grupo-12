import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";
import { QuitarItem } from "./quitarItem";

export class AgregarItem implements Acciones {
    private items: ItemPedido[];
    private item: ItemPedido;

    public constructor(items: ItemPedido[], item: ItemPedido) {
        this.items = items;
        this.item = item;
    }

    public aplicar(): void {
        this.items.push(this.item);
    }

   
    public deshacer(): void {
        const inversa = new QuitarItem(this.items, this.item);
        inversa.aplicar();
    }
}
