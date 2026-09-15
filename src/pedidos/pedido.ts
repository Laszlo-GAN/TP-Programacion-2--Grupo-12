import { EstadoPedido } from "./estadoPedido";
export abstract class Pedido {
    private id: number;
    private detalle: string;
    private fechaHora: Date;
    private estado: EstadoPedido;
    public abstract DatosDelPedido(): string;

    constructor(id:number,detalle:string,fechaHora:Date,estado:EstadoPedido,DatosDelPedido:string){
        this.id = id;
        this.detalle = detalle;
        this.fechaHora = fechaHora;
        this.estado = estado;
    }
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