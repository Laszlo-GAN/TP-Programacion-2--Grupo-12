import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { Estacion } from "../src/estacion/estacion";
import { CocinaFria } from "../src/estacion/cocinaFrea"
import { beforeEach, describe, expect, jest, test, afterEach } from "@jest/globals";


describe("Test clase CocinaFria", () => {
    let instance: CocinaFria

    beforeEach(() => {
        instance = new CocinaFria("CocinaFria1", EstadoEstacion.LIBRE)
    });

    afterEach(() => {});

    test("Verificar si es instancia de Barra", () => {
        expect(instance).toBeInstanceOf(CocinaFria)
    });

    test("Pruebo metodo para determinar a que estacion va", () => {
        //sin implementacion por ahora
    });

})