import { Estacion } from "../estacion";

/**
 * Clase abstracta que define el comportamiento por defecto de los distintos estados de una Estación
 */
export abstract class EstadoEstacion {
    protected estacion: Estacion;
    protected nombre: string;
    protected disponible: boolean;
    protected motivoNoPuedeOcuparse: string;
    protected motivoNoPuedeLiberarse: string;
    protected motivoNoPuedeProcesar: string;
    
    /**
     * Inicializa el estado con valores por defecto.
     * @param estacion = Estación que tiene el estado.
     */
    public constructor(estacion: Estacion) {
        this.estacion = estacion;
        this.nombre = "";
        this.disponible = false;
        this.motivoNoPuedeOcuparse = "La estacion no esta Libre, no se puede ocupar";
        this.motivoNoPuedeLiberarse = "La estacion esta Procesando un pedido, no se puede liberar";
        this.motivoNoPuedeProcesar = "La estacion esta Libre, no se puede procesar";
    }

    /**
     * Se encarga de asignarle una Estación al Estado
     * @param estacion Estación asignada.
     */
    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    /**
     * Devuelve la instancia de la Estación
     * @returns = Instancia de Estación
     */
    public getEstacion(): Estacion {
        return this.estacion;
    }

    /**
     * Devuelve el nombre del Estado Actual
     * @returns = Nombre del Estado
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Indica si la estación se encuentra disponible para tomar un nuevo ítem.
     * @returns si la estación esta disponible devuelve true, si esta ocupada devuelve false.
     * Por defecto retorna falso
     */
    public estaDisponible(): boolean {
        return this.disponible;
    }

    /**
     * Transiciona la estación al estado Ocupado.
     * Por defecto, arroja un error al intentar pasar al estado Ocupado.
     */
    public ocuparse(): void {
        throw new Error(this.motivoNoPuedeOcuparse);
    }

    /**
     * Transiciona la estación al estado Libre.
     * Por defecto, arroja un error al intentar pasar al estado Libre.
     */
    public liberarse(): void {
        throw new Error(this.motivoNoPuedeLiberarse);
    }

    /**
     * Toma y comienza a preparar el siguiente ítem en la cola de la estación.
     * Por defecto, arroja un error y delega funcionalidad a subclases. 
     */
    public procesarSiguiente(): void {
        throw new Error(this.motivoNoPuedeProcesar);
    }
}
