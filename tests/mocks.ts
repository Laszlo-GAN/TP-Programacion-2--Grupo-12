import { Estacion } from "../src/estacion/estacion"
import { EstadoEstacion } from "../src/estacion/estadoEstacion"
import { Pedido } from "../src/pedidos/pedido"
import { Producto } from "../src/estacion/producto"


export class EstacionMock extends Estacion {
    protected aQueEstacionVa(): void {}
    
    public getEstado(): EstadoEstacion {
        return this.estado
    }

    public getColaItems(): Pedido[] {
        return this.colaItems
    }
}

export class PedidoMock extends Pedido {
    public DatosDelPedido(): string {
        return "Pedido de prueba";
    }
}

export class ProductoMock extends Producto {

    precioBase: number = 100;

    public precioConBeneficio(): number {
        return 120;
    }

    public estacionDeCocina(): string {
        return "Parrilla";
    }

    public beneficio(): number {
        return 20;
    }
}
