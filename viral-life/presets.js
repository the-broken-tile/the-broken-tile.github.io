const GLIDER = {
    name: 'glider',
    cells: [
        {
            row: 0,
            column: 0,
        }, {
            row: 1,
            column: 1,
        }, {
            row: 1,
            column: 3,
        }, {
            row: 2,
            column: 0,
        }, {
            row: 2,
            column: 1
        },
    ]
};

const translate = (cells, offset) => {
    return cells.map(cell => {
        return {
            ...cell,
            row: cell.row + offset.row,
            column: cell.column + offset.column,
        };
    });
};

const rotate = (cells, degree) => {
    return cells.map(cell => {
        return {
            ...cell,
            row: Math.round(cell.column * Math.sin(degree) + cell.row * Math.cos(degree)),
            column: Math.round(cell.column * Math.cos(degree) - cell.row * Math.sin(degree)),
        }
    });
};