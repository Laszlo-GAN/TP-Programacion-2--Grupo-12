import { ItemPedido } from "./estaciones/itemPedido";
import { EstadoItem } from "./estaciones/estadoItem";

export class Estaciones {
    private id: string;
    private items: ItemPedido[];
    private facturado: boolean;

    constructor(id: string) 
    {
        this.id = id;
        this.items = [];
        this.facturado = false;
    }

    public agregarItem(item: ItemPedido): void 
    {
        this.items.push(item);
    }
    
    public puedeFacturarse(): boolean {
    var puedeFacturar = true;

    for (var item of this.items) 
    {
        if (item.getEstado() !== EstadoItem.LISTO) 
        {
            puedeFacturar = false;
        }
    }

    return puedeFacturar;
}

    public Comprobar(): void 
    {
        if (this.puedeFacturarse()) 
        {
            this.facturado = true;
        }
    }

    public estaFacturado(): boolean 
    {
        return this.facturado;
    }
}