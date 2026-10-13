import { Pedido } from "../src/pedidos/pedido";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { Estacion } from "../src/estacion/estacion";
import { EstacionMock } from "./mocks"
import { beforeEach, describe, expect, jest, test } from "@jest/globals";



describe("Test clase Estacion", () => {
    let instance: Estacion

    beforeEach(() => {
        instance = new EstacionMock("Estacion1", EstadoEstacion.LIBRE)
    })

    test("Verificar si es instancia de Estacion", () => {
        expect(instance).toBeInstanceOf(Estacion)
    })

    test("La estacion procesa un pedido", () => {
        const pedidoMock = {enPreparacion: jest.fn()} as unknown as Pedido

        instance.recibirItems(pedidoMock);
        
        expect(pedidoMock.enPreparacion).toHaveBeenCalled();
    })

    test("La estacion queda libre despues de procesar", () => {
        const pedidoMock = {enPreparacion: jest.fn()} as unknown as Pedido

        instance.recibirItems(pedidoMock);

        expect(instance.getEstado()).toBe(EstadoEstacion.LIBRE)
    })

    test("No procesa un pedido si la estacion esta ocupada", () => {
        const estacionOcupada = new EstacionMock("Estacion2", EstadoEstacion.OCUPADA);

        const pedidoMock = {enPreparacion: jest.fn()} as unknown as Pedido

        estacionOcupada.recibirItems(pedidoMock)

        expect(pedidoMock.enPreparacion).not.toHaveBeenCalled
    })
})