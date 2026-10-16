import { BeneficioCombo } from "./beneficioCombo";

const SIN_DESCUENTO = 0;
const PORCENTAJE_TOTAL = 100;


export class DescuentoPorcentual implements BeneficioCombo {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        if (porcentaje < SIN_DESCUENTO || porcentaje > PORCENTAJE_TOTAL) {
            throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
        }
        this.porcentaje = porcentaje;
    }

    public calcularPrecio(sumaProductos: number): number {
        const descuento = sumaProductos * this.porcentaje / PORCENTAJE_TOTAL;
        return sumaProductos - descuento;
    }
}
