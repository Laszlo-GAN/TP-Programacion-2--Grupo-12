import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { Factura } from "./factura";
import { ItemFactura } from "./ItemFactura";
import { MedioDePago } from "./MedioDePago";

export class FacturadorService {
  
  
  public generarFactura(pedido: any, medioDePago: MedioDePago, beneficiosDisponibles: EstrategiaBeneficio[] = []): Factura {
    
    if (!pedido.puedeFacturarse()) {
        throw new Error("El pedido no cumple con las condiciones para ser facturado.");
    }
    const itemsFactura: ItemFactura[] = pedido.obtenerItemsParaFactura(); 
    const subtotalBruto = itemsFactura.reduce((acc, i) => acc + i.subtotal, 0);
    
    let mejorDescuentoMonto = 0;
    if (beneficiosDisponibles.length > 0) {
        let menorPrecioFinal = subtotalBruto;

            for (const beneficio of beneficiosDisponibles) {
                const precioConBeneficio = beneficio.aplicarDescuento(subtotalBruto);
                    if (precioConBeneficio < menorPrecioFinal) {
                        menorPrecioFinal = precioConBeneficio;
                        mejorDescuentoMonto = subtotalBruto - menorPrecioFinal;
            }
        }
    }

    const totalFinal = Math.max(0, subtotalBruto - mejorDescuentoMonto);
    const factura = new Factura(new Date(), itemsFactura, subtotalBruto, mejorDescuentoMonto, totalFinal,   medioDePago, pedido.getCodigo());
  
    pedido.finalizar();

    return factura;
    }
}