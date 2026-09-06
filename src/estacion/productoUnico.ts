import { Estacion } from "./estacion";
import { Producto } from "./producto";

export class ProductoUnico extends Producto {
    precioBase: number;
    estacionCocina: Estacion;
    constructor(estacion: Estacion) {
        super();
        this.precioBase = 0
        this.estacionCocina = estacion;
    }

    public precioConBeneficio(): number {
        return this.precioBase;
    }

    public estacionDeCocina(): string {
        this.estacionCocina.procesarSiguiente()
    }

    public beneficio(): number {

    }
}