import { Factura } from "./factura";

export class Historial {
    private facturas: Factura[] = [];

    public registrar(factura: Factura): void {
        if (this.estaFacturado(factura.getCodigoPedido())) {
            throw new Error ("No se puede facturar dos veces el mismo Pedido");
        }
        this.facturas.push(factura);
    }

    public consultar(): Factura[] {
        return [...this.facturas]
    }

    private estaFacturado(codigoPedido: string): boolean {
        for (const factura of this.facturas) {
            if (factura.getCodigoPedido() === codigoPedido) {
                return true;
            }
        }
        return false;
    }
}