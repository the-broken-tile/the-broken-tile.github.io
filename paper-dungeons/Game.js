function Game(eventDispatcher, state) {
    const game = this;
    const movement = state.movement;
    let damage = state.damage;
    let revived = state.revived;
    let status = state.status;
    const dice = [
        new Die(BLACK_DIE),
        new Die(BLACK_DIE),
        new Die(BLACK_DIE),
        new Die(WHITE_DIE),
        new Die(WHITE_DIE),
        new Die(WHITE_DIE),
    ];
    const potions = new Potions({...state.potions});
    const gems = new Gems();
    // Clone, so we can mutate.
    const dungeon = JSON.parse(JSON.stringify(grid));
    const flatDungeon = Object.entries(dungeon).reduce(function (carry, [column, rows]) {
        Object.entries(rows).forEach(function ([row, cell]) {
            carry.push({...cell, row, column});
        });

        return carry;
    }, [])
    const heroes = Object
        .entries(state.heroes)
        .map(([name, {level, trainingStyle}]) => new Hero(name, level, trainingStyle));
    const getCell = ({row, column}) => flatDungeon.find(cell => cell.column === column && cell.row === row);
    const initScenarioCell = (row, col, data) => {
        const cell = dungeon[col][row];
        const {directions, monster} = data;

        if (monster) {
            cell.monster = monster;
        }

        if (directions) {
            cell.directions = cell.directions || [];
            Object.entries(directions).forEach(function ([column, rowDefinitions]) {
                Object.entries(rowDefinitions).forEach(function ([row, type]) {
                    cell.directions[column][row] = type;
                });
            });
        }
    }
    const pickTreasure = (cell, treasure) => {
        if (treasure === TREASURE_LEVEL_UP) {
            const oldStatus = status;
            status = STATUS_LEVELLING_UP;
            eventDispatcher.trigger(EVENT_GAME_STATUS_CHANGED, [oldStatus, status]);

            return;
        }

        if (treasure === TREASURE_CRAFT_ARTIFACT) {
            const oldStatus = status;
            status = STATUS_CRAFTING;
            eventDispatcher.trigger(EVENT_GAME_STATUS_CHANGED, [oldStatus, status]);

            return;
        }

        if (treasure === TREASURE_POTION) {
            game.craftPotion();

            return;
        }

        if (GEMS.includes(treasure)) {
            // @todo circle it on the map.
            game.collectGem(cell);
        }
    };
    const getHeroesPoints = () => {
        const lowestLevel = heroes
            .reduce((carry, hero) => Math.min(carry, hero.getLevel()), 1);
        const maxLevelCount = heroes
            .filter(hero => hero.getLevel() === HEROES_POINTS.length - 1)
            .length;

        return HEROES_POINTS[lowestLevel] + maxLevelCount;
    };

    //Getters.
    this.getStatus = () => status;
    this.getHeroes = () => heroes;
    this.getHealth = () => heroes.reduce((health, hero) => health + hero.getLevel(), 0);
    this.getDamage = () => damage;
    this.getPotions = () => potions;
    this.getKilledMinions = () => flatDungeon
        .filter(cell => cell.minion && cell.minion.killed);
    this.getLocation = () => movement.length ? movement[movement.length - 1] : null;
    this.getMovement = () => movement;
    this.getDungeon = () => dungeon;
    this.getDungeonFlat = () => flatDungeon;
    this.selectScenario = ({ grid, name }) => {
        eventDispatcher.trigger(EVENT_SELECT_SCENARIO, [null, name]);
        Object.entries(grid).forEach(function([column, rows]) {
            Object.entries(rows).forEach(function ([row, rowDefinition]) {
                initScenarioCell(row, column, rowDefinition);
            });
        });
    };
    this.getHero = heroName => heroes.find(hero => hero.getName() === heroName);
    this.getEntrances = function () {
        return this.getDungeonFlat().filter(cell => cell.entrance);
    };
    this.getPoints = function() {
        return [
            0, // monster 1
            0, // monster 2
            0, // monster 3
            getHeroesPoints(),
            0, // artifacts
            0, // gems
            MINION_POINTS[this.getKilledMinions().length],
            0, // damage,
            revived ? REVIVED_POINTS : 0,
            0, // missions/goals?
            0, // other missions or whatever they're called
        ];
    };
    this.getTotalPoints = function () {
        return this.getPoints().reduce((carry, points) => carry + points, 0);
    };

    // Actions.
    this.selectHeroTrainingStyle = function(heroName) {
        this.getHero(heroName).updateTrainingStyle(TRAINING_STYLE_BLACK);
        eventDispatcher.trigger(EVENT_TRAINING_STYLE_CHANGED, {
            hero: heroName,
            trainingStyle: TRAINING_STYLE_BLACK
        });

        if (heroes.filter(hero => hero.getTrainingStyle() === TRAINING_STYLE_BLACK).length === 2) {
            status = STATUS_ROUND;
            eventDispatcher.trigger(EVENT_GAME_STATUS_CHANGED, [STATUS_INIT, STATUS_ROUND]);
            this.nextRound();
        }
    };
    this.levelHero = function (heroName) {
        const hero = this.getHero(heroName);
        const previousPoints = this.getTotalPoints();
        hero.levelUp();
        eventDispatcher.trigger(EVENT_POINTS_CHANGE, [previousPoints, this.getTotalPoints()]);
    };
    this.enterDungeon = function (cell) {
        this.enterCell(cell);
    };
    this.enterCell = function (cell) {
        const oldCountKilledMinionsCount = this.getKilledMinions().length;
        const prevCell = this.getLocation();
        movement.push(cell);
        eventDispatcher.trigger(EVENT_DUNGEON_MOVE, [prevCell, cell]);
        if (cell.trap) {
            this.takeDamage();
        }

        if (cell.minion) {
            const { level, type } = cell.minion;
            const weakAgainst = MONSTER_WEAKNESS[type];
            const hero = this.getHero(weakAgainst);
            if (level > hero.getLevel()) {
                this.takeDamage();
            }
            cell.minion.killed = true;
            // @todo handle
            eventDispatcher.trigger(EVENT_KILL_MINION, cell);
            // @todo cross out the minion.
        }

        if (cell.treasure) {
            cell.treasure.forEach(treasure => {
                pickTreasure(cell, treasure);
            });
        }
    };
    this.takeDamage = function () {
        if (potions.canTakeDamage()) {
            potions.tageDamage();
            eventDispatcher.trigger(
                EVENT_TAKE_POTION_DAMAGE,
                [potions.tageDamage() - 1, potions.getDamage],
            );

            return;
        }

        damage++;
        eventDispatcher.trigger(EVENT_TAKE_DAMAGE, [damage - 1, damage]);

        if (damage > this.getHealth() && !revived) {
            revived = true;
            eventDispatcher.trigger(EVENT_REVIVED, [false, true]);
        }
    };
    this.rollDice = function () {
        const haveThreeSkullsOrClovers = () => {
            const counters = dice.reduce((carry, die) => {
                const symbol = die.getSymbol();
                if (carry[symbol] !== undefined) {
                    carry[symbol]++;
                }

                return carry;
            }, {[DIE_SYMBOL_SKULL]: 0, [DIE_SYMBOL_CLOVER]: 0});

            return counters[DIE_SYMBOL_CLOVER] > 2 || counters[DIE_SYMBOL_SKULL] > 2;
        };

        do {
            dice.forEach(die => die.roll());
        } while (haveThreeSkullsOrClovers());
    };
    this.nextRound = function () {
        this.rollDice();
    };
    this.craftPotion = function () {
        potions.craft();
        eventDispatcher.trigger(EVENT_CRAFT_POTION, [potions.getCount() - 1, potions.getCount()]);
        if (potions.getCount() === Potions.MAX) {
            this.collectGem();
            // get gem.
            // @todo other two bonuses.
        }
    };
    this.collectGem = function (cell = null) {
        gems.collect();
        eventDispatcher.trigger(EVENT_COLLECT_GEM, {
            cell,
            count: gems.getCount(),
        });
    };

    // Init.
    if (state.scenario) {
        this.selectScenario(state.scenario);
    }
    state.killedMinions.forEach(({row, column}) => {
        const cell = getCell({row, column});
        if (cell.minion) {
            cell.minion.killed = true;
        }
    });
}