import { Producto } from "./producto";
import { TipoEstacion } from "../pedidos/TipoEstacion";

export class ProductoUnico extends Producto {
    private tipoEstacion: TipoEstacion;

    public constructor(precioBase: number, tipoEstacion: TipoEstacion) {
        super(precioBase);
        this.tipoEstacion = tipoEstacion;
    }

    public precioConBeneficio(): number {
        return this.precioBase - this.beneficio();
    }

    public estacionDeCocina(): TipoEstacion {
        return this.tipoEstacion;
    }
}
