import { Estacion } from "../estacion";

export abstract class EstadoEstacion {
    protected estacion: Estacion;
    protected nombre: string;
    protected disponible: boolean;
    protected motivoNoPuedeOcuparse: string;
    protected motivoNoPuedeLiberarse: string;
    protected motivoNoPuedeProcesar: string;
    
    public constructor(estacion: Estacion) {
        this.estacion = estacion;
        this.nombre = "";
        this.disponible = false;
        this.motivoNoPuedeOcuparse = "La estacion no esta Libre, no se puede ocupar";
        this.motivoNoPuedeLiberarse = "La estacion esta Procesando un pedido, no se puede liberar";
        this.motivoNoPuedeProcesar = "La estacion esta Libre, no se puede proceser";
    }

    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    public getEstacion(): Estacion {
        return this.estacion;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public estaDisponible(): boolean {
        return this.disponible;
    }

   public ocuparse(): void {
        throw new Error(this.motivoNoPuedeOcuparse);
    }

    public liberarse(): void {
        throw new Error(this.motivoNoPuedeLiberarse);
    }

    public procesarSiguiente(): void {
        throw new Error(this.motivoNoPuedeProcesar);
    }
}
