import { EstadoItem } from "../estacion/estadoItem";
import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";
import { AgregarItem } from "./agregarItem";
import { QuitarItem } from "./quitarItem";

export abstract class Pedido {
    private codigo: string;
    private fechaHora: Date;
    private estadoItem: EstadoItem;
    private items: ItemPedido[];
    private historial: Acciones[];

    public constructor(codigo: string, fechaHora: Date) {
        this.codigo = codigo;
        this.fechaHora = fechaHora;
        this.estadoItem = EstadoItem.PENDIENTE;
        this.items = [];
        this.historial = [];
    }

    // Cada tipo de pedido (salón, envío) arma sus propios datos
    public abstract datosDelPedido(): string;

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
        const accion = new AgregarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }

    public quitarItem(item: ItemPedido): void {
        const accion = new QuitarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }

    public deshacerUltimaModificacion(): void {
        const ultima = this.historial.pop();
        if (ultima === undefined) {
            return; // no hay nada para deshacer
        }
        ultima.deshacer();
    }

    // Se puede facturar solo si TODOS los ítems están listos
    public puedeFacturarse(): boolean {
        for (const item of this.items) {
            if (item.getEstado() !== EstadoItem.LISTO) {
                return false;
            }
        }
        return true;
    }

    public calcularTotalProductos(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.getProducto().precioConBeneficio() * item.getCantidad();
        }
        return total;
    }
}
