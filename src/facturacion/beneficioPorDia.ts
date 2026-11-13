import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { DiaDeLaSemana } from "./DiaDeLaSemana";

const PORCENTAJE_TOTAL = 100;

/**
 * Estrategia de beneficio que otorga un descuento porcentual en un día
 * específico de la semana.
 */
export class BeneficioPorDia implements EstrategiaBeneficio {
    private diaDeLaSemana: DiaDeLaSemana;
    private porcentaje: number;

    /**
     * Inicializa el beneficio asociandolo a un día de la semana y un porcentaje de descuento.
     * @param diaDeLaSemana = Día de la semana en que aplica el descuento.
     * @param procentaje = Porcentaje de descuento a aplicar.
     */
    public constructor (diaDeLaSemana: DiaDeLaSemana, procentaje: number) {
        this.diaDeLaSemana = diaDeLaSemana;
        this.porcentaje = procentaje;
    }

    /**
     * Verifica si el día de la semana de la fecha proporcionada coincide con el configurado.
     * @param _medioDePago = Medio de pago (no utilizado en esta estrategia).
     * @param fecha = Fecha de facturación a evaluar.
     * @returns true si el día corresponde al día promocional, false si no se cumple la condicion.
     */
    public tieneBeneficio(_medioDePago: unknown, fecha: Date): boolean {
        return fecha.getDay() === this.diaDeLaSemana;
    }

    /**
     * Calcula el monto a descontar aplicando el porcentaje configurado sobre el total.
     * @param total = Subtotal del pedido.
     * @returns El monto de descuento calculado.
     */
    public beneficio(total: number): number {
        return total * this.porcentaje / PORCENTAJE_TOTAL;
    }
}