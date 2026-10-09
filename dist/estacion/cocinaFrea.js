"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocinaFria = void 0;
const estacion_1 = require("./estacion");
const TipoEstacion_1 = require("./TipoEstacion");
class CocinaFria extends estacion_1.Estacion {
    constructor(nombre, estado) {
        super(nombre, TipoEstacion_1.TipoEstacion.COCINA_FRIA, estado);
    }
}
exports.CocinaFria = CocinaFria;
//# sourceMappingURL=cocinaFrea.js.map