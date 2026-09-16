"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedido = void 0;
class ItemPedido {
    id;
    producto;
    cantidad;
    estado;
    constructor() {
        this.id = "";
        this.producto = "";
        this.cantidad = 0;
        this.estado = "";
    }
    enPreparacion() {
    }
    listo() {
    }
    puedeModificarse() {
        return true;
    }
}
exports.ItemPedido = ItemPedido;
//# sourceMappingURL=itemPedido.js.map