import { Parrilla } from "../src/estacion/parrilla";
import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase Parrilla", () => {
    let instance: Parrilla;

    beforeEach(() => {
        instance = new Parrilla("Parrilla 1", EstadoEstacion.LIBRE);
    });

    test("Verificar que sea instancia de Parrilla", () => {
        expect(instance).toBeInstanceOf(Parrilla);
    });

    test("Verificar que sea una Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });

    test("Verificar que su tipo sea PARRILLA", () => {
        expect(instance.getTipo()).toBe(TipoEstacion.PARRILLA);
    });
});
