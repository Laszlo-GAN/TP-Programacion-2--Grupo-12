import { Estacion } from "../src/estacion/estacion";
import { EstadoEstacion } from "../src/estacion/estadoEstacion";
import { ItemPedido } from "../src/estacion/itemPedido";
import { ProductoUnico } from "../src/estacion/productoUnico";
import { TipoEstacion } from "../src/estacion/TipoEstacion";
import { Pedido } from "../src/pedidos/pedido";


export class EstacionMock extends Estacion {
    public constructor(nombre: string, estado: EstadoEstacion) {
        super(nombre, TipoEstacion.PARRILLA, estado);
    }

    public getEstado(): EstadoEstacion {
        return this.estado;
    }

    public getColaItems(): ItemPedido[] {
        return this.colaItems;
    }

    public getNombre(): string {
        return this.nombre;
    }
}

export class PedidoMock extends Pedido {
    public datosDelPedido(): string {
        return "Pedido de prueba";
    }
}


export function crearItem(codigo: string, precio: number = 100, cantidad: number = 1): ItemPedido {
    return new ItemPedido(codigo, new ProductoUnico(precio, TipoEstacion.PARRILLA), cantidad);
}
