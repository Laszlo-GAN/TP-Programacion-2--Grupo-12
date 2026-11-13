import { EstrategiaBeneficio } from "./EstrategiaBeneficio";
import { DiaDeLaSemana } from "./DiaDeLaSemana";

const PORCENTAJE_TOTAL = 100;

export class BeneficioPorDia implements EstrategiaBeneficio {
    private diaDeLaSemana: DiaDeLaSemana;
    private porcentaje: number;

    public constructor (diaDeLaSemana: DiaDeLaSemana, procentaje: number) {
        this.diaDeLaSemana = diaDeLaSemana;
        this.porcentaje = procentaje;
    }

    public tieneBeneficio(_medioDePago: unknown, fecha: Date): boolean {
        return fecha.getDay() === this.diaDeLaSemana;
    }

    public beneficio(total: number): number {
        return total * this.porcentaje / PORCENTAJE_TOTAL;
    }
}