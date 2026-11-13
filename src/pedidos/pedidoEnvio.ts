import { Pedido } from "./pedido";
import { ItemFactura } from "../facturacion/ItemFactura";

const UNA_UNIDAD = 1;

/**
 * Clase concreta que representa un pedido con entrega a domicilio.
 * @extends {Pedido}
 */
export class PedidoEnvio extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    /**
     * Crea una instancia de pedido para envio a domicilio.
     * @param codigo = Código del pedido.
     * @param fechaHora = Fecha y hora de creación.
     * @param direccion = Dirección del envio.
     * @param costoEnvio = Costo por envio.
     */
    public constructor(codigo: string, fechaHora: Date, direccion: string, costoEnvio: number) {
        super(codigo, fechaHora);
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    /**
     * Devuelve los datos del pedido.
     * @returns String con información del envío.
     */
    public datosDelPedido(): string {
        return `Su Pedido sera enviado a ${this.direccion}, El envio sale: $${this.costoEnvio}, ¡Gracias por su compra!`;
    }

    /**
     * Obtiene los ítems del pedido y agrega el costo de envío.
     * @returns Arreglo de ItemFactura incluyendo el concepto de envío.
     */
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

    /**
     * Calcula el total del pedido.
     * @returns Costo total del pedido con envío incluido.
     */
    public override calcularTotal(): number {
        return this.calcularTotalProductos() + this.costoEnvio;        
    }
}