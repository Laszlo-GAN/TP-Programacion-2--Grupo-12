
import { ItemFactura } from "./ItemFactura";
import { MedioDePago } from "./MedioDePago"

/**
 * Representa el comprobante generado tras la facturación de un pedido.
 */
export class Factura {
    private readonly fecha: Date;
    private readonly items: ItemFactura[] = [];
    private readonly subTotal: number;
    private readonly beneficioAplicado: number;
    private readonly totalAPagar: number;
    private readonly medioDePago: MedioDePago;
    private readonly codigoPedido: string;

    /**
     * Crea una nueva instancia de factura.
     * @param fecha = Fecha del comprobante.
     * @param items = Items facturados.
     * @param subTotal = Costo sin descuentos.
     * @param beneficioAplicado = Monto del descuento.
     * @param totalAPagar = Costo toal a pagar.
     * @param medioDePago = Medio de pago utilizado.
     * @param codigoPedido = Código del pedido facturado.
     */
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

    /**
     * Obtiene la fecha de emisión de la factura.
     * @returns Nueva instancia de Date con la fecha de emisión.
     */
    public getFecha(): Date {
        return new Date(this.fecha);
    }

    /**
     * Obtiene un listado de los items de la factura.
     * @returns Arreglo de ItemFactura.
     */
    public getItems(): ItemFactura[] {
        return [...this.items];
    }

    /**
     * Obtiene el subtotal de la factura sin descuentos.
     * @returns El monto subtotal.
     */
    public getSubTotal(): number {
        return this.subTotal;
    }

    /**
     * Obtiene el monto final a pagar tras aplicar el beneficio.
     * @returns El monto final a pagar.
     */
    public getTotalAPagar(): number {
        return this.totalAPagar;
    }

    /**
     * Obtiene el total descontado por beneficios.
     * @returns El descuento aplicado.
     */
    public getBeneficioAplicado(): number {
        return this.beneficioAplicado;
    }

    /**
     * Obtiene el medio de pago.
     * @returns El medio de pago utilizado.
     */
    public getMedioDePago(): MedioDePago {
        return this.medioDePago;
    }

    /**
     * Obtiene el código del pedido.
     * @returns Código del pedido.
     */
    public getCodigoPedido(): string {
        return this.codigoPedido;
    }

}