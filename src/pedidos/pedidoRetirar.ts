import { Pedido } from "./pedido";

export class PedidoRetirar extends Pedido {
    private horarioRetiro: Date;

    public constructor(codigo: string, fechaHora: Date, horarioRetiro: Date) {
        super(codigo, fechaHora);
        this.horarioRetiro = horarioRetiro;
    }

    public datosDelPedido(): string {
        const horario = this.horarioRetiro.toLocaleTimeString();
        return `Retira a las ${horario} hs`;
    }
}