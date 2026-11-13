import { MedioDePago } from "./MedioDePago";

/**
 * Define la interfaz para las estrategias de descuentos aplicables
 * durante la facturación de un pedido.
 */
export interface EstrategiaBeneficio {
    /**
     * Evalúa si el beneficio cumple las condiciones para aplicarse según el medio de pago y la fecha.
     * @param medioDePago = Medio de pago seleccionado por el cliente.
     * @param fecha = Fecha en la que se realiza la facturación.
     * @returns devuelve true si el beneficio es aplicable, falso si no se puede aplicar.
     */
    tieneBeneficio(medioDePago: MedioDePago, fecha: Date): boolean;

    /**
     * Calcula el monto de dinero a descontar.
     * @param total = Monto sobre el cual se calcula el beneficio.
     * @returns El descuento obtenido.
     */
    beneficio(total: number): number;
}
