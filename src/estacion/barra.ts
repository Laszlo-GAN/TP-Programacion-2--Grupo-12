import { Estacion } from "./estacion";
import { EstadoEstacion } from "./estadoEstacion";
import { TipoEstacion } from "../pedidos/TipoEstacion";

export class Barra extends Estacion {
    public constructor(nombre: string, estado: EstadoEstacion) {
        super(nombre, TipoEstacion.BARRA, estado);
    }
}