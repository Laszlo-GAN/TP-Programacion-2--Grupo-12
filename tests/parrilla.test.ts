import { Parrilla } from "../src/estacion/parrilla";
import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

describe("Test clase Parrilla", () => {

    let instance: Parrilla;

    beforeEach(() => {
        instance = new Parrilla("Parrilla", EstadoEstacion.LIBRE);
    });


    test("Verificar que sea instancia de Parrilla", () => {
        expect(instance).toBeInstanceOf(Parrilla);
    });


    test("Verificar que Parrilla sea una Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });


    test("Verificar que tenga el nombre correcto", () => {
        expect(instance.getNombre()).toBe("Parrilla");
    });


    test("Verificar que tenga el estado correcto", () => {
        expect(instance.getEstado()).toBe(EstadoEstacion.LIBRE);
    });


    test("Verificar que la cola empiece vacía", () => {
        expect(instance.getColaItems()).toHaveLength(0);
    });

});