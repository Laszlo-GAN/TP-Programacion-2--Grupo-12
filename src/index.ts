import { Cocina } from "./estacion/cocina";
import { ItemPedido } from "./estacion/itemPedido";
import { ProductoUnico } from "./estacion/productoUnico";
import { EstadoItem } from "./estacion/estadoItem";
import { Mesa } from "./pedidos/Mesa";
import { PedidoSalon } from "./pedidos/pedidoSalon";
import { TipoEstacion } from "./pedidos/TipoEstacion";


interface Linea {
    nombre: string;
    item: ItemPedido;
}

const PRECIO_HAMBURGUESA = 3500;
const PRECIO_BIFE = 5200;
const PRECIO_GASEOSA = 1200;
const PRECIO_ENSALADA = 2800;
const PRECIO_FLAN = 2500;
const UNA_UNIDAD = 1;
const DOS_UNIDADES = 2;
const NUMERO_MESA = 5;
const LUGARES_MESA = 4;

function mostrarEstados(lineas: Linea[]): void {
    for (const linea of lineas) {
        console.log(`   ${linea.nombre}: ${EstadoItem[linea.item.getEstado()]}`);
    }
}


const cocina = new Cocina();
const pedido = new PedidoSalon("P001", new Date(), new Mesa(NUMERO_MESA), LUGARES_MESA, "Juan");

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

const lineas: Linea[] = [hamburguesa, bife, gaseosa, ensalada, flan];
const restantes: Linea[] = [bife, gaseosa, ensalada, flan];


console.log("=== 1. Armar el pedido ===");
console.log(`   ${pedido.datosDelPedido()}`);
for (const linea of lineas) {
    pedido.agregarItem(linea.item);
}
console.log(`   Ítems agregados: ${lineas.length}`);
console.log(`   Total: $${pedido.calcularTotalProductos()}`);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);


console.log("\n=== 2. Quitar el Bife y deshacer ===");
pedido.quitarItem(bife.item);
console.log(`   Total sin el Bife: $${pedido.calcularTotalProductos()}`);
pedido.deshacerUltimaModificacion();
console.log(`   Total tras deshacer: $${pedido.calcularTotalProductos()}`);


console.log("\n=== 3. A qué estación va cada ítem ===");
for (const linea of lineas) {
    const estacion = cocina.aQueEstacionVa(linea.item);
    console.log(`   ${linea.nombre} -> ${TipoEstacion[estacion.getTipo()]}`);
}


console.log("\n=== 4. Enviar a la cocina ===");
for (const linea of lineas) {
    cocina.enviarItem(linea.item);
}
mostrarEstados(lineas);
console.log("   (el Bife espera: la Parrilla está ocupada con la Hamburguesa)");


console.log("\n=== 5. La Parrilla termina la Hamburguesa ===");
cocina.aQueEstacionVa(hamburguesa.item).terminarItemActual();
mostrarEstados(lineas);


console.log("\n=== 6. Terminan todas las demás ===");
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
for (const linea of restantes) {
    cocina.aQueEstacionVa(linea.item).terminarItemActual();
}
mostrarEstados(lineas);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
