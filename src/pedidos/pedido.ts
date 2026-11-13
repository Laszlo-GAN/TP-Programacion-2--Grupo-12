import { Cocina } from "../estacion/Cocina";
import { ItemPedido } from "../estacion/itemPedido";
import { Acciones } from "./acciones";
import { AgregarItem } from "./agregarItem";
import { EstadoPedido } from "./statePedido/estadoPedido";
import { QuitarItem } from "./quitarItem";
import PedidoEnConstruccion from "./statePedido/pedidoEnConstruccion";
import { ItemFactura } from "../facturacion/ItemFactura";

const SIN_ITEMS = 0;

/**
 * Clase abstracta representa un pedido realizado por un cliente.
 * Gestiona la colección de ítems, el historial de modificaciones reversibles,
 * las transiciones de estado y el cálculo de importes para facturación.
 * @abstract
 */
export abstract class Pedido {
    private codigo: string;
    private fechaHora: Date;
    private estado: EstadoPedido;
    private items: ItemPedido[];
    private historial: Acciones[];

    /**
     * Inicializa un pedido en estado En Construcción, sin items y con historial vacio.
     * @param codigo = Código del pedido.
     * @param fechaHora = Fecha y hora de creación del pedido.
     */
    public constructor(codigo: string, fechaHora: Date) {
        this.codigo = codigo;
        this.fechaHora = fechaHora;
        this.estado = new PedidoEnConstruccion(this);
        this.items = [];
        this.historial = [];
    }
   
    /**
     * Devuelve los datos del pedido realizado.
     * @returns String con datos del pedido.
     */
    public abstract datosDelPedido(): string;

    /**
     * Obtiene el código del pedido.
     * @returns Código del pedido.
     */
    public getCodigo(): string {
        return this.codigo;
    }

    /**
     * Obtiene el estado actual del pedido.
     * @returns Instancia de EstadoPedido actual.
     */
    public getEstado(): EstadoPedido {
        return this.estado;
    }

    /**
     * Actualiza el estado del pedido.
     * @param estado = Nuevo estado del Pedido.
     */
    public cambiarEstado(estado: EstadoPedido): void {
        this.estado = estado;
        this.estado.setPedido(this)
    }

    /**
     * Agrega un item al pedido y registra la acción en el historial.
     * Lanza error si el pedido ya no se encuentra en construcción.
     * @param item - Item a agregar.
     */
    public agregarItem(item: ItemPedido): void {
        this.verificarEnConstruccion();
        const accion = new AgregarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }

    /**
     * Elimina un item del pedido y registra la acción en el historial.
     * Lanza error si el pedido no esta en construcción o si el item no admite modificaciones.
     * @param item = Item a eliminar.
     */
    public quitarItem(item: ItemPedido): void {
        this.verificarEnConstruccion();
        if (!item.puedeModificarse()) {
            throw new Error("El ítem ya está en preparación: no se puede quitar");
        }
        const accion = new QuitarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }

    /**
     * Revierte la última acción realizada.
     * Si no hay acciones en el historial, no realiza ninguna operación.
     * Lanza error si el pedido ya no se encuentra en construcción.
     */
    public deshacerUltimaModificacion(): void {
        this.verificarEnConstruccion();
        const ultima = this.historial.pop();
        if (ultima === undefined) {
            return; 
        }
        ultima.deshacer();
    }

    /**
     * Valida que el pedido tenga items y que la cocina cuente las estaciones necesarias,
     * envía los items a la cocina y cambia a estado a confirmado.
     * Lanza error si el pedido no está en construcción,
     * no tiene ítems o falta una estación en cocina.
     * @param cocina = Instancia de Cocina.
     */
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
   
    /**
     * Determina si puede facturar el pedido
     * @returns true si el pedido está confirmado y todos sus ítems están listos,
     * false en caso de que no se cumplan las condiciones.
     */
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

    /**
     * Marca el pedido como finalizado.
     * Lanza un error si el pedido no está confirmado o aún tiene ítems pendientes/en preparación.
     */
    public finalizar(): void {
        if (!this.puedeFacturarse()) {
            throw new Error("El pedido no se puede finalizar: está sin confirmar o tiene ítems sin terminar");
        }
        this.estado.finalizarPedido();
    }

    /**
     * Calcula el costo de todos los productos incluidos en el pedido.
     * @returns Suma del precio por cantidad de cada ítem.
     */
    public calcularTotalProductos(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.getProducto().calcularPrecio() * item.getCantidad();
        }
        return total;
    }

    /**
     * Calcula el costo total general del pedido.
     * @returns Costo total del pedido.
     */
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

    /**
     * Verifica que la cocina disponga tenga estaciones para todos los ítems del pedido.
     * Lanza error si algún ítem no puede ser recibido por falta de estación.
     * @param cocina = Cocina a validar.
     */
    private verificarQueLaCocinaPuedeRecibirTodo(cocina: Cocina): void {
        for (const item of this.items) {
            if (!cocina.puedeRecibir(item)) {
                throw new Error("La cocina no tiene una estación para todos los ítems: el pedido no se confirmó");
            }
        }
    }

    /**
     * Comprueba que el estado actual del pedido permita modificar sus ítems.
     * Lanza error si el estado no permite modificaciones.
     */
    private verificarEnConstruccion(): void {
        if (!this.estado.getConfirmarModificacion()) {
            throw new Error("El pedido ya no está en construcción: no se puede modificar");
        }
    }
}