import { beforeEach, describe, expect, test } from "@jest/globals";
import { EstadoEstacion } from "../src/estacion/stateEstacion/estadoEstacion";
import EstacionLibre from "../src/estacion/stateEstacion/estacionLibre";
import EstacionOcupada from "../src/estacion/stateEstacion/estacionOcupada";
import { EstacionMock } from "./mocks";
import { Estacion } from "../src/estacion/estacion";

describe("Test para las clases de EstadoEstacion", () => {
    class EstadoEstacionConcreto extends EstadoEstacion {
        public ocuparse(): void {
            throw new Error("La clase abstracta no puede ocuparse.");
        }
        public liberarse(): void {
            throw new Error("La clase abstracta no puede liberarse.");
        }
        public procesarSiguiente(): void {
            throw new Error("La clase abstracta no puede procesar el siguiente item.");
        }
    }

    let instance: EstadoEstacionConcreto;
    let estadoLibre: EstacionLibre;
    let estadoOcupado: EstacionOcupada;

    beforeEach(() => {
        instance = new EstadoEstacionConcreto(EstacionMock);
        estadoLibre = new EstacionLibre(EstacionMock);
        estadoOcupado = new EstacionOcupada(EstacionMock);
    });

    test("Verifico que sea una instancia de EstadoEstacion", ()=> {
        expect(instance).toBeInstanceOf(EstadoEstacion);
    });
    
    test("Verifico que sea una instancia de EstacionLibre", () => {
        expect(estadoLibre).toBeInstanceOf(EstadoEstacion);
        expect(estadoLibre).toBeInstanceOf(EstacionLibre);
    });
    
    test("Verifico que sea una instancia de EstacionOcupada", () => {
        expect(estadoOcupado).toBeInstanceOf(EstadoEstacion);
        expect(estadoOcupado).toBeInstanceOf(EstacionOcupada);
    });

    test("Verifico que setee su Estacion correctamente", () => {
        instance.setEstacion(EstacionMock);
        expect(instance.getEstacion()).toBe(EstacionMock);
    });

    test("Verifico que pueda Ocuparse correctamente", () => {
        estadoLibre.ocuparse();

        expect(EstacionMock.cambiarEstado).toHaveBeenCalled;
    });

    test("Verifico que pueda Liberarse correctamente", () => {
        estadoOcupado.liberarse();

        expect(EstacionMock.cambiarEstado).toHaveBeenCalled;
    });

    test("Verfico que procese el siguiente Item si la estación esta Libre", () => {
        estadoLibre.procesarSiguiente();

        expect(EstacionMock.procesarItemActual).toHaveBeenCalled;
        expect(EstacionMock.setItemActual).toHaveBeenCalled;
    })

    test("Verifico que no procese el siguiente si sigue Ocupada", () => {
        expect(estadoOcupado.procesarSiguiente()).toBeUndefined;
    })

    test("Verifico que no se pueda volver a Liberar", () => {
        expect(() => estadoLibre.liberarse()).toThrow("La estación ya se encuentra disponible");
    })

    test("Verifico que no se pueda volver a Ocupar", () => {
        expect(estadoOcupado.ocuparse()).toBeUndefined();
    })
});