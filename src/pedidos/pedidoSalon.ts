import { Pedido } from "./pedido";
import { Mesa } from "./Mesa";

export class PedidoSalon extends Pedido {
    private mesa: Mesa;
    private lugares: number;
    private mozo: string;

    public constructor(codigo: string, fechaHora: Date, mesa: Mesa, lugares: number, mozo: string) {
        super(codigo, fechaHora);
        this.mesa = mesa;
        this.lugares = lugares;
        this.mozo = mozo;
    }

    public datosDelPedido(): string {
        return `Mesa ${this.mesa.getNumero()} (${this.lugares} lugares) - Mozo: ${this.mozo}`;
    }
}
