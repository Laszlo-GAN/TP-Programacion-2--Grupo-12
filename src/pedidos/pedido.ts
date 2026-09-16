import { EstadoPedido } from "./estadoPedido";
import { Dias } from "./dia";
let dia: Dias;
export abstract class Pedido {
    private id: string;
    private fechaHora: number;
    private estado: boolean;
    private total: number;
    
    constructor(){
        this.id = "";
        this.fechaHora = 0;
        this.estado = false;
        this.total = 0;
    }

    public getID(){
        return this.id
    }

    public getFechaHora(){
        return this.fechaHora
    }

    public getEstado(){
        return this.estado
    }

    public abstract DatosDelPedido(): void;

    public abstract agregarProducto(): void 

    public abstract quitarProducto(): void 

    public deshacerUltimaModificacion(): void {

    }
    public puedeFacturarse(): boolean {
        return this.estado;
    }
    public calcularTotalProductos(): number {
        return 0;
    }
    public descuento(): number{
        if(pago === "Efectivo"){
            
        }
    }
    public descuentoDiario(dia: Dias): number {
        if((dia === Sabado) || (dia === "Domingo")){
            this.total / 0.5;
            return this.total;
        }
    }
}