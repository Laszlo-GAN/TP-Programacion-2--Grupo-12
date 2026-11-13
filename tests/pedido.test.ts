import { Pedido } from "../src/pedidos/pedido";
import { beforeEach, describe, expect, test, jest } from "@jest/globals";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";
import { Cocina } from "../src/estacion/Cocina";
import { CocinaMock, estadoPedidoMock, ItemPedidoMock, ProductoMock } from "./mocks";

describe("Test de la clase Pedido", () => {
    class PedidoConcreto extends Pedido {
        public datosDelPedido(): string {
            return "Pedido de prueba";
        }
    }

    let instance: PedidoConcreto;

    beforeEach(() => {
        instance = new PedidoConcreto("P001", new Date());

        ProductoMock.calcularPrecio.mockReturnValue(150);

        CocinaMock.puedeRecibir.mockReturnValue(true);

        ItemPedidoMock.getProducto.mockReturnValue(ProductoMock);
        ItemPedidoMock.getCantidad.mockReturnValue(2);
        ItemPedidoMock.puedeModificarse.mockReturnValue(true);

        instance.cambiarEstado(estadoPedidoMock);
    });

    test("Verifico que sea instancia de Pedido", () => {
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Verifico que devuelva correctamente su estado", () => {
        expect(instance.getEstado()).toBe(estadoPedidoMock);
    });

    test("Verifico que cambie de estado correctamente", () => {
        let estadoNuevo: EstadoPedido = {
            setPedido: jest.fn()
        } as unknown as EstadoPedido;
        instance.cambiarEstado(estadoNuevo);

        expect(instance.getEstado()).toEqual(estadoNuevo);
    });

    test("Verifico que agregue items correctamente", () => {
        estadoPedidoMock.getConfirmarModificacion.mockReturnValue(true);
        instance.agregarItem(ItemPedidoMock);

        expect(instance.calcularTotalProductos()).toBe(300);
    });

    test("Verifico que quite items correctamente,", () => {
        instance.agregarItem(ItemPedidoMock);
        instance.quitarItem(ItemPedidoMock);

        expect(instance.calcularTotalProductos()).toBe(0);
    });

    test("Verifico que pueda deshacer su útlima modificación", () => {
        instance.agregarItem(ItemPedidoMock);
        instance.quitarItem(ItemPedidoMock);
        
        instance.deshacerUltimaModificacion();
        
        expect(instance.calcularTotalProductos()).toBe(300);
    });

    test("Verifico que el pedido pueda confirmarse correctamente", () => {
        instance.agregarItem(ItemPedidoMock);
        instance.confirmar(CocinaMock);

        expect(CocinaMock.enviarItem).toHaveBeenCalled();
        expect(estadoPedidoMock.confirmarPedido).toHaveBeenCalled();
    });

    test("Verifico que confirme su facturación correctamente", () => {
        estadoPedidoMock.getConfirmarFacturacion.mockReturnValue(true);
        expect(instance.puedeFacturarse()).toEqual(true);
    });

    test("Verifico que pueda finalizar un pedido correctamente", () => {
        estadoPedidoMock.getConfirmarFacturacion.mockReturnValue(true);
        instance.finalizar();
        expect(estadoPedidoMock.finalizarPedido).toHaveBeenCalled();
    });

    test("Verifico que calcule su total de productos correctamente", () => {
        instance.agregarItem(ItemPedidoMock);
        expect(instance.calcularTotalProductos()).toEqual(300);

        instance.quitarItem(ItemPedidoMock);
        expect(instance.calcularTotalProductos()).toEqual(0);
    });

    test("Verifico no pueda lanzar un error al finalizar un pedido no facturable", () => {
        (estadoPedidoMock.getConfirmarFacturacion as jest.Mock).mockReturnValue(false);
        
        expect(() => instance.finalizar()).toThrow("El pedido no se puede finalizar: está sin confirmar o tiene ítems sin terminar");
    });
});