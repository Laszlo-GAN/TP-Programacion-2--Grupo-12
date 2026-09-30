import { Estaciones } from "../src/estacion/estaciones";
import { ItemPedido } from "../src/estacion/itemPedido";
import { EstadoItem } from "../src/estacion/estadoItem";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { EstacionMock } from "./mocks";

describe("Test clase Estaciones", () => {
    let instance: Estaciones

    beforeEach(() => {
        instance = new Estaciones("Estacion1")
    })

    test("Verificar si es instancia de Estaciones", () => {
        expect(instance).toBeInstanceOf(Estaciones)
    })


    test("Verfificar que se pueda facturar cuando todos los items estan listos", () => {
        const ItemPedidoMock = {getEstado: jest.fn().mockReturnValue(EstadoItem.LISTO)} as unknown as ItemPedido

        instance.agregarItem(ItemPedidoMock)

        expect(instance.puedeFacturarse()).toBe(true)
    })

    test("Verificar que no pueda facturarse cuando un item no esta listo", () => {
        const ItemPedidoMock = {getEstado: jest.fn().mockReturnValue(EstadoItem.EN_PREPARACION)} as unknown as ItemPedido

        instance.agregarItem(ItemPedidoMock)

        expect(instance.puedeFacturarse()).toBe(false)
    })

    test("Verificar que se factura cuando todos los items estan listos", () => {
        const ItemPedidoMock = {getEstado: jest.fn().mockReturnValue(EstadoItem.LISTO)} as unknown as ItemPedido

        instance.agregarItem(ItemPedidoMock)

        instance.Comprobar()

        expect(instance.estaFacturado()).toBe(true)
    })

    test("Verificar que no se puedan facturar si uno de los varios items no esta listo", () => {
        const ItemListoMock = {getEstado: jest.fn().mockReturnValue(EstadoItem.LISTO)} as unknown as ItemPedido

        const ItemNoListoMock = {getEstado: jest.fn().mockReturnValue(EstadoItem.EN_PREPARACION)} as unknown as ItemPedido

        instance.agregarItem(ItemListoMock)

        instance.agregarItem(ItemNoListoMock)

        expect(instance.puedeFacturarse()).toBe(false)
    })
})