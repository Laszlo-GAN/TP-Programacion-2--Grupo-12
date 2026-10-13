import { Estacion } from "./estacion";

import { ItemPedido } from "./itemPedido";

import { TipoEstacion } from "./TipoEstacion";

export class Cocina {
    private estaciones: Estacion[];

    public constructor(estaciones: Estacion[]) {
        this.estaciones = estaciones;
    }

  
    public aQueEstacionVa(item: ItemPedido): Estacion {
        const tipo = item.getProducto().estacionDeCocina();
        for (const estacion of this.estaciones) {
            if (estacion.getTipo() === tipo) {
                return estacion;
            }
        }
        throw new Error("No hay ninguna estación de tipo " + TipoEstacion[tipo]);
    }

    
    public enviarItem(item: ItemPedido): void {
        const estacion = this.aQueEstacionVa(item);
        estacion.recibirItems(item);
    }
}