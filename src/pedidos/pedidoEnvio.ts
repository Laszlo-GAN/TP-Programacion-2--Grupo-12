import { Pedido } from "./pedido";

export class PedidoEnvio extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    public constructor(codigo: string, fechaHora: Date, direccion: string, costoEnvio: number) {
        super(codigo, fechaHora);
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    public datosDelPedido(): string {
        return `Envío a ${this.direccion} (costo de envío: $${this.costoEnvio})`;
    }
}
