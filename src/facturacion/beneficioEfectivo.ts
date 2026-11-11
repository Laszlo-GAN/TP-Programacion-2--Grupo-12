import { EstrategiaBeneficio } from "./EstrategiaBeneficio";

export class DescuentoPorcentual implements EstrategiaBeneficio {
    private porcentaje: number
   
    constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    public calcularBeneficio(precioBase: number): number {
        return precioBase * (1 - this.porcentaje / 100);
    }

    public obtenerDescripcion(): string {
        return `Descuento del ${this.porcentaje}%`;
    }
}