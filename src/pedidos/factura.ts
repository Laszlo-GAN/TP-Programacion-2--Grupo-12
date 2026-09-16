import { Pedido } from "./pedido";
export class Factura {
    private medioDePago: string;
    private fecha: number;
    private totalAPagar: number;
    private tieneBeneficio: boolean;
    // private pedido: Pedido;
    constructor(){
        this.medioDePago = "";
        this.fecha = 0;
        this.totalAPagar = 0;
        this.tieneBeneficio = false;
    }
}
// constructor(medioDePago: string, fecha: Date, totalAPagar: number, pedido: Pedido, tieneBeneficio: boolean)
// constructor(medioDePago?: string, fecha?: Date, totalAPagar?: number, pedido?: Pedido, tieneBeneficio?: boolean){
//     this.medioDePago = medioDePago ?? "";
//     this.fecha = fecha ?? 
//     this.totalAPagar = totalAPagar ?? 0;
//     this.tieneBeneficio = tieneBeneficio ?? false;
//     this.pedido = pedido ?? 
// }