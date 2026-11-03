import { CocinaFria } from "../src/estacion/cocinaFria";
import { Estacion } from "../src/estacion/estacion";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test, jest } from "@jest/globals";

describe("Test clase CocinaFria", () => {
    let instance: CocinaFria;

    beforeEach(() => {
        instance = new CocinaFria("CocinaFria 1");
    });

    test("Verificar que sea instancia de CocinaFria", () => {
        expect(instance).toBeInstanceOf(CocinaFria);
    });

    test("Verificar que sea una Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });

    test("Verificar que su tipo sea COCINA_FRIA", () => {
        expect(instance.getTipo()).toBe(TipoEstacion.COCINA_FRIA);
    });
});
