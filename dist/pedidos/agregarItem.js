"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregarItem = void 0;
const quitarItem_1 = require("./quitarItem");
class AgregarItem {
    items;
    item;
    constructor(items, item) {
        this.items = items;
        this.item = item;
    }
    aplicar() {
        this.items.push(this.item);
    }
    deshacer() {
        const inversa = new quitarItem_1.QuitarItem(this.items, this.item);
        inversa.aplicar();
    }
}
exports.AgregarItem = AgregarItem;
//# sourceMappingURL=agregarItem.js.map