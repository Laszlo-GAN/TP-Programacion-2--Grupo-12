import { Producto } from "./producto";
import { TipoEstacion } from "../pedidos/TipoEstacion";

export default class Combo extends Producto {
    public constructor(precioBase: number) {
        super(precioBase);
    }

    public precioConBeneficio(): number {
        return this.precioBase - this.beneficio();
    }

    // Pendiente: un combo tiene productos que van a estaciones distintas
    public estacionDeCocina(): TipoEstacion {
        throw new Error("Combo: falta definir a qué estación va");
    }
}
