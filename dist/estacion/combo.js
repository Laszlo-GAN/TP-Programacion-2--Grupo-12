"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producto_1 = require("./producto");
const MINIMO_PRODUCTOS = 2;
class Combo extends producto_1.Producto {
    productos;
    beneficio;
    constructor(productos, beneficio) {
        super();
        if (productos.length < MINIMO_PRODUCTOS) {
            throw new Error("Un combo necesita al menos dos productos");
        }
        this.productos = [...productos];
        this.beneficio = beneficio;
    }
    calcularPrecio() {
        let suma = 0;
        for (const producto of this.productos) {
            suma += producto.calcularPrecio();
        }
        return this.beneficio.calcularPrecio(suma);
    }
    productosDeCocina() {
        const productosDeCocina = [];
        for (const producto of this.productos) {
            productosDeCocina.push(...producto.productosDeCocina());
        }
        return productosDeCocina;
    }
}
exports.default = Combo;
//# sourceMappingURL=combo.js.map