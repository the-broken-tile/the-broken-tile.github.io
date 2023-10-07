class Arrow extends Konva.Line {
    constructor(x, y, color) {
        super({
            points: [
                x + HORIZONTAL_WALL_LENGTH / 2,
                y,

                x + HORIZONTAL_WALL_LENGTH / 2,
                y - VERTICAL_WALL_LENGTH / 3,

                x + 3 * HORIZONTAL_WALL_LENGTH / 8,
                y - VERTICAL_WALL_LENGTH / 3,

                x + HORIZONTAL_WALL_LENGTH / 2,
                y - VERTICAL_WALL_LENGTH / 2,

                x + 5 * HORIZONTAL_WALL_LENGTH / 8,
                y - VERTICAL_WALL_LENGTH / 3,

                x + HORIZONTAL_WALL_LENGTH / 2,
                y - VERTICAL_WALL_LENGTH / 3,
                // x + WALL_LENGTH / 3,
                // y,
                // x + WALL_LENGTH / 2,
                // y - WALL_LENGTH / 2,
                // x + 2 * WALL_LENGTH / 3,
                // y,
            ],
            fill: color,
            stroke: color,
            strokeWidth: 2,
            closed: true,
        });
    };
}