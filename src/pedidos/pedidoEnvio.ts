import { EstadoEstacion } from "../estacion/estadoEstacion";
import { Pedido } from "./pedido";
import { TipoEstacion } from "./TipoEstacion";

export class PedidoEnvio extends Pedido {
    private direccion: string;
    private costoEnvio: number;

    constructor(id: string, fechaHora: Date, estado: EstadoEstacion, tipoEstacion: TipoEstacion){
        super(id, fechaHora, estado, tipoEstacion);
        this.direccion = "";
        this.costoEnvio = 0;
    }

    public DatosDelPedido(): string {
            return "";
    }
}