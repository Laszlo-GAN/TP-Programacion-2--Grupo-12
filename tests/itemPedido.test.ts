import { ItemPedido } from "../src/estacion/itemPedido";
import { EstadoItem } from "../src/estacion/stateItem/estadoItem";
import { ItemEnPreparacion } from "../src/estacion/stateItem/itemEnPreparacion";
import { ItemListo } from "../src/estacion/stateItem/itemListo";
import { ItemPendiente } from "../src/estacion/stateItem/itemPendiente";
import { beforeEach, describe, expect, test, jest } from "@jest/globals";
import { estadoItemMock, ProductoMock } from "./mocks";

describe("Test clase ItemPedido", () => {
    class ItemPedidoConcreto extends ItemPedido { }
    let instance: ItemPedidoConcreto;

    beforeEach(() => {
        instance = new ItemPedidoConcreto("I001", ProductoMock, 2);
    })

    test("Verifico que la clase sea una instancia de ItemPedido", () => {
        expect(instance).toBeInstanceOf(ItemPedido)
    });

    test("Verifico que la clase se instancie en estado Pendiente", () => {
        expect(instance.getEstado()).toBeInstanceOf(ItemPendiente);
    })

    test("Verifico que se cambie correctamente el estado del Item Pedido", () => {
        let nuevoEstado: EstadoItem;
        nuevoEstado = {
            setItemPedido: jest.fn()
        } as unknown as EstadoItem;

        instance.cambiarEstado(nuevoEstado);
        expect(instance.getEstado()).toEqual(nuevoEstado);
    });

    test("Verifico que mantenga su estado si no tiene partes", () => {
        instance.cambiarEstado(estadoItemMock);
        instance.actualizarEstadoSegunPartes();
        expect(instance.getEstado()).toEqual(estadoItemMock);
    });

    test("Verifico que se actualize su estado a Listo según sus partes", () => {
        const parteMock = {
            setPadre: jest.fn(),
            getEstado: jest.fn().mockReturnValue({
                getEstaListo: jest.fn().mockReturnValue(true),
                getEstaPendiente: jest.fn().mockReturnValue(false)
            })
        } as unknown as ItemPedido;

        instance.asignarPartes([parteMock]);
        instance.actualizarEstadoSegunPartes();

        instance.actualizarEstadoSegunPartes()
        expect(instance.getEstado()).toBeInstanceOf(ItemListo);
    });

    test("Verifico que se actualize su estado a Pendiente según sus partes", () => {
        const parteMock = {
            setPadre: jest.fn(),
            getEstado: jest.fn().mockReturnValue({
                getEstaListo: jest.fn().mockReturnValue(false),
                getEstaPendiente: jest.fn().mockReturnValue(true)
            })
        } as unknown as ItemPedido;

        instance.asignarPartes([parteMock]);
        instance.actualizarEstadoSegunPartes();

        expect(instance.getEstado()).toBeInstanceOf(ItemPendiente);
    });

    test("Verifico que mantenga su estado si hay mezcla de estados en sus partes", () => {
        const parteMock = {
            setPadre: jest.fn(),
            getEstado: jest.fn().mockReturnValue({
                getEstaListo: jest.fn().mockReturnValue(false),
                getEstaPendiente: jest.fn().mockReturnValue(false)
            })
        } as unknown as ItemPedido;

        instance.asignarPartes([parteMock]);
        instance.actualizarEstadoSegunPartes();

        expect(instance.getEstado()).toBeInstanceOf(ItemEnPreparacion);
    });

    test("Verifico que el item pase a prepararse correctamente", () => {
        instance.cambiarEstado(estadoItemMock)
        instance.enPreparacion();

        expect(estadoItemMock.enPreparacion).toHaveBeenCalled();
    });

    test("Verifico que el item se termine correctamente", () => {
        instance.cambiarEstado(estadoItemMock)
        instance.listo();

        expect(estadoItemMock.listo).toHaveBeenCalled();
    });

    test("Verifico que se delegue correctamente la confirmación de modificación según su estado", () => {
        instance.puedeModificarse();

        expect(estadoItemMock.confirmarModificacion).toHaveBeenCalled;
    });
});