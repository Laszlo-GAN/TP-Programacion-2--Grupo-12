import { Factura } from "./factura";

/**
 * Registro las facturas emitidas y garantiza que no se facture más de una vez un mismo pedido.
 */
export class Historial {
    private facturas: Factura[] = [];

    /**
     * Almacena una nueva factura en el historial verificando que no se haya
     * agregado con anterioridad.
     * Lanza un error si ya existe una factura registrada con el mismo código de pedido.
     * @param factura = Factura a registrar.
     */
    public registrar(factura: Factura): void {
        if (this.estaFacturado(factura.getCodigoPedido())) {
            throw new Error ("No se puede facturar dos veces el mismo Pedido");
        }
        this.facturas.push(factura);
    }

    /**
     * Devuelve una copia de las facturas registradas.
     * @returns Arreglo de Facturas.
     */
    public consultar(): Factura[] {
        return [...this.facturas]
    }

    /**
     * Comprueba si ya existe una factura emitida para un código de pedido dado.
     * @param codigoPedido = Código identificador del pedido a verificar.
     * @returns true si el pedido ya fue facturado, false de lo contrario.
     */
    private estaFacturado(codigoPedido: string): boolean {
        for (const factura of this.facturas) {
            if (factura.getCodigoPedido() === codigoPedido) {
                return true;
            }
        }
        return false;
    }
}