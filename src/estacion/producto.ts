import { TipoEstacion } from "../pedidos/TipoEstacion";
import { Beneficio } from "./beneficio";

export abstract class Producto {
    private nombre: string;
    private categoria: string;
    private beneficios: Beneficio[];
    protected precioBase: number;

    public constructor(precioBase: number) {
        this.nombre = "";
        this.categoria = "";
        this.beneficios = [];
        this.precioBase = precioBase;
    }

    public agregarBeneficio(beneficio: Beneficio): void {
        this.beneficios.push(beneficio);
    }

    // Se aplica el MAYOR de los beneficios disponibles (sin beneficios: no hay descuento)
    public beneficio(): number {
        let mayor = 0;
        for (const opcion of this.beneficios) {
            const monto = opcion.calcularBeneficio(this.precioBase);
            if (monto > mayor) {
                mayor = monto;
            }
        }
        return mayor;
    }

    public abstract precioConBeneficio(): number;
    // Dice EN QUÉ TIPO de estación se prepara (no maneja la estación en sí)
    public abstract estacionDeCocina(): TipoEstacion;
}
