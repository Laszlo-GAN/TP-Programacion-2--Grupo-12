import { Pedido } from "./pedido";
import { Mesa } from "./Mesa";

/**
 * Clase concreta que representa un pedido para comer dentro del local.
 * @extends {Pedido}
 */
export class PedidoSalon extends Pedido {
    private mesa: Mesa;
    private lugares: number;
    private mozo: string;

    /**
     * Crea una instancia de pedido en salón.
     * @param codigo = Código del pedido.
     * @param fechaHora = Fecha y hora de creación.
     * @param mesa = Instancia de Mesa asignada.
     * @param lugares = Cantidad personas en la mesa.
     * @param mozo = Nombre del mozo.
     */
    public constructor(codigo: string, fechaHora: Date, mesa: Mesa, lugares: number, mozo: string) {
        super(codigo, fechaHora);
        this.mesa = mesa;
        this.lugares = lugares;
        this.mozo = mozo;
    }

    /**
     * Devuelve los datos de ubicación y atención del pedido en el salón.
     * @returns El número de mesa, cantidad de lugares y mozo.
     */
    public datosDelPedido(): string {
        return `Mesa ${this.mesa.getNumero()} (${this.lugares} lugares) - Mozo: ${this.mozo}`;
    }
}
