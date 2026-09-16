"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoSalon = void 0;
const pedido_1 = require("./pedido");
class PedidoSalon extends pedido_1.Pedido {
    mesa;
    mozo;
    datosDelPedido() {
        return "";
    }
}
exports.PedidoSalon = PedidoSalon;
//# sourceMappingURL=pedidoSalon.js.map