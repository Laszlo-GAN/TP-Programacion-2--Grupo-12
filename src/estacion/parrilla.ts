import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

/**
 * Clase concreta que representa una Parrilla como Estación de Cocina.
 */
export class Parrilla extends Estacion {
    /**
     * Inicializa una Parrilla.
     * @param nombre = Nombre de la Estación.
     */
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.PARRILLA);
    }
}