import { Cocina } from "../estacion/Cocina";
import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";
import { AgregarItem } from "./agregarItem";
import { EstadoPedido } from "./statePedido/estadoPedido";
import { QuitarItem } from "./quitarItem";
import PedidoEnConstruccion from "./statePedido/pedidoEnConstruccion";
import { ItemFactura } from "../facturacion/ItemFactura";

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
        this.estado = new PedidoEnConstruccion(this);
        this.items = [];
        this.historial = [];
    }
   
    public abstract datosDelPedido(): string;

    public getCodigo(): string {
        return this.codigo;
    }

    public getEstado(): EstadoPedido {
        return this.estado;
    }

    public cambiarEstado(estado: EstadoPedido): void {
        this.estado = estado;
        this.estado.setPedido(this)
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

    public confirmar(cocina: Cocina): void {
        this.verificarEnConstruccion();
        
        if (this.items.length === SIN_ITEMS) {
            throw new Error("No se puede confirmar un pedido sin ítems");
        }
        this.verificarQueLaCocinaPuedeRecibirTodo(cocina);

        for (const item of this.items) {
            cocina.enviarItem(item);
        }
        this.estado.confirmarPedido();
    }
   
    public puedeFacturarse(): boolean {
        if (!this.estado.getConfirmarFacturacion()) {
            return false;
        }
        for (const item of this.items) {
            if (!item.getEstado().getEstaListo()) {
                return false;
            }
        }
        return true;
    }

    public finalizar(): void {
        if (!this.puedeFacturarse()) {
            throw new Error("El pedido no se puede finalizar: está sin confirmar o tiene ítems sin terminar");
        }
        this.estado.finalizarPedido();
    }

    public calcularTotalProductos(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.getProducto().calcularPrecio() * item.getCantidad();
        }
        return total;
    }

    public calcularTotal(): number {
        return this.calcularTotalProductos();
    }
    
    public obtenerItemsParaFactura(): ItemFactura[] {
        const itemsFactura: ItemFactura[] = [];
        for (const item of this.items) {
            const producto = item.getProducto();
            const precioUnitario = producto.calcularPrecio();
            itemsFactura.push({
                descripcion: producto.getNombre(),
                cantidad: item.getCantidad(),
                precioUnitario: precioUnitario,
                subtotal: precioUnitario * item.getCantidad(),
            });
        }
        return itemsFactura;
    }

    private verificarQueLaCocinaPuedeRecibirTodo(cocina: Cocina): void {
        for (const item of this.items) {
            if (!cocina.puedeRecibir(item)) {
                throw new Error("La cocina no tiene una estación para todos los ítems: el pedido no se confirmó");
            }
        }
    }

    private verificarEnConstruccion(): void {
        if (!this.estado.getConfirmarModificacion()) {
            throw new Error("El pedido ya no está en construcción: no se puede modificar");
        }
    }
}