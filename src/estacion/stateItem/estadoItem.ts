import { ItemPedido } from "../itemPedido"

export abstract class EstadoItem {
    protected itemPedido: ItemPedido;
    protected puedeModificarse: boolean;
    protected estaListo: boolean;
    protected estaEnPreparacion: boolean;
    protected estaPendiente: boolean;

    public constructor(itemPedido: ItemPedido) {
        this.itemPedido = itemPedido;
        this.puedeModificarse = false;
        this.estaListo = false;
        this.estaEnPreparacion = false;
        this.estaPendiente = false;
    }

    public setItemPedido(itemPedido: ItemPedido): void {
        this.itemPedido = itemPedido;
    }

    public getItemPedido(): ItemPedido {
        return this.itemPedido;
    }

    public confirmarModificacion(): boolean {
        return this.puedeModificarse;
    }

    public getEstaListo(): boolean {
        return this.estaListo;
    }

    public getEstaEnPreparacion(): boolean {
        return this.estaEnPreparacion;
    }

    public getEstaPendiente(): boolean {
        return this.estaPendiente;
    }

    public abstract listo(): void;
    
    public abstract enPreparacion(): void;
}