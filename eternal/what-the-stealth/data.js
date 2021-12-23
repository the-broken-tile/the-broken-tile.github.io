const FIRE = 'FIRE';
const TIME = 'TIME';
const JUSTICE = 'JUSTICE';
const PRIMAL = 'PRIMAL';
const SHADOW = 'SHADOW';

const ALL_INFLUENCE = [FIRE, TIME, JUSTICE, PRIMAL, SHADOW];

const OVERWHELM = 'overwhelm';
const AEGIS = 'aegis';
const LIFESTEAL = 'lifesteal';
const QUICKDRAW = 'quickdraw';
const DEADLY = 'deadly';
const VALOR = 'valor';
const DOUBLE_DAMAGE = 'double damage';
const WARCRY = 'warcry';
const RECKLESS = 'reckless';
const BERSERK = 'berserk';

const INFLUENCE_TRIOS = [
    {FIRE: 3},
    {FIRE: 2, TIME: 1},
    {FIRE: 2, JUSTICE: 1},
    {FIRE: 2, PRIMAL: 1},
    {FIRE: 2, SHADOW: 1},

    {FIRE: 1, TIME: 2},
    {FIRE: 1, TIME: 1, JUSTICE: 1},
    {FIRE: 1, TIME: 1, PRIMAL: 1},
    {FIRE: 1, TIME: 1, SHADOW: 1},

    {FIRE: 1, JUSTICE: 2},
    {FIRE: 1, JUSTICE: 1, PRIMAL: 1},
    {FIRE: 1, JUSTICE: 1, SHADOW: 1},

    {FIRE: 1, PRIMAL: 2},
    {FIRE: 1, PRIMAL: 1, SHADOW: 1},

    {FIRE: 1, SHADOW: 2},

    {TIME: 3},
    {TIME: 2, JUSTICE: 1},
    {TIME: 2, PRIMAL: 1},
    {TIME: 2, SHADOW: 1},

    {TIME: 1, JUSTICE: 2},
    {TIME: 1, JUSTICE: 1, PRIMAL: 1},
    {TIME: 1, JUSTICE: 1, SHADOW: 1},

    {TIME: 1, PRIMAL: 2},
    {TIME: 1, PRIMAL: 1, SHADOW: 1},

    {TIME: 1, SHADOW: 2},

    {JUSTICE: 3},
    {JUSTICE: 2, PRIMAL: 1},
    {JUSTICE: 2, SHADOW: 1},

    {JUSTICE: 1, PRIMAL: 2},
    {JUSTICE: 1, PRIMAL: 1, SHADOW: 1},

    {JUSTICE: 1, SHADOW: 2},

    {PRIMAL: 3},
    {PRIMAL: 2, SHADOW: 1},

    {PRIMAL: 1,  SHADOW: 2},

    {SHADOW: 3},
];

const QUESTIONS = [
    {
        text: 'It can be targeted by <b>Fall Short</b>.',
        filter: unit => !unit.battleSkills || unit.battleSkills.length === 0,
    }, {
        text: 'It cannot be targeted by <b>Fall short</b>.',
        filter: unit => unit.battleSkills && unit.battleSkills.length > 0,
    }, {
        text: 'It can be targeted by <b>Victimless Crime</b>.',
        filter: unit => !unit.hero,
    }, {
        text: 'It cannot be targeted by <b>Victimless Crime</b>.',
        filter: unit => unit.hero,
    }, {
        text: 'It can be targeted by <b>Call the Hit</b>.',
        filter: unit => unit.attack <= 2,
    }, {
        text: 'It cannot be targeted by <b>Call the Hit</b>.',
        filter: unit => unit.attack > 2,
    }, {
        text: 'It can be targeted by <b>Suffocate</b>.',
        filter: unit => unit.attack <= 3,
    }, {
        text: 'It cannot be targeted by <b>Suffocate</b>.',
        filter: unit => unit.attack > 3,
    }, {
        text: 'It can be targeted by <b>Vanquish</b>.',
        filter: unit => unit.attack >= 4,
    }, {
        text: 'It cannot be targeted by <b>Vanquish</b>.',
        filter: unit => unit.attack < 4,
    }, {
        text: 'It can be targeted by <b>Hoof Stomp</b>',
        filter: unit => !unit.battleSkills || !unit.battleSkills.includes(OVERWHELM),
    }, {
        text: 'It can be targeted by <b>Gun Down</b>',
        filter: unit => !unit.battleSkills || !unit.battleSkills.includes(QUICKDRAW),
    }, {
        text: `It can be targeted by <b>Smite</b>`,
        filter: unit => unit.attack !== unit.health,
    }, {
        text: `It cannot be targeted by <b>Smite</b>`,
        filter: unit => unit.attack !== unit.health,
    }, {
        text: `It can be targeted by <b>Display of Ambition</b>`,
        filter: unit => unit.health >= 5,
    }, {
        text: `It cannot be targeted by <b>Display of Ambition</b>`,
        filter: unit => unit.health < 5,
    }, {
        text: "It didn't reveal itself when their owner took damage.",
        filter: unit => !unit.reveals.whenYouTakeDamage,
    }, {
        text: "It didn't reveal itself when their owner played another unit with <b>stealth</b>.",
        filter: unit => !unit.reveals.whenYouPlayAnotherStealth && !unit.cannotBlock,
    }, {
        text: "It didn't reveal itself when you attacked with a flyer.",
        filter: unit => !unit.reveals.whenAnEnemyFlierAttacks,
    }, {
        text: "It didn't reveal itself when you attacked with exactly two units.",
        filter: unit => !unit.reveals.whenExactlyTwoEnemyUnitsAttack,
    }, {
        text: "It didn't reveal itself when their owner played another unit.",
        filter: unit => !unit.reveals.whenYouPayAnotherUnit && !unit.cannotBlock,
    }, {
        text: "It didn't reveal itself when you played a spell.",
        filter: unit => !unit.reveals.enemyPlayerPlaysASpell,
    }, {
        text: "It didn't reveal itself when their owner played another non-<b>stealth</b> unit",
        filter: unit => !unit.reveals.whenYouPlayAnotherNonStealthUnit && !unit.cannotBlock,
    }, {
        text: "It didn't reveal itself when one or more of their owner's other units ultimated.",
        filter: unit => !unit.reveals.oneOrMoreOfYourOtherUnitsUltimates,
    }, {
        text: "It didn't reveal itself when one or more of their owner's other units played their summon effect.",
        filter: unit => !unit.reveals.oneOrMoreOfYourOtherUnitsSummonEffect && !unit.cannotBlock,
    }, {
        text: 'There was no pause when you attacked into it.',
        filter: unit => unit.cannotBlock,
    }, {
        text: "Opponent doesn't have a unit in their void",
        filter: unit => !unit.hasStealthIfUnitInVoid,
    }
];

const STEALTH_UNITS = [
    {
        influence: {FIRE: 1},
        cost: 3,
        name: ['Awakened Arsonist'],
        attack: 2,
        health: 1,
        reveals: {},
    }, {
        influence: {FIRE: 1},
        cost: 3,
        name: ['Evoker'],
        attack: 2,
        health: 3,
        reveals: {atStartOfTurn: true},
    }, {
        influence: {FIRE: 1},
        cost: 3,
        name: ['Last Line Defender'],
        attack: 3,
        health: 2,
        reveals: {atStartOfTurn: true},
    }, {
        influence: {FIRE: 1},
        cost: 3,
        name: ['Rampaging Commando'],
        attack: 3,
        health: 1,
        reveals: {atStartOfTurn: true},
    }, {
        influence: {FIRE: 1},
        const: 3,
        name: ['Sanity Scorcher'],
        attack: 2,
        health: 2,
        intrigue: {
            cost: 5,
            attack: 4,
            health: 4,
        },
        reveals: {atStartOfTurn: true},
        battleSkills: [DOUBLE_DAMAGE],
    }, {
        influence: {FIRE: 1},
        cost: 5,
        name: ['Callous Triggerman'],
        attack: 4,
        health: 3,
        reveals: {atStartOfTurn: true},
        battleSkills: [QUICKDRAW],
    }, {
        influence: {TIME: 1},
        cost: 3,
        name: ['Concealed Veteran'],
        attack: 3,
        health: 3,
        reveals: {},
    }, {
        influence: {TIME: 2},
        cost: 3,
        name: ['Frontline Healer'],
        attack: 3,
        health: 2,
        reveals: {
            whenYouTakeDamage: true,
            whenYouPlayAnotherStealth: true,
        },
    }, {
        influence: {TIME: 1},
        cost: 3,
        name: ['Maveloft Botanist'],
        attack: 2,
        health: 2,
        reveals: {},
    }, {
        influence: {TIME: 1},
        cost: 3,
        name: ['Nurturing Sentinel'],
        attack: 1,
        health: 4,
        reveals: {atStartOfTurn: true},
    }, {
        influence: {TIME: 1},
        cost: 3,
        name: ['Sticky Flytrap', 'Flytrap'],
        attack: 3,
        health: 3,
        reveals: {whenAnEnemyFlierAttacks: true},
    }, {
        influence: {TIME: 1},
        cost: 5,
        name: ['Growing Sludge'],
        attack: 1,
        health: 1,
        atStartOfTurn: {
            attack: 4,
            health: 4,
        },
        reveals: {},
    }, {
        influence: {TIME: 2},
        cost: 5,
        name: ['Lucent Guide'],
        attack: 5,
        health: 5,
        reveals: {},
    }, {
        influence: {TIME: 2},
        cost: 5,
        name: ['The Last Carnosaur', 'Last Carnosaur'],
        attack: 6,
        health: 5,
        reveals: {atStartOfTurn: true},
        hero: true,
    }, {
        influence: {JUSTICE: 1},
        cost: 3,
        name: ['Genius Combatant'],
        attack: 3,
        health: 2,
        reveals: {},
        battleSkills: [VALOR],
    }, {
        influence: {JUSTICE: 1},
        cost: 3,
        name: ['Invisible Wall'],
        attack: 0,
        health: 6,
        reveals: {},
    }, {
        influence: {JUSTICE: 2},
        cost: 3,
        name: ['Jada, Peacekeeper', 'Jada'],
        attack: 4,
        health: 5,
        reveals: {},
        hero: true,
    }, {
        influence: {JUSTICE: 1},
        cost: 3,
        name: ['Kako, the Bodyguard', 'Kako'],
        attack: 2,
        health: 2,
        reveals: {whenExactlyTwoEnemyUnitsAttack: true},
        hero: true,
        atStartOfTurn: {
            attack: 1,
            health: 1,
        },
    }, {
        influence: {JUSTICE: 1},
        cost: 3,
        name: ['Pumpwerks Engineer'],
        attack: 2,
        health: 2,
        reveals: {},
        battleSkills: [WARCRY],
    }, {
        influence: {JUSTICE: 1},
        cost: 3,
        name: ['Skysweeper'],
        attack: 2,
        health: 2,
        reveals: {atStartOfTurn: true},
    }, {
        influence: {JUSTICE: 1},
        cost: 5,
        name: ['Inquisitive Alchemist'],
        attack: 4,
        health: 4,
        reveals: {},
    }, {
        influence: {JUSTICE: 2},
        cost: 5,
        name: ['Ky, Awakened Master', 'Ky'],
        attack: 3,
        health: 6,
        reveals: {whenYouPayAnotherUnit: true},
        hero: true,
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Cyber Hyena', 'Hyena'],
        attack: 2,
        health: 1,
        reveals: {},
        battleSkills: [RECKLESS],
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Hidden Crusader'],
        attack: 1,
        health: 3,
        reveals: {},
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Iron Ursa'],
        attack: 3,
        health: 3,
        intrigue: {
            cost: 5,
            attack: 5,
            health: 5,
        },
        reveals: {enemyPlayerPlaysASpell: true},
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Jufi, Spire Spear', 'Jufi'],
        attack: 1,
        health: 3,
        intrigue: {
            cost: 5,
        },
        reveals: {},
        hero: true,
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Merciless Officer'],
        attack: 4,
        health: 2,
        intrigue: {
            cost: 5,
            attack: 4,
            health: 5,
            battleSkills: [BERSERK]
        },
        reveals: {},
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Reflector'],
        attack: 0,
        health: 5,
        reveals: {whenYouPlayAnotherNonStealthUnit: true},
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Rolling Fog', 'Fog'],
        attack: 2,
        health: 3,
        intrigue: {
            cost: 5,
            attack: 3,
            health: 4,
        },
        reveals: {},
    }, {
        influence: {PRIMAL: 1},
        cost: 3,
        name: ['Shockwave Elemental'],
        attack: 3,
        health: 2,
        reveals: {},
    }, {
        influence: {PRIMAL: 1},
        cost: 5,
        name: ['Gnashing Displacer'],
        attack: 4,
        health: 4,
        reveals: {},
        battleSkills: [OVERWHELM],
    }, {
        influence: {PRIMAL: 1},
        cost: 5,
        name: ['Grizzled Guard'],
        attack: 4,
        health: 4,
        reveals: {},
        battleSkills: [AEGIS],
    }, {
        influence: {SHADOW: 1},
        cost: 3,
        name: ['Deepcover Operative'],
        attack: 2,
        health: 2,
        reveals: {},
    }, {
        influence: {SHADOW: 2},
        cost: 3,
        name: ['Elding of the Final Hour', 'Elding'],
        attack: 3,
        health: 3,
        reveals: {},
        hero: true,
    }, {
        influence: {SHADOW: 1},
        cost: 3,
        name: ['Leatherhide'],
        attack: 3,
        health: 2,
        reveals: {},
    }, {
        influence: {SHADOW: 2},
        cost: 3,
        name: ['Mimicry Vine'],
        attack: 3,
        health: 3,
        reveals: {oneOrMoreOfYourOtherUnitsUltimates: true, oneOrMoreOfYourOtherUnitsSummonEffect: true},
    }, {
        influence: {SHADOW: 1},
        cost: 3,
        name: ['Raniya, Never Caught', 'Raniya'],
        attack: 3,
        health: 2,
        reveals: {atStartOfTurn: true},
        hero: true,
    }, {
        influence: {SHADOW: 1},
        cost: 3,
        name: ['Stalking Assassin'],
        attack: 3,
        health: 2,
        reveals: {},
    }, {
        influence: {SHADOW: 1},
        cost: 3,
        name: ['Thorncrawler', 'Thorny'],
        attack: 4,
        health: 1,
        reveals: {},
        battleSkills: [LIFESTEAL],
        cannotBlock: true,
    }, {
        influence: {SHADOW: 1},
        cost: 5,
        name: ['Muck Devourer'],
        attack: 4,
        health: 2,
        reveals: {},
        battleSkills: [QUICKDRAW],
    }, {
        influence: {SHADOW: 1},
        cost: 5,
        name: ['Subversion Slug'],
        attack: 6,
        health: 4,
        reveals: {},
    }, {
        influence: {SHADOW: 1},
        cost: 5,
        name: ['Toxic Cloud'],
        attack: 2,
        health: 3,
        reveals: {},
        battleSkills: [DEADLY]
    }, {
        influence: {TIME: 1, PRIMAL: 1},
        cost: 3,
        name: ['Launching Asri'],
        attack: 3,
        health: 1,
        reveals: {whenYouPlayAnotherStealth: true}
    }, {
        influence: {TIME: 1, PRIMAL: 1},
        cost: 5,
        name: ['Entratius, Beckoning', 'Entratius'],
        attack: 5,
        health: 5,
        reveals: {},
        hero: true,
    }, {
        hasStealthIfUnitInVoid: true,
        influence: {TIME: 1, SHADOW: 1},
        cost: 3,
        name: ['Lurking Feeder'],
        attack: 2,
        health: 2,
        reveals: {},
        battleSkills: [DEADLY],
    }, {
        influence: {TIME: 1, SHADOW: 1},
        cost: 5,
        name: ['Azindel, Mastermind', 'Azindel'],
        attack: 4,
        health: 4,
        reveals: {atStartOfTurn: true},
        battleSkills: [LIFESTEAL],
        hero: true,
    }, {
        influence: {PRIMAL: 1, SHADOW: 1},
        cost: 3,
        name: ['Foraging Tri-Toe', 'Tri-Toe'],
        attack: 3,
        health: 1,
        reveals: {},
    }, {
        influence: {PRIMAL: 1, SHADOW: 1},
        cost: 5,
        name: ['Sindar, the Corruptor', 'Sindar'],
        attack: 1,
        health: 4,
        reveals: {},
        battleSkills: [DEADLY, VALOR],
        hero: true,
    }, {
        influence: {},
        cost: 3,
        name: ['Camouflaged Soldier'],
        attack: 2,
        health: 2,
        reveals: {},
    }, {
        influence: {},
        cost: 3,
        name: ['Hired Cutthroat'],
        attack: 3,
        health: 1,
        reveals: {},
    }, {
        influence: {},
        cost: 3,
        name: ['Manufactured Force'],
        attack: 1,
        health: 3,
        reveals: {},
    }, {
        influence: {},
        cost: 3,
        name: ['Undercover Enforcer'],
        attack: 2,
        health: 3,
        reveals: {},
    },
];