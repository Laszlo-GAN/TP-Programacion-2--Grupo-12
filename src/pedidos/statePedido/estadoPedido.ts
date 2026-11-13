import { Pedido } from "../pedido";

/**
 * Clase abstracta que define el comportamiento por defecto de los distintos estados de un Pedido.
 */
export abstract class EstadoPedido {
    protected pedido: Pedido;
    protected confirmarFacturacion: boolean;
    protected confirmarModificacion: boolean;
    protected motivoNoPuedeFinalizarse: string;
    protected motivoNoPuedeConfirmarse: string;
    protected nombre: string;

    /**
     * Inicializa el estado con valores por defecto.
     * @param pedido = Pedido que tiene el estado. 
     */
    public constructor(pedido: Pedido) {
       this.pedido = pedido;
        this.nombre = "";
        this.confirmarFacturacion = false;
        this.confirmarModificacion = false;
        this.motivoNoPuedeFinalizarse = "El pedido no puede finalizarse";
        this.motivoNoPuedeConfirmarse = "El pedido no puede confirmarse";
    }

    /**
     * Devuelve el nombre del Estado Actual
     * @returns = Nombre del Estado
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Se encarga de asignarle un Pedido al Estado
     * @param pedido Pedido asignada.
     */
    public setPedido(pedido: Pedido): void {
        this.pedido = pedido;
    }

    /**
     * Devuelve la instancia del Pedido
     * @returns = Instancia de Pedido
     */
    public getPedido(): Pedido {
        return this.pedido;
    }

    /**
     * Indica si el pedido se puede facturar en el estado actual.
     * @returns true si puede facturarse, false si no puede.
     */
    public getConfirmarFacturacion(): boolean {
        return this.confirmarFacturacion;
    }

    /**
     * Indica si el pedido se puede modificar en el estado actual.
     * @returns true si puede facturarse, false si no puede.
     */
    public getConfirmarModificacion(): boolean {
        return this.confirmarModificacion;
    };

    /**
     * Tranciciona a estado finalizado.
     * Lanza un error por defecto y delega la lógica a subclases.
     */
    public finalizarPedido(): void {
        throw new Error(this.motivoNoPuedeFinalizarse);
    }
 
    /**
     * Tranciciona a estado confirmado.
     * Lanza un error por defecto y delega la lógica a subclases.
     */
    public confirmarPedido(): void {
        throw new Error(this.motivoNoPuedeConfirmarse);
    }
}