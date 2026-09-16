import { Producto } from "./producto";
export class ProductoUnico extends Producto {
    public precioConBeneficio(): number {
        return 0;
    }
    public estacionDeCocina(): string {
        return "";
    }
    public beneficio(): number {
        return 0;
    }
}