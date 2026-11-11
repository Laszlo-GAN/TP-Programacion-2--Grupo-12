
export interface EstrategiaBeneficio {
    aplicarDescuento(subtotalBruto: number): number;
    calcularBeneficio(precioBase: number): number;
    obtenerDescripcion(): string;
}
