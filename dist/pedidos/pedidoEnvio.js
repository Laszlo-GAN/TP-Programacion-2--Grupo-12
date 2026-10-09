"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoEnvio = void 0;
const pedido_1 = require("./pedido");
class PedidoEnvio extends pedido_1.Pedido {
    direccion;
    costoEnvio;
    constructor(codigo, fechaHora, direccion, costoEnvio) {
        super(codigo, fechaHora);
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }
    datosDelPedido() {
        return `Envío a ${this.direccion} (costo de envío: $${this.costoEnvio})`;
    }
}
exports.PedidoEnvio = PedidoEnvio;
//# sourceMappingURL=pedidoEnvio.js.map