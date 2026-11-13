import { Cocina } from "./estacion/Cocina";
import { Parrilla } from "./estacion/parrilla";
import { CocinaFria } from "./estacion/cocinaFria";
import { CocinaDulce } from "./estacion/cocinaDulce";
import { Barra } from "./estacion/barra";
import { ItemPedido } from "./estacion/itemPedido";
import { ProductoUnico } from "./estacion/productoUnico";
import Combo from "./estacion/combo";
import { DescuentoPorcentual } from "./estacion/descuentoPorcentual";
import { TipoEstacion } from "./estacion/TipoEstacion";
import { BeneficioEfectivo } from "./facturacion/beneficioEfectivo";
import { BeneficioPorDia } from "./facturacion/beneficioPorDia";
import { DiaDeLaSemana } from "./facturacion/DiaDeLaSemana";
import { EstrategiaBeneficio } from "./facturacion/EstrategiaBeneficio";
import { FacturadorService } from "./facturacion/Facturador";
import { Historial } from "./facturacion/Historial";
import { MedioDePago } from "./facturacion/MedioDePago";
import { Mesa } from "./pedidos/Mesa";
import { PedidoEnvio } from "./pedidos/pedidoEnvio";
import { PedidoRetirar } from "./pedidos/pedidoRetirar";
import { PedidoSalon } from "./pedidos/pedidoSalon";

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
const DESCUENTO_EFECTIVO = 10;
const DESCUENTO_MARTES = 15;
const COSTO_ENVIO = 800;
const UNA_UNIDAD = 1;
const DOS_UNIDADES = 2;
const NUMERO_MESA = 5;
const LUGARES_MESA = 4;
const ANIO_COBRO = 2026;
const MES_COBRO = 10;
const DIA_COBRO = 17;
const HORA_RETIRO = 20;
const MINUTOS_RETIRO = 30;

function mostrarEstados(lineas: Linea[]): void {
    for (const linea of lineas) {
        console.log(`   ${linea.nombre}: ${linea.item.getEstado().getNombre()}`);
    }
}

function mostrarEstadoPedido(pedido: PedidoSalon): void {
    console.log(`   Estado del pedido: ${pedido.getEstado().getNombre()}`);
}

function terminarEnCocina(cocina: Cocina, linea: Linea): void {
    for (const producto of linea.item.getProducto().productosDeCocina()) {
        cocina.aQueEstacionVa(producto).terminarItemActual();
    }
}
// ---------- Preparación ----------
const cocina = new Cocina([
    new Parrilla("Parrilla"),
    new CocinaFria("Cocina fría"),
    new CocinaDulce("Cocina dulce"),
    new Barra("Barra"),
]);
const pedido = new PedidoSalon("P001", new Date(), new Mesa(NUMERO_MESA), LUGARES_MESA, "Juan");
const comboParrillero = new Combo(
    [
        new ProductoUnico(PRECIO_BIFE, TipoEstacion.PARRILLA, "Bife"),
        new ProductoUnico(PRECIO_GASEOSA, TipoEstacion.BARRA, "Gaseosa"),
        new ProductoUnico(PRECIO_FLAN, TipoEstacion.COCINA_DULCE, "Flan"),
    ],
    new DescuentoPorcentual(DESCUENTO_COMBO),
    "Combo parrillero",
);

const hamburguesa: Linea = {
    nombre: "Hamburguesa",
    item: new ItemPedido(
        "I001",
        new ProductoUnico(PRECIO_HAMBURGUESA, TipoEstacion.PARRILLA, "Hamburguesa"),
        UNA_UNIDAD,
    ),
};
const bife: Linea = {
    nombre: "Bife",
    item: new ItemPedido("I002", new ProductoUnico(PRECIO_BIFE, TipoEstacion.PARRILLA, "Bife"), UNA_UNIDAD),
};
const gaseosa: Linea = {
    nombre: "Gaseosa",
    item: new ItemPedido("I003", new ProductoUnico(PRECIO_GASEOSA, TipoEstacion.BARRA, "Gaseosa"), DOS_UNIDADES),
};
const ensalada: Linea = {
    nombre: "Ensalada",
    item: new ItemPedido(
        "I004",
        new ProductoUnico(PRECIO_ENSALADA, TipoEstacion.COCINA_FRIA, "Ensalada"),
        UNA_UNIDAD,
    ),
};
const flan: Linea = {
    nombre: "Flan",
    item: new ItemPedido("I005", new ProductoUnico(PRECIO_FLAN, TipoEstacion.COCINA_DULCE, "Flan"), UNA_UNIDAD),
};
const combo: Linea = {
    nombre: "Combo parrillero",
    item: new ItemPedido("I006", comboParrillero, UNA_UNIDAD),
};

const lineas: Linea[] = [hamburguesa, bife, gaseosa, ensalada, flan, combo];
const restantes: Linea[] = [bife, gaseosa, ensalada, flan, combo];
// ---------- 0. Las tres modalidades de pedido ----------
console.log("=== 0. Las tres modalidades de pedido ===");
const horarioRetiro = new Date(ANIO_COBRO, MES_COBRO, DIA_COBRO, HORA_RETIRO, MINUTOS_RETIRO);
const retiro = new PedidoRetirar("R001", new Date(), horarioRetiro);
const envio = new PedidoEnvio("E001", new Date(), "Calle Falsa 123", COSTO_ENVIO);
envio.agregarItem(
    new ItemPedido("I100", new ProductoUnico(PRECIO_HAMBURGUESA, TipoEstacion.PARRILLA, "Hamburguesa"), UNA_UNIDAD),
);
console.log(`   Salón:  ${pedido.datosDelPedido()}`);
console.log(`   Retiro: ${retiro.datosDelPedido()}`);
console.log(`   Envío:  ${envio.datosDelPedido()}`);
console.log(`   Un envío con una hamburguesa cuesta $${envio.calcularTotal()} ($${PRECIO_HAMBURGUESA} + $${COSTO_ENVIO} de envío)`);
// ---------- 1. Armar el pedido ----------
console.log("\n=== 1. Armar el pedido ===");
for (const linea of lineas) {
    pedido.agregarItem(linea.item);
}
console.log(`   Ítems agregados: ${lineas.length}`);
console.log(`   Combo parrillero (con ${DESCUENTO_COMBO}% off): $${comboParrillero.calcularPrecio()}`);
console.log(`   Total: $${pedido.calcularTotalProductos()}`);
mostrarEstadoPedido(pedido);
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

// ---------- 4. Confirmar el pedido: se reparte entre las estaciones ----------
console.log("\n=== 4. Confirmar el pedido ===");
pedido.confirmar(cocina);
mostrarEstadoPedido(pedido);
mostrarEstados(lineas);
console.log("   (lo que comparte estación con algo anterior espera su turno)");

// ---------- 5. Ya no se puede modificar ----------
console.log("\n=== 5. Intentar modificar el pedido confirmado ===");
try {
    pedido.quitarItem(flan.item);
} catch (error) {
    console.log(`   Rechazado: ${error instanceof Error ? error.message : "error desconocido"}`);
}

// ---------- 6. La Parrilla termina la Hamburguesa ----------
console.log("\n=== 6. La Parrilla termina la Hamburguesa ===");
terminarEnCocina(cocina, hamburguesa);
mostrarEstados(lineas);

// ---------- 7. Terminan todas las demás ----------
console.log("\n=== 7. Terminan todas las demás ===");
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);
for (const linea of restantes) {
    terminarEnCocina(cocina, linea);
}
mostrarEstados(lineas);
console.log(`   ¿Se puede facturar? ${pedido.puedeFacturarse()}`);

// ---------- 8. Cobrar el pedido ----------
console.log("\n=== 8. Cobrar el pedido (en efectivo, un martes) ===");
const historial = new Historial();
const facturador = new FacturadorService(historial);
const beneficios: EstrategiaBeneficio[] = [
    new BeneficioEfectivo(DESCUENTO_EFECTIVO),
    new BeneficioPorDia(DiaDeLaSemana.MARTES, DESCUENTO_MARTES),
];
const factura = facturador.generarFactura(
    pedido,
    MedioDePago.EFECTIVO,
    beneficios,
    new Date(ANIO_COBRO, MES_COBRO, DIA_COBRO),
);
for (const itemFactura of factura.getItems()) {
    console.log(`   ${itemFactura.descripcion} x${itemFactura.cantidad}: $${itemFactura.subtotal}`);
}
console.log(`   Subtotal: $${factura.getSubTotal()}`);
console.log(`   Descuento (el mayor entre efectivo ${DESCUENTO_EFECTIVO}% y martes ${DESCUENTO_MARTES}%):`
    + ` $${factura.getBeneficioAplicado()}`);
console.log(`   Total a pagar: $${factura.getTotalAPagar()}`);
mostrarEstadoPedido(pedido);

// ---------- 9. Historial de pedidos cobrados ----------
console.log("\n=== 9. Historial de pedidos cobrados ===");
for (const registrada of historial.consultar()) {
    console.log(`   Pedido ${registrada.getCodigoPedido()}: cobrado $${registrada.getTotalAPagar()}`);
}