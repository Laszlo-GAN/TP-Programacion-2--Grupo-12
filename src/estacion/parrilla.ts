import { Estacion } from "./estacion";
import { EstadoEstacion } from "./estadoEstacion";
import { TipoEstacion } from "./TipoEstacion";

export class Parrilla extends Estacion {
    public constructor(nombre: string, estado: EstadoEstacion) {
        super(nombre, TipoEstacion.PARRILLA, estado);
    }
}