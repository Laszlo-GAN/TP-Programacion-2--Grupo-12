import { MedioDePago } from "./MedioDePago";

export interface EstrategiaBeneficio {
    
    tieneBeneficio(medioDePago: MedioDePago, fecha: Date): boolean;
    beneficio(total: number): number;

}
