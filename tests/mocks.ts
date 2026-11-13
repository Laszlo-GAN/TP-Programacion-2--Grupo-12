import { Cocina } from "../src/estacion/Cocina";
import { Estacion } from "../src/estacion/estacion";
import { ItemPedido } from "../src/estacion/itemPedido";
import { Producto } from "../src/estacion/producto";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { EstadoEstacion } from "../src/estacion/stateEstacion/estadoEstacion";
import { EstadoItem } from "../src/estacion/stateItem/estadoItem";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { Pedido } from "../src/pedidos/pedido";
import { EstadoPedido } from "../src/pedidos/statePedido/estadoPedido";
import { MockProxy, mock } from 'jest-mock-extended';

export const myMock: MockProxy<Pedido> = mock<Pedido>();
export const estadoPedidoMock: MockProxy<EstadoPedido> = mock<EstadoPedido>();
export const estadoItemMock: MockProxy<EstadoItem> = mock<EstadoItem>();
export const estadoEstacionMock: MockProxy<EstadoEstacion> = mock<EstadoEstacion>();
export const PedidoMock: MockProxy<Pedido> = mock<Pedido>();
export const ItemPedidoMock: MockProxy<ItemPedido> = mock<ItemPedido>();
export const EstacionMock: MockProxy<Estacion> = mock<Estacion>();
export const ProductoMock: MockProxy<Producto> = mock<Producto>();
export const CocinaMock: MockProxy<Cocina> = mock<Cocina>();

export function crearItem(codigo: string, precio: number = 100, cantidad: number = 1): ItemPedido {
    return new ItemPedido(codigo, new ProductoUnico(precio, TipoEstacion.PARRILLA), cantidad);
}