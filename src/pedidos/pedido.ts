import { EstadoItem } from "../estacion/estadoItem";
import { EstadoEstacion } from "../estacion/estadoEstacion";
import { TipoEstacion } from "./TipoEstacion";

export abstract class Pedido {
    private id: string;
    private fechaHora: Date;
    private estadoItem: EstadoItem;
    private tipoEstacion = TipoEstacion;

    constructor(id: string, fechaHora: Date, estado:EstadoEstacion, tipoEstaciion: TipoEstacion){
        this.id = id;
        this.fechaHora = fechaHora;
        this.estadoItem = EstadoItem.PENDIENTE;
        this.tipoEstacion = TipoEstacion;
    }
    public getEstadoItem(): EstadoItem{
        return this.estadoItem;
    }
    public enPreparacion(): void{
        this.estadoItem = EstadoItem.EN_PREPARACION;
    }
    public enListo(): void{
        this.estadoItem = EstadoItem.LISTO;
    }
    public getTipoEstacion(): TipoEstacion{
        return this.tipoEstacion;
    }
    public abstract DatosDelPedido(): string;
    public agregarProducto(): void {}
    public quitarProducto(): void {}
    public deshacerUltimaModificacion(): void {    }
    public puedeFacturarse(): boolean {
        return true;
    }
    public calcularTotalProductos(): number {
        return 0;
    }
}

