class Board {
    constructor(parent) {
        this.dom = document.createElement('div');
        this.dom.classList.add('board');
        if (parent) {
            parent.appendChild(this.dom);
        }
    }

    init(name, grid, maxMoves) {
        this.dom.innerHTML = '';

        this.levelName = name;

        this.cells = [];
        this.owned = new Set();
        this.currentColor = null;
        this.start = [];
        this.moves = 0;
        this.maxMoves = maxMoves;

        this.special = {
            lock: null,
            key: null,
            reset: null
        };

        this.height = grid.length;
        this.width = grid[0].length;

        this.dom.style.setProperty('--board-size', grid[0].length);

        let random = [];

        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                let cell = new Cell(row, column);
                this.cells.push(cell);

                if (grid[row][column] === CellKind.Start) {
                    cell.setColor('start');
                    this.start.push(cell);
                }
                if (grid[row][column] === CellKind.Empty) {
                    cell.setColor('empty');
                    this.cells[this.cells.length - 1] = null;
                }
                if (grid[row][column] === CellKind.Random) {
                    let color = getRandomColor();
                    if (this.getCell(row, column - 1)?.getColor() === color ||
                        this.getCell(row - 1, column)?.getColor() === color) {
                        color = getRandomColor();
                    }
                    cell.setColor(color);

                    cell.dom.onclick = () => {
                        if (cell.getColor() === null) return;
                        if (cell.getColor() === this.currentColor) return;

                        this.floodColor(cell.getColor());
                        this.moves += 1;
                        this.updateDoms();
                    };
                    random.push(cell);
                }
                this.dom.appendChild(cell.dom);
            }
        }

        let freeCells = takeRandom(random, 3);

        if (freeCells.length >= 2) {
            this.special.lock = freeCells.pop().setSpecial(CellSpecials.Locked);
            this.special.key = freeCells.pop().setSpecial(CellSpecials.Key);
        }
        if (freeCells.length >= 1) {
            this.special.reset = freeCells.pop().setSpecial(CellSpecials.Reset);
        }

        this.updateDoms();
    }

    getCell(row, column) {
        if (row < 0 || row >= this.height || column < 0 || column >= this.width) return null;
        return this.cells[row * this.width + column];
    }

    getNeighbors(cell) {
        let dr = [1, 0, -1, 0];
        let dc = [0, 1, 0, -1];

        let {row, column} = cell;

        let neighbors = [];
        for (let i = 0; i < 4; i++) {
            let nc = this.getCell(row + dr[i], column + dc[i]);
            if (nc !== null) {
                neighbors.push(nc);
            }
        }
        return neighbors;
    }

    getAvailableNeighbors(cell) {
        return this.getNeighbors(cell).filter(n => !this.owned.has(n));
    }

    getOwnedNeighbor(cell) {
        for (let nc of this.getNeighbors(cell)) {
            if (this.owned.has(nc)) {
                return nc;
            }
        }
        return null;
    }

    floodColorImpl(color, cell, newCells) {
        let hasNeighbours = false;
        this.owned.add(cell);

        for (let nc of this.getAvailableNeighbors(cell)) {
            if (nc.canFlood(color)) {
                newCells.push(nc);
                this.floodColorImpl(color, nc, newCells);
            } else {
                hasNeighbours = true;
            }
        }
        if (hasNeighbours) {
            this.start.push(cell);
        }
    }

    floodColor(newColor) {
        this.currentColor = newColor;

        let hadDirty = false;
        do {
            hadDirty = false;
            let newOwned = [];
            let startCopy = this.start;
            this.start = [];

            for (let cell of startCopy) {
                this.floodColorImpl(newColor, cell, newOwned);
            }

            for (let cell of newOwned) {
                if (this.special.key === null && this.special.reset === null) {
                    break;
                }
                if (cell === this.special.key) {
                    this.special.key.removeSpecial();
                    this.special.key = null;

                    this.special.lock.removeSpecial();
                    let dirty = this.getOwnedNeighbor(this.special.lock);
                    if (dirty !== null) {
                        hadDirty = true;
                    }
                    this.special.lock = null;
                }
                if (cell === this.special.reset) {
                    this.special.reset.removeSpecial();
                    this.special.reset = null;
                    for (let cell of this.cells) {
                        if (!cell) continue;
                        if (this.owned.has(cell)) continue;
                        if (cell.getColor() === null) continue;

                        let color = getRandomColor();
                        if (this.getCell(cell.row - 1, cell.column)?.getColor() === color ||
                            this.getCell(cell.row, cell.column - 1)?.getColor() === color) {
                            color = getRandomColor();
                        }
                        cell.setColor(color);

                        let dirty = this.getOwnedNeighbor(cell) && cell.getColor() === this.currentColor;
                        if (dirty !== null) {
                            hadDirty = true;
                        }
                    }
                }
            }
        } while (hadDirty);

        this.updateDoms();
    }

    updateDoms() {
        for (let cell of this.owned) {
            cell.setColor(this.currentColor);
            cell.dom.classList.add('selected');
        }
        if (this.currentColor !== null) {
            this.dom.setAttribute('data-last', this.currentColor);
        } else {
            this.dom.removeAttribute('data-last');
        }
        document.title = "SPG: " + this.levelName;
        document.getElementById('moves').innerText = this.moves;
        document.getElementById('maxMoves').innerText = this.maxMoves;
    }
}
