import { Pedido } from "../src/pedidos/pedido";
import { beforeEach, describe, expect, test, jest } from "@jest/globals";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";
import { Cocina } from "../src/estacion/Cocina";
import PedidoEnConstruccion from "../src/pedidos/statePedido/pedidoEnConstruccion";
import { estadoPedidoMock, ItemPedidoMock } from "./mocks";
import { ItemPedido } from "../src/estacion/itemPedido";

describe("Test de la clase Pedido", () => {
    class PedidoConcreto extends Pedido {
        public datosDelPedido(): string {
            return "Pedido de prueba";
        }
    }

    let instance: PedidoConcreto;
    let ItemPedidoMockConValor: ItemPedido;

    beforeEach(() => {
        ItemPedidoMockConValor = {
            getProducto: jest.fn().mockReturnValue({ calcularPrecio: jest.fn().mockReturnValue(150)}),
            getCantidad: jest.fn().mockReturnValue(2),
            puedeModificarse: jest.fn().mockReturnValue(true)
        } as unknown as ItemPedido;

        instance = new PedidoConcreto("P001", new Date());
    });

    test("Verifico que sea instancia de Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Verifico que devuelva correctamente su estado", () => {
        expect(instance.getEstado()).toBeInstanceOf(PedidoEnConstruccion);
    });

    test("Verifico que cambie de estado correctamente", () => {
        let estadoNuevo: EstadoPedido = {
            setPedido: jest.fn()
        } as unknown as EstadoPedido;
        instance.cambiarEstado(estadoNuevo);

        expect(instance.getEstado()).toEqual(estadoNuevo);
    });

    test("Verifico que agregue items correctamente", () => {
        instance.agregarItem(ItemPedidoMockConValor);

        expect(instance.calcularTotalProductos()).toBe(300);
    });

    test("Verifico que quite items correctamente,", () => {
        instance.agregarItem(ItemPedidoMockConValor);
        instance.quitarItem(ItemPedidoMockConValor);

        expect(instance.calcularTotalProductos()).toBe(0);
    });

    test("Verifico que pueda deshacer su útlima modificación", () => {
        instance.agregarItem(ItemPedidoMockConValor);
        instance.quitarItem(ItemPedidoMockConValor);
        
        instance.deshacerUltimaModificacion();
        
        expect(instance.calcularTotalProductos()).toBe(300);
    });

    test("Verifico que el pedido pueda confirmarse correctamente", () => {
        const cocinaMock = {
            enviarItem: jest.fn()
        } as unknown as Cocina;

        instance.cambiarEstado(estadoPedidoMock);

        instance.agregarItem(ItemPedidoMock);
        instance.confirmar(cocinaMock);

        expect(cocinaMock.enviarItem).toHaveBeenCalledWith(ItemPedidoMock);
        expect(estadoPedidoMock.confirmarPedido).toHaveBeenCalled();
    })

    test("Verifico que confirme su facturación correctamente", () => {
        instance.cambiarEstado(estadoPedidoMock);
        expect(instance.puedeFacturarse()).toEqual(true);
    });

    test("Verifico que pueda finalizar un pedido correctamente", () => {
        instance.cambiarEstado(estadoPedidoMock);
        instance.finalizar();
        expect(estadoPedidoMock.finalizarPedido).toHaveBeenCalled();
    });

    test("Verifico que calcule su total de productos correctamente", () => {
        instance.agregarItem(ItemPedidoMockConValor);
        expect(instance.calcularTotalProductos()).toEqual(300);

        instance.quitarItem(ItemPedidoMockConValor);
        expect(instance.calcularTotalProductos()).toEqual(0);
    });

    test("Verifico no pueda lanzar un error al finalizar un pedido no facturable", () => {
        (estadoPedidoMock.getConfirmarFacturacion as jest.Mock).mockReturnValue(false);
        
        expect(() => instance.finalizar()).toThrow("El pedido no se puede finalizar: está sin confirmar o tiene ítems sin terminar");
    });
});