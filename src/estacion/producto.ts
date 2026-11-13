import { ProductoUnico } from "./productoUnico";

/**
 * Clase abstracta que representa un producto ofrecido en el menú.
 */
export abstract class Producto {
    private nombre: string;
    private categoria: string;

    /**
     * Inicializa un Producto con categoria por defecto.
     * @param nombre = Nombre del producto.
     */
    public constructor(nombre: string) {
        this.nombre = nombre;
        this.categoria = "";
    }

    /**
     * Obtiene el nombre del producto
     * @returns El nombre del producto
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Método a implementar por sus sublcases para calcular su precio.
     */
    public abstract calcularPrecio(): number;
    
    /**
     * Método a implementar por sus subclases para determinar un Producto Único.
     */
    public abstract productosDeCocina(): ProductoUnico[];
}