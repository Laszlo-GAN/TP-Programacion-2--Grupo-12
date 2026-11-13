import { ItemPedido } from "../itemPedido"

export abstract class EstadoItem {
    protected itemPedido: ItemPedido;
    protected puedeModificarse: boolean;
    protected estaListo: boolean;
    protected estaEnPreparacion: boolean;
    protected estaPendiente: boolean;
    protected motivoNoPuedeTerminarse: string;
    protected motivoNoPuedePrepararse: string;
    protected nombre: string;

    public constructor(itemPedido: ItemPedido) {
        this.itemPedido = itemPedido;
        this.puedeModificarse = false;
        this.estaListo = false;
        this.estaEnPreparacion = false;
        this.estaPendiente = false;
        this.nombre = "";
        this.motivoNoPuedePrepararse = "El item ya esta en preparacion";
        this.motivoNoPuedeTerminarse = "El item no fuee terminado aun";
    }

    public getNombre(): string {
        return this.nombre;
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

    public listo(): void {
        throw new Error(this.motivoNoPuedeTerminarse);
    }
    
    public enPreparacion(): void {
        throw new Error(this.motivoNoPuedePrepararse);
    }
}