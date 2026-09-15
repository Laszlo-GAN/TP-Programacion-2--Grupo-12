import { EstadoEstacion } from "./estadoEstacion";
import { Pedido } from "../pedidos/pedido";
import { Estacion } from "./estacion";

export class Parrilla extends Estacion{
   
    constructor(nombre: string, estado: EstadoEstacion){
        super(nombre, estado);
        }

    public aQueEstacionVa(): void {
        
    }
}

 