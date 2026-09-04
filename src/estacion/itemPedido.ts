import { Estacion } from "./estacion";
import { EstadoItem } from "./estadoItem";

export class ItemPedido {
    private id: string;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem; 

    constructor(){
        this.id = "";
        this.producto = "";
        this.cantidad = 0;
        this.estado = "";
    }

    public enPreparacion(): void{

    }
    public listo(): void{

    }
    public puedeModificarse(): boolean{
        return true;
    }
}