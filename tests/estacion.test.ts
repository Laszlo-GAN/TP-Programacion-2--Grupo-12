import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { EstadoItem } from "../src/estacion/estadoItem";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { EstacionMock, crearItem } from "./mocks";

describe("Test clase Estacion", () => {
    let instance: EstacionMock;

    beforeEach(() => {
        instance = new EstacionMock("Estacion1", EstadoEstacion.LIBRE);
    });

    test("Verificar que sea instancia de Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });

    test("Verificar que arranque con la cola vacía", () => {
        expect(instance.getColaItems()).toHaveLength(0);
    });

    test("Un ítem que llega a una estación libre pasa a EN_PREPARACION", () => {
        const item = crearItem("I001");

        instance.recibirItems(item);

        expect(item.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    });

    test("La estación queda OCUPADA mientras prepara un ítem", () => {
        instance.recibirItems(crearItem("I001"));

        expect(instance.getEstado()).toBe(EstadoEstacion.OCUPADA);
    });

    test("Un segundo ítem espera en la cola mientras la estación está ocupada", () => {
        const primero = crearItem("I001");
        const segundo = crearItem("I002");

        instance.recibirItems(primero);
        instance.recibirItems(segundo);

        expect(segundo.getEstado()).toBe(EstadoItem.PENDIENTE);
        expect(instance.getColaItems()).toHaveLength(1);
    });

    test("Una estación que arranca OCUPADA no procesa el ítem que recibe", () => {
        const ocupada = new EstacionMock("Estacion2", EstadoEstacion.OCUPADA);
        const item = crearItem("I001");

        ocupada.recibirItems(item);

        expect(item.getEstado()).toBe(EstadoItem.PENDIENTE);
    });

    test("Al terminar el ítem actual queda LISTO y la estación se libera", () => {
        const item = crearItem("I001");
        instance.recibirItems(item);

        instance.terminarItemActual();

        expect(item.getEstado()).toBe(EstadoItem.LISTO);
        expect(instance.getEstado()).toBe(EstadoEstacion.LIBRE);
    });

    test("Al terminar un ítem, la estación empieza con el siguiente de la cola", () => {
        const primero = crearItem("I001");
        const segundo = crearItem("I002");
        instance.recibirItems(primero);
        instance.recibirItems(segundo);

        instance.terminarItemActual();

        expect(segundo.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(instance.getEstado()).toBe(EstadoEstacion.OCUPADA);
        expect(instance.getColaItems()).toHaveLength(0);
    });

    test("Terminar sin ningún ítem en preparación no cambia nada", () => {
        instance.terminarItemActual();

        expect(instance.getEstado()).toBe(EstadoEstacion.LIBRE);
    });

    test("Procesar con la cola vacía deja la estación libre", () => {
        instance.procesarSiguiente();

        expect(instance.getEstado()).toBe(EstadoEstacion.LIBRE);
    });
});
