import { ItemPedido } from "./itemPedido";
import EstacionLibre from "./stateEstacion/estacionLibre";
import { EstadoEstacion } from "./stateEstacion/estadoEstacion";
import { TipoEstacion } from "./TipoEstacion";

export abstract class Estacion {
    protected nombre: string;
    protected tipo: TipoEstacion;
    protected colaItems: ItemPedido[];
    protected itemActual: ItemPedido | undefined;
    protected estado: EstadoEstacion;

    public constructor(nombre: string, tipo: TipoEstacion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.colaItems = [];
        this.itemActual = undefined;
        this.estado = new EstacionLibre(this);
    }

    public cambiarEstado(estado: EstadoEstacion): void {
        this.estado = estado;
        this.estado.setEstacion(this);
    }

    public getEstado(): EstadoEstacion {
        return this.estado;
    }

    public getTipo(): TipoEstacion {
        return this.tipo;
    }
    
    public setItemActual(value: ItemPedido | undefined): void {
        this.itemActual = value;
    }

    public getItemActual(): ItemPedido | undefined {
        return this.itemActual;
    }

    public procesarItemActual(): ItemPedido | undefined {
        const siguiente = this.colaItems.shift();
        return siguiente;
    }

    public recibirItems(item: ItemPedido): void {
        this.colaItems.push(item);
        this.procesarSiguiente();
    }

    public procesarSiguiente(): void {
        this.estado.procesarSiguiente();
        this.estado.ocuparse();
    }
   
    public terminarItemActual(): void {
        if (this.itemActual === undefined) {
            return;
        }
        this.itemActual.listo();
        this.itemActual = undefined;
        this.estado.liberarse();
        this.procesarSiguiente();
    }
}