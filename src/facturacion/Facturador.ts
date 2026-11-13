import { Pedido } from "../pedidos/pedido";
import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { Factura } from "./factura";
import { Historial } from "./Historial";
import { ItemFactura } from "./ItemFactura";
import { MedioDePago } from "./MedioDePago";

const SIN_DESCUENTO = 0;

function sumarSubtotales(items: ItemFactura[]): number {
    let total = 0;
    for (const item of items) {
        total += item.subtotal;
    }
    return total;
}

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

export class FacturadorService {
    private historial: Historial;

    public constructor(historial: Historial) {
        this.historial = historial;
    }

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