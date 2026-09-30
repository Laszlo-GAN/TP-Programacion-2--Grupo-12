import { Estacion } from "./estacion";
import { EstadoEstacion } from "./estadoEstacion";
import { ItemPedido } from "./itemPedido";
import { Parrilla } from "./parrilla";
import { CocinaFria } from "./cocinaFrea";
import { CocinaDulce } from "./cocinaDulce";
import { Barra } from "./barra";
import { TipoEstacion } from "../pedidos/TipoEstacion";

export class Cocina {
    private estaciones: Estacion[];

    public constructor() {
        this.estaciones = [
            new Parrilla("Parrilla", EstadoEstacion.LIBRE),
            new CocinaFria("Cocina fría", EstadoEstacion.LIBRE),
            new CocinaDulce("Cocina dulce", EstadoEstacion.LIBRE),
            new Barra("Barra", EstadoEstacion.LIBRE),
        ];
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