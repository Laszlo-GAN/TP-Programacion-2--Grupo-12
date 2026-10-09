"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parrilla = void 0;
const estacion_1 = require("./estacion");
const TipoEstacion_1 = require("./TipoEstacion");
class Parrilla extends estacion_1.Estacion {
    constructor(nombre, estado) {
        super(nombre, TipoEstacion_1.TipoEstacion.PARRILLA, estado);
    }
}
exports.Parrilla = Parrilla;
//# sourceMappingURL=parrilla.js.map