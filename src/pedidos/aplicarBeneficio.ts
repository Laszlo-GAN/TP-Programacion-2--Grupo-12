import { Beneficio } from "./beneficio";
export abstract class AplicarBeneficio {
    private beneficioDisponible: list<beneficios>;
    public abstract aplicarMayorBeneficio(): beneficio;
}