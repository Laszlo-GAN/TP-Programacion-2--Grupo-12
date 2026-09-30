import { EstadoItem } from "../estacion/estadoItem";
import { ItemPedido } from "../estacion/itemPedido";

export abstract class Pedido {
    private id: string;
    private fechaHora: Date;
    private estadoItem: EstadoItem;
    private items: ItemPedido[];

    constructor(id: string, fechaHora: Date) {
        this.id = id;
        this.fechaHora = fechaHora;
        this.estadoItem = EstadoItem.PENDIENTE;
        this.items = [];
    }

    public abstract DatosDelPedido(): void;

    public getEstadoItem(): EstadoItem {
        return this.estadoItem;
    }

    public enPreparacion(): void {
        this.estadoItem = EstadoItem.EN_PREPARACION;
    }

    public enListo(): void {
        this.estadoItem = EstadoItem.LISTO;
    }

    public agregarItem(item: ItemPedido): void {
        this.items.push(item);
    }

    public quitarItem(item: ItemPedido): void {
        const posicion = this.items.indexOf(item);
        if (posicion === -1) {
            return;
        }
        this.items.splice(posicion, 1);
    }

    public puedeFacturarse(): boolean {
        for (const item of this.items) {
            if (item.getEstado() !== EstadoItem.LISTO) {
                return false;
            }
        }
        return true;
    }

    public calcularTotalProductos(): number {
        return 0;
    }

    public deshacerUltimaModificacion(): void {}
}

