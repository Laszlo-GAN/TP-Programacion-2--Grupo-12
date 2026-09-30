import { Estacion } from "../src/estacion/estacion";
import { EstadoItem } from "../src/estacion/estadoItem";
import { ItemPedido } from "../src/estacion/itemPedido";
import { Producto } from "../src/estacion/producto";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

describe("Test clase ItemPedido", () => {
    let instance: ItemPedido
    let ProductoMock: Producto

    beforeEach(() => {
        ProductoMock = {} as Producto

        instance = new ItemPedido("Item1", ProductoMock, 3, EstadoItem.PENDIENTE)
    })

    test("Verificar que sea instancia de ItemPedido", () => {
        expect(instance).toBeInstanceOf(ItemPedido);
    })


    test("Verifico que obtenga correctamente el id", () => {
        expect(instance.getId()).toBe("Item1");
    })


    test("Verifico que obtenga correctamente el producto", () => {
        expect(instance.getProducto()).toBe(ProductoMock);
    })


    test("Verifico que obtenga correctamente la cantidad", () => {
        expect(instance.getCantidad()).toBe(3);
    })


    test("Verifico que un item nuevo esté pendiente", () => {
        expect(instance.getEstado()).toBe(EstadoItem.PENDIENTE);
    })


    test("Verifico que un item pendiente pueda modificarse", () => {
        expect(instance.puedeModificarse()).toBe(true);
    })


    test("Verifico que el item pase a preparación", () => {

        instance.enPreparacion();

        expect(instance.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    })


    test("Verifico que un item en preparación no pueda modificarse", () => {

        instance.enPreparacion();

        expect(instance.puedeModificarse()).toBe(false);
    })


    test("Verifico que el item pase a listo", () => {

        instance.listo();

        expect(instance.getEstado()).toBe(EstadoItem.LISTO);
    })


    test("Verifico que un item listo no pueda modificarse", () => {

        instance.listo();

        expect(instance.puedeModificarse()).toBe(false);
    })

})