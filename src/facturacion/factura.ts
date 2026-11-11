
import { ItemFactura } from "./ItemFactura";
import { MedioDePago } from "./MedioDePago"

export class Factura {
    private readonly fecha: Date;
    private readonly items: ItemFactura[] = [];
    private readonly subTotal: number;
    private readonly beneficioAplicado: number;
    private readonly totalAPagar: number;
    private readonly medioDePago: MedioDePago | undefined;
    private readonly codigoPedido: string | undefined;

    constructor (fecha: Date, items: ItemFactura[] , subTotal: number, beneficioAplicado: number, totalAPagar: number, medioDePago: MedioDePago, codigoPedido: string){
        this.fecha = fecha;
        this.items = items;
        this.subTotal = subTotal;
        this.beneficioAplicado = beneficioAplicado;
        this.totalAPagar = totalAPagar;
        this.medioDePago = medioDePago;
        this.codigoPedido = codigoPedido;
    }

}

