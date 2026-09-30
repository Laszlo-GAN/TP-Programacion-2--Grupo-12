// Una acción que se puede aplicar sobre un pedido y después deshacer
export interface Acciones {
    aplicar(): void;
    deshacer(): void;
}
