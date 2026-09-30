import { Pedido } from "../pedidos/pedido";
import { EstadoEstacion } from "./estadoEstacion";


export abstract class Estacion {
    protected nombre: string;
    protected colaItems: Pedido[];
    protected estado: EstadoEstacion;

    constructor(nombre: string, estado: EstadoEstacion){
        this.nombre = nombre;
        this.colaItems = [];
        this.estado = estado;
    }
    
    protected abstract aQueEstacionVa(): void;

    public recibirItems(pedido:Pedido): void{
        this.colaItems.push(pedido);
        this.procesarSiguiente();
    }
    
    public procesarSiguiente(): void{
         if (this.estado === EstadoEstacion.OCUPADA) {
            return;
        }
        this.estado = EstadoEstacion.OCUPADA;
        const pedidoActual = this.colaItems.shift();
        pedidoActual?.enPreparacion(); // porque me aparece el "?" solo. si lo saco tira error 
        this.estado = EstadoEstacion.LIBRE;
    }

   
}
 

