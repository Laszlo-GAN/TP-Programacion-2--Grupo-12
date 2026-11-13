import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

/** Clase concreta que representa una Estación de Cocina que prepara ensaladas */
export class CocinaFria extends Estacion {
    /**
     * Inicializa una Cocina Fria
     * @param nombre = Nombre de la Estación
     */
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.COCINA_FRIA);
    }
}