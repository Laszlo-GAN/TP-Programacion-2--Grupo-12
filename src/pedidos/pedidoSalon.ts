import { Pedido } from "./pedido";
import { Mesa } from "../estacion/Mesa";

export class PedidoSalon extends Pedido {
    private mesa: Mesa;
    private lugares: number;
    private mozo: string;

    constructor(id: string, fechaHora: Date, mesa: Mesa, lugares: number, mozo: string) {
        super(id, fechaHora);
        this.mesa = mesa;
        this.lugares = lugares;
        this.mozo = mozo;
    }

    public DatosDelPedido(): void {
     
    }
}