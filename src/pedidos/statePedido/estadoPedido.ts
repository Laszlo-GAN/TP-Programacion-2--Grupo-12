import { Pedido } from "../pedido";

export abstract class EstadoPedido {
    protected pedido: Pedido;
    protected confirmarFacturacion: boolean;
    protected confirmarModificacion: boolean;

    public constructor(pedido: Pedido) {
        this.pedido = pedido;
        this.confirmarFacturacion = false
        this.confirmarModificacion = false;
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

    public abstract finalizarPedido(): void;

    public abstract confirmarPedido(): void;
}