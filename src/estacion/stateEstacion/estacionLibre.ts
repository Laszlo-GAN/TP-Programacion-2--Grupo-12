import { Estacion } from "../estacion";
import { ItemPedido } from "../itemPedido";
import EstacionOcupada from "./estacionOcupada";
import { EstadoEstacion } from "./estadoEstacion";

export default class EstacionLibre extends EstadoEstacion {
    public constructor(estacion: Estacion) {
        super(estacion);
        this.nombre = "LIBRE";
        this.disponible = true;
        this.motivoNoPuedeLiberarse = "La estación ya se encuentra disponible";
    }

    public ocuparse(): void {
        this.estacion.cambiarEstado(new EstacionOcupada(this.estacion));
    }

    public procesarSiguiente(): void {
        const siguiente: ItemPedido | undefined = this.estacion.procesarItemActual();
        if (siguiente === undefined) {
            return;
        }
        this.estacion.setItemActual(siguiente);
        siguiente.enPreparacion();
        this.ocuparse();
    }
}