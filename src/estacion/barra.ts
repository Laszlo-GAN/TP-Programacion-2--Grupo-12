import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

/**
 * Clase concreta que representa una Barra como un tipo de Estación de Cocina 
 */
export class Barra extends Estacion {
    /**
     * Inicializa la Barra
     * @param nombre = El Nombre de la Estación
     */
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.BARRA);
    }
}