const EXPEDITION_SETS = [
    [10],
    [11],
    [1105],
    [1107],
    //Just Deserts
    [9, 332],

    // Draft pack

    // Fast spells

    //Bottoms up
    [5, 2],
    //Char
    [6, 3],
    //Incineration
    [10, 403],
    //Into the furnace
    [3, 9],
    //Rampage
    [1, 17],
    //Scythe Slash
    [10, 156],
    //Slag
    [6, 16],
    //Hoof Slash
    [3, 18],
    //Pillage
    [9, 19],
    //Rally
    [1, 33],
    //Burn Out
    [1, 28],
    //Hesitate
    [3, 56],
    //Xumuc Whisper
    [10,338],
    //Disjuncion
    [3, 63],
    //Dissociate
    [5, 44],
    //Glimpse Another Age
    [10, 329],
    //Refresh
    [1, 501],
    //Synchronized Strike
    [1, 88],
    //Teleport
    [1, 80],
    //Unexpected Arrival
    [10, 102],
    //Cobra Gear
    [10, 44],
    //Decay
    [1, 95],
    //Fair Exchange
    [10, 75],
    //Humbug Nest
    [8, 45],
    //Secret Pages
    [1, 81],
    //Swirl the Sands
    [6, 73],
    //Bolster
    [2, 51],
    //Lumen Defense
    [9, 62],
    //Deafening Word
    [8, 59],
    //Detain
    [1, 133],
    //Ensnare
    [8, 60],
    //Finest Hour
    [1, 130],
    //Arcane Defense
    [4, 104],
    //Barricade
    [4, 106],
    //Bring into Focus
    [10, 37],
    //Isolate
    [6, 97],
    //Lay Siege
    [7, 71],
    //Martial Efficiency
    [10, 402],
    //Protect
    [1, 132],
    //Strength of Many
    [2, 73],
    //Auric Herdward
    [4, 114],
    //Inner Might
    [6, 108],
    //Saddle Up
    [4, 124],
    //Divebomb
    [8, 78],
    //Controlled Demolition
    [10, 47],
    //Withstand
    [6, 130],
    //Send to Market
    [10, 159],
    //Frostwave
    [5, 114],
    //Hardiness
    [10, 93],
    //Icy Glaze
    [7, 92],
    //Savage Denial
    [4, 147],
    //Weather the Storm
    [2, 106],
    //Backlash
    [1, 200],
    //Gruanform
    [4, 154],
    //Ice Bolt
    [6, 151],
    //Lightning Strike
    [1, 197],
    //Read the Runes
    [6, 152],
    //Violent Gust
    [1, 205],
    //Aerial Battle
    [4, 166],
    //Flash Freeze
    [1, 209],
    //Frostbite
    [10, 326],
    //Realign the Stars
    [10, 147],
    //Storm Spiral
    [5, 131],
    //Wisdom of the Elders
    [1, 218],
    //Rejection
    [5, 136],
    //Blackout the Skies
    [10, 307],
    //Defile
    [8, 122],
    //Devour
    [1, 261],
    //Fatal Misstep
    [10, 321],
    //Infused Strike
    [3, 216],
    //Malaise
    [7, 128],
    //Rapid Shot
    [1, 259],
    //Warlock's Brew
    [5, 165],
    //Xumuc Coercion
    [10, 346],
    //Deathstrike
    [1, 290],
    //Cut Ties
    [4, 238],
    //Opum's Technique
    [10, 354],
    //Ijin's Choice
    [4, 245],
    //Righteous Fury
    [1, 322],
    //Tesseract's Technique
    [10, 332],
    //Kaleb's Choice
    [2, 188],
    //Mighty Strikes
    [5, 214],
    //Mortar
    [2, 194],
    //Cremate
    [7, 169],
    //Safe Return
    [1, 330],
    //Cirso's Choice
    [4, 252],
    //Kudzu's Technique
    [10, 341],
    //Banish
    [2, 207],
    //Express Route
    [10, 74],
    //Argo's Technique
    [10, 398],
    //Bring Down
    [2, 217],
    //Eylin's Choice
    [2, 220],
    //Dichro's Technique
    [10, 379],

    //Ambushers
    //Desert Alchemist
    [9, 46],
    //Dune Phantom
    [1, 89],
    //Sand Tornado
    [9, 53],
    //Scorpion Wasp
    [1, 96],
    //Panoptic Guardian
    [3, 89],
    //Gorgon Cutthroat
    [6, 200],
    //Desert Marshal
    [1, 332],
    //Storm Lynx
    [1, 353],
    //Hunting Pteriax
    [1, 363],
    //Ayan, the Abductor
    [2, 204],
];

// only the relevant anyway
const DEPENDENCIES = [
    // Promos

    // Fast spells
    //Just Deserts
    {id:[9, 332], deps: [NO_ENEMY_UNITS]},

    // Draft pack

    // Fast spells
    //Bottoms up
    {id: [5, 2], deps: [NO_UNITS]},
    //Into the furnace
    {id: [3, 9], deps: [NO_UNITS]},
    //Rampage
    {id: [1, 17], deps: [NO_UNITS]},
    //Scythe Slash
    {id: [10, 156], deps: [NO_UNITS]},
    {
        //Slag
        id: [6, 16],
        deps: [NO_ENEMY_SENTINELS, NO_ENEMY_RELICS],
    },
    //Hoof Slash
    {id: [3, 18], deps: [NO_UNITS]},
    //Burn Out
    {id: [1, 28], deps: [NO_FRIENDLY_UNITS]},
    //Hesitate
    {id: [3, 56], deps: [NO_ENEMY_SPELLS]},
    //Disjuncion
    {
        id: [3, 63],
        deps: [NO_FRIENDLY_ATTACHMENTS_IN_VOID, NO_ENEMY_ATTACHMENTS]
    },
    //Dissociate
    {id: [5, 44], deps: [NO_ENEMY_SPELLS]},
    //Teleport
    {id: [1, 80], deps: [NO_UNITS]},
    //Unexpected Arrival
    {id: [10, 102], deps: [NO_FRIENDLY_UNITS]},
    //Cobra Gear
    {id: [10, 44], deps: [NO_FRIENDLY_UNITS]},
    //Decay
    {id: [1, 95], deps: [NO_ENEMY_ATTACHMENTS]},
    //Fair Exchange
    {id: [10, 75], deps: [NO_FRIENDLY_UNITS]},
    //Swirl the Sands
    {id: [6, 73], deps: [NO_ENEMY_UNITS_WITH_FLYING, NO_ENEMY_RELICS, NO_ENEMY_CURSES]},
    //Lumen Defense
    {id: [9, 62], deps: [NO_ATTACKING_ENEMY_UNITS]},
    //Deafening Word
    {id: [8, 59], deps: [NO_UNITS_WITH_COST_THREE_OR_LESS]},
    //Detain
    {id: [1, 133], deps: [NO_ENEMY_UNITS]},
    //Ensnare
    {id: [8, 60], deps: [NO_ATTACKING_FLYING_ENEMY_UNITS]},
    //Finest Hour
    {id: [1, 130], deps: [NO_UNITS]},
    //Arcane Defense, "give two enemy units" is actually "up to two"
    {id: [4, 104], deps: [NO_ENEMY_UNITS]},
    //Barricade
    {id: [4, 106], deps: [NO_BLOCKING_FRIENDLY_UNITS]},
    //Isolate
    {id: [6, 97], deps: [NO_ATTACKING_LONE_ENEMY_UNITS]},
    //Martial Efficiency
    {id: [10, 402], deps: [NO_FRIENDLY_UNITS]},
    //Strength of Many
    {id: [2, 73], deps: [NO_FRIENDLY_UNITS]},
    //Auric Herdward
    {id: [4, 114], deps: [NO_FRIENDLY_UNITS]},
    //Inner Might
    {id: [6, 108], deps:[NO_FRIENDLY_UNITS]},
    //Saddle Up
    {id: [4, 124], deps: [NO_UNITS]},
    //Divebomb, "two of your units", is actually "up to to of your units"
    {id: [8, 78], deps: [NO_FRIENDLY_UNITS]},
    //Controlled Demolition
    {id: [10, 47], deps: [NO_FRIENDLY_UNITS], costModifier: {NO_FRIENDLY_SENTINELS: -3}},
    //Withstand
    {id: [6, 130], deps: [NO_FRIENDLY_UNITS]},
    //Send to Market
    {id: [10, 159], deps: [NO_UNITS]},
    //Frostwave
    {id: [5, 114], deps: [NO_ENEMY_UNITS_WITHOUT_ENDURANCE]},
    //Hardiness
    {id: [10, 93], deps: [NO_UNITS]},
    //Icy Glaze
    {id: [7, 92], deps: [NO_ENEMY_UNITS_WITHOUT_ENDURANCE]},
    //Savage Denial
    {id: [4, 147], deps: [NO_ENEMY_FAST_SPELLS]},
    //Weather the Storm
    {id: [2, 106], deps: [NO_UNITS]},
    //Backlash
    {id: [1, 200], deps: [NO_ENEMY_SPELLS]},
    //Gruanform
    {id: [4, 154], deps: [NO_UNITS]},
    //Ice Bolt
    {id: [6, 151], deps: [NO_UNITS]},
    //Lightning Strike
    {id: [1, 197], deps: [NO_ATTACKING_ENEMY_UNITS, NO_ENEMY_RELIC_ATTACK]},
    //Read the Runes
    {id: [6, 152], deps: [NO_ENEMY_SPELLS_WITH_COST_FOUR_OR_MORE]},
    //Violent Gust
    {id: [1, 205], deps: [NO_UNITS_WITH_FLYING]},
    //Flash Freeze, "two units" is actually "up to two units"
    {id: [1, 209], deps: [NO_ENEMY_UNITS_WITHOUT_ENDURANCE]},
    //Frostbite
    {id: [10, 326], deps: [NO_ENEMY_UNITS_WITHOUT_ENDURANCE]},
    //Rejection
    {id: [5, 136], deps: [NO_ENEMY_SPELLS]},
    //Blackout the Skies
    {id: [10, 307], deps: [NO_ENEMY_UNITS_WITH_FLYING]},
    //Defile
    {id: [8, 122], deps: [NO_ENEMY_UNITS_WITH_COST_THREE_OR_LESS]},
    //Devour
    {id: [1, 261], deps: [NO_FRIENDLY_UNITS]},
    //Fatal Misstep
    {id: [10, 321], deps: [NO_ENEMY_UNITS_PLAYED_THIS_TURN]},
    //Infused Strike
    {id: [3, 216], deps: [NO_FRIENDLY_UNITS]},
    //Rapid Shot
    {id: [1, 259], deps: [NO_UNITS]},
    //Warlock's Brew
    {id: [5, 165], deps: [NO_ENEMY_UNITS]},
    //Xumuc Coercion
    {id: [10, 346], deps: [NO_FRIENDLY_UNITS]},
    //Deathstrike
    {id: [1, 290], deps: [NO_UNITS]},
    //Cut Ties
    {id: [4, 238], deps: [NO_ENEMY_UNITS]},
    //Righteous Fury
    {id: [1, 322], deps: [NO_UNITS]},
    //Kaleb's Choice
    {id: [2, 188], deps: [NO_ENEMY_SINGLE_FACTION_SPELLS, NO_SINGLE_FACTION_ENEMY_ATTACHMENTS]},
    //Mighty Strikes
    {id: [5, 214], deps: [NO_UNITS]},
    //Cremate
    {id: [7, 169], deps: [NO_UNITS, NO_SITES]},
    //Safe Return
    {id: [1, 330], deps: [NO_FRIENDLY_UNITS]},
    //Banish
    {id: [2, 207], deps: [NO_ENEMY_UNITS_WITH_COST_FIVE_OR_LESS, NO_ENEMY_RELIC_WITH_COST_FIVE_OR_LESS]},
    //Express Route
    {id: [10, 74], deps: [NO_ENEMY_UNITS]},
    //Bring Down
    {id: [2, 217], deps: [NO_ENEMY_UNITS]},
    //Eylin's Choice
    {id: [2, 220], deps: [NO_ENEMY_SPELLS_WITH_COST_FOUR_OR_MORE, NO_ATTACKING_ENEMY_UNITS_WITH_POWER_FOUR_OR_MORE]},

    //Ambushers
    //Desert Alchemist
    {id: [9, 46], ambush: true},
    //Dune Phantom
    {id: [1, 89], ambush: true},
    //Sand Tornado
    {id: [9, 53], ambush: true},
    //Scorpion Wasp
    {id: [1, 96], ambush: true},
    //Panoptic Guardian
    {id: [3, 89], ambush: true},
    //Gorgon Cutthroat
    {id: [6, 200], ambush: true},
    //Desert Marshal
    {id: [1, 332], ambush: true},
    //Storm Lynx
    {id: [1, 353], ambush: true},
    //Hunting Pteriax
    {id: [1, 363], ambush: true},
    //Ayan, the Abductor
    {id: [2, 204], ambush: true},

    //Revelations
    //Inoa's Fury
    {id: [11, 11], deps: [NO_FRIENDLY_UNITS]},
    //Recycle
    {id: [11, 12], deps: [NO_FRIENDLY_RELICS, NO_FRIENDLY_UNITS]},
    //Tactical Expertise
    {id: [11, 40], deps: [NO_ATTACKING_UNITS]},
    //Infuse with Venom
    {id: [11, 46], deps: [NO_UNITS]},
    //Well-Laid Trap
    {id: [11, 65], deps: [NO_ATTACKING_ENEMY_UNITS]},
    //Overthrow
    {id: [11, 88], deps: [NO_ENEMY_SPELLS_WITH_COST_FOUR_OR_MORE, NO_ENEMY_UNITS_WITH_COST_FOUR_OR_MORE]},
    //Boiling Geyser
    {id: [11, 96], deps: [NO_ENEMY_UNITS_PLAYED_THIS_TURN]},
    //Obstructive Flicker
    {id: [11, 99], deps: [NO_ATTACKING_ENEMY_UNITS, NO_ENEMY_RELIC_ATTACK, NO_ENEMY_SLOW_SPELLS]},
    //Runic Transformation
    {id: [11, 101], deps: [NO_TWO_ENEMY_UNITS]},
    //Rule the Skies
    {id: [11, 114], deps: [NO_ENEMY_UNITS]},
    //Turn for the Worse
    {id: [11, 130], deps: [NO_ENEMY_UNITS_TAKEN_DAMAGE_THIS_TURN]},
    //Gavel's Insight
    {id: [11, 175], deps: [NO_UNITS]},
    //Freeze Out
    {id: [11, 188], deps: [NO_ENEMY_SPELLS]},
    //Collapse
    {id: [11, 192], deps: [NO_ENEMY_UNITS,  NO_ENEMY_SITE, NO_ENEMY_CURSES], and: [AT_LEAST_TWO_CARDS_IN_HAND]} ,

    //Buried Memories
    //Flash Fry
    {id: [1105, 1], deps: [NO_UNITS]},
    //Smite
    {id: [1105, 8], deps: [NO_UNITS_WITH_DIFFERENT_POWER_AND_HEALTH]},
    //Refraction
    {id: [1105, 10], deps: [NO_ATTACKING_ENEMY_UNITS]},

    //1107 Stormbreak
    //Evacuation Plan
    {id: [1107, 15], deps: [NO_UNITS]},

    //Hour of Glass
    //Auren Condemnation
    {id: [1115, 9], deps: [NO_ATTACKING_ENEMY_UNITS]},
    //Dazzling Revelation, "stun three attacking enemy units" is actually "stun up to three attacking enemy units"
    {id: [1115, 10], deps: [NO_ATTACKING_ENEMY_UNITS_WITHOUT_ENDURANCE]},
];