import { Estacion } from "../estacion";
import EstacionLibre from "./estacionLibre";
import { EstadoEstacion } from "./estadoEstacion";

/**
 * Clase concreta que representa el Estado Ocupado de una Estación
 */
export default class EstacionOcupada extends EstadoEstacion {
    /**
     * Inicializa el estado con con valores propios del estado.
     * @param estacion = Estación que tiene el estado.
     */
    public constructor(estacion: Estacion) {
        super(estacion);
        this.nombre = "OCUPADA";
        this.motivoNoPuedeOcuparse = "La estación ya se encuentra ocupada";
        this.motivoNoPuedeProcesar = "La estación está ocupada con otro ítem";
    }

    /**
     * Cambia el estado de la Estación a Libre
     */
    public liberarse(): void {
        this.estacion.cambiarEstado(new EstacionLibre(this.estacion));
    }
}