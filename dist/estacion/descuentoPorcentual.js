"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescuentoPorcentual = void 0;
const SIN_DESCUENTO = 0;
const PORCENTAJE_TOTAL = 100;
class DescuentoPorcentual {
    porcentaje;
    constructor(porcentaje) {
        if (porcentaje < SIN_DESCUENTO || porcentaje > PORCENTAJE_TOTAL) {
            throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
        }
        this.porcentaje = porcentaje;
    }
    calcularPrecio(sumaProductos) {
        const descuento = sumaProductos * this.porcentaje / PORCENTAJE_TOTAL;
        return sumaProductos - descuento;
    }
}
exports.DescuentoPorcentual = DescuentoPorcentual;
//# sourceMappingURL=descuentoPorcentual.js.map