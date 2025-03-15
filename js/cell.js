
const CellSpecials = {
    Locked: {icon: 'heart-lock', opaque: true},
    Key: {icon: 'key'},
    Reset: {icon: 'reset'},
};

class Cell {
    dom;
    #color = null;
    row;
    column;

    constructor(row, column) {
        this.dom = document.createElement('div');
        this.dom.classList.add('cell');

        this.row = row;
        this.column = column;
    }

    setColor(color) {
        this.#color = color;
        setColor(this.dom, this.getColor());
        return this;
    }

    canFlood(color) {
        return this.#color === color && !this.special?.opaque;
    }

    getColor() {
        if (this.special?.opaque) {
            return null;
        }
        return this.#color;
    }

    setSpecial(special) {
        if (special === null) {
            // this.dom.innerHTML = '';
            this.dom.classList.remove(this.special?.icon)
        } else {
            this.dom.classList.add(special?.icon)
            // let img = document.createElement("img");
            // img.src = 'icons.svg#' + special.icon;
            // this.dom.appendChild(img);
        }
        this.special = special;
        this.setColor(this.#color);
        return this;
    }

    removeSpecial() {
        this.setSpecial(null);
        return this;
    }
}

