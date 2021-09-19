/**
 * @param {string} containerId
 * @param {int} size
 * @param {int} sectorsCount
 * @param {int} cellSize
 * @constructor
 */
function GameView(containerId, size, sectorsCount, cellSize) {
    let stage, chipsLayer, bordersLayer;
    let activePlayer = PLAYER_ONE;
    let cells = [];
    let flatCells = [];
    let sectors = [];
    let sectorsFlat = [];
    const sectorSize = size / sectorsCount;

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
    };

    const isDying = ({sector}, numberOfNeighbours) => {
        const vulnerable = sector.events.find(event => event.name === EVENT_VULNERABILITY);
        const survivor = sector.events.find(event => event.name === EVENT_SURVIVOR);

        return numberOfNeighbours >= (vulnerable ? 2 : 4) || (numberOfNeighbours <= 1 && !survivor);
    };
    const isBirth = ({sector}, numberOfNeighbours) => {
        const asexual = sector.events.find(event => event.name === EVENT_ASEXUAL);
        const impotence = sector.events.find(event => event.name === EVENT_IMPOTENCE);

        return !impotence && numberOfNeighbours === (asexual ? 1 : 3);
    };

    /**
     * @param {empty: boolean, dying: boolean, row: int, column: int} cell
     */
    const checkForUpdates = (cell) => {
        const neighbours = getNeighbours(cell);

        const aliveNeighbours = neighbours.filter(n => !n.empty);

        if (!cell.empty) {
            cell.dying = isDying(cell, aliveNeighbours.length);
        } else if (isBirth(cell, aliveNeighbours.length)) {
            const newOwner = getMajorityOwner(aliveNeighbours);
            cell.owner = newOwner;
            cell.birth = newOwner !== null;
        }

        // check for new births in empty neighbours
        neighbours.filter(n => n.empty).forEach(neighbour => {
            const aliveNeighbours = getNeighbours(neighbour).filter(n => !n.empty);
            neighbour.birth = isBirth(neighbour, aliveNeighbours.length);
            neighbour.owner = neighbour.birth ? getMajorityOwner(aliveNeighbours) : null;
        });

        // check for new deaths in non-empty neighbours
        aliveNeighbours.forEach(neighbour => {
            const aliveNeighboursCount = getNeighbours(neighbour).filter(n => !n.empty).length;
            neighbour.dying = isDying(neighbour, aliveNeighboursCount);
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
        sectorsFlat.forEach(sector => {
            sector.events.forEach(event => event.generations--);
            sector.events = sector.events.filter(event => event.generations > 0);
        });

        flatCells.forEach(checkForUpdates);

        render();
    };

    this.init = () => {
        for (let row = sectorsCount - 1; row >= 0; row--) {
            sectors[row] = [];
            for (let column = sectorsCount - 1; column >= 0; column--) {
                sectors[row][column] = {
                    row,
                    column,
                    events: [],
                    cells: [],
                };
                sectorsFlat.push(sectors[row][column]);
            }
        }

        for (let row = size - 1; row >= 0; row--) {
            cells[row] = [];
            for (let column = size - 1; column >= 0; column--) {
                const sector = sectors[Math.floor(row / sectorSize)][Math.floor(column / sectorSize)];
                cells[row][column] = {
                    empty: true,
                    birth: false,
                    dying: false,
                    owner: null,
                    row,
                    column,
                    sector,
                };
                sector.cells.push(cells[row][column]);
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
        window.sectors = sectors;
        window.sectorsFlat = sectorsFlat;
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

    /**
     * @param {int} row
     * @param {int} column
     */
    this.nukeSector = ({row, column}) => {
        const sector = sectors[row - 1][column - 1];
        sector.cells.forEach(cell => {
            cell.empty = true;
            cell.dying = false;
            cell.owner = null;
            cell.birth = false;
        });
        validate();
        sector.cells.forEach(checkForUpdates);
        render();
    };

    this.addEvent = (event, {row, column}, generations) => {
        const sector = sectors[row - 1][column - 1];
        sector.events.push({
            name: event,
            generations,
        });
        sector.cells.forEach(checkForUpdates);
        render();
    };
}