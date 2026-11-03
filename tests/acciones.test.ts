import { AgregarItem } from "../src/pedidos/agregarItem";
import { QuitarItem } from "../src/pedidos/quitarItem";
import { ItemPedido } from "../src/estacion/itemPedido";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { crearItem } from "./mocks";

describe("Test acciones sobre la lista de ítems", () => {
    let items: ItemPedido[];
    let item: ItemPedido;

    beforeEach(() => {
        items = [];
        item = crearItem("I001");
    });

    describe("AgregarItem", () => {
        test("Aplicar agrega el ítem a la lista", () => {
            new AgregarItem(items, item).aplicar();

            expect(items).toEqual([item]);
        });

        test("Deshacer saca el ítem de la lista", () => {
            const accion = new AgregarItem(items, item);
            accion.aplicar();

            accion.deshacer();

            expect(items).toHaveLength(0);
        });
    });

    describe("QuitarItem", () => {
        test("Aplicar saca el ítem de la lista", () => {
            items.push(item);

            new QuitarItem(items, item).aplicar();

            expect(items).toHaveLength(0);
        });

        test("Deshacer vuelve a poner el ítem", () => {
            items.push(item);
            const accion = new QuitarItem(items, item);
            accion.aplicar();

            accion.deshacer();

            expect(items).toEqual([item]);
        });

        test("Deshacer devuelve el ítem a su posición original", () => {
            const primero = crearItem("I001");
            const segundo = crearItem("I002");
            const tercero = crearItem("I003");
            items.push(primero, segundo, tercero);
            const accion = new QuitarItem(items, segundo);
            accion.aplicar();

            accion.deshacer();

            expect(items).toEqual([primero, segundo, tercero]);
        });

        test("Si el ítem no estaba, aplicar y deshacer no cambian la lista", () => {
            const accion = new QuitarItem(items, item);

            accion.aplicar();
            accion.deshacer();

            expect(items).toHaveLength(0);
        });
    });
});
