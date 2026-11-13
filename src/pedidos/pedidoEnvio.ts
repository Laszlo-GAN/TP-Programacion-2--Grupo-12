import { Pedido } from "./pedido";
import { ItemFactura } from "../facturacion/ItemFactura";

const UNA_UNIDAD = 1;

export class PedidoEnvio extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    public constructor(codigo: string, fechaHora: Date, direccion: string, costoEnvio: number) {
        super(codigo, fechaHora);
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    public datosDelPedido(): string {
        return `Su Pedido sera enviado a ${this.direccion}, El envio sale: $${this.costoEnvio} .gracias por su compra.`;
    }

    public override obtenerItemsParaFactura(): ItemFactura[] {
        const itemsFactura = super.obtenerItemsParaFactura();
        itemsFactura.push({
            descripcion: "Costo de envío",
            cantidad: UNA_UNIDAD,
            precioUnitario: this.costoEnvio,
            subtotal: this.costoEnvio,
        });
        return itemsFactura;
    }

    public override calcularTotal(): number {
        return this.calcularTotalProductos() + this.costoEnvio;        
    }
}