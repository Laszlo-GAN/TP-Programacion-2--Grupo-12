import { Estacion } from "./estacion";
import { EstadoItem } from "./estadoItem";

export class ItemPedido {
    private id: number;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoDelPedido;


    constructor(){
        this.id = 0;
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
    public marcarEnPreparacion(): void{

    }
    public marcarListo(): void{

    }
}