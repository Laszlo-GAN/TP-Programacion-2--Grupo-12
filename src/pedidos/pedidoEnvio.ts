import { Pedido } from "./pedido";
export class PedidoEnvio extends Pedido {
    private direccion: string;
    private costoEnvio: number;
    constructor(){
        this.direccion = "";
        this.costoEnvio = 0;
    }
    public DatosDelPedido(): string {
            return "";
        }
    }
}