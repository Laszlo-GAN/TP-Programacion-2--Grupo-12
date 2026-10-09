import { ItemPedido } from "./itemPedido";
import { EstadoEstacion } from "./estadoEstacion";
import { TipoEstacion } from "./TipoEstacion";

export abstract class Estacion {
    protected nombre: string;
    protected tipo: TipoEstacion;
    protected colaItems: ItemPedido[];
    protected itemActual: ItemPedido | undefined;
    protected estado: EstadoEstacion;

    public constructor(nombre: string, tipo: TipoEstacion, estado: EstadoEstacion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.colaItems = [];
        this.itemActual = undefined;
        this.estado = estado;
    }

  
    public getTipo(): TipoEstacion {
        return this.tipo;
    }

    public recibirItems(item: ItemPedido): void {
        this.colaItems.push(item);
        this.procesarSiguiente();
    }

    public procesarSiguiente(): void {
        if (this.estado === EstadoEstacion.OCUPADA) {
            return;
        }
        const siguiente = this.colaItems.shift();
        if (siguiente === undefined) {
            return; 
        }
        this.itemActual = siguiente;
        this.estado = EstadoEstacion.OCUPADA;
        siguiente.enPreparacion();
    }

   
    public terminarItemActual(): void {
        if (this.itemActual === undefined) {
            return;
        }
        this.itemActual.listo();
        this.itemActual = undefined;
        this.estado = EstadoEstacion.LIBRE;
        this.procesarSiguiente();
    }
}