"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estacion = void 0;
const estadoEstacion_1 = require("./estadoEstacion");
class Estacion {
    nombre;
    tipo;
    colaItems;
    itemActual;
    estado;
    constructor(nombre, tipo, estado) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.colaItems = [];
        this.itemActual = undefined;
        this.estado = estado;
    }
    getTipo() {
        return this.tipo;
    }
    recibirItems(item) {
        this.colaItems.push(item);
        this.procesarSiguiente();
    }
    procesarSiguiente() {
        if (this.estado === estadoEstacion_1.EstadoEstacion.OCUPADA) {
            return;
        }
        const siguiente = this.colaItems.shift();
        if (siguiente === undefined) {
            return;
        }
        this.itemActual = siguiente;
        this.estado = estadoEstacion_1.EstadoEstacion.OCUPADA;
        siguiente.enPreparacion();
    }
    terminarItemActual() {
        if (this.itemActual === undefined) {
            return;
        }
        this.itemActual.listo();
        this.itemActual = undefined;
        this.estado = estadoEstacion_1.EstadoEstacion.LIBRE;
        this.procesarSiguiente();
    }
}
exports.Estacion = Estacion;
//# sourceMappingURL=estacion.js.map