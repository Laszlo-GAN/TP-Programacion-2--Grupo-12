import { Estacion } from "./estacion";
import { EstadoEstacion } from "./estadoEstacion";
import { TipoEstacion } from "../pedidos/TipoEstacion";

export class CocinaDulce extends Estacion {
    public constructor(nombre: string, estado: EstadoEstacion) {
        super(nombre, TipoEstacion.COCINA_DULCE, estado);
    }
}