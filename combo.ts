import { Producto } from "./producto";

export default class Combo extends Producto {
    precioBase: number;
    constructor() {
        super();
        this.precioBase = 0;
    }

    public precioConBeneficio(): number {
        let beneficio = this.beneficio();
        return this.precioBase - beneficio;
    }

    public estacionDeCocina(): string {

    }

    public beneficio(): number {

    }
}