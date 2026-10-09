"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocinaDulce = void 0;
const estacion_1 = require("./estacion");
const TipoEstacion_1 = require("./TipoEstacion");
class CocinaDulce extends estacion_1.Estacion {
    constructor(nombre, estado) {
        super(nombre, TipoEstacion_1.TipoEstacion.COCINA_DULCE, estado);
    }
}
exports.CocinaDulce = CocinaDulce;
//# sourceMappingURL=cocinaDulce.js.map