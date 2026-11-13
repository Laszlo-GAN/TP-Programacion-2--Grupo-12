/**
 * Clase concreta que representa una mesa física.
 */
export class Mesa {
    private numero: number;

    /**
     * Crea una instancia de mesa
     * @param numero = Número asignado a la mesa.
     */
    public constructor(numero: number) {
        this.numero = numero;
    }

    /**
     * Obtiene el número de mesa.
     * @returns El número de mesa.
     */
    public getNumero(): number {
        return this.numero;
    }
}
