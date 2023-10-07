function Save(eventDispatcher, scenarioProvider) {
    const STORAGE_KEY = 'paper_dungeons';
    const storageState = localStorage.getItem(STORAGE_KEY);
    const state = storageState
        ? JSON.parse(storageState)
        : {
            scenario: null,
            heroes: {
                [HERO_WARRIOR]: {
                    level: 1,
                    trainingStyle: TRAINING_STYLE_WHITE,
                },
                [HERO_WIZARD]: {
                    level: 1,
                    trainingStyle: TRAINING_STYLE_WHITE,
                },
                [HERO_CLERIC]: {
                    level: 1,
                    trainingStyle: TRAINING_STYLE_WHITE,
                },
                [HERO_ROGUE]: {
                    level: 1,
                    trainingStyle: TRAINING_STYLE_WHITE,
                },
            },
            movement: [],
            killedMinions: [], // these may match with movement, but there are other ways to kill minions.
            damage: 0,
            potions: {
                count: 0,
                damage: 0,
            },
            revived: false,
            status: STATUS_INIT,
        };

    const save = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    this.load = () => {
        return new Game(
            eventDispatcher,
            {
                ...state,
                scenario: scenarioProvider.getScenario(state.scenario),
            },
        );
    }

    eventDispatcher.on(EVENT_TRAINING_STYLE_CHANGED, ({hero, trainingStyle}) => {
        state.heroes[hero].trainingStyle = trainingStyle;
        save();
    });
    eventDispatcher.on(EVENT_DUNGEON_MOVE, ([prevCell, cell]) => {
        state.movement.push(cell);
        save();
    });
    eventDispatcher.on(EVENT_TAKE_DAMAGE, ([previousDamage, damage]) => {
        state.damage = damage;
        save();
    });
    eventDispatcher.on(EVENT_TAKE_POTION_DAMAGE, ([previousDamage, damage]) => {
        state.potions.damage = damage;
        save();
    });
    eventDispatcher.on(EVENT_CRAFT_POTION, ([previousPotions, potions]) => {
        state.potions.count = potions;
        save();
    });
    eventDispatcher.on(EVENT_REVIVED, ([previousRevived, revived]) => {
        state.revived = revived;
        save();
    });
    eventDispatcher.on(EVENT_GAME_STATUS_CHANGED, ([previousStatus, status]) => {
        state.status = status;
        save();
    });
    eventDispatcher.on(EVENT_SELECT_SCENARIO, ([previousScenario, scenario]) => {
        state.scenario = scenario;
        save();
    });
    eventDispatcher.on(EVENT_HERO_LEVEL, hero => {
        state.heroes[hero.getName()].level = hero.getLevel();
        save();
    });
    eventDispatcher.on(EVENT_KILL_MINION, ({ row, column }) => {
        state.killedMinions.push({row, column});
    });
}