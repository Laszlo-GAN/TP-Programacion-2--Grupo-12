import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";

const UN_ELEMENTO = 1;
const NINGUN_ELEMENTO = 0;
const SIN_POSICION = 0;

export class QuitarItem implements Acciones {
    private items: ItemPedido[];
    private item: ItemPedido;
    private seQuito: boolean;
    private posicion: number;

    public constructor(items: ItemPedido[], item: ItemPedido) {
        this.items = items;
        this.item = item;
        this.seQuito = false;
        this.posicion = SIN_POSICION;
    }

    public aplicar(): void {
        if (!this.items.includes(this.item)) {
            return;
        }
        this.posicion = this.items.indexOf(this.item);
        this.items.splice(this.posicion, UN_ELEMENTO);
        this.seQuito = true;
    }

  
    public deshacer(): void {
        if (!this.seQuito) {
            return;
        }
        this.items.splice(this.posicion, NINGUN_ELEMENTO, this.item);
        this.seQuito = false;
    }
}
