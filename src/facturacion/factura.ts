
import { ItemFactura } from "./ItemFactura";
import { MedioDePago } from "./MedioDePago"

export class Factura {
    private readonly fecha: Date;
    private readonly items: ItemFactura[] = [];
    private readonly subTotal: number;
    private readonly beneficioAplicado: number;
    private readonly totalAPagar: number;
    private readonly medioDePago: MedioDePago;
    private readonly codigoPedido: string;

    public constructor (fecha: Date, items: ItemFactura[] , subTotal: number, 
        beneficioAplicado: number, totalAPagar: number, medioDePago: MedioDePago, codigoPedido: string) {
        this.fecha = fecha;
        this.items = [...items];
        this.subTotal = subTotal;
        this.beneficioAplicado = beneficioAplicado;
        this.totalAPagar = totalAPagar;
        this.medioDePago = medioDePago;
        this.codigoPedido = codigoPedido;
    }

    public getFecha(): Date {
        return new Date(this.fecha);
    }

    public getItems(): ItemFactura[] {
        return [...this.items];
    }

    public getSubTotal(): number {
        return this.subTotal;
    }

    public getTotalAPagar(): number {
        return this.totalAPagar;
    }

    public getBeneficioAplicado(): number {
        return this.beneficioAplicado;
    }

    public getMedioDePago(): MedioDePago {
        return this.medioDePago;
    }

    public getCodigoPedido(): string {
        return this.codigoPedido;
    }

}