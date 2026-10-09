"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cocina = void 0;
const itemPedido_1 = require("./itemPedido");
const TipoEstacion_1 = require("./TipoEstacion");
class Cocina {
    estaciones;
    constructor(estaciones) {
        this.estaciones = estaciones;
    }
    aQueEstacionVa(producto) {
        const tipo = producto.estacionDeCocina();
        for (const estacion of this.estaciones) {
            if (estacion.getTipo() === tipo) {
                return estacion;
            }
        }
        throw new Error("No hay ninguna estación de tipo " + TipoEstacion_1.TipoEstacion[tipo]);
    }
    enviarItem(item) {
        const partes = [];
        for (const producto of item.getProducto().productosDeCocina()) {
            const parte = new itemPedido_1.ItemPedido(item.getCodigo(), producto, item.getCantidad());
            this.aQueEstacionVa(producto).recibirItems(parte);
            partes.push(parte);
        }
        item.asignarPartes(partes);
    }
}
exports.Cocina = Cocina;
//# sourceMappingURL=Cocina.js.map