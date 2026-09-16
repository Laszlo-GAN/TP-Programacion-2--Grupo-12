import { Pedido } from "./pedido";
export class PedidoEnvio extends Pedido {
    constructor(id: string, fechaHora: number, private direccion: string, private costoEnvio: number){
        super()
    }
    public DatosDelPedido(): void{
        this.getID();
        this.getFechaHora();
        this.getEstado();
    }
    public agregarProducto(): void {
        
    }
    public quitarProducto(): void {
        
    }
    
}