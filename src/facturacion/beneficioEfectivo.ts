import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { MedioDePago } from "./MedioDePago";

const PORCENTAJE_TOTAL = 100;

/**
 * Estrategia de beneficio que otorga un descuento porcentual cuando el pedido se abona en efectivo.
 */
export class BeneficioEfectivo implements EstrategiaBeneficio {
    private medioQueAplica: MedioDePago;
    private porcentaje: number;
 
    /**
     * Inicializa el beneficio para pagos en efectivo con el porcentaje indicado.
     * @param porcentaje = Porcentaje de descuento a aplicar.
     */
    public constructor(porcentaje: number) {
        this.medioQueAplica = MedioDePago.EFECTIVO;
        this.porcentaje = porcentaje;
    }

    /**
     * Verifica si el medio de pago utilizado es efectivo.
     * @param medioDePago = Medio de pago a evaluar.
     * @returns true si el medio de pago es MedioDePago.EFECTIVO.
     */
    public tieneBeneficio(medioDePago: MedioDePago): boolean {
        return medioDePago === this.medioQueAplica;
    }

    /**
     * Calcula el monto a descontar aplicando el porcentaje.
     * @param total = Subtotal del pedido.
     * @returns El monto de descuento calculado.
     */
    public beneficio(total: number): number {
        return total * this.porcentaje / PORCENTAJE_TOTAL;
    }
}