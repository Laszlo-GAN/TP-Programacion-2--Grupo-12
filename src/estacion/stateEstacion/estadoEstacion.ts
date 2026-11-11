import { Estacion } from "../estacion";

export abstract class EstadoEstacion {
    protected estacion: Estacion;

    public constructor(estacion: Estacion) {
        this.estacion = estacion;
    }

    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    public getEstacion(): Estacion {
        return this.estacion;
    }

    public abstract ocuparse(): void;
    public abstract liberarse(): void;
    public abstract procesarSiguiente(): void;
}
