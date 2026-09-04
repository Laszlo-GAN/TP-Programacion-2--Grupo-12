import { Pedido } from "./pedido";

export class PedidoSalon extends Pedido {
    private mesa: Mesa;
    private mozo: string;
    
    public datosDelPedido(): string{
        return "";
    }
}