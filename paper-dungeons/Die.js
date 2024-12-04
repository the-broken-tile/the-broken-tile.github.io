function Die({ sides }) {
    let currentSide = null;
    const random = max => Math.floor(Math.random() * max);

    this.roll = function () {
        const index = random(sides.length);
        currentSide = sides[index];

        return currentSide;
    };

    this.getValue = function () {
        if (currentSide === null) {
            return null;
        }
        return currentSide.value;
    };

    this.getSymbol = function () {
        if (currentSide === null) {
            return null;
        }

        return currentSide.symbol;
    };
}