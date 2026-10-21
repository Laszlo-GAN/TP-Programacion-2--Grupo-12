import { Producto } from "./producto";
import { ProductoUnico } from "./productoUnico";
import { BeneficioCombo } from "./beneficioCombo";

const MINIMO_PRODUCTOS = 2;

export default class Combo extends Producto {
    private productos: Producto[];
    private beneficio: BeneficioCombo;

    public constructor(productos: Producto[], beneficio: BeneficioCombo) {
        super();
        if (productos.length < MINIMO_PRODUCTOS) {
            throw new Error("Un combo necesita al menos dos productos");
        }
        this.productos = [...productos];
        this.beneficio = beneficio;
    }

    
    public calcularPrecio(): number {
        let suma = 0;
        for (const producto of this.productos) {
            suma += producto.calcularPrecio();
        }
        return this.beneficio.calcularPrecio(suma);
    }

    
    public productosDeCocina(): ProductoUnico[] {
        const productosDeCocina: ProductoUnico[] = [];
        for (const producto of this.productos) {
            productosDeCocina.push(...producto.productosDeCocina());
        }
        return productosDeCocina;
    }
}
