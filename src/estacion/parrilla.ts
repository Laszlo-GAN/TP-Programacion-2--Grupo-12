import { Estacion } from "./estacion";
import { TipoEstacion } from "./TipoEstacion";

export class Parrilla extends Estacion {
    public constructor(nombre: string) {
        super(nombre, TipoEstacion.PARRILLA);
    }
}