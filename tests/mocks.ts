import { Estacion } from "../src/estacion/estacion";
import { ItemPedido } from "../src/estacion/itemPedido";
import { Producto } from "../src/estacion/producto";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { EstadoEstacion } from "../src/estacion/stateEstacion/estadoEstacion";
import { EstadoItem } from "../src/estacion/stateItem/estadoItem";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { Pedido } from "../src/pedidos/pedido";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";
import { jest } from "@jest/globals";

export const estadoPedidoMock: EstadoPedido = {
    setPedido: jest.fn(),
    getConfirmarFacturacion: jest.fn().mockReturnValue(true),
    getConfirmarModificacion: jest.fn().mockReturnValue(true),
    finalizarPedido: jest.fn(),
    confirmarPedido: jest.fn()
} as unknown as EstadoPedido;

export const estadoItemMock: EstadoItem = {
    setItemPedido: jest.fn(),
    confirmarModificacion: jest.fn(),
    getEstaListo: jest.fn().mockReturnValue(false),
    getEstaEnPreparacion: jest.fn().mockReturnValue(false),
    getEstaPendiente: jest.fn().mockReturnValue(false),
    listo: jest.fn(),
    enPreparacion: jest.fn()
} as unknown as EstadoItem;

export const estadoEstacionMock: EstadoEstacion = {
    setEstacion: jest.fn(),
    procesarSiguiente: jest.fn(),
    ocuparse: jest.fn(),
    liberarse: jest.fn()
} as unknown as EstadoEstacion;

export const PedidoMock: Pedido = {
    cambiarEstado: jest.fn(),
    getEstado: jest.fn()
} as unknown as Pedido;

export const ItemPedidoMock: ItemPedido = {
    cambiarEstado: jest.fn(),
    getEstado: jest.fn(),
    getProducto: jest.fn(),
    getCantidad: jest.fn(),
    enPreparacion: jest.fn(),
    listo: jest.fn()
} as any;

export const EstacionMock: Estacion = {
    cambiarEstado: jest.fn(),
    getEstado: jest.fn(),
    getProducto: jest.fn(),
    getCantidad: jest.fn(),
    setItemActual: jest.fn(),
    procesarItemActual: jest.fn()
} as unknown as Estacion;

export const ProductoMock = { } as unknown as Producto;

export function crearItem(codigo: string, precio: number = 100, cantidad: number = 1): ItemPedido {
    return new ItemPedido(codigo, new ProductoUnico(precio, TipoEstacion.PARRILLA), cantidad);
}