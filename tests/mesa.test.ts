import { Mesa } from "../src/pedidos/Mesa";
import { describe, expect, test } from "@jest/globals";

describe("Test clase Mesa", () => {
    const NUMERO = 7;

    test("Devuelve su número", () => {
        expect(new Mesa(NUMERO).getNumero()).toBe(NUMERO);
    });
});
