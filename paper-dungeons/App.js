function App(width, height, { game, eventDispatcher }) {
    const app = this;
    this.arrows = [];
    const healthBars = [];
    const damageBars = [];
    const killedMinions = [];
    const potions = [];
    let points;
    const stage = new Konva.Stage({
        container: 'canvas',
        width,
        height,
        // x,
        // y,
    });
    const layers = {
        background: new Konva.Layer(),
        walls: new Konva.Layer(),
        heroLevels: new Konva.Layer(),
        health: new Konva.Layer(),
        minions: new Konva.Layer(),
        potions: new Konva.Layer(),
        points: new Konva.Layer(),
    };

    const handleArrowMouseOver = arrow => {
        if (game.getStatus() !== STATUS_ROUND || game.getLocation() !== null) {
            return;
        }
        arrow.setAttrs({
            stroke: 'black',
            fill: 'black',
        });
    };
    const handleArrowMouseOut = arrow => {
        if (game.getStatus() !== STATUS_ROUND || game.getLocation() !== null) {
            return;
        }
        arrow.setAttrs({
            stroke: 'transparent',
            fill: 'transparent',
        });
    };
    const handleArrowClick = arrow => {
        if (game.getLocation() !== null || game.getStatus() !== STATUS_ROUND) {
            return;
        }

        game.enterDungeon(arrow.cell);
    };
    const handleHeroLevelCheckMouseOver = heroLevelCheck => {
        const { hero: heroName, level } = heroLevelCheck;
        const hero = game.getHero(heroName);

        // hero level
        if (level !== undefined) {
            if (game.getStatus() !== STATUS_ROUND) {
                return;
            }
            if (level === hero.getLevel() + 1) {
                heroLevelCheck.setAttr('opacity', 0.7);
            }

            return;
        }

        // Training style:
        if (game.getStatus() !== STATUS_INIT) {
            return;
        }

        if (hero.getTrainingStyle() !== TRAINING_STYLE_BLACK) {
            heroLevelCheck.setAttr('opacity', 0.7);
        }
    };
    const handleHeroLevelCheckMouseOut = heroLevelCheck => {
        const { level, hero: heroName } = heroLevelCheck;
        const hero = game.getHero(heroName);

        // Hero level.
        if (level !== undefined) {
            if (game.getStatus() !== STATUS_ROUND) {
                return;
            }
            if (level === hero.getLevel() + 1) {
                heroLevelCheck.setAttr('opacity', 0);
            }

            return;
        }

        // Training style:
        if (game.getStatus() !== STATUS_INIT) {
            return;
        }
        if (hero.getTrainingStyle() !== TRAINING_STYLE_BLACK) {
            heroLevelCheck.setAttr('opacity', 0);
        }
    };
    const handleHeroLevelCheckClick = heroLevelCheck => {
        const { hero: heroName, level } = heroLevelCheck;
        const hero = game.getHero(heroName);
        // const hero = game.getHero(heroName);
        if (level !== undefined) {
            const oldLevel = hero.getLevel();
            game.levelHero(heroName);
            heroLevelCheck.setAttr('opacity', 1);
            const newLevel = hero.getLevel();

            if (oldLevel !== newLevel) {
                eventDispatcher.trigger(EVENT_HERO_LEVEL, hero);
            }

            return;
        }

        //Training style.
        if (game.getStatus() !== STATUS_INIT) {
            return;
        }

        game.selectHeroTrainingStyle(heroName);
        heroLevelCheck.setAttr('opacity', 1);
    };
    const handleShapeMouseOver = shape => {
        // if is wall
        //wall => wall.setAttrs({stroke: 'gray'}),
        if (shape instanceof Arrow) {
            return handleArrowMouseOver(shape);
        }

        if (shape instanceof HeroLevelCheck) {
            return handleHeroLevelCheckMouseOver(shape);
        }
    };
    const handleShapeMouseOut = shape => {
        // if is wall
        //wall => wall.setAttrs({stroke: 'transparent'}),
        if (shape instanceof Arrow) {
            return handleArrowMouseOut(shape);
        }
        if (shape instanceof HeroLevelCheck) {
            return handleHeroLevelCheckMouseOut(shape);
        }
    };
    const handleShapeClick =  shape => {
        if (shape instanceof Arrow) {
            return handleArrowClick(shape);
        }
        if (shape instanceof HeroLevelCheck) {
            return handleHeroLevelCheckClick(shape);
        }
    };

    const initBackground = function() {
        Konva.Image.fromURL(IMAGE_BACKGROUND, function (background) {
            background.setAttrs({
                // @todo center.
                width: boardSize,
                height: boardSize,
            });
            layers.background.add(background);
        });
    };
    const initWalls = () => {
        const walls = {};
        // @todo rework with flatDungeon.
        Object.entries(game.getDungeon()).forEach(function ([column, rows]) {
            Object.entries(rows).forEach(function ([row, cell]) {
                // Add walls. Probably needs a separate function.
                Object.entries(cell.directions).forEach(function ([columnTo, rowsTo]) {
                    Object.entries(rowsTo).forEach(function ([rowTo, type]) {
                        const coordinates = [`${column}-${row}`, `${columnTo}-${rowTo}`].sort();
                        walls[coordinates.join('-')] = {type, cell};
                    });
                });
                // @todo add monsters.
            });
        });

        const wallLines = Object.entries(walls).map(function([coordinates, {type, cell}]) {
            if (type === PORTAL) {
                return null;
            }
            const coordinatesArray = coordinates.split('-');
            // We can safely sort the coordinates, as the cells will be
            // adjacent and they always at least one of x1, x2 or y1, y2 will be the same.
            const [y1, y2] = [
                ROW_MAP[coordinatesArray[1]],
                ROW_MAP[coordinatesArray[3]],
            ].sort();
            const [x1, x2] = [
                COLUMN_MAP[coordinatesArray[0]],
                COLUMN_MAP[coordinatesArray[2]],
            ].sort()

            const line = new Konva.Line({
                points: [
                    X_ZERO + HORIZONTAL_WALL_LENGTH * x2,
                    Y_ZERO + VERTICAL_WALL_LENGTH * y2,
                    X_ZERO + HORIZONTAL_WALL_LENGTH * (x2 + (y1 !== y2 ? 1 : 0)),
                    Y_ZERO + VERTICAL_WALL_LENGTH * (y2 + (y1 === y2 ? 1 : 0)),
                ],
                stroke: {
                    [DRAWN_WALL]: 'gray',
                    [WATER]: 'transparent',// so they are hoverable
                    [DOOR]: 'transparent',// so they are hoverable
                    [WALL]: 'transparent',// so they are hoverable
                }[type],
                strokeWidth: 5,
            });
            line.cell = cell;

            return line;
        }).filter(line => line !== null);

        layers.walls.add(...wallLines);
    };
    const initArrows = () => {
        const movement = game.getMovement();
        const enteringCell = movement.length
            ? movement[0]
            : null;
        app.arrows = game.getEntrances().map(function (cell) {
            const { column, row } = cell;
            const x = COLUMN_MAP[column];
            const y = ROW_MAP[row];
            const arrow = new Arrow(
                X_ZERO + x * HORIZONTAL_WALL_LENGTH,
                VERTICAL_WALL_LENGTH / 2 + Y_ZERO + (y + 1) * VERTICAL_WALL_LENGTH,
                enteringCell !== null
                    && enteringCell.row === row && enteringCell.column === column
                    ? 'black'
                    : 'transparent',
            );
            arrow.cell = cell;

            return arrow;
        });
        layers.walls.add(...app.arrows);
    };
    const initHeroLevels = () => {
        const image = new Image();
        image.src = IMAGE_HERO_LEVEL;
        image.onload = function () {
            const check = new HeroLevelCheck({
                width: HERO_LEVELS_SIZE,
                height: HERO_LEVELS_SIZE,
                image,
            });

            // Add levels.
            game.getHeroes().forEach(hero => {
                for (let level = 2; level <= Hero.MAX_LEVEL; level++) {
                    /** @var HeroLevelCheck clone */
                    const clone = check.clone();
                    clone.setAttrs({
                        x: HERO_LEVELS_POSITIONS.x[level],
                        y: HERO_LEVELS_POSITIONS.y[hero.getName()],
                        opacity: level <= hero.getLevel() ? 1 : 0,
                    });
                    clone.level = level;
                    clone.hero = hero.getName();
                    layers.heroLevels.add(clone);
                }

                // Add training styles.
                const trainingStyleClone = check.clone();
                trainingStyleClone.hero = hero.getName();
                const {x, y} = HERO_TRAINING_STYLE_POSITIONS[hero.getName()];
                trainingStyleClone.setAttrs({
                    width: HERO_TRAINING_STYLE_SIZE,
                    height: HERO_TRAINING_STYLE_SIZE,
                    x,
                    y,
                    opacity: hero.getTrainingStyle() === TRAINING_STYLE_BLACK
                        ? 1
                        : 0,
                });
                layers.heroLevels.add(trainingStyleClone);
            });
        };
    };
    const initHealth = () => {
        const image = new Image();
        image.src = IMAGE_HEALTH;

        image.onload = function () {
            const health = new Konva.Image({
                width: HEALTH_SIZE,
                height: HEALTH_SIZE,
                x: HEALTH_X,
                y: HEALTH_Y,
                image,
            });
            for (let h = 0; h < 24; h++) {
                const clone = health.clone();
                clone.setAttrs({
                    y: HEALTH_Y - h * (HEALTH_SIZE + HEALTH_GAP),
                    opacity: h > 3 && h < game.getHealth() ? 1 : 0,
                });
                healthBars.push(clone);
            }
            layers.health.add(...healthBars);
        };
    };
    const initDamage = () => {
        const image = new Image();
        image.src = IMAGE_DAMAGE;

        image.onload = function () {
            const health = new Konva.Image({
                width: DAMAGE_SIZE,
                height: DAMAGE_SIZE,
                x: DAMAGE_X,
                y: DAMAGE_Y,
                image,
            });
            for (let damage = 0; damage < 24; damage++) {
                const clone = health.clone();
                clone.setAttrs({
                    y: HEALTH_Y - damage * (DAMAGE_SIZE + DAMAGE_GAP),
                    opacity: damage < game.getDamage() ? 1 : 0,
                });
                damageBars.push(clone);
            }
            layers.health.add(...damageBars);
        };
    };
    const initMinions = () => {
        const cross = new Konva.Group({

        });
        const lines = [
            new Konva.Line({
                points: [
                    
                ],
                width: 3,
            }),
        ];
    };
    const initMinionKills = () => {
        const image = new Image();
        image.src = IMAGE_KILLED_MINION;

        image.onload = function () {
            const health = new Konva.Image({
                width: MINION_SIZE,
                height: MINION_SIZE,
                x: MINION_X,
                y: MINION_Y,
                image,
            });
            for (let minionIndex = 1; minionIndex < MINION_POINTS.length; minionIndex++) {
                const clone = health.clone();
                clone.setAttrs({
                    x: MINION_X + (minionIndex - 1) * (MINION_SIZE + MINION_GAP),
                    opacity: minionIndex - 1 < game.getKilledMinions().length ? 1 : 0,
                });
                killedMinions.push(clone);
            }
            layers.minions.add(...killedMinions);
        };
    };
    const initPotions = () => {
        const image = new Image();
        image.src = IMAGE_POTION;
        image.onload = () => {
            const potion = new Konva.Image({
                image,
                width: POTION_SIZE,
                height: POTION_SIZE,
            });
            POTION_POSITIONS.forEach((position, index) => {
                const clone = potion.clone();
                clone.setAttrs({
                    ...position,
                    opacity: index < game.getPotions().getCount() ? 1 : 0,
                });
                potions.push(clone);
            });
            layers.potions.add(...potions);
        }
    };
    const initPoints = () => {
        points = new Konva.Text({
            x: boardSize - 52,
            y: boardSize - 47,
            text: game.getTotalPoints(),
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'red',
            align: 'center',
            width: 35,
        });
        layers.points.add(points);
    };
    const initEvents = () => {
        [layers.walls, layers.heroLevels]
            .forEach(layer => layer.on('mouseover', e => {
                const { target } = e;
                handleShapeMouseOver(target);
            }
        ));
        [layers.walls, layers.heroLevels]
            .forEach(layer => layer.on('mouseout', e => {
                const { target } = e;
                handleShapeMouseOut(target);
            }
        ));
        [layers.walls, layers.heroLevels]
            .forEach(layer => layer.on('click', e => {
                const { target } = e;
                handleShapeClick(target);
            }
        ));

        eventDispatcher.on(EVENT_DUNGEON_MOVE, ([previousCell, cell]) => {
            app.arrows.forEach(arrow => {
                // @todo
                if (arrow.cell !== cell) {
                    arrow.destroy();
                }
            });
            app.arrows = [];
        });

        eventDispatcher.on(EVENT_HERO_LEVEL, () => {
            healthBars[game.getHealth() - 1].setAttr('opacity', 1);
        });
        eventDispatcher.on(EVENT_TAKE_DAMAGE, () => {
            damageBars[game.getDamage() - 1].setAttr('opacity', 1);
        });
        eventDispatcher.on(EVENT_KILL_MINION, cell => {
            const count = game.getKilledMinions().length;
            killedMinions[count - 1].setAttr('opacity', 1);
            // @todo cross 'em out.
        });
        eventDispatcher.on(EVENT_CRAFT_POTION, () => {
            const count = game.getPotions().getCount();
            const potionImage = potions[count - 1];
            potionImage.setAttr('opacity', 1);
        });
        eventDispatcher.on(EVENT_POINTS_CHANGE, ([previousPoints, newPoints]) => {
            points.setText(newPoints);
        });
    };
    const initStage = () => {
        Object.values(layers).forEach(layer => stage.add(layer));

        layers.background.moveToBottom();
        layers.heroLevels.moveToTop();

        Object.values(layers).forEach(layer => layer.draw());
    };
    const initDebugging = () => {
        if (!container.debug) {
            return;
        }
        const diagonal = [0, 1, 2, 3, 4, 5, 6]
            .map(number => [number * HORIZONTAL_WALL_LENGTH, number * VERTICAL_WALL_LENGTH])
            .map(([horizontal, vertical]) => new Konva.Line({
                    points: [
                        X_ZERO + horizontal, Y_ZERO + vertical,
                        X_ZERO + horizontal + 1, Y_ZERO + vertical,
                        X_ZERO + horizontal + 1, Y_ZERO + vertical + 1,
                        X_ZERO + horizontal, Y_ZERO + vertical + 1,
                    ],
                    stroke: 'red',
                    strokeWidth: 3,
                }),
            );
        layers.walls.add(...diagonal);
        this.layers = layers;
        this.game = game;
        this.healthBars = healthBars;
    };

    this.init = scenario => {
        game.selectScenario(scenario);
        initWalls();
        initBackground();
        initArrows();
        initHeroLevels();
        initHealth();
        initDamage();
        initMinions();
        initMinionKills();
        initPotions();
        initPoints();
        initDebugging();
        initEvents();
        initStage();
    };
}