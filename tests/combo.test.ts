import Combo from "../src/estacion/combo";
import { Producto } from "../src/estacion/producto";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { DescuentoPorcentual } from "../src/estacion/descuentoPorcentual";
import { PrecioFijo } from "../src/estacion/precioFijo";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase Combo", () => {
    const PRECIO_BIFE = 5000;
    const PRECIO_GASEOSA = 1000;
    const PRECIO_FLAN = 2000;
    const SUMA = PRECIO_BIFE + PRECIO_GASEOSA + PRECIO_FLAN;
    const DIEZ_PORCIENTO = 10;
    const PRECIO_CERRADO = 6500;
    let bife: ProductoUnico;
    let gaseosa: ProductoUnico;
    let flan: ProductoUnico;

    beforeEach(() => {
        bife = new ProductoUnico(PRECIO_BIFE, TipoEstacion.PARRILLA);
        gaseosa = new ProductoUnico(PRECIO_GASEOSA, TipoEstacion.BARRA);
        flan = new ProductoUnico(PRECIO_FLAN, TipoEstacion.COCINA_DULCE);
    });

    test("Verificar que sea un Producto", () => {
        const instance = new Combo([bife, gaseosa], new PrecioFijo(PRECIO_CERRADO));

        expect(instance).toBeInstanceOf(Producto);
    });

    test("Con descuento porcentual, el precio es la suma menos el porcentaje", () => {
        const instance = new Combo([bife, gaseosa, flan], new DescuentoPorcentual(DIEZ_PORCIENTO));

        expect(instance.calcularPrecio()).toBe(SUMA - SUMA / DIEZ_PORCIENTO);
    });

    test("Con precio fijo, el precio es ese valor", () => {
        const instance = new Combo([bife, gaseosa, flan], new PrecioFijo(PRECIO_CERRADO));

        expect(instance.calcularPrecio()).toBe(PRECIO_CERRADO);
    });

    test("Un combo necesita al menos dos productos", () => {
        expect(() => new Combo([bife], new PrecioFijo(PRECIO_CERRADO))).toThrow();
    });

    test("Un combo sin productos tampoco es válido", () => {
        expect(() => new Combo([], new PrecioFijo(PRECIO_CERRADO))).toThrow();
    });

    test("Se desarma en los productos que se cocinan, cada uno en su estación", () => {
        const instance = new Combo([bife, gaseosa, flan], new PrecioFijo(PRECIO_CERRADO));

        expect(instance.productosDeCocina()).toEqual([bife, gaseosa, flan]);
    });

    test("Un combo puede incluir otro combo", () => {
        const interno = new Combo([gaseosa, flan], new PrecioFijo(PRECIO_GASEOSA));
        const externo = new Combo([bife, interno], new DescuentoPorcentual(DIEZ_PORCIENTO));

        expect(externo.productosDeCocina()).toEqual([bife, gaseosa, flan]);
        expect(externo.calcularPrecio()).toBe((PRECIO_BIFE + PRECIO_GASEOSA) * (1 - DIEZ_PORCIENTO / 100));
    });

    test("Modificar la lista original no cambia el combo", () => {
        const productos: Producto[] = [bife, gaseosa];
        const instance = new Combo(productos, new PrecioFijo(PRECIO_CERRADO));

        productos.pop();

        expect(instance.productosDeCocina()).toHaveLength(2);
    });
});
