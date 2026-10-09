import { Estacion } from "./estacion";
import { EstadoItem } from "./estadoItem";
import { Producto } from "./producto";

export class ItemPedido {
    private id: number;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoDelPedido;


<<<<<<< HEAD
    constructor(){
        this.id = 0;
        this.producto = "";
        this.cantidad = 0;
        this.estado = "";
=======
    constructor(id: string,producto:Producto,cantidad:number,estado:EstadoItem){
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = EstadoItem.PENDIENTE;
    }

    public getEstado(): EstadoItem{
        return this.estado;
>>>>>>> 5acf70b89065f033be8f64c1195dda1bc36d451c
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
    public marcarEnPreparacion(): void{

    }
    public marcarListo(): void{

    }
}