import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { MedioDePago } from "./MedioDePago";

const PORCENTAJE_TOTAL = 100;

export class BeneficioEfectivo implements EstrategiaBeneficio {
    private medioQueAplica: MedioDePago;
    private porcentaje: number;
 
    public constructor(porcentaje: number) {
        this.medioQueAplica = MedioDePago.EFECTIVO;
        this.porcentaje = porcentaje;
    }
 
    public tieneBeneficio(medioDePago: MedioDePago): boolean {
        return medioDePago === this.medioQueAplica;
    }
 
    public beneficio(total: number): number {
        return total * this.porcentaje / PORCENTAJE_TOTAL;
    }
}