import { Producto } from "./producto";
import { TipoEstacion } from "./TipoEstacion";

/**
 * Clase concreta que representa un producto individual del menú.
 */
export class ProductoUnico extends Producto {
    private precioBase: number;
    private tipoEstacion: TipoEstacion;

    /**
     * Crea una instancia de producto único.
     * @param precioBase = El precio base del producto.
     * @param tipoEstacion = El tipo de estación que prepara el producto.
     * @param nombre = El nombre del Producto.
     */
    public constructor(precioBase: number, tipoEstacion: TipoEstacion, nombre: string = "Producto") {
        super(nombre);
        this.precioBase = precioBase;
        this.tipoEstacion = tipoEstacion;
    }

    /**
     * Obtiene el precio base del producto.
     * @returns El precio unitario.
     */
    public calcularPrecio(): number {
        return this.precioBase;
    }
   
    /**
     * Obtiene el tipo de estación de cocina que elaborar este producto.
     * @returns El tipo de estación.
     */
    public estacionDeCocina(): TipoEstacion {
        return this.tipoEstacion;
    }

    /**
     * Devuelve un arreglo que contiene únicamente a esta instancia.
     * @returns Arreglo con this.
     */
    public productosDeCocina(): ProductoUnico[] {
        return [this];
    }
}
