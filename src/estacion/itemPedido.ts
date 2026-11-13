import { EstadoItem } from "./stateItem/estadoItem";
import { Producto } from "./producto";
import { ItemListo } from "./stateItem/itemListo";
import { ItemPendiente } from "./stateItem/itemPendiente";
import { ItemEnPreparacion } from "./stateItem/itemEnPreparacion";

const SIN_PARTES = 0;

/**
 * Clase concreta que representa un Item dentro de un pedido.
 */
export class ItemPedido {
    private codigo: string;
    private producto: Producto;
    private cantidad: number;
    private estado: EstadoItem;
    private padre!: ItemPedido;
    private partes: ItemPedido[];

    /**
     * Crea una instancia de item con un estado pendiente.
     * @param codigo = código identificador del item.
     * @param producto = Producto del item.
     * @param cantidad = Cantidad pedida del item.
     */
    public constructor(codigo: string, producto: Producto, cantidad: number) {
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = new ItemPendiente(this);
        this.partes = [];
    }

    /**
     * Actualiza el estado del item.
     * Si existe un padre, se le notifica para que recalcule su estado.
     * @param estado = Nuevo estado del item.
     */
    public cambiarEstado(estado: EstadoItem): void {
        this.estado = estado;
        this.estado.setItemPedido(this);

        if (this.padre) {
            this.padre.actualizarEstadoSegunPartes();
        }
    }

    /**
     * Asigna el item padre que contiene al sub-item.
     * @param padre = Item contenedor. 
     */
    public setPadre(padre: ItemPedido): void {
        this.padre = padre;
    }

    /**
     * Obtiene el estado actual del item.
     * @returns El estado actual del item.
     */
    public getEstado(): EstadoItem {
        return this.estado;
    }

    /**
     * Obtiene el código identificador del item
     * @returns El código identificador del item
     */
    public getCodigo(): string {
        return this.codigo;
    }

    /**
     * Obtiene el producto del item.
     * @returns Instancia del producto.
     */
    public getProducto(): Producto {
        return this.producto;
    }

    /**
     * Obtiene la cantidad solicitada del item.
     * @returns Cantidad del item.
     */
    public getCantidad(): number {
        return this.cantidad;
    }

    /**
     * Asigna las partes que componen al item, y vincula la referencia al padre.
     * Actualiza el estado general según el estado de todas las partes.
     * @param partes - Coleccion de sub-items.
     */
    public asignarPartes(partes: ItemPedido[]): void {
        this.partes = partes;
        for (const parte of this.partes) {
            parte.setPadre(this); 
        }
        this.actualizarEstadoSegunPartes();
    }
   
    /**
     * Recalcula el estado del item contenedor a partir del estado de sus partes.
     */
    public actualizarEstadoSegunPartes(): void {
        if (this.partes.length === SIN_PARTES) {
            return;
        }

        if (this.partes.every(parte => parte.getEstado().getEstaListo())) {
            this.cambiarEstado(new ItemListo(this));
        } else if (this.partes.every(parte => parte.getEstado().getEstaPendiente())) {
            this.cambiarEstado(new ItemPendiente(this));
        } else {
            this.cambiarEstado(new ItemEnPreparacion(this));
        }
    }

    /**
     * Inicia la preparación del item. Delega la transición a su estado.
     */
    public enPreparacion(): void {
        this.estado.enPreparacion();
    }

    /**
     * Marca el item como finalizado. Delega la transición a su estado.
     */
    public listo(): void {
        this.estado.listo();
    }

    /**
     * Indica si el item puede ser modificado o eliminado del pedido según su estado actual.
     * @returns si se puede modificar devuelve true, y false si su estado no lo permite.
     */
    public puedeModificarse(): boolean {
        return this.estado.confirmarModificacion();
    }
}