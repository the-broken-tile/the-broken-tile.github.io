const IMAGE_BACKGROUND = './images/board.jpg';
const IMAGE_HERO_LEVEL = './images/check.jpg';
const IMAGE_HEALTH = './images/health.png';
const IMAGE_KILLED_MINION = IMAGE_HERO_LEVEL;
const IMAGE_DAMAGE = IMAGE_HEALTH;
const IMAGE_POTION = IMAGE_HEALTH;

const TREASURE_POTION = 'potion';
const TREASURE_CRAFT_ARTIFACT = 'artifact';
const TREASURE_LEVEL_UP = 'level';
const TREASURE_GEM_A = 'gem a';
const TREASURE_GEM_B = 'gem b';
const TREASURE_GEM_C = 'gem c';
const TREASURE_GEM_D = 'gem d';
const TREASURE_GEM_E = 'gem e';
const TREASURE_GEM_F = 'gem f';
const TREASURE_GEM_G = 'gem g';
const TREASURE_GEM_H = 'gem h';
const GEMS = [TREASURE_GEM_A, TREASURE_GEM_B, TREASURE_GEM_C, TREASURE_GEM_D, TREASURE_GEM_E, TREASURE_GEM_F, TREASURE_GEM_G, TREASURE_GEM_H];

const MINION_GHOST = 'ghost';
const MINION_ORC = 'orc';
const MINION_GOBLIN = 'goblin';
const MINION_ZOMBIE = 'zombie';
const MINION_POINTS = [0, 1, 3, 4, 6, 8, 10, 12, 14, 16, 19, 22, 25];
const HEROES_POINTS = [0, 0, 3, 6, 8, 11, 14];
const REVIVED_POINTS = -9;

const HERO_WIZARD = 'wizard';
const HERO_WARRIOR = 'warrior';
const HERO_CLERIC = 'cleric';
const HERO_ROGUE = 'rogue';

const MONSTER_WEAKNESS = {
    [MINION_GOBLIN]: HERO_ROGUE,
    [MINION_GHOST]: HERO_WIZARD,
    [MINION_ORC]: HERO_WARRIOR,
    [MINION_ZOMBIE]: HERO_CLERIC,
}

const MONSTER_1 = 'monster 1';
const MONSTER_2 = 'monster 2';
const MONSTER_3 = 'monster 3';


const TRAINING_STYLE_WHITE = 'white';
const TRAINING_STYLE_BLACK = 'black';

const STATUS_INIT = 'init';
const STATUS_ROUND = 'round';
const STATUS_LEVELLING_UP = 'levelling up';
const STATUS_CRAFTING = 'crafting';

const WALL = 'wall';
const DRAWN_WALL = 'drawn wall';
const WATER = 'water';
const DOOR = 'door';
const PORTAL = 'portal';

const A = 'a';
const B = 'b';
const C = 'c';
const D = 'd';
const E = 'e';
const F = 'f';

const COLUMN_MAP = {
    [A]: 0,
    [B]: 1,
    [C]: 2,
    [D]: 3,
    [E]: 4,
    [F]: 5,
};
const ROW_MAP = {
    7: 0,
    6: 1,
    5: 2,
    4: 3,
    3: 4,
    2: 5,
    1: 6,
};

const EVENT_TAKE_DAMAGE = 'event.take_damage';
const EVENT_TAKE_POTION_DAMAGE = 'event.take_potion_damage';
const EVENT_REVIVED = 'event.revived';
const EVENT_CRAFT_POTION = 'event.craft_potion';
const EVENT_SELECT_SCENARIO = 'event.scenario.selected';
const EVENT_COLLECT_GEM = 'event.collect_gem';
const EVENT_KILL_MINION = 'event.kill_minion';
const EVENT_DUNGEON_MOVE = 'event.cell.changed';
const EVENT_GAME_STATUS_CHANGED = 'event.game_status.changed';
const EVENT_TRAINING_STYLE_CHANGED = 'event.hero_training_style.changed';
const EVENT_HERO_LEVEL = 'event.hero.level_up';
const EVENT_POINTS_CHANGE = 'events.points.changed';

const DIE_COLOR_WHITE = 'white';
const DIE_SYMBOL_SKULL = 'skull';
const DIE_SYMBOL_CLOVER = 'clover';
const DIE_SYMBOL_BOOTS = 'boots';

const WHITE_DIE = {
    sides: [
        {
            value: null,
            symbol: DIE_SYMBOL_SKULL,
        }, {
            value: 1,
            symbol: HERO_WARRIOR,
        }, {
            value: 2,
            symbol: HERO_WIZARD,
        }, {
            value: 3,
            symbol: HERO_CLERIC,
        }, {
            value: 4,
            symbol: HERO_ROGUE,
        }, {
            value: 9,
            symbol: DIE_SYMBOL_CLOVER,
        }
    ],
};
const BLACK_DIE = {
    sides: [
        {
            value: null,
            symbol: DIE_SYMBOL_SKULL,
        }, {
            value: 0,
            symbol: DIE_SYMBOL_BOOTS,
        }, {
            value: 5,
            symbol: HERO_WARRIOR
        }, {
            value: 6,
            symbol: HERO_WIZARD,
        }, {
            value: 7,
            symbol: HERO_CLERIC,
        }, {
            value: 8,
            symbol: HERO_ROGUE,
        },
    ],
};

const ARTIFACT_FLAMING_SWORD = 'flaming sword';
const ARTIFACT_DEATH_SCEPTER = 'death scepter';
const ARTIFACT_KHAR_MEDALLION = 'khar medallion';
const ARTIFACT_INTANGIBILITY_CLOAK = 'intangibility cloak';
const ARTIFACT_CROWN_OF_RIGHTEOUS_KING = 'crown of righteous king';
const ARTIFACT_ALCHEMISTS_CAULDRON = "alchemist's cauldron";
const ARTIFACT_ARMOUR_OF_HEROES = 'armour of heroes';
const ARTIFACT_TOME_OF_WISDOM = 'tome of wisdom';
