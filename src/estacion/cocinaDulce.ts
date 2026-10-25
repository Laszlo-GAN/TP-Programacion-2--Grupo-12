import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

export class CocinaDulce extends Estacion {
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.COCINA_DULCE);
    }
}