import { Pedido } from "../pedidos/pedido";


export abstract class Estacion {
    private nombre: string;
    protected colaItems: Pedido[];

    constructor(){
        this.nombre = "";
        this.colaItems = [];
    }
    public abstract recibirItems(): void;
    
    public abstract procesarSiguiente(): void;
}