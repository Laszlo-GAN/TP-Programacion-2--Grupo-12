import { Estacion } from "../estacion";
import EstacionLibre from "./estacionLibre";
import { EstadoEstacion } from "./estadoEstacion";

export default class EstacionOcupada extends EstadoEstacion {
    public constructor(estacion: Estacion) {
        super(estacion);
        this.nombre = "OCUPADA";
        this.motivoNoPuedeOcuparse = "La estación ya se encuentra ocupada";
        this.motivoNoPuedeProcesar = "La estación está ocupada con otro ítem";
    }

    public liberarse(): void {
        this.estacion.cambiarEstado(new EstacionLibre(this.estacion));
    }
}