const { innerWidth: width, innerHeight: height} = window;
const boardSize = Math.min(width, height);

const HERO_LEVELS_SIZE = 20;
const HERO_LEVELS_X_COEF = 0.1430615164520744; // 100
const HERO_LEVELS_X = HERO_LEVELS_X_COEF * boardSize;
const HERO_LEVELS_Y_COEF = 0.09728183118741059; // 68
const HERO_LEVELS_Y = HERO_LEVELS_Y_COEF * boardSize;

const HERO_LEVELS_POSITIONS = {
    x: {
        2: HERO_LEVELS_X,
        3: HERO_LEVELS_X + HERO_LEVELS_SIZE + 8,
        4: HERO_LEVELS_X + HERO_LEVELS_SIZE * 2 + 16,
        5: HERO_LEVELS_X + HERO_LEVELS_SIZE * 4 + 23,
        6: HERO_LEVELS_X + HERO_LEVELS_SIZE * 5 + 30,
    },
    y: {
        [HERO_WARRIOR]: HERO_LEVELS_Y,
        [HERO_WIZARD]: HERO_LEVELS_Y + HERO_LEVELS_SIZE + 11,
        [HERO_CLERIC]: HERO_LEVELS_Y + HERO_LEVELS_SIZE * 2 + 21,
        [HERO_ROGUE]: HERO_LEVELS_Y + HERO_LEVELS_SIZE * 3 + 32,
    },
};
const HERO_TRAINING_STYLE_SIZE = 12;
const HERO_TRAINING_STYLE_X = HERO_LEVELS_X - 46;
const HERO_TRAINING_STYLE_Y = HERO_LEVELS_Y + 13;

const HERO_TRAINING_STYLE_POSITIONS = {
    [HERO_WARRIOR]: {x: HERO_TRAINING_STYLE_X, y: HERO_TRAINING_STYLE_Y},
    [HERO_WIZARD]: {x: HERO_TRAINING_STYLE_X, y: HERO_TRAINING_STYLE_Y + HERO_LEVELS_SIZE + 11},
    [HERO_CLERIC]: {x: HERO_TRAINING_STYLE_X, y: HERO_TRAINING_STYLE_Y + HERO_LEVELS_SIZE * 2 + 21},
    [HERO_ROGUE]: {x: HERO_TRAINING_STYLE_X, y: HERO_TRAINING_STYLE_Y + HERO_LEVELS_SIZE * 3 + 32},
};

const HEALTH_SIZE = 16;
const HEALTH_X = 27;
const HEALTH_Y = 623;
const HEALTH_GAP = 1.75;

const DAMAGE_SIZE = HEALTH_SIZE;
const DAMAGE_X = HEALTH_X + 40;
const DAMAGE_Y = HEALTH_Y;
const DAMAGE_GAP = HEALTH_GAP;

const MINION_SIZE = HERO_LEVELS_SIZE - 3;
const MINION_X = 411;
const MINION_Y = 548;
const MINION_GAP = 5.55;

const X_ZERO_COEF = 0.41487839771101576; // 290
const X_ZERO = X_ZERO_COEF * boardSize;
const Y_ZERO_COEF = 0.09012875536480687; // 63
const Y_ZERO = Y_ZERO_COEF * height;

const HORIZONTAL_WALL_LENGTH = 63;
const VERTICAL_WALL_LENGTH = 65;

const POTION_SIZE = HEALTH_SIZE;
const POTION_POSITIONS = [
    {
        x: 113,
        y: 555,
    }, {
        x: 147,
        y: 555,
    }, {
        x: 181,
        y: 555,
    }, {
        x: 214,
        y: 555,
    }, {
        x: 113,
        y: 595,
    }, {
        x: 147,
        y: 595,
    }, {
        x: 181,
        y: 595,
    }, {
        x: 214,
        y: 595,
    }, {
        x: 113,
        y: 635,
    }, {
        x: 147,
        y: 635,
    }, {
        x: 181,
        y: 635,
    }, {
        x: 214,
        y: 635,
    },
];

// const onResize = () => stage.x = ...

const container = {};
container.debug = true;
container.eventDispatcher = new EventDispatcher();
container.scenarioProvider = {
    getScenario: name => scenarios.find(scenario => scenario.name === name),
};
container.save = new Save(container.eventDispatcher, container.scenarioProvider);
container.scenarios = scenarios;
container.game = container.save.load();


const app = new App(width, height, container);

app.init(container.scenarios[0]);

// const wallsLayer = new Konva.Layer();

// const heroLevels = [];
// game.getHeroes().forEach(hero => {
//     for (let i = hero.getLevel() + 1; i <= Hero.MAX_LEVEL; i++) {
//         // carry.push({
//         //     name: hero.getName(),
//         //     level: i,
//         // });
//         // heroLevels.push(Konva.Image.fromURL('./images/check.jpg', function (check) {
//         //     check.setAttrs({
//         //         width: 30,
//         //         height: 30,
//         //     });
//         // }));
//     }
//
//
//     return carry;
// }, []);
// console.log(heroLevels);
const checksLayer = new Konva.Layer();
// checksLayer.add(...heroLevels);
