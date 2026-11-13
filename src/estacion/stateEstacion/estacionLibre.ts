import { Estacion } from "../estacion";
import { ItemPedido } from "../itemPedido";
import EstacionOcupada from "./estacionOcupada";
import { EstadoEstacion } from "./estadoEstacion";

/**
 * Clase concreta que representa el Estado Libre de una Estación
 */
export default class EstacionLibre extends EstadoEstacion {
    /**
     * Inicializa el estado con con valores propios del estado.
     * @param estacion = Estación que tiene el estado.
     */
    public constructor(estacion: Estacion) {
        super(estacion);
        this.nombre = "LIBRE";
        this.disponible = true;
        this.motivoNoPuedeLiberarse = "La estación ya se encuentra disponible";
    }

    /**
     * Cambia el estado de la Estación a Ocupado
     */
    public ocuparse(): void {
        this.estacion.cambiarEstado(new EstacionOcupada(this.estacion));
    }

    /**
     * Extrae el siguiente ítem de la cola de la estación, lo asigna como ítem actual,
     * inicia su preparación y marca la estación como ocupada.
     */
    public procesarSiguiente(): void {
        const siguiente: ItemPedido | undefined = this.estacion.procesarItemActual();
        if (siguiente === undefined) {
            return;
        }
        this.estacion.setItemActual(siguiente);
        siguiente.enPreparacion();
        this.ocuparse();
    }
}