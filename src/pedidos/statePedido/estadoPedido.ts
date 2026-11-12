import { Pedido } from "../pedido";

export abstract class EstadoPedido {
    protected pedido: Pedido;
    protected confirmarFacturacion: boolean;
    protected confirmarModificacion: boolean;
    protected motivoNoPuedeFinalizarse: string;
    protected motivoNoPuedeConfirmarse: string;
    protected nombre: string;

    public constructor(pedido: Pedido) {
       this.pedido = pedido;
        this.nombre = "";
        this.confirmarFacturacion = false;
        this.confirmarModificacion = false;
        this.motivoNoPuedeFinalizarse = "El pedido no puede finalizarse";
        this.motivoNoPuedeConfirmarse = "El pedido no puede confirmarse";
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setPedido(pedido: Pedido): void {
        this.pedido = pedido;
    }

    public getPedido(): Pedido {
        return this.pedido;
    }

    public getConfirmarFacturacion(): boolean {
        return this.confirmarFacturacion;
    }

    public getConfirmarModificacion(): boolean {
        return this.confirmarModificacion;
    };

     public finalizarPedido(): void {
        throw new Error(this.motivoNoPuedeFinalizarse);
    }
 
    public confirmarPedido(): void {
        throw new Error(this.motivoNoPuedeConfirmarse);
    }
}