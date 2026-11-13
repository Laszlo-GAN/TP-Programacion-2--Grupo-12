import { ItemPedido } from "../itemPedido"

/**
 * Clase abstracta que define el comportamiento por defecto de los distintos estados de un Item
 */
export abstract class EstadoItem {
    protected itemPedido: ItemPedido;
    protected puedeModificarse: boolean;
    protected estaListo: boolean;
    protected estaEnPreparacion: boolean;
    protected estaPendiente: boolean;
    protected motivoNoPuedeTerminarse: string;
    protected motivoNoPuedePrepararse: string;
    protected nombre: string;

    /**
     * Inicializa valores de control en falso y configura mensajes de error por defecto.
     * @param itemPedido = Item de pedido que tiene el Estado.
     */
    public constructor(itemPedido: ItemPedido) {
        this.itemPedido = itemPedido;
        this.puedeModificarse = false;
        this.estaListo = false;
        this.estaEnPreparacion = false;
        this.estaPendiente = false;
        this.nombre = "";
        this.motivoNoPuedePrepararse = "El item ya esta en preparacion";
        this.motivoNoPuedeTerminarse = "El item no fuee terminado aun";
    }

    /**
     * Obtiene el nombre del Estado
     * @returns Nombre del Estado
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Se encarga de asignarle un Item al Estado
     * @param estacion Item asignado.
     */
    public setItemPedido(itemPedido: ItemPedido): void {
        this.itemPedido = itemPedido;
    }

    /**
     * Obtiene el item de pedido asociado al estado.
     * @returns La instancia del item de pedido.
     */
    public getItemPedido(): ItemPedido {
        return this.itemPedido;
    }

    /**
     * Indica si el item admite modificaciones en su estado actual.
     * @returns false por defecto, las subclases se encargan de definir si se puede modificar o no
     */
    public confirmarModificacion(): boolean {
        return this.puedeModificarse;
    }

    /**
     * Indica si el item esta listo.
     * @returns false por defecto, las subclases se encargan de definir si esta listo o no
     */
    public getEstaListo(): boolean {
        return this.estaListo;
    }

    /**
     * Indica si el item se encuentra en preparación.
     * @returns false por defecto, las subclases se encargan de definir si esta en preparación o no
     */
    public getEstaEnPreparacion(): boolean {
        return this.estaEnPreparacion;
    }

    /**
     * Indica si el item se encuentra pendiente de preparación.
     * @returns false por defecto, las subclases se encargan de definir si esta pendiente o no
     */
    public getEstaPendiente(): boolean {
        return this.estaPendiente;
    }

    /**
     * Transiciona el ítem al estado listo.
     * Por defecto lanza un error para delegar funcionalidad a subclases.
     */
    public listo(): void {
        throw new Error(this.motivoNoPuedeTerminarse);
    }
    
    /**
     * Transiciona el ítem al estado en preparación.
     * Por defecto lanza un error para delegar funcionalidad a subclases.
     */
    public enPreparacion(): void {
        throw new Error(this.motivoNoPuedePrepararse);
    }
}