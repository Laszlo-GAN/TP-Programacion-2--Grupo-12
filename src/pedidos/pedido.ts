import { Cocina } from "../estacion/Cocina";
import { EstadoItem } from "../estacion/estadoItem";
import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";
import { AgregarItem } from "./agregarItem";
import { EstadoPedido } from "./estadoPedido";
import { QuitarItem } from "./quitarItem";

const SIN_ITEMS = 0;

export abstract class Pedido {
    private codigo: string;
    private fechaHora: Date;
    private estado: EstadoPedido;
    private items: ItemPedido[];
    private historial: Acciones[];

    public constructor(codigo: string, fechaHora: Date) {
        this.codigo = codigo;
        this.fechaHora = fechaHora;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.items = [];
        this.historial = [];
    }

   
    public abstract datosDelPedido(): string;

    public getEstado(): EstadoPedido {
        return this.estado;
    }

    public agregarItem(item: ItemPedido): void {
        this.verificarEnConstruccion();
        const accion = new AgregarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }

    public quitarItem(item: ItemPedido): void {
        this.verificarEnConstruccion();
        if (!item.puedeModificarse()) {
            throw new Error("El ítem ya está en preparación: no se puede quitar");
        }
        const accion = new QuitarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }

    public deshacerUltimaModificacion(): void {
        this.verificarEnConstruccion();
        const ultima = this.historial.pop();
        if (ultima === undefined) {
            return; 
        }
        ultima.deshacer();
    }

    //
    public confirmar(cocina: Cocina): void {
        this.verificarEnConstruccion();
        if (this.items.length === SIN_ITEMS) {
            throw new Error("No se puede confirmar un pedido sin ítems");
        }
        for (const item of this.items) {
            cocina.enviarItem(item);
        }
        this.estado = EstadoPedido.CONFIRMADO;
    }

   
    public puedeFacturarse(): boolean {
        if (this.estado !== EstadoPedido.CONFIRMADO) {
            return false;
        }
        for (const item of this.items) {
            if (item.getEstado() !== EstadoItem.LISTO) {
                return false;
            }
        }
        return true;
    }

   
    public finalizar(): void {
        if (!this.puedeFacturarse()) {
            throw new Error("El pedido no se puede finalizar: está sin confirmar o tiene ítems sin terminar");
        }
        this.estado = EstadoPedido.FINALIZADO;
    }

    public calcularTotalProductos(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.getProducto().calcularPrecio() * item.getCantidad();
        }
        return total;
    }

   
    private verificarEnConstruccion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado: no se puede modificar");
        }
    }
}
