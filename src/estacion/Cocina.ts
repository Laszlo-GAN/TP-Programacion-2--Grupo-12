import { Estacion } from "./estacion";
import { ItemPedido } from "./itemPedido";
import { ProductoUnico } from "./productoUnico";
import { TipoEstacion } from "./TipoEstacion";

/**
 * Coordina la validación y distribución de los ítems de un pedido hacia
 * las distintas estaciones de trabajo disponibles en la cocina.
 */
export class Cocina {
    private estaciones: Estacion[];

    /**
     * Inicializa la cocina con el conjunto de estaciones disponibles.
     * @param estaciones = Arreglo de estaciones de cocina habilitadas.
     */
    public constructor(estaciones: Estacion[]) {
        this.estaciones = estaciones;
    }

    /**
     * Determina y devuelve la estación encargada de preparar un producto único.
     * Lanza un error si la cocina no posee ninguna estación del tipo requerido por el producto.
     * @param producto = Producto individual a asignar.
     * @returns La instancia de Estacion.
     */
    public aQueEstacionVa(producto: ProductoUnico): Estacion {
        const estacion = this.buscarEstacion(producto);
        if (estacion === undefined) {
            throw new Error("No hay ninguna estación de tipo " + TipoEstacion[producto.estacionDeCocina()]);
        }
        return estacion;
    }
    
    /**
     * Verifica si la cocina cuenta con todas las estaciones necesarias para
     * preparar la totalidad de los productos que componen un ítem de pedido.
     * @param item = Ítem de pedido a evaluar.
     * @returns true si existen estaciones para todos sus productos de cocina
     * false si no existen las estaciones.
     */
    public puedeRecibir(item: ItemPedido): boolean {
        for (const producto of item.getProducto().productosDeCocina()) {
            if (this.buscarEstacion(producto) === undefined) {
                return false;
            }
        }
        return true;
    }
   
    /**
     * Envía los items solicitados a sus respectivas estaciones.
     * Lanza un error si falta alguna estación requerida para preparar el ítem.
     * @param item - Ítem de pedido a procesar en cocina.
     */
    public enviarItem(item: ItemPedido): void {
        if (!this.puedeRecibir(item)) {
            throw new Error("La cocina no puede recibir el ítem: falta una estación");
        }
        const partes: ItemPedido[] = [];
        for (const producto of item.getProducto().productosDeCocina()) {
            const parte = new ItemPedido(item.getCodigo(), producto, item.getCantidad());
            this.aQueEstacionVa(producto).recibirItems(parte);
            partes.push(parte);
        }
        item.asignarPartes(partes);
    }

    /**
     * Busca dentro de las estaciones la que coincida en tipo
     * con la estación requerida por el producto.
     * @param producto = Producto al que se le quiere buscar estación.
     * @returns La instancia de Estacion coincidente, undefined si no existe.
     */
    private buscarEstacion(producto: ProductoUnico): Estacion | undefined {
        const tipo = producto.estacionDeCocina();
        for (const estacion of this.estaciones) {
            if (estacion.getTipo() === tipo) {
                return estacion;
            }
        }
        return undefined;
    }
}
