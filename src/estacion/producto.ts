export abstract class Producto {
    private nombre: string;
    private categoria: string;
    abstract precioBase: number;

    constructor(){
        this.nombre = "";
        this.categoria = "";
    }

    public abstract precioConBeneficio(): number;
    public abstract estacionDeCocina(): string;
    public abstract beneficio(): number;
}