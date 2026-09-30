// Un beneficio dice cuánto se descuenta de un precio base
export interface Beneficio {
    calcularBeneficio(precioBase: number): number;
}
