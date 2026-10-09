import { BeneficioCombo } from "./beneficioCombo";


export class PrecioFijo implements BeneficioCombo {
    private precio: number;

    public constructor(precio: number) {
        this.precio = precio;
    }

    public calcularPrecio(): number {
        return this.precio;
    }
}
