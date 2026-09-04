export abstract class Estacion {
    private nombre: string;
    private colaItems: string;

    public abstract recibirItems(): void;
    public abstract procesarSiguiente(): void;
}