import { PrecioFijo } from "../src/estacion/precioFijo";
import { describe, expect, test } from "@jest/globals";

describe("Test clase PrecioFijo", () => {
    const PRECIO = 7000;

    test("Devuelve su precio cerrado", () => {
        expect(new PrecioFijo(PRECIO).calcularPrecio()).toBe(PRECIO);
    });

    test("Devuelve siempre el mismo precio", () => {
        const instance = new PrecioFijo(PRECIO);

        expect(instance.calcularPrecio()).toBe(instance.calcularPrecio());
    });
});
