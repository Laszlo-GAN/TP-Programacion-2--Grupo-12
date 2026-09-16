export abstract class Producto {
    private nombre: string;
    private categoria: string;
    private precioBase: number;
    constructor(){
        this.nombre = "";
        this.categoria = "";
        this.precioBase = 0;
    }
    public abstract precioConBeneficio(): number;
    public abstract estacionDeCocina(): string;
    public abstract beneficio(): number;
}