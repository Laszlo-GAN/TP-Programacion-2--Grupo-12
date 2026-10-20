import { CocinaFria } from "../src/estacion/cocinaFrea";
import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase CocinaFria", () => {
    let instance: CocinaFria;

    beforeEach(() => {
        instance = new CocinaFria("CocinaFria 1", EstadoEstacion.LIBRE);
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
