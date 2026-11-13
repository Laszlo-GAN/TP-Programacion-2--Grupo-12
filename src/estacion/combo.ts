import { Producto } from "./producto";
import { ProductoUnico } from "./productoUnico";
import { BeneficioCombo } from "./beneficioCombo";

const MINIMO_PRODUCTOS = 2;

/**
 * Clase concreta que representa una agrupación de dos o más productos.
 */
export default class Combo extends Producto {
    private productos: Producto[];
    private beneficio: BeneficioCombo;
    
    /**
     * Crea una instancia de combo validando que contenga la cantidad mínima requerida de productos.
     * @param productos = Lista de productos que conforman el combo.
     * @param beneficio = Estrategia de beneficio aplicable al total del combo.
     * @param nombre = Nombre del combo.
     */
    public constructor(productos: Producto[], beneficio: BeneficioCombo, nombre: string = "Combo") {
        super(nombre);
        if (productos.length < MINIMO_PRODUCTOS) {
            throw new Error("Un combo necesita al menos dos productos");
        }
        this.productos = [...productos];
        this.beneficio = beneficio;
    }

    /**
     * Suma los precios individuales de todos los productos.
     * Aplica el beneficio configurado para obtener el precio final del combo.
     * @returns El precio final del combo tras aplicar el beneficio.
     */
    public calcularPrecio(): number {
        let suma = 0;
        for (const producto of this.productos) {
            suma += producto.calcularPrecio();
        }
        return this.beneficio.calcularPrecio(suma);
    }

    /**
     * Agrupa a todos los productos individuales que integran el combo.
     * @returns Arreglo completo de Productos Únicos contenidos en el combo.
     */
    public productosDeCocina(): ProductoUnico[] {
        const productosDeCocina: ProductoUnico[] = [];
        for (const producto of this.productos) {
            productosDeCocina.push(...producto.productosDeCocina());
        }
        return productosDeCocina;
    }
}
