import { BeneficioCombo } from "./beneficioCombo";

/**
 * Estrategia de beneficio para combos que establece un monto fijo cerrado.
 * @implements {BeneficioCombo}
 */
export class PrecioFijo implements BeneficioCombo {
    private precio: number;

    /**
     * Inicializa el beneficio con el precio fijo determinado.
     * @param precio - Precio final cerrado del combo.
     */
    public constructor(precio: number) {
        this.precio = precio;
    }

    /**
     * Devuelve el precio fijo configurado para el combo.
     * @returns El monto fijo establecido.
     */
    public calcularPrecio(): number {
        return this.precio;
    }
}
