import { Pedido } from "./pedido";

/**
 * Clase concreta que representa un pedido a retirar en el local.
 * @extends {Pedido}
 */
export class PedidoRetirar extends Pedido {
    private horarioRetiro: Date;

    /**
     * Crea una instancia de pedido para retirar en el local.
     * @param codigo = Código del pedido.
     * @param fechaHora = Fecha y hora de creación.
     * @param horarioRetiro = Fecha y hora de retiro.
     */
    public constructor(codigo: string, fechaHora: Date, horarioRetiro: Date) {
        super(codigo, fechaHora);
        this.horarioRetiro = horarioRetiro;
    }

    /**
     * Devuelve el horario de retiro del pedido.
     * @returns La hora de retiro formateada.
     */
    public datosDelPedido(): string {
        const horario = this.horarioRetiro.toLocaleTimeString();
        return `Retira a las ${horario} hs`;
    }
}