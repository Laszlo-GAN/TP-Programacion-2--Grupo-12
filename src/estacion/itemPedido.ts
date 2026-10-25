import { EstadoItem } from "./stateItem/estadoItem";
import { Producto } from "./producto";
import { ItemListo } from "./stateItem/itemListo";
import { ItemPendiente } from "./stateItem/itemPendiente";
import { ItemEnPreparacion } from "./stateItem/itemEnPreparacion";

const SIN_PARTES = 0;

export class ItemPedido {
    private codigo: string;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem;
    private padre!: ItemPedido;
    private partes: ItemPedido[];

    public constructor(codigo: string, producto: Producto, cantidad: number) {
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = new ItemPendiente(this);
        this.partes = [];
    }

    public cambiarEstado(estado: EstadoItem): void {
        this.estado = estado;
        this.estado.setItemPedido(this);

        if (this.padre) {
            this.padre.actualizarEstadoSegunPartes();
        }
    }

    public setPadre(padre: ItemPedido): void {
        this.padre = padre;
    }

    public getEstado(): EstadoItem {
        return this.estado;
    }

    public getCodigo(): string {
        return this.codigo;
    }

    public getProducto(): Producto {
        return this.producto;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public asignarPartes(partes: ItemPedido[]): void {
        this.partes = partes;
        for (const parte of this.partes) {
            parte.setPadre(this); 
        }
        this.actualizarEstadoSegunPartes();
    }
   
    public actualizarEstadoSegunPartes(): void {
        if (this.partes.length === SIN_PARTES) {
            return;
        }

        if (this.partes.every(parte => parte.getEstado().getEstaListo())) {
            this.cambiarEstado(new ItemListo(this));
        } else if (this.partes.every(parte => parte.getEstado().getEstaPendiente())) {
            this.cambiarEstado(new ItemPendiente(this));
        } else {
            this.cambiarEstado(new ItemEnPreparacion(this));
        }
    }

    public enPreparacion(): void {
        this.estado.enPreparacion();
    }

    public listo(): void {
        this.estado.listo();
    }

    public puedeModificarse(): boolean {
        return this.estado.confirmarModificacion();
    }
}