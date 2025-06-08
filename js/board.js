class PureBoard {
    constructor(name, grid, maxMoves) {
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

        let random = [];

        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                let cell = new PureCell(this.cells.length, row, column);
                this.cells.push(cell);

                if (grid[row][column] === CellKind.Start) {
                    cell.setColor(CellColors.Start);
                    this.start.push(cell);
                }
                if (grid[row][column] === CellKind.Empty) {
                    cell.setColor(CellColors.Empty);
                }
                if (grid[row][column] === CellKind.Random) {
                    let color = getRandomColor();
                    if (this.getCell(row, column - 1)?.getColor() === color ||
                        this.getCell(row - 1, column)?.getColor() === color) {
                        color = getRandomColor();
                    }
                    cell.setColor(color);
                    random.push(cell);
                }
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
            if (nc !== null && nc.getColor() !== CellColors.Empty) {
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
        if (newColor === null) return;
        if (newColor === this.currentColor) return;
        this.currentColor = newColor;

        this.moves += 1;

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
                        if (cell.getColor() === CellColors.Empty) continue;

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

        for (let cell of this.owned) {
            cell.setColor(this.currentColor);
        }
    }

    bestColor() {
        if (this.start.length === 0) {
            return null;
        }
        let colorCount = new Array(10);
        colorCount.fill(0, 0);
        for (let cell of this.start) {
            for (let nc of this.getAvailableNeighbors(cell)) {
                let color = parseInt(nc.getColor());
                if (color) {
                    colorCount[color]++;
                }
            }
        }
        let max = 0;
        let maxColor = [];
        for (let i = 0; i < colorCount.length; i++) {
            if (colorCount[i] === 0) continue;
            if (colorCount[i] === max) {
                maxColor.push(i);
                continue;
            }
            if (colorCount[i] > max) {
                max = colorCount[i];
                maxColor = [i];
            }
        }

        if (maxColor.length === 0)
            return null;

        return '' + getRandom(maxColor);
    }
}

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

        this.state = new PureBoard(name, grid, maxMoves);

        this.dom.style.setProperty('--board-size', this.state.width);

        this.cellMap = [];
        for (let cell of this.state.cells) {
            let cellDom = document.createElement('div');
            cellDom.classList.add('cell');
            let cellColor = cell.getColor();
            if (cellColor !== CellColors.Empty && cellColor !== CellColors.Start) {
                cellDom.onclick = e => {
                    this.state.floodColor(cell.getColor());
                    this.updateDoms();
                };
            }
            this.cellMap.push(cellDom)
            this.dom.appendChild(cellDom);
        }

        this.updateDoms();
    }

    updateDoms() {
        for (let cell of this.state.cells) {
            let cellDom = this.cellMap[cell.id];

            if (this.state.owned.has(cell)) {
                cellDom.classList.add('selected');
            }

            let cellSpecial = cell.getSpecial();
            if (cellSpecial === null) {
                cellDom.classList.remove(...CellSpecialIcons);
            } else {
                cellDom.classList.add(cellSpecial.icon);
            }
            setColor(cellDom, cell.getColor());
        }
        if (this.state.currentColor !== null) {
            this.dom.setAttribute('data-last', this.state.currentColor);
        } else {
            this.dom.removeAttribute('data-last');
        }
        document.title = "SPG: " + this.state.levelName;
        document.getElementById('moves').innerText = this.state.moves;
        document.getElementById('maxMoves').innerText = this.state.maxMoves;
    }

    playBestMove() {
        let bestMove = this.state.bestColor();
        if (bestMove !== null) {
            this.state.floodColor(bestMove);
            this.updateDoms();
            return true;
        }
        return false;
    }
}
