import { CocinaDulce } from "../src/estacion/cocinaDulce";
import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { beforeEach, describe, expect, test } from "@jest/globals";

describe("Test clase CocinaDulce", () => {
    let instance: CocinaDulce;

    beforeEach(() => {
        instance = new CocinaDulce("CocinaDulce 1", EstadoEstacion.LIBRE);
    });

    test("Verificar que sea instancia de CocinaDulce", () => {
        expect(instance).toBeInstanceOf(CocinaDulce);
    });

    test("Verificar que sea una Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion);
    });

    test("Verificar que su tipo sea COCINA_DULCE", () => {
        expect(instance.getTipo()).toBe(TipoEstacion.COCINA_DULCE);
    });
});
