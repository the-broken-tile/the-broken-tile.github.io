const NO_UNITS = 'no_units';
const NO_UNITS_WITH_FLYING = 'no_flying_units';
const NO_UNITS_WITH_COST_THREE_OR_LESS = 'no_units_with_cost_three_or_less';
const NO_ATTACKING_UNITS = 'no_attacking_units';
const NO_UNITS_WITH_DIFFERENT_POWER_AND_HEALTH = 'no_units_with_different_power_and_health';

const NO_ENEMY_UNITS = 'no_enemy_units';
const NO_TWO_ENEMY_UNITS = 'no_two_enemy_units';
const NO_ENEMY_SENTINELS = 'no_enemy_sentinels';
const NO_ENEMY_UNITS_WITH_COST_THREE_OR_LESS = 'no_enemy_units_with_cost_three_or_less';
const NO_ENEMY_UNITS_WITH_COST_FIVE_OR_LESS = 'no_enemy_units_with_cost_five_or_less';
const NO_ENEMY_UNITS_WITH_COST_FOUR_OR_MORE = 'no_enemy_units_with_cost_four_or_more';
const NO_ENEMY_UNITS_PLAYED_THIS_TURN = 'no_enemy_units_played_this_turn';
const NO_ENEMY_UNITS_WITH_FLYING = 'no_enemy_units_with_flying';
const NO_ENEMY_UNITS_WITHOUT_ENDURANCE = 'no_enemy_units_without_endurance';
const NO_ENEMY_UNITS_TAKEN_DAMAGE_THIS_TURN = 'no_enemy_units_taken_damage_this_turn';
const NO_ATTACKING_ENEMY_UNITS = 'no_attacking_enemy_units';
const NO_ATTACKING_ENEMY_UNITS_WITHOUT_ENDURANCE = 'no_attacking_enemy_units_without_endurance';
const NO_ATTACKING_FLYING_ENEMY_UNITS = 'no_attacking_flying_enemy_units';
const NO_ATTACKING_LONE_ENEMY_UNITS = 'no_attacking_lone_enemy_units';
const NO_ATTACKING_ENEMY_UNITS_WITH_POWER_FOUR_OR_MORE = 'no_attacking_enemy_units_with_power_four_or_more';

const NO_FRIENDLY_UNITS = 'no_friendly_units';
const NO_FRIENDLY_SENTINELS = 'no_friendly_sentinels';
const NO_BLOCKING_FRIENDLY_UNITS = 'no_blocking_friendly_inits';

const NO_ATTACHMENTS = 'no_attachments';
const NO_ENEMY_ATTACHMENTS = 'no_enemy_attachments';
const NO_SINGLE_FACTION_ENEMY_ATTACHMENTS = 'no_single_faction_enemy_attachments';
const NO_ENEMY_RELICS = 'no_enemy_relics';
const NO_ENEMY_RELIC_ATTACK = 'no_enemy_relic_attack';
const NO_ENEMY_RELIC_WITH_COST_FIVE_OR_LESS = 'no_enemy_relic_with_cost_five_or_less';
const NO_ENEMY_CURSES = 'no_enemy_curses';
const NO_FRIENDLY_ATTACHMENTS = 'no_friendly_attachments';
const NO_FRIENDLY_RELICS = 'no_friendly_relics';

const NO_ENEMY_SPELLS = 'no_enemy_spells';
const NO_ENEMY_SPELLS_WITH_COST_FOUR_OR_MORE = 'no_enemy_spells_with_cost_four_or_more';
const NO_ENEMY_SINGLE_FACTION_SPELLS = 'no_enemy_single_faction_spells';
const NO_ENEMY_SLOW_SPELLS = 'no_enemy_slow_spells';
const NO_ENEMY_FAST_SPELLS = 'no_enemy_fast_spells;'

const NO_FRIENDLY_ATTACHMENTS_IN_VOID = 'no_friendly_attachments_in_void';

const NO_SITES = 'no_sites';
const NO_ENEMY_SITE = 'no_enemy_site';
const NO_ENEMY_SITE_WITH_COST_FOUR_OR_MORE = 'no_enemy_site_with_cost_four_or_more;'

const AT_LEAST_TWO_CARDS_IN_HAND = 'at_least_two_cards_in_hand';

const DEPENDENCY_MAP = {
    [AT_LEAST_TWO_CARDS_IN_HAND]: [],

    [NO_ENEMY_SITE_WITH_COST_FOUR_OR_MORE]: [],
    [NO_ENEMY_SITE]: [NO_ENEMY_SITE_WITH_COST_FOUR_OR_MORE],
    [NO_SITES]: [NO_ENEMY_SITE],

    [NO_FRIENDLY_ATTACHMENTS_IN_VOID]: [],

    [NO_ENEMY_FAST_SPELLS]: [],
    [NO_ENEMY_SLOW_SPELLS]: [],
    [NO_ENEMY_SINGLE_FACTION_SPELLS]: [],
    [NO_ENEMY_SPELLS_WITH_COST_FOUR_OR_MORE]: [],
    [NO_ENEMY_SPELLS]: [NO_ENEMY_FAST_SPELLS, NO_ENEMY_SLOW_SPELLS, NO_ENEMY_SINGLE_FACTION_SPELLS, NO_ENEMY_SPELLS_WITH_COST_FOUR_OR_MORE],

    [NO_FRIENDLY_RELICS]: [],
    [NO_FRIENDLY_ATTACHMENTS]: [NO_FRIENDLY_RELICS],

    [NO_ENEMY_RELIC_WITH_COST_FIVE_OR_LESS]: [],
    [NO_ENEMY_RELIC_ATTACK]: [],
    [NO_ENEMY_RELICS]: [NO_ENEMY_RELIC_ATTACK, NO_ENEMY_RELIC_WITH_COST_FIVE_OR_LESS],
    [NO_ENEMY_CURSES]: [],
    [NO_SINGLE_FACTION_ENEMY_ATTACHMENTS]: [],
    [NO_ENEMY_ATTACHMENTS]: [NO_SINGLE_FACTION_ENEMY_ATTACHMENTS, NO_ENEMY_CURSES, NO_ENEMY_RELICS],

    [NO_ATTACHMENTS]: [NO_FRIENDLY_ATTACHMENTS, NO_ENEMY_ATTACHMENTS],

    [NO_FRIENDLY_SENTINELS]: [],
    [NO_BLOCKING_FRIENDLY_UNITS]: [],
    [NO_FRIENDLY_UNITS]: [NO_FRIENDLY_SENTINELS, NO_BLOCKING_FRIENDLY_UNITS],

    [NO_ATTACKING_FLYING_ENEMY_UNITS]: [],
    [NO_ATTACKING_ENEMY_UNITS_WITHOUT_ENDURANCE]: [],
    [NO_ATTACKING_ENEMY_UNITS_WITH_POWER_FOUR_OR_MORE]: [],

    [NO_ENEMY_UNITS_WITH_FLYING]: [NO_ATTACKING_FLYING_ENEMY_UNITS],
    [NO_ENEMY_UNITS_WITHOUT_ENDURANCE]: [NO_ATTACKING_ENEMY_UNITS_WITHOUT_ENDURANCE],
    [NO_ENEMY_UNITS_TAKEN_DAMAGE_THIS_TURN]: [],
    [NO_ATTACKING_ENEMY_UNITS]: [
        NO_ATTACKING_FLYING_ENEMY_UNITS,
        NO_ATTACKING_ENEMY_UNITS_WITHOUT_ENDURANCE,
        NO_ATTACKING_ENEMY_UNITS_WITH_POWER_FOUR_OR_MORE
    ],

    [NO_ENEMY_UNITS_PLAYED_THIS_TURN]: [],
    [NO_ENEMY_UNITS_WITH_COST_FOUR_OR_MORE]: [],
    [NO_ENEMY_UNITS_WITH_COST_FIVE_OR_LESS]: [NO_ENEMY_UNITS_WITH_COST_THREE_OR_LESS],
    [NO_ENEMY_UNITS_WITH_COST_THREE_OR_LESS]: [],
    [NO_ENEMY_SENTINELS]: [],
    [NO_TWO_ENEMY_UNITS]: [],
    [NO_ENEMY_UNITS]: [
        NO_ATTACKING_ENEMY_UNITS,
        NO_ENEMY_UNITS_WITH_FLYING,
        NO_ENEMY_UNITS_WITHOUT_ENDURANCE,
        NO_ENEMY_UNITS_TAKEN_DAMAGE_THIS_TURN,
        NO_ENEMY_UNITS_PLAYED_THIS_TURN,
        NO_ENEMY_UNITS_WITH_COST_FOUR_OR_MORE,
        NO_ENEMY_UNITS_WITH_COST_FIVE_OR_LESS,
        NO_ENEMY_SENTINELS,
        NO_TWO_ENEMY_UNITS,
    ],

    [NO_UNITS_WITH_FLYING]: [NO_ENEMY_UNITS_WITH_FLYING],
    [NO_UNITS_WITH_COST_THREE_OR_LESS]: [NO_ENEMY_UNITS_WITH_COST_THREE_OR_LESS],
    [NO_ATTACKING_UNITS]: [NO_ATTACKING_ENEMY_UNITS],
    [NO_UNITS_WITH_DIFFERENT_POWER_AND_HEALTH]: [],

    [NO_UNITS]: [NO_FRIENDLY_UNITS, NO_ENEMY_UNITS],
};

// const flatten = key => {
//     if (DEPENDENCY_MAP[key].length === 0) {
//         return [key];
//     }
//
//     return DEPENDENCY_MAP[key].reduce((carry, depsKey) => {
//         return [...carry, ...flatten(depsKey)];
//     }, []);
// };
let FLATTENED_DEPENDENCY_MAP = {};

const flatten = key => {
    if (FLATTENED_DEPENDENCY_MAP[key]) {
        return FLATTENED_DEPENDENCY_MAP[key];
    }

    if (!DEPENDENCY_MAP[key]) {
        console.warn(key);
        return [];
    }
    const l = DEPENDENCY_MAP[key].length;
    if (l === 0) {
        return [key];
    }
    let result = [];

    for (let i = 0; i < l; i += 1) {
        const value = DEPENDENCY_MAP[key][i];
        if (!FLATTENED_DEPENDENCY_MAP[value]) {
            FLATTENED_DEPENDENCY_MAP[value] = flatten(value);
        }

        result = [value, ...result, ...FLATTENED_DEPENDENCY_MAP[value]];
    }

    return result;
};
Object.keys(DEPENDENCY_MAP).forEach(key => {
    FLATTENED_DEPENDENCY_MAP[key] = flatten(key);
});

/**
 *
 * @param card
 * @param {string[]} criteria
 * @returns {boolean}
 */
const advancedFilterMatch = ({ deps, name }, criteria) => {
    if (!deps || !criteria.length) {
        return true;
    }
    //
    const activeFilters = criteria.reduce((carry, filter) => {
        return [...carry, ...flatten(filter)];
    }, []);

    return deps.filter(dependency => !activeFilters.includes(dependency)).length > 0;
};