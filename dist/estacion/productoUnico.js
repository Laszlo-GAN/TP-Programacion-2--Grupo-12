"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoUnico = void 0;
const producto_1 = require("./producto");
class ProductoUnico extends producto_1.Producto {
    precioBase;
    tipoEstacion;
    constructor(precioBase, tipoEstacion) {
        super();
        this.precioBase = precioBase;
        this.tipoEstacion = tipoEstacion;
    }
    calcularPrecio() {
        return this.precioBase;
    }
    estacionDeCocina() {
        return this.tipoEstacion;
    }
    productosDeCocina() {
        return [this];
    }
}
exports.ProductoUnico = ProductoUnico;
//# sourceMappingURL=productoUnico.js.map