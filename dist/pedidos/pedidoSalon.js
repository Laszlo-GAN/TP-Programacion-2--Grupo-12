"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoSalon = void 0;
const pedido_1 = require("./pedido");
class PedidoSalon extends pedido_1.Pedido {
    mesa;
    lugares;
    mozo;
    constructor(codigo, fechaHora, mesa, lugares, mozo) {
        super(codigo, fechaHora);
        this.mesa = mesa;
        this.lugares = lugares;
        this.mozo = mozo;
    }
    datosDelPedido() {
        return `Mesa ${this.mesa.getNumero()} (${this.lugares} lugares) - Mozo: ${this.mozo}`;
    }
}
exports.PedidoSalon = PedidoSalon;
//# sourceMappingURL=pedidoSalon.js.map