import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

export class CocinaFria extends Estacion {
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.COCINA_FRIA);
    }
}