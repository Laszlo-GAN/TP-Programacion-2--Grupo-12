import { Pedido } from "./pedido";
export interface Acciones {
    aplicar(): void;

    deshacer(): void;

}