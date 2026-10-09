"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedido = void 0;
const estadoItem_1 = require("./estadoItem");
const SIN_PARTES = 0;
class ItemPedido {
    codigo;
    producto;
    cantidad;
    estado;
    partes;
    constructor(codigo, producto, cantidad) {
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.estado = estadoItem_1.EstadoItem.PENDIENTE;
        this.partes = [];
    }
    getCodigo() {
        return this.codigo;
    }
    getProducto() {
        return this.producto;
    }
    getCantidad() {
        return this.cantidad;
    }
    asignarPartes(partes) {
        this.partes = partes;
    }
    getEstado() {
        if (this.partes.length === SIN_PARTES) {
            return this.estado;
        }
        if (this.partes.every(p => p.getEstado() === estadoItem_1.EstadoItem.LISTO)) {
            return estadoItem_1.EstadoItem.LISTO;
        }
        if (this.partes.every(p => p.getEstado() === estadoItem_1.EstadoItem.PENDIENTE)) {
            return estadoItem_1.EstadoItem.PENDIENTE;
        }
        return estadoItem_1.EstadoItem.EN_PREPARACION;
    }
    enPreparacion() {
        this.estado = estadoItem_1.EstadoItem.EN_PREPARACION;
    }
    listo() {
        this.estado = estadoItem_1.EstadoItem.LISTO;
    }
    puedeModificarse() {
        return this.getEstado() === estadoItem_1.EstadoItem.PENDIENTE;
    }
}
exports.ItemPedido = ItemPedido;
//# sourceMappingURL=itemPedido.js.map