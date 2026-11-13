import { ProductoUnico } from "./productoUnico";

export abstract class Producto {
    private nombre: string;
    private categoria: string;

    public constructor(nombre: string) {
        this.nombre = nombre;
        this.categoria = "";
    }

    public getNombre(): string {
        return this.nombre;
    }
    public abstract calcularPrecio(): number;
    
    public abstract productosDeCocina(): ProductoUnico[];
}