import { afterEach, describe, expect, jest, test } from "@jest/globals";

describe("Programa de demostración (index.ts)", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Se ejecuta de punta a punta sin errores y deja el pedido finalizado", async () => {
        const consola = jest.spyOn(console, "log").mockImplementation(() => undefined);

        await import("../src/index");

        const salida = consola.mock.calls.map((llamada) => llamada.join(" ")).join("\n");
        expect(salida).toContain("Estado del pedido: FINALIZADO");
    });
});
