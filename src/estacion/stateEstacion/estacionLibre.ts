import { ItemPedido } from "../itemPedido";
import EstacionOcupada from "./estacionOcupada";
import { EstadoEstacion } from "./estadoEstacion";

export default class EstacionLibre extends EstadoEstacion {
    public ocuparse(): void {
        this.estacion.cambiarEstado(new EstacionOcupada(this.estacion));
    }

    public liberarse(): void {
        throw new Error("La estación ya se encuentra disponible");
    }

    public procesarSiguiente(): void {
        const siguiente: ItemPedido | undefined = this.estacion.procesarItemActual();
        if (siguiente === undefined) {
            return; 
        }
        this.estacion.setItemActual(siguiente);
        siguiente.enPreparacion();
    }
}