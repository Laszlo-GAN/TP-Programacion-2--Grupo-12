import EstacionLibre from "./estacionLibre";
import { EstadoEstacion } from "./estadoEstacion";

export default class EstacionOcupada extends EstadoEstacion {
    public ocuparse(): void {
        return;
    }

    public liberarse(): void {
        this.estacion.cambiarEstado(new EstacionLibre(this.estacion));
    }

    public procesarSiguiente(): void {
        return;
    }
}