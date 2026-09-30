import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { Estacion } from "../src/estacion/estacion";
import { CocinaDulce } from "../src/estacion/cocinaDulce"
import { beforeEach, describe, expect, jest, test, afterEach } from "@jest/globals";

describe("Test clase CocinaDulce", () => {
    let instance: CocinaDulce

    beforeEach(() => {
        instance = new CocinaDulce("CocinaDulce1", EstadoEstacion.LIBRE)
    });

    afterEach(() => {});

    test("Verificar si es instancia de Barra", () => {
        expect(instance).toBeInstanceOf(CocinaDulce)
    });

    test("Pruebo metodo para determinar a que estacion va", () => {
        //sin implementacion por ahora
    });

})