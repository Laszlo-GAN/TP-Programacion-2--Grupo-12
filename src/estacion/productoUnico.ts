import { Producto } from "./producto";
import { TipoEstacion } from "./TipoEstacion";

export class ProductoUnico extends Producto {
    private precioBase: number;
    private tipoEstacion: TipoEstacion;

    public constructor(precioBase: number, tipoEstacion: TipoEstacion) {
        super();
        this.precioBase = precioBase;
        this.tipoEstacion = tipoEstacion;
    }

    public calcularPrecio(): number {
        return this.precioBase;
    }

   
    public estacionDeCocina(): TipoEstacion {
        return this.tipoEstacion;
    }

    
    public productosDeCocina(): ProductoUnico[] {
        return [this];
    }
}
