import { EstadoPedido } from "./estadoPedido";
export abstract class Pedido {
    private id: string;
    private fechaHora: Date;
    private estado: EstadoPedido;
    public abstract DatosDelPedido(): string;
    public agregarProducto(): void {

    }
    public quitarProducto(): void {

    }
    public deshacerUltimaModificacion(): void {

    }
    public puedeFacturarse(): boolean {
        return true;
    }
    public calcularTotalProductos(): number {
        return 0;
    }
}