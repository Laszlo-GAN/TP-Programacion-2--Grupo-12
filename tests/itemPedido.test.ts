import { EstadoItem } from "../src/estacion/estadoItem";
import { ItemPedido } from "../src/estacion/itemPedido";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase ItemPedido", () => {
    const CANTIDAD = 3;
    const PRECIO = 100;
    let instance: ItemPedido;
    let producto: ProductoUnico;

    beforeEach(() => {
        producto = new ProductoUnico(PRECIO, TipoEstacion.PARRILLA);
        instance = new ItemPedido("Item1", producto, CANTIDAD);
    });

    test("Verificar que sea instancia de ItemPedido", () => {
        expect(instance).toBeInstanceOf(ItemPedido);
    });

    test("Verificar que devuelva el código", () => {
        expect(instance.getCodigo()).toBe("Item1");
    });

    test("Verificar que devuelva el producto", () => {
        expect(instance.getProducto()).toBe(producto);
    });

    test("Verificar que devuelva la cantidad", () => {
        expect(instance.getCantidad()).toBe(CANTIDAD);
    });

    test("Un ítem nuevo está PENDIENTE", () => {
        expect(instance.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    test("Un ítem pendiente puede modificarse", () => {
        expect(instance.puedeModificarse()).toBe(true);
    });

    test("El ítem pasa a EN_PREPARACION", () => {
        instance.enPreparacion();

        expect(instance.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    test("Un ítem en preparación no puede modificarse", () => {
        instance.enPreparacion();

        expect(instance.puedeModificarse()).toBe(false);
    });

    test("El ítem pasa a LISTO", () => {
        instance.listo();

        expect(instance.getEstado()).toBe(EstadoItem.LISTO);
    });

    test("Un ítem listo no puede modificarse", () => {
        instance.listo();

        expect(instance.puedeModificarse()).toBe(false);
    });

    describe("Ítem repartido en varias partes (combo)", () => {
        let primera: ItemPedido;
        let segunda: ItemPedido;

        beforeEach(() => {
            primera = new ItemPedido("Item1", producto, CANTIDAD);
            segunda = new ItemPedido("Item1", producto, CANTIDAD);
            instance.asignarPartes([primera, segunda]);
        });

        test("Con todas las partes pendientes, está PENDIENTE", () => {
            expect(instance.getEstado()).toBe(EstadoItem.PENDIENTE);
        });

        test("Con una parte en preparación, está EN_PREPARACION", () => {
            primera.enPreparacion();

            expect(instance.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });

        test("Con una parte lista y otra pendiente, está EN_PREPARACION", () => {
            primera.listo();

            expect(instance.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        });

        test("Con todas las partes listas, está LISTO", () => {
            primera.listo();
            segunda.listo();

            expect(instance.getEstado()).toBe(EstadoItem.LISTO);
        });

        test("Si alguna parte ya empezó, no puede modificarse", () => {
            primera.enPreparacion();

            expect(instance.puedeModificarse()).toBe(false);
        });
    });
});
