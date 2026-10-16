import { Estacion } from "./estacion";
import { ItemPedido } from "./itemPedido";
import { ProductoUnico } from "./productoUnico";
import { TipoEstacion } from "./TipoEstacion";

export class Cocina {
    private estaciones: Estacion[];

    public constructor(estaciones: Estacion[]) {
        this.estaciones = estaciones;
    }

    
    public aQueEstacionVa(producto: ProductoUnico): Estacion {
        const tipo = producto.estacionDeCocina();
        for (const estacion of this.estaciones) {
            if (estacion.getTipo() === tipo) {
                return estacion;
            }
        }
        throw new Error("No hay ninguna estación de tipo " + TipoEstacion[tipo]);
    }

   
    public enviarItem(item: ItemPedido): void {
        const partes: ItemPedido[] = [];
        for (const producto of item.getProducto().productosDeCocina()) {
            const parte = new ItemPedido(item.getCodigo(), producto, item.getCantidad());
            this.aQueEstacionVa(producto).recibirItems(parte);
            partes.push(parte);
        }
        item.asignarPartes(partes);
    }
}
