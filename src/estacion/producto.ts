import { ProductoUnico } from "./productoUnico";

export abstract class Producto {
    private nombre: string;
    private categoria: string;

    public constructor() {
        this.nombre = "";
        this.categoria = "";
    }

   
    public abstract calcularPrecio(): number;

    
    public abstract productosDeCocina(): ProductoUnico[];
}
