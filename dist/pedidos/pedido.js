"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
class Pedido {
    id;
    fechaHora;
    estado;
    agregarProducto() {
    }
    quitarProducto() {
    }
    deshacerUltimaModificacion() {
    }
    puedeFacturarse() {
        return true;
    }
    calcularTotalProductos() {
        return 0;
    }
}
exports.Pedido = Pedido;
//# sourceMappingURL=pedido.js.map