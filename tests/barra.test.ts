import { Barra } from "../src/estacion/barra";
import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase Barra", () => {
    let instance: Barra;

    beforeEach(() => {
        instance = new Barra("Barra 1", EstadoEstacion.LIBRE);
    });

    test("Verificar que sea instancia de Barra", () => {
        expect(instance).toBeInstanceOf(Barra);
    });

    test("Verificar que sea una Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });

    test("Verificar que su tipo sea BARRA", () => {
        expect(instance.getTipo()).toBe(TipoEstacion.BARRA);
    });
});
