"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barra = void 0;
const estacion_1 = require("./estacion");
const TipoEstacion_1 = require("./TipoEstacion");
class Barra extends estacion_1.Estacion {
    constructor(nombre, estado) {
        super(nombre, TipoEstacion_1.TipoEstacion.BARRA, estado);
    }
}
exports.Barra = Barra;
//# sourceMappingURL=barra.js.map