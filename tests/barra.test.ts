import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { Estacion } from "../src/estacion/estacion";
import { Barra } from "../src/estacion/barra"
import { beforeEach, describe, expect, jest, test, afterEach } from "@jest/globals";

describe("Test clase Barra", () => {
    let instance: Barra

    beforeEach(() => {
        instance = new Barra("Barra1", EstadoEstacion.LIBRE)
    });

    afterEach(() => {});

    test("Verificar si es instancia de Barra", () => {
        expect(instance).toBeInstanceOf(Barra)
    });

    test("Pruebo metodo para determinar a que estacion va", () => {
        //sin implementacion por ahora
    });

})