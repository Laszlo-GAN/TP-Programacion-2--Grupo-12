import { Pedido } from "./pedido";

export class PedidoRetirar extends Pedido {
    private horarioRetiro: Date;

    public constructor(codigo: string, fechaHora: Date, horarioRetiro: Date) {
        super(codigo, fechaHora);
        this.horarioRetiro = horarioRetiro;
    }

    public datosDelPedido(): string {
        return `Su Pedido estara listo a las ${this.horarioRetiro.toLocaleTimeString()} hs, gracias por su compra.`;
    }
}