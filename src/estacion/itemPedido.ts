import { EstadoItem } from "./estadoItem";
import { Producto } from "./producto";

export class ItemPedido {
    private codigo: string;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem;

    public constructor(codigo: string, producto: Producto, cantidad: number) {
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = EstadoItem.PENDIENTE;
    }

    public getProducto(): Producto {
        return this.producto;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getEstado(): EstadoItem {
        return this.estado;
    }

    public enPreparacion(): void {
        this.estado = EstadoItem.EN_PREPARACION;
    }

    public listo(): void {
        this.estado = EstadoItem.LISTO;
    }

    public puedeModificarse(): boolean {
        return this.estado === EstadoItem.PENDIENTE;
    }
}