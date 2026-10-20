import { Producto } from "../src/estacion/producto";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { describe, expect, test } from "@jest/globals";

describe("Test clase ProductoUnico", () => {
    const PRECIO_BASE = 3500;

    test("Verificar que sea un Producto", () => {
        const instance = new ProductoUnico(PRECIO_BASE, TipoEstacion.BARRA);

        expect(instance).toBeInstanceOf(Producto);
    });

    test("Su precio es el precio base", () => {
        const instance = new ProductoUnico(PRECIO_BASE, TipoEstacion.PARRILLA);

        expect(instance.calcularPrecio()).toBe(PRECIO_BASE);
    });

    test("Devuelve la estación con la que fue creado", () => {
        const instance = new ProductoUnico(PRECIO_BASE, TipoEstacion.COCINA_DULCE);

        expect(instance.estacionDeCocina()).toBe(TipoEstacion.COCINA_DULCE);
    });

    test("Se prepara a sí mismo en cocina", () => {
        const instance = new ProductoUnico(PRECIO_BASE, TipoEstacion.PARRILLA);

        expect(instance.productosDeCocina()).toEqual([instance]);
    });
});
