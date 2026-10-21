import { DescuentoPorcentual } from "../src/estacion/descuentoPorcentual";
import { describe, expect, test } from "@jest/globals";

describe("Test clase DescuentoPorcentual", () => {
    const SUMA = 1000;
    const DIEZ_PORCIENTO = 10;
    const SIN_DESCUENTO = 0;
    const TODO = 100;
    const NEGATIVO = -5;
    const PASADO = 101;

    test("Descuenta el porcentaje sobre la suma", () => {
        expect(new DescuentoPorcentual(DIEZ_PORCIENTO).calcularPrecio(SUMA)).toBe(SUMA - SUMA / DIEZ_PORCIENTO);
    });

    test("Con 0% el precio no cambia", () => {
        expect(new DescuentoPorcentual(SIN_DESCUENTO).calcularPrecio(SUMA)).toBe(SUMA);
    });

    test("Con 100% el precio es 0", () => {
        expect(new DescuentoPorcentual(TODO).calcularPrecio(SUMA)).toBe(SIN_DESCUENTO);
    });

    test("No acepta un porcentaje negativo", () => {
        expect(() => new DescuentoPorcentual(NEGATIVO)).toThrow();
    });

    test("No acepta un porcentaje mayor a 100", () => {
        expect(() => new DescuentoPorcentual(PASADO)).toThrow();
    });
});
