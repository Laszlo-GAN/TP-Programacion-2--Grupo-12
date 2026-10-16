import { EstadoItem } from "./estadoItem";
import { Producto } from "./producto";

const SIN_PARTES = 0;

export class ItemPedido {
    private codigo: string;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem;
    private partes: ItemPedido[];

    public constructor(codigo: string, producto: Producto, cantidad: number) {
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = EstadoItem.PENDIENTE;
        this.partes = [];
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
    }

   
    public getEstado(): EstadoItem {
        if (this.partes.length === SIN_PARTES) {
            return this.estado;
        }

        if (this.partes.every(p => p.getEstado() === EstadoItem.LISTO)) {
            return EstadoItem.LISTO;
        }

        if (this.partes.every(p => p.getEstado() === EstadoItem.PENDIENTE)) {
            return EstadoItem.PENDIENTE;
        }

        return EstadoItem.EN_PREPARACION;
    }

    public enPreparacion(): void {
        this.estado = EstadoItem.EN_PREPARACION;
    }

    public listo(): void {
        this.estado = EstadoItem.LISTO;
    }

    public puedeModificarse(): boolean {
        return this.getEstado() === EstadoItem.PENDIENTE;
    }
}
