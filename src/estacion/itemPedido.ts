import { Estacion } from "./estacion";
import { EstadoItem } from "./estadoItem";
import { Producto } from "./producto";

export class ItemPedido {
    private id: string;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem; 

    constructor(id: string, producto:Producto, cantidad:number, estado:EstadoItem){
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = EstadoItem.PENDIENTE;
    }

    public getId(): string {
        return this.id
    }

    public getProducto(): Producto {
        return this.producto
    }

    public getCantidad(): number {
        return this.cantidad
    }
    
    public getEstado(): EstadoItem{
        return this.estado;
    }

    public enPreparacion(): void{
        this.estado = EstadoItem.EN_PREPARACION;
    }

    public listo(): void{
        this.estado = EstadoItem.LISTO;
    }
    
    public puedeModificarse(): boolean{
        return this.estado === EstadoItem.PENDIENTE;
    }
}