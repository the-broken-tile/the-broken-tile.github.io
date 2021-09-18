/**
 * @param {string} containerId
 * @param {int} size
 * @param {int} sectorSize
 * @param {int} cellSize
 * @constructor
 */
function GameView(containerId, size, sectorSize, cellSize) {
    let stage, chipsLayer, bordersLayer;
    let activePlayer = PLAYER_ONE;
    let cells = [];
    let flatCells = [];

    const validate = () => {
        flatCells.forEach(cell => {
            if (cell.empty && cell.owner && !cell.birth) {
                throw new Error(`empty cells shouldn't have an owner @${cell.row}-${cell.column}`);
            }
            if (!cell.empty && !cell.owner) {
                throw new Error(`non-empty cells should have an owner @${cell.row}-${cell.column}`);
            }

            if (cell.birth && !cell.empty) {
                throw new Error(`birth cells should be empty @${cell.row}-${cell.column}`);
            }

            if (cell.birth && !cell.owner) {
                throw new Error(`birth cells should have an owner @${cell.row}-${cell.column}`);
            }

            if (cell.dying && cell.empty) {
                throw new Error(`dying cells can't be empty @${cell.row}-${cell.column}`);
            }
            if (cell.dying && !cell.owner) {
                throw new Error(`dying cells should have an owner @${cell.row}-${cell.column}`);
            }
        });
    };

    const getMajorityOwner = cells => {
        if (cells.length !== 3) {
            return null;
        }
        const owners = cells.map(cell => cell.owner).reduce((carry, owner) => {
            carry[owner] = carry[owner] || 0;
            carry[owner]++;

            return carry;
        }, {});
        const max = Math.max(...Object.values(owners));
        let result = [];
        for (const [key, value] of Object.entries(owners)) {
            if (value === max) {
                result.push(parseInt(key, 10));
            }
        }
        return result.length === 1 ? result[0] : null;
    };

    /**
     *
     * @param {int} row
     * @param {int} column
     */
    const getNeighbours = ({row, column}) => {
        return [
            cells[row - 1] && cells[row - 1][column - 1],
            cells[row - 1] && cells[row - 1][column],
            cells[row - 1] && cells[row - 1][column + 1],
            cells[row][column - 1],
            cells[row][column + 1],
            cells[row + 1] && cells[row + 1][column - 1],
            cells[row + 1] && cells[row + 1][column],
            cells[row + 1] && cells[row + 1][column + 1],
        ].filter(c => c);


    };

    const render = () => {
        DEBUG && validate();
        chipsLayer.destroyChildren();
        flatCells.forEach(cell => {
            if (cell.empty && !cell.birth) {
                return;
            }
            const chip = createChip(cell);
            chipsLayer.add(chip);
        });
    }

    /**
     * @param {empty: boolean, dying: boolean, row: int, column: int} cell
     */
    const checkForUpdates = (cell) => {
        const neighbours = getNeighbours(cell);

        const aliveNeighbours = neighbours.filter(n => !n.empty);

        if (!cell.empty) {
            cell.dying = aliveNeighbours.length >= 4 || aliveNeighbours.length <= 1;
        } else if (aliveNeighbours.length === 3) {
            const newOwner = getMajorityOwner(aliveNeighbours);
            cell.owner = newOwner;
            cell.birth = newOwner !== null;
        }

        // check for new births in empty neighbours
        neighbours.filter(n => n.empty).forEach(neighbour => {
            const aliveNeighbours = getNeighbours(neighbour).filter(n => !n.empty);
            if (aliveNeighbours.length !== 3) {
                neighbour.owner = null;
                neighbour.birth = false;
                return;
            }
            const newOwner = getMajorityOwner(aliveNeighbours);
            neighbour.owner = newOwner;
            neighbour.birth = newOwner !== null;
        });

        // check for new deaths in non-empty neighbours
        aliveNeighbours.forEach(neighbour => {
            const aliveNeighboursCount = getNeighbours(neighbour).filter(n => !n.empty).length;
            neighbour.dying = aliveNeighboursCount >= 4 || aliveNeighboursCount <= 1;
        });
    };

    /**
     * @param {int} row
     *
     * @returns {Konva.Line}
     */
    const createHorizontalBorder = row => new Konva.Line({
        strokeWidth: 1,
        points: [0, row * cellSize, size * cellSize, row * cellSize],
        stroke: row % sectorSize === 0 /*&& row !== 0*/ ? 'red' : 'black',
    });

    /**
     *
     * @param {int} column
     *
     * @returns {Konva.Line}
     */
    const createVerticalBorder = column => new Konva.Line({
        strokeWidth: 1,
        points: [column * cellSize, 0, column * cellSize, size * cellSize],
        stroke: column % sectorSize === 0 /*&& column !== 0*/ ? 'red' : 'black'
    });

    /**
     *
     * @param {int} owner
     * @param {boolean} empty
     * @param {boolean} birth
     * @param {boolean} dying
     * @param {int} row
     * @param {int} column
     *
     * @returns {Konva.Group}
     */
    const createChip = ({owner, empty, birth, dying, row, column}) => {
        if (empty && !birth) {
            return null;
        }
        const chip = new Konva.Circle({
            id: `${row}-${column}`,
            name: 'chip',
            x: column * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2,
            radius: cellSize / 2,
            fill: birth ? 'white' : COLOR_MAP[owner],
            stroke: birth ? COLOR_MAP[owner] : null,
            strokeWidth: birth ? 1 : 0,
        });

        const group = new Konva.Group();
        group.add(chip);

        if (!dying) {
            return group;
        }

        return group.add(new Konva.Line({
            points: [column * cellSize + cellSize, row * cellSize, column * cellSize, row * cellSize + cellSize],
            stroke: CONTRAST_COLOR_MAP[owner],
        }));
    }

    const handleClick = e => {
        const shapeClasses = ['Circle', 'Line'];
        const getCircleShape = target => {
            return target.parent.find('.chip').pop();
        };
        const { target } = e;
        const classname = target.getClassName();
        let cell;
        if (shapeClasses.includes(classname)) {
            const shape = getCircleShape(target);
            const [row, column] = shape.getId().split('-').map(coord => parseInt(coord, 10));
            cell = cells[row][column];
            if (!cell.empty && cell.owner !== activePlayer) {
                return;
            }
            if (!cell.empty) {
                //remove it
                cell.owner = null;
                cell.empty = true;
                cell.dying = false;
                cell.birth = false;
                checkForUpdates(cell);
                render();

                return;
            }
        } else {
            const { pointerPos } = target;
            const { x, y } = pointerPos;
            const row = Math.floor(y / cellSize);
            const column = Math.floor(x / cellSize);
            cell = cells[row][column];
        }

        cell.owner = activePlayer;
        cell.empty = false;
        cell.dying = false;
        cell.birth = false;
        checkForUpdates(cell);
        render();
    };

    this.nextGeneration = () => {
        flatCells.forEach(cell => {
            if (cell.birth) {
                cell.birth = false;
                cell.empty = false;
                return;
            }

            if (cell.dying) {
                cell.empty = true;
                cell.dying = false;
                cell.owner = null;
            }
        });
        flatCells.forEach(checkForUpdates);

        render();
    };

    this.init = () => {
        for (let row = size - 1; row >= 0; row--) {
            cells[row] = [];
            for (let column = size - 1; column >= 0; column--) {
                cells[row][column] = {
                    empty: true,
                    birth: false,
                    dying: false,
                    owner: null,
                    row,
                    column,
                };
                flatCells.push(cells[row][column]);
            }
        }

        stage = new Konva.Stage({
            container: containerId,
            width: size * cellSize,
            height: size * cellSize,
        });
        chipsLayer = new Konva.Layer();
        bordersLayer = new Konva.Layer();

        for (let row = size; row >= 0; row--) {
            bordersLayer.add(createHorizontalBorder(row));
            bordersLayer.add(createVerticalBorder(row));
        }

        stage.add(chipsLayer);
        stage.add(bordersLayer);

        bordersLayer.moveToTop();
        stage.on('click', handleClick);
        if (!DEBUG) {
            return;
        }
        window.bordersLayer = bordersLayer;
        window.chipsLayer = chipsLayer;
        window.cells = cells;
        window.flatCells = flatCells;
    };

    this.updateActivePlayer = newActivePlayer => activePlayer = newActivePlayer;

    this.reset = () => {
        flatCells.forEach(cell => {
            cell.empty = true;
            cell.birth = false;
            cell.dying = false;
            cell.owner = null;
        });

        render();
    };
}