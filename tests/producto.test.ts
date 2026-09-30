import { Producto } from "../src/estacion/producto";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ProductoMock } from "./mocks";

describe("Test clase Producto", () => {

    let instance: ProductoMock;

    beforeEach(() => {
        instance = new ProductoMock();
    });

    test("Verifico que sea instancia de ProductoTest", () => {
        expect(instance).toBeInstanceOf(ProductoMock);
    });

    test("Verifico que sea instancia de Producto", () => {
        expect(instance).toBeInstanceOf(Producto);
    });

    test("Verifico el precio base", () => {
        expect(instance.precioBase).toBe(100);
    });

    test("Verifico el precio con beneficio", () => {
        expect(instance.precioConBeneficio()).toBe(120);
    });

    test("Verifico la estación de cocina", () => {
        expect(instance.estacionDeCocina()).toBe("Parrilla");
    });

    test("Verifico el beneficio", () => {
        expect(instance.beneficio()).toBe(20);
    });
});