import { BeneficioCombo } from "./beneficioCombo";

const SIN_DESCUENTO = 0;
const PORCENTAJE_TOTAL = 100;

/**
 * Estrategia de beneficio para combos que aplica un descuento porcentual
 * sobre la suma de los precios individuales de sus productos.
 */
export class DescuentoPorcentual implements BeneficioCombo {
    private porcentaje: number;

    /**
     * Crea una instancia de descuento porcentual validando que el valor
     * se encuentre dentro del rango permitido.
     * Lanza un error si el porcentaje es menor a 0 o mayor a 100.
     * @param porcentaje - Porcentaje de descuento a descontar del total del combo.
     */
    public constructor(porcentaje: number) {
        if (porcentaje < SIN_DESCUENTO || porcentaje > PORCENTAJE_TOTAL) {
            throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
        }
        this.porcentaje = porcentaje;
    }

    /**
     * Calcula el precio final del combo restando el porcentaje de descuento
     * a la suma de los productos.
     * @param sumaProductos - Sumatoria de los precios individuales de los productos del combo.
     * @returns El monto final a cobrar tras aplicar el descuento.
     */
    public calcularPrecio(sumaProductos: number): number {
        const descuento = sumaProductos * this.porcentaje / PORCENTAJE_TOTAL;
        return sumaProductos - descuento;
    }
}