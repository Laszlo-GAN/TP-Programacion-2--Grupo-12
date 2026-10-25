import { EstadoItem } from "../src/estacion/stateItem/estadoItem";
import { ItemEnPreparacion } from "../src/estacion/stateItem/itemEnPreparacion";
import { ItemListo } from "../src/estacion/stateItem/itemListo";
import { ItemPendiente } from "../src/estacion/stateItem/itemPendiente";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { ItemPedidoMock } from "./mocks";

describe("Test para la clases de EstadoItem", () => {
    class EstadoItemConcreto extends EstadoItem {
        public listo(): void {
            throw new Error("La clase abstracta no puede finalizar el item.");
        }
        public enPreparacion(): void {
            throw new Error("La clase abstracta no puede prepar el item.");
        }
    }

    let estadoPendiente: ItemPendiente;
    let estadoEnPreparacion: ItemEnPreparacion;
    let estadoListo: ItemListo;

    let instance: EstadoItemConcreto;

    beforeEach(() => {
        instance = new EstadoItemConcreto(ItemPedidoMock);

        estadoPendiente = new ItemPendiente(ItemPedidoMock);
        estadoEnPreparacion = new ItemEnPreparacion(ItemPedidoMock);
        estadoListo = new ItemListo(ItemPedidoMock);
    });

    test("Verifico que sea una instancia de EstadoItem", ()=> {
        expect(instance).toBeInstanceOf(EstadoItem);
    })

    test("Verifico que sea una instancia de ItemPendiente", () => {
        expect(estadoPendiente).toBeInstanceOf(EstadoItem);
        expect(estadoPendiente).toBeInstanceOf(ItemPendiente);
    });

    test("Verifico que sea una instancia de ItemEnPreparacion", () => {
        expect(estadoEnPreparacion).toBeInstanceOf(EstadoItem);
        expect(estadoEnPreparacion).toBeInstanceOf(ItemEnPreparacion);
    });

    test("Verifico que sea una instancia de ItemListo", () => {
        expect(estadoListo).toBeInstanceOf(EstadoItem);
        expect(estadoListo).toBeInstanceOf(ItemListo);
    });

    test("Verifico que setee su Item correctamente", () => {
        instance.setItemPedido(ItemPedidoMock);
        expect(instance.getItemPedido()).toBe(ItemPedidoMock);
    })

    test("Verifico que solo pueda modificarse cuando esta Pendiente", () => {
        expect(instance.confirmarModificacion()).toBe(false);

        expect(estadoPendiente.confirmarModificacion()).toBe(true);
        
        expect(estadoEnPreparacion.confirmarModificacion()).toBe(false);

        expect(estadoListo.confirmarModificacion()).toBe(false);
    })

    test("Verifico que solo confirme que esta Listo cuando corresponda", ()=> { 
        expect(instance.getEstaListo()).toBe(false);

        expect(estadoPendiente.getEstaListo()).toBe(false);

        expect(estadoEnPreparacion.getEstaListo()).toBe(false);

        expect(estadoListo.getEstaListo()).toBe(true);
    });

    test("Verifico que solo confirme que esta en Preparación cuando realmente este en Preparación", () => {
        expect(instance.getEstaEnPreparacion()).toBe(false);
        
        expect(estadoPendiente.getEstaEnPreparacion()).toBe(false);

        expect(estadoEnPreparacion.getEstaEnPreparacion()).toBe(true);
        
        expect(estadoListo.getEstaEnPreparacion()).toBe(false);
    })

    test("Verifico que solo confirme que esta Pendiente cuando realmente este Pendiente", ()=> { 
        expect(instance.getEstaPendiente()).toBe(false);

        expect(estadoPendiente.getEstaPendiente()).toBe(true);
        
        expect(estadoEnPreparacion.getEstaPendiente()).toBe(false);

        expect(estadoListo.getEstaPendiente()).toBe(false);
    });

    test("Verifico que pase de estar Pendiente a Prepararse correctamente", () => {
        estadoPendiente.enPreparacion();

        expect(ItemPedidoMock.cambiarEstado).toHaveBeenCalled;
    });

    test("Verifico que pase de Prepararse a Finalizarse correctamente", () => {
        estadoEnPreparacion.listo();

        expect(ItemPedidoMock.cambiarEstado).toHaveBeenCalled;
    });

    test("Verifico que no permita pasar de Pendiente a Listo", () => {
        expect(() => estadoPendiente.listo()).toThrow("El item aún no fue preparado");
    });

    test("Verifico que no permita volver a preparar el Item", () => {
        expect(() => estadoEnPreparacion.enPreparacion()).toThrow("El item ya esta en preparación");
    });

    test("Verifico que no se pueda finalizar un Item dos veces", () => {
        expect(() => estadoListo.listo()).toThrow("El item ya esta listo");
    });

    test("Verifico que no intente preparar un Item si este ya fue terminado", () => {
        expect(() => estadoListo.enPreparacion()).toThrow("La preparación del item fue finalizada con anterioridad");
    });
});