import { ItemPedido } from "./itemPedido";
import EstacionLibre from "./stateEstacion/estacionLibre";
import { EstadoEstacion } from "./stateEstacion/estadoEstacion";
import { TipoEstacion } from "./TipoEstacion";

/**
 * Clase base abstracta que representa una Estación de trabajo dentro de la cocina.
 * Administra una cola de ítems pendientes y delega las transiciones de disponibilidad a su estado actual.
*/
export abstract class Estacion {
    protected nombre: string;
    protected tipo: TipoEstacion;
    protected colaItems: ItemPedido[];
    protected itemActual: ItemPedido | undefined;
    protected estado: EstadoEstacion;

    /**
     * Inicializa la Estación con estado Libre y Cola vacía.
     * @param nombre = Nombre de la estación.
     * @param tipo = El tipo de estación.
     */
    public constructor(nombre: string, tipo: TipoEstacion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.colaItems = [];
        this.itemActual = undefined;
        this.estado = new EstacionLibre(this);
    }

    /**
     * Se encarga de actualizar el estado de la Estación.
     * @param estado = Nuevo estado de la Estación.
     */
    public cambiarEstado(estado: EstadoEstacion): void {
        this.estado = estado;
        this.estado.setEstacion(this);
    }

    /**
     * Obtiene el estado actual de la estación.
     *
     * @returns El estado actual.
     */
    public getEstado(): EstadoEstacion {
        return this.estado;
    }

    /**
     * Obtiene el tipo de estación de cocina.
     *
     * @returns El tipo de estación.
     */
    public getTipo(): TipoEstacion {
        return this.tipo;
    }

    /**
     * Asigna el item que pasa a prepararse en la estación.
     * @param value = item a preparar.
     */
    public setItemActual(value: ItemPedido | undefined): void {
        this.itemActual = value;
    }

    /**
     * Obtiene el item que se está preparando actualmente.
     * @returns El item en preparación, undefined si no hay ninguno.
     */
    public getItemActual(): ItemPedido | undefined {
        return this.itemActual;
    }

    /**
     * Retira y devuelve el primer ítem de la cola de espera.
     * @returns El siguiente item en la cola, undefined si está vacia.
     */
    public procesarItemActual(): ItemPedido | undefined {
        const siguiente = this.colaItems.shift();
        return siguiente;
    }

    /**
     * Agrega un nuevo item a la cola de la Estación e inicia su procesamiento si la estación está disponible.
     * @param item - Item a preparar.
     */
    public recibirItems(item: ItemPedido): void {
        this.colaItems.push(item);
        this.procesarSiguiente();
    }

    /**
     * Si la estación está disponible, delega en su estado actual el procesamiento del item.
     */
    public procesarSiguiente(): void {
        if (this.estado.estaDisponible()) {
            this.estado.procesarSiguiente();
        }
    }
    
    /**
     * Finaliza el item en preparación marcándolo como listo, libera la estación,
     * e intenta procesar el siguiente item en cola.
     * Si no hay item actual, no realiza acciones.
     */
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