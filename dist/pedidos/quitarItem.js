"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuitarItem = void 0;
const UN_ELEMENTO = 1;
class QuitarItem {
    items;
    item;
    seQuito;
    constructor(items, item) {
        this.items = items;
        this.item = item;
        this.seQuito = false;
    }
    aplicar() {
        if (!this.items.includes(this.item)) {
            return;
        }
        const posicion = this.items.indexOf(this.item);
        this.items.splice(posicion, UN_ELEMENTO);
        this.seQuito = true;
    }
    deshacer() {
        if (!this.seQuito) {
            return;
        }
        this.items.push(this.item);
        this.seQuito = false;
    }
}
exports.QuitarItem = QuitarItem;
//# sourceMappingURL=quitarItem.js.map