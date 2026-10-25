import { Estacion } from "../src/estacion/estacion";
import { beforeEach, describe, expect, test, jest } from "@jest/globals";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { EstadoEstacion } from "../src/estacion/stateEstacion/estadoEstacion";
import { estadoEstacionMock, ItemPedidoMock } from "./mocks";

describe("Test clase Estacion", () => {
    class EstacionConcreta extends Estacion { }
    let instance: Estacion;

    beforeEach(() => {
        instance = new EstacionConcreta("Estación Uno", TipoEstacion.PARRILLA);

        instance.cambiarEstado(estadoEstacionMock);
    });

    test("Verifico que sea instancia de la clase Estación", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });

    test("Verifico que pueda cambiar de estado correctamente", () => {
        const nuevoEstadoMock: EstadoEstacion = {
            setEstacion: jest.fn()
        } as unknown as EstadoEstacion;

        instance.cambiarEstado(nuevoEstadoMock);
        expect(instance.getEstado()).toEqual(nuevoEstadoMock);
    });

    test("Verifico que setee corretamente el Item Actual", () => {
        instance.setItemActual(ItemPedidoMock);
        expect(instance.getItemActual()).toEqual(ItemPedidoMock);
    });

    test("Verifico que procese correctamente el Item Actual", () => {
        instance.recibirItems(ItemPedidoMock);
        const itemActual = instance.procesarItemActual();

        expect(itemActual).toEqual(ItemPedidoMock);

        const resultadoVacio = instance.procesarItemActual();
        expect(resultadoVacio).toBeUndefined();
    });

    test("Verifico que reciba los items correctamente", () => {
        instance.recibirItems(ItemPedidoMock);

        expect(estadoEstacionMock.procesarSiguiente).toHaveBeenCalled;
        expect(estadoEstacionMock.ocuparse).toHaveBeenCalled;
    });

    test("Verifico que termine el item actual correctamente", () => {
        instance.setItemActual(ItemPedidoMock);
        instance.terminarItemActual();

        expect(ItemPedidoMock.listo).toHaveBeenCalled;
        expect(instance.getItemActual).toBeUndefined;
        expect(estadoEstacionMock.liberarse).toHaveBeenCalled;
    });
});