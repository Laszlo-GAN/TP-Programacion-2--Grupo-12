"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoEnvio = void 0;
const pedido_1 = require("./pedido");
class PedidoEnvio extends pedido_1.Pedido {
    direccion;
    costoEnvio;
    constructor() {
        this.direccion = "";
        this.costoEnvio = 0;
    }
    DatosDelPedido() {
        return "";
    }
}
exports.PedidoEnvio = PedidoEnvio;
//# sourceMappingURL=pedidoEnvio.js.map