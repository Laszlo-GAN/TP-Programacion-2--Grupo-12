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
        const estacion = this.buscarEstacion(producto);
        if (estacion === undefined) {
            throw new Error("No hay ninguna estación de tipo " + TipoEstacion[producto.estacionDeCocina()]);
        }
        return estacion;
    }
    
    public puedeRecibir(item: ItemPedido): boolean {
        for (const producto of item.getProducto().productosDeCocina()) {
            if (this.buscarEstacion(producto) === undefined) {
                return false;
            }
        }
        return true;
    }
   
    public enviarItem(item: ItemPedido): void {
        if (!this.puedeRecibir(item)) {
            throw new Error("La cocina no puede recibir el ítem: falta una estación");
        }
        const partes: ItemPedido[] = [];
        for (const producto of item.getProducto().productosDeCocina()) {
            const parte = new ItemPedido(item.getCodigo(), producto, item.getCantidad());
            this.aQueEstacionVa(producto).recibirItems(parte);
            partes.push(parte);
        }
        item.asignarPartes(partes);
    }

    private buscarEstacion(producto: ProductoUnico): Estacion | undefined {
        const tipo = producto.estacionDeCocina();
        for (const estacion of this.estaciones) {
            if (estacion.getTipo() === tipo) {
                return estacion;
            }
        }
        return undefined;
    }
}
