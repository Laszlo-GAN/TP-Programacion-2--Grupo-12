import { EstadoEstacion } from "./estadoEstacion";
import { Estacion } from "./estacion";


export class Barra extends Estacion{
    constructor(nombre: string, estado:EstadoEstacion){
        super(nombre, estado);
    }
    public aQueEstacionVa(): void {
        
    }
}