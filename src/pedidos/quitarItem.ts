import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";

const UN_ELEMENTO = 1;

export class QuitarItem implements Acciones {
    private items: ItemPedido[];
    private item: ItemPedido;
    private seQuito: boolean;

    public constructor(items: ItemPedido[], item: ItemPedido) {
        this.items = items;
        this.item = item;
        this.seQuito = false;
    }

    public aplicar(): void {
        if (!this.items.includes(this.item)) {
            return; // el ítem no estaba en el pedido
        }
        const posicion = this.items.indexOf(this.item);
        this.items.splice(posicion, UN_ELEMENTO);
        this.seQuito = true;
    }

    public deshacer(): void {
        if (!this.seQuito) {
            return;
        }
        this.items.push(this.item);
        this.seQuito = false;
    }
}
