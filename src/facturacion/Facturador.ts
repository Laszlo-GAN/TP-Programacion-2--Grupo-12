import { Pedido } from "../pedidos/pedido";
import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { Factura } from "./factura";
import { Historial } from "./Historial";
import { ItemFactura } from "./ItemFactura";
import { MedioDePago } from "./MedioDePago";

const SIN_DESCUENTO = 0;

/**
 * Calcula la suma de los subtotales de un listado de items de factura.
 * @param items = Arreglo de items a sumar.
 * @returns El subtotal general de los items.
 */
function sumarSubtotales(items: ItemFactura[]): number {
    let total = 0;
    for (const item of items) {
        total += item.subtotal;
    }
    return total;
}

/**
 * Determina la estrategia con el mayor descuento aplicable
 * para el medio de pago y la fecha indicados.
 * @param beneficios = Lista de estrategias de descuento disponibles.
 * @param medioDePago = Medio de pago del pedido.
 * @param fecha = Fecha de la factura.
 * @param subtotal = Subtotal sobre el cual calcular los descuentos.
 * @returns El mayor importe de descuento applicable, o Sin Descuento si ninguno aplica.
 */
function elegirMejorDescuento(
    beneficios: EstrategiaBeneficio[],
    medioDePago: MedioDePago,
    fecha: Date,
    subtotal: number,
): number {
    let mejorDescuento = SIN_DESCUENTO;
    for (const beneficio of beneficios) {
        if (beneficio.tieneBeneficio(medioDePago, fecha)) {
            mejorDescuento = Math.max(mejorDescuento, beneficio.beneficio(subtotal));
        }
    }
    return mejorDescuento;
}

/**
 * Clase encargada de gestionar el proceso de facturación de un pedido.
 */
export class FacturadorService {
    private historial: Historial;

    /**
     * Inicializa el servicio de facturación con su historial asociado.
     * @param historial = Instancia de Historial donde se registran las facturas.
     */
    public constructor(historial: Historial) {
        this.historial = historial;
    }

    /**
     * Genera la factura de un pedido listo para facturar. 
     * Aplicando el mejor beneficio disponible.
     * La registra en el historial.
     * Y marcando el pedido como finalizado.
     * Lanza un error si el pedido no esta confirmado o tiene items sin terminar.
     * @param pedido = Pedido a facturar.
     * @param medioDePago = Medio de pago elegido para abonar.
     * @param beneficiosDisponibles = Estrategias de descuento a evaluar (por defecto vacio).
     * @param fecha = Fecha de emisión de la factura.
     * @returns La Factura generada.
     */
    public generarFactura(
        pedido: Pedido,
        medioDePago: MedioDePago,
        beneficiosDisponibles: EstrategiaBeneficio[] = [],
        fecha: Date = new Date(),
    ): Factura {
        if (!pedido.puedeFacturarse()) {
            throw new Error("El pedido no cumple con las condiciones para ser facturado.");
        }
        const itemsFactura = pedido.obtenerItemsParaFactura();
        const subtotal = sumarSubtotales(itemsFactura);
        const descuento = Math.min(elegirMejorDescuento(beneficiosDisponibles, medioDePago, fecha, subtotal), subtotal);
        const factura = new Factura(
            fecha,
            itemsFactura,
            subtotal,
            descuento,
            subtotal - descuento,
            medioDePago,
            pedido.getCodigo(),
        );

        this.historial.registrar(factura);
        pedido.finalizar();
        return factura;
    }
}