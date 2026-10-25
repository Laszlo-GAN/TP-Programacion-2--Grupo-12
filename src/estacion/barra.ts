import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

export class Barra extends Estacion {
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.BARRA);
    }
}