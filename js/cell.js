
const CellSpecials = {
    Locked: {icon: 'heart-lock', opaque: true},
    Key: {icon: 'key'},
    Reset: {icon: 'reset'},
};
const CellSpecialIcons = [CellSpecials.Locked.icon, CellSpecials.Key.icon, CellSpecials.Reset.icon];

class PureCell {
    #color = null;
    #special = null;
    id;
    row;
    column;

    constructor(id, row, column) {
        this.id = id;
        this.row = row;
        this.column = column;
    }

    setColor(color) {
        this.#color = color;
        return this;
    }

    canFlood(color) {
        return this.#color === color && !this.#special?.opaque;
    }

    getColor() {
        if (this.#special?.opaque) {
            return null;
        }
        return this.#color;
    }

    setSpecial(special) {
        this.#special = special;
        return this;
    }

    getSpecial() {
        return this.#special;
    }

    removeSpecial() {
        this.#special = null;
        return this;
    }
}
