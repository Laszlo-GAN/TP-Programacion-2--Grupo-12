import { Pedido } from "./pedido";

export class PedidoEnvio extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    constructor(id: string, fechaHora: Date, direccion: string, costoEnvio: number) {
        super(id, fechaHora);
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    public DatosDelPedido(): void {
       
    }
}