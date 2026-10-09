import { Cocina } from "./estacion/Cocina";
import { Parrilla } from "./estacion/parrilla";
import { CocinaFria } from "./estacion/cocinaFrea";
import { CocinaDulce } from "./estacion/cocinaDulce";
import { Barra } from "./estacion/barra";
import { EstadoEstacion } from "./estacion/estadoEstacion";
import { ItemPedido } from "./estacion/itemPedido";
import { ProductoUnico } from "./estacion/productoUnico";
import Combo from "./estacion/combo";
import { DescuentoPorcentual } from "./estacion/descuentoPorcentual";
import { EstadoItem } from "./estacion/estadoItem";
import { Mesa } from "./pedidos/Mesa";
import { PedidoSalon } from "./pedidos/pedidoSalon";
import { TipoEstacion } from "./estacion/TipoEstacion";

// Cada línea junta un nombre (solo para mostrar por consola) con su ítem
interface Linea {
    nombre: string;
    item: ItemPedido;
}

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

function mostrarEstados(lineas: Linea[]): void {
    for (const linea of lineas) {
        console.log(`   ${linea.nombre}: ${EstadoItem[linea.item.getEstado()]}`);
    }
}

// Cada estación involucrada termina el producto que tiene en preparación
function terminarEnCocina(cocina: Cocina, linea: Linea): void {
    for (const producto of linea.item.getProducto().productosDeCocina()) {
        cocina.aQueEstacionVa(producto).terminarItemActual();
    }
}

// ---------- Preparación ----------
const cocina = new Cocina([
    new Parrilla("Parrilla", EstadoEstacion.LIBRE),
    new CocinaFria("Cocina fría", EstadoEstacion.LIBRE),
    new CocinaDulce("Cocina dulce", EstadoEstacion.LIBRE),
    new Barra("Barra", EstadoEstacion.LIBRE),
]);
const pedido = new PedidoSalon("P001", new Date(), new Mesa(NUMERO_MESA), LUGARES_MESA, "Juan");

const comboParrillero = new Combo(
    [
        new ProductoUnico(PRECIO_BIFE, TipoEstacion.PARRILLA),
        new ProductoUnico(PRECIO_GASEOSA, TipoEstacion.BARRA),
        new ProductoUnico(PRECIO_FLAN, TipoEstacion.COCINA_DULCE),
    ],
    new DescuentoPorcentual(DESCUENTO_COMBO),
);

const hamburguesa: Linea = {
    nombre: "Hamburguesa",
    item: new ItemPedido("I001", new ProductoUnico(PRECIO_HAMBURGUESA, TipoEstacion.PARRILLA), UNA_UNIDAD),
};
const bife: Linea = {
    nombre: "Bife",
    item: new ItemPedido("I002", new ProductoUnico(PRECIO_BIFE, TipoEstacion.PARRILLA), UNA_UNIDAD),
};
const gaseosa: Linea = {
    nombre: "Gaseosa",
    item: new ItemPedido("I003", new ProductoUnico(PRECIO_GASEOSA, TipoEstacion.BARRA), DOS_UNIDADES),
};
const ensalada: Linea = {
    nombre: "Ensalada",
    item: new ItemPedido("I004", new ProductoUnico(PRECIO_ENSALADA, TipoEstacion.COCINA_FRIA), UNA_UNIDAD),
};
const flan: Linea = {
    nombre: "Flan",
    item: new ItemPedido("I005", new ProductoUnico(PRECIO_FLAN, TipoEstacion.COCINA_DULCE), UNA_UNIDAD),
};
const combo: Linea = {
    nombre: "Combo parrillero",
    item: new ItemPedido("I006", comboParrillero, UNA_UNIDAD),
};

const lineas: Linea[] = [hamburguesa, bife, gaseosa, ensalada, flan, combo];
const restantes: Linea[] = [bife, gaseosa, ensalada, flan, combo];

// ---------- 1. Armar el pedido ----------
console.log("=== 1. Armar el pedido ===");
console.log(`   ${pedido.datosDelPedido()}`);
for (const linea of lineas) {
    pedido.agregarItem(linea.item);
}
console.log(`   Ítems agregados: ${lineas.length}`);
console.log(`   Combo parrillero (con ${DESCUENTO_COMBO}% off): $${comboParrillero.calcularPrecio()}`);
console.log(`   Total: $${pedido.calcularTotalProductos()}`);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);

// ---------- 2. Quitar un ítem y deshacer ----------
console.log("\n=== 2. Quitar el Bife y deshacer ===");
pedido.quitarItem(bife.item);
console.log(`   Total sin el Bife: $${pedido.calcularTotalProductos()}`);
pedido.deshacerUltimaModificacion();
console.log(`   Total tras deshacer: $${pedido.calcularTotalProductos()}`);

// ---------- 3. A qué estaciones va cada ítem ----------
console.log("\n=== 3. A qué estaciones va cada ítem ===");
for (const linea of lineas) {
    const destinos: string[] = [];
    for (const producto of linea.item.getProducto().productosDeCocina()) {
        destinos.push(TipoEstacion[cocina.aQueEstacionVa(producto).getTipo()]);
    }
    console.log(`   ${linea.nombre} -> ${destinos.join(", ")}`);
}

// ---------- 4. Enviar los ítems a la cocina ----------
console.log("\n=== 4. Enviar a la cocina ===");
for (const linea of lineas) {
    cocina.enviarItem(linea.item);
}
mostrarEstados(lineas);
console.log("   (lo que comparte estación con algo anterior espera su turno)");

// ---------- 5. La Parrilla termina la Hamburguesa ----------
console.log("\n=== 5. La Parrilla termina la Hamburguesa ===");
terminarEnCocina(cocina, hamburguesa);
mostrarEstados(lineas);

// ---------- 6. Terminan todas las demás d ----------
console.log("\n=== 6. Terminan todas las demás ===");
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
for (const linea of restantes) {
    terminarEnCocina(cocina, linea);
}
mostrarEstados(lineas);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
