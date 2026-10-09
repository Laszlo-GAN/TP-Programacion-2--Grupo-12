"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const estadoItem_1 = require("../estacion/estadoItem");
const agregarItem_1 = require("./agregarItem");
const quitarItem_1 = require("./quitarItem");
class Pedido {
    codigo;
    fechaHora;
    estadoItem;
    items;
    historial;
    constructor(codigo, fechaHora) {
        this.codigo = codigo;
        this.fechaHora = fechaHora;
        this.estadoItem = estadoItem_1.EstadoItem.PENDIENTE;
        this.items = [];
        this.historial = [];
    }
    getEstadoItem() {
        return this.estadoItem;
    }
    enPreparacion() {
        this.estadoItem = estadoItem_1.EstadoItem.EN_PREPARACION;
    }
    enListo() {
        this.estadoItem = estadoItem_1.EstadoItem.LISTO;
    }
    agregarItem(item) {
        const accion = new agregarItem_1.AgregarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }
    quitarItem(item) {
        const accion = new quitarItem_1.QuitarItem(this.items, item);
        accion.aplicar();
        this.historial.push(accion);
    }
    deshacerUltimaModificacion() {
        const ultima = this.historial.pop();
        if (ultima === undefined) {
            return;
        }
        ultima.deshacer();
    }
    puedeFacturarse() {
        return this.items.every(item => item.getEstado() === estadoItem_1.EstadoItem.LISTO);
    }
    calcularTotalProductos() {
        let total = 0;
        for (const item of this.items) {
            total += item.getProducto().calcularPrecio() * item.getCantidad();
        }
        return total;
    }
}
exports.Pedido = Pedido;
//# sourceMappingURL=pedido.js.map