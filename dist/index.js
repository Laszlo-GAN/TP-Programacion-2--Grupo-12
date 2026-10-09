"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cocina_1 = require("./estacion/Cocina");
const parrilla_1 = require("./estacion/parrilla");
const cocinaFrea_1 = require("./estacion/cocinaFrea");
const cocinaDulce_1 = require("./estacion/cocinaDulce");
const barra_1 = require("./estacion/barra");
const estadoEstacion_1 = require("./estacion/estadoEstacion");
const itemPedido_1 = require("./estacion/itemPedido");
const productoUnico_1 = require("./estacion/productoUnico");
const combo_1 = __importDefault(require("./estacion/combo"));
const descuentoPorcentual_1 = require("./estacion/descuentoPorcentual");
const estadoItem_1 = require("./estacion/estadoItem");
const Mesa_1 = require("./pedidos/Mesa");
const pedidoSalon_1 = require("./pedidos/pedidoSalon");
const TipoEstacion_1 = require("./estacion/TipoEstacion");
const PRECIO_HAMBURGUESA = 3500;
const PRECIO_BIFE = 5200;
const PRECIO_GASEOSA = 1200;
const PRECIO_ENSALADA = 2800;
const PRECIO_FLAN = 2500;
const DESCUENTO_COMBO = 10;
const UNA_UNIDAD = 1;
const DOS_UNIDADES = 2;
const NUMERO_MESA = 5;
const LUGARES_MESA = 4;
function mostrarEstados(lineas) {
    for (const linea of lineas) {
        console.log(`   ${linea.nombre}: ${estadoItem_1.EstadoItem[linea.item.getEstado()]}`);
    }
}
function terminarEnCocina(cocina, linea) {
    for (const producto of linea.item.getProducto().productosDeCocina()) {
        cocina.aQueEstacionVa(producto).terminarItemActual();
    }
}
const cocina = new Cocina_1.Cocina([
    new parrilla_1.Parrilla("Parrilla", estadoEstacion_1.EstadoEstacion.LIBRE),
    new cocinaFrea_1.CocinaFria("Cocina fría", estadoEstacion_1.EstadoEstacion.LIBRE),
    new cocinaDulce_1.CocinaDulce("Cocina dulce", estadoEstacion_1.EstadoEstacion.LIBRE),
    new barra_1.Barra("Barra", estadoEstacion_1.EstadoEstacion.LIBRE),
]);
const pedido = new pedidoSalon_1.PedidoSalon("P001", new Date(), new Mesa_1.Mesa(NUMERO_MESA), LUGARES_MESA, "Juan");
const comboParrillero = new combo_1.default([
    new productoUnico_1.ProductoUnico(PRECIO_BIFE, TipoEstacion_1.TipoEstacion.PARRILLA),
    new productoUnico_1.ProductoUnico(PRECIO_GASEOSA, TipoEstacion_1.TipoEstacion.BARRA),
    new productoUnico_1.ProductoUnico(PRECIO_FLAN, TipoEstacion_1.TipoEstacion.COCINA_DULCE),
], new descuentoPorcentual_1.DescuentoPorcentual(DESCUENTO_COMBO));
const hamburguesa = {
    nombre: "Hamburguesa",
    item: new itemPedido_1.ItemPedido("I001", new productoUnico_1.ProductoUnico(PRECIO_HAMBURGUESA, TipoEstacion_1.TipoEstacion.PARRILLA), UNA_UNIDAD),
};
const bife = {
    nombre: "Bife",
    item: new itemPedido_1.ItemPedido("I002", new productoUnico_1.ProductoUnico(PRECIO_BIFE, TipoEstacion_1.TipoEstacion.PARRILLA), UNA_UNIDAD),
};
const gaseosa = {
    nombre: "Gaseosa",
    item: new itemPedido_1.ItemPedido("I003", new productoUnico_1.ProductoUnico(PRECIO_GASEOSA, TipoEstacion_1.TipoEstacion.BARRA), DOS_UNIDADES),
};
const ensalada = {
    nombre: "Ensalada",
    item: new itemPedido_1.ItemPedido("I004", new productoUnico_1.ProductoUnico(PRECIO_ENSALADA, TipoEstacion_1.TipoEstacion.COCINA_FRIA), UNA_UNIDAD),
};
const flan = {
    nombre: "Flan",
    item: new itemPedido_1.ItemPedido("I005", new productoUnico_1.ProductoUnico(PRECIO_FLAN, TipoEstacion_1.TipoEstacion.COCINA_DULCE), UNA_UNIDAD),
};
const combo = {
    nombre: "Combo parrillero",
    item: new itemPedido_1.ItemPedido("I006", comboParrillero, UNA_UNIDAD),
};
const lineas = [hamburguesa, bife, gaseosa, ensalada, flan, combo];
const restantes = [bife, gaseosa, ensalada, flan, combo];
console.log("=== 1. Armar el pedido ===");
console.log(`   ${pedido.datosDelPedido()}`);
for (const linea of lineas) {
    pedido.agregarItem(linea.item);
}
console.log(`   Ítems agregados: ${lineas.length}`);
console.log(`   Combo parrillero (con ${DESCUENTO_COMBO}% off): $${comboParrillero.calcularPrecio()}`);
console.log(`   Total: $${pedido.calcularTotalProductos()}`);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
console.log("\n=== 2. Quitar el Bife y deshacer ===");
pedido.quitarItem(bife.item);
console.log(`   Total sin el Bife: $${pedido.calcularTotalProductos()}`);
pedido.deshacerUltimaModificacion();
console.log(`   Total tras deshacer: $${pedido.calcularTotalProductos()}`);
console.log("\n=== 3. A qué estaciones va cada ítem ===");
for (const linea of lineas) {
    const destinos = [];
    for (const producto of linea.item.getProducto().productosDeCocina()) {
        destinos.push(TipoEstacion_1.TipoEstacion[cocina.aQueEstacionVa(producto).getTipo()]);
    }
    console.log(`   ${linea.nombre} -> ${destinos.join(", ")}`);
}
console.log("\n=== 4. Enviar a la cocina ===");
for (const linea of lineas) {
    cocina.enviarItem(linea.item);
}
mostrarEstados(lineas);
console.log("   (lo que comparte estación con algo anterior espera su turno)");
console.log("\n=== 5. La Parrilla termina la Hamburguesa ===");
terminarEnCocina(cocina, hamburguesa);
mostrarEstados(lineas);
console.log("\n=== 6. Terminan todas las demás ===");
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
for (const linea of restantes) {
    terminarEnCocina(cocina, linea);
}
mostrarEstados(lineas);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
//# sourceMappingURL=index.js.map