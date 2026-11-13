import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

/**
 * Clase concreta que representa una Estación de Cocina que prepara comidas dulces.
 */
export class CocinaDulce extends Estacion {
    /**
     * Inicializa una Cocina que prepara comidas dulces.
     * @param nombre = El nombre de la estación.
     */
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.COCINA_DULCE);
    }
}