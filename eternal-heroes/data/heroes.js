const HEROES = [
    {
        "name": "Izalio",
        "title": "General",
        "faction": "FF",
        "set": 1,
    },
    {
        "name": "Kaleb",
        "title": "Uncrowned Prince",
        "faction": "FFF",
        "set": 1,
    },
    {
        "name": "Marisen",
        "title": "the Eldest",
        "alt": [
            "eldest",
        ],
        "faction": "TT",
        "set": 1,
    },
    {
        "name": "Talir",
        "title": "Who Sees Beyond",
        "faction": "TTT",
        "set": 1,
    },
    {
        "name": "Ironthorn",
        "title": "Marshal",
        "faction": "JJ",
        "set": 1,
    },
    {
        "name": "Rolant",
        "title": "the Iron Fist",
        "alt": [
            "iron fist",
        ],
        "faction": "JJJ",
        "set": 1,
    },
    {
        "name": "Wump",
        "title": "Party Starter",
        "faction": "PP",
        "set": 1,
    },
    {
        "name": "Jarrall",
        "title": "Iceheart",
        "faction": "PPP",
        "set": 1,
    },
    {
        "name": "Eilyn",
        "title": "Queen of the Wilds",
        "alt": [
            "queen of wilds",
            "queen wilds",
        ],
        "faction": "PPP",
        "set": 1,
    },
    {
        "name": "Ashara",
        "title": "the Deadshot",
        "alt": [
            "deadshot",
        ],
        "faction": "SS",
        "set": 1,
    },
    {
        "name": "Vara",
        "title": "Fate-touched",
        "alt": [
            "fate touched",
        ],
        "faction": "SSS",
        "set": 1,
    },
    {
        "name": "Ijin",
        "title": "Imperial Armorer",
        "faction": "FFJ",
        "set": 1,
    },
    {
        "name": "Navani",
        "title": "Warsinger",
        "faction": "FJ",
        "set": 1,
    },
    {
        "name": "Icaria",
        "title": "the Liberator",
        "alt": [
            "liberator",
        ],
        "faction": "FFFJJJ",
        "set": 1,
    },
    {
        "name": "Voprex",
        "title": "the Great Ruin",
        "alt": [
            "great ruin",
        ],
        "faction": "FFFSSS",
        "set": 1,
    },
    {
        "name": "Siraf",
        "title": "Knight-Chancellor",
        "alt": [
            "knight chancellor",
        ],
        "faction": "TJ",
        "set": 1,
    },
    {
        "name": "Vodakhan",
        "title": "Temple Speaker",
        "faction": "TTTJJJ",
        "set": 1,
    },
    {
        "name": "Cirso",
        "title": "the Great Glutton",
        "alt": [
            "great glutton",
        ],
        "faction": "TTPP",
        "set": 1,
    },
    {
        "name": "Curiox",
        "title": "the Collector",
        "alt": [
            "collector",
        ],
        "faction": "TTTPPP",
        "set": 1,
    },
    {
        "name": "Azindel",
        "title": "the Wayfinder",
        "alt": [
            "wayfinder",
        ],
        "faction": "TTSS",
        "set": 1,
    },
    {
        "name": "Rilgon",
        "title": "Hooru Operative",
        "faction": "FFPP",
        "set": 1,
    },
    {
        "name": "Nightmaw",
        "title": "Sight Unseen",
        "faction": "PPPSSS",
        "set": 1,
    },
    {
        "name": "Sindok",
        "title": "Rage Incarnate",
        "faction": "FF",
        "set": 2,
    },
    {
        "name": "Evelina",
        "title": "Valley Searcher",
        "faction": "T",
        "set": 2,
    },
    {
        "name": "Tesya",
        "title": "Omen Shaper",
        "faction": "TT",
        "set": 2,
    },
    {
        "name": "Elias",
        "title": "the Broken Wing",
        "alt": [
            "broken wing",
        ],
        "faction": "JJJJ",
        "set": 2,
    },
    {
        "name": "Torgov",
        "title": "Icecap Trader",
        "faction": "PP",
        "set": 2,
    },
    {
        "name": "Obrak",
        "title": "the Feaster",
        "alt": [
            "feaster",
        ],
        "faction": "SSS",
        "set": 2,
    },
    {
        "name": "Diogo",
        "title": "Málaga",
        "alt": [
            "malaga",
        ],
        "faction": "FFT",
        "set": 2,
    },
    {
        "name": "Vadius",
        "title": "Clan Father",
        "faction": "FFP",
        "set": 2,
    },
    {
        "name": "Molot",
        "title": "& Nakova",
        "alt": [
            "nakova",
        ],
        "faction": "FFFPPP",
        "set": 2,
    },
    {
        "name": "Ayan",
        "title": "the Abductor",
        "alt": [
            "abductor",
        ],
        "faction": "TSS",
        "set": 2,
    },
    {
        "name": "Katra",
        "title": "the Devoted",
        "alt": [
            "devoted",
        ],
        "faction": "TTSS",
        "set": 2,
    },
    {
        "name": "Kothon",
        "title": "the Far-Watcher",
        "alt": [
            "far-watcher",
            "the far watcher",
            "far watcher",
        ],
        "faction": "JP",
        "set": 2,
    },
    {
        "name": "Nostrix",
        "title": "Lord of Visions",
        "alt": [
            "lord visions",
        ],
        "faction": "JJJPPP",
        "set": 2,
    },
    {
        "name": "Bartholo",
        "title": "the Seducer",
        "alt": [
            "seducer",
        ],
        "faction": "JJS",
        "set": 2,
    },
    {
        "name": "Makto",
        "title": "Inquisitor",
        "faction": "JJSS",
        "set": 2,
    },
    {
        "name": "Grinva",
        "title": "Judge of Battles",
        "alt": [
            "judge battles",
        ],
        "faction": "JJJSSS",
        "set": 2,
    },
    {
        "name": "Milos Izalio",
        "title": "Heir to Rebellion",
        "alt": [
            "heir rebellion",
            "heir to the rebellion",
        ],
        "faction": "FF",
        "set": 3,
    },
    {
        "name": "Kyojun",
        "title": "Grand Shugo",
        "faction": "FF",
        "set": 3,
    },
    {
        "name": "Jekk",
        "title": "Hunted Fugitive",
        "faction": "FFF",
        "set": 3,
    },
    {
        "name": "Talir",
        "title": "Unbound",
        "faction": "TTT",
        "set": 3,
    },
    {
        "name": "Bisma",
        "title": "Revered Elder",
        "faction": "JJ",
        "set": 3,
    },
    {
        "name": "Stella",
        "title": "the Shotcaller",
        "alt": [
            "shotcaller",
        ],
        "faction": "J",
        "set": 3,
    },
    {
        "name": "Amilli",
        "title": "Cloudmarshal",
        "faction": "JJJ",
        "set": 3,
    },
    {
        "name": "Minsod",
        "title": "the Peerless",
        "alt": [
            "peerless",
        ],
        "faction": "J",
        "set": 3,
    },
    {
        "name": "Relia",
        "title": "Lieutenant",
        "faction": "JJ",
        "set": 3,
    },
    {
        "name": "Thudrock",
        "title": "Arctic Artisan",
        "faction": "PP",
        "set": 3,
    },
    {
        "name": "Alu",
        "title": "Death-Dreamer",
        "alt": [
            "death dreamer",
        ],
        "faction": "PP",
        "set": 3,
    },
    {
        "name": "Lida",
        "title": "Most Skilled",
        "faction": "PP",
        "set": 3,
    },
    {
        "name": "Miris",
        "title": "Nightshade",
        "faction": "S",
        "set": 3,
    },
    {
        "name": "Ashara",
        "title": "Ruthless Assassin",
        "faction": "SS",
        "set": 3,
    },
    {
        "name": "Dizo",
        "title": "Cabal Chairman",
        "faction": "SS",
        "set": 3,
    },
    {
        "name": "Zelia",
        "title": "the Vain",
        "alt": [
            "vain",
        ],
        "faction": "SS",
        "set": 3,
    },
    {
        "name": "Brenn",
        "title": "Chronicler of Ages",
        "alt": [
            "chronicler ages",
        ],
        "faction": "FT",
        "set": 3,
    },
    {
        "name": "Kaleb",
        "title": "Reborn",
        "faction": "FFPP",
        "set": 3,
    },
    {
        "name": "Svetya",
        "title": "Orene of Kosul",
        "alt": [
            "orene kosul",
        ],
        "faction": "JP",
        "set": 3,
    },
    {
        "name": "Eilyn",
        "title": "Clan Mother",
        "faction": "JJPP",
        "set": 3,
    },
    {
        "name": "Rindra",
        "title": "the Duskblade",
        "alt": [
            "duskblade",
        ],
        "faction": "PPSS",
        "set": 3,
    },
    {
        "name": "Curiox",
        "title": "Insatiable Seeker",
        "faction": "FFTTPP",
        "set": 3,
    },
    {
        "name": "Rika",
        "title": "Desert Navigator",
        "faction": "F",
        "set": 4,
    },
    {
        "name": "Criva",
        "title": "the Crimson Scythe",
        "alt": [
            "crimson scythe",
        ],
        "faction": "FF",
        "set": 4,
    },
    {
        "name": "Yushkov",
        "title": "the Usurper",
        "alt": [
            "usurper",
        ],
        "faction": "FFF",
        "set": 4,
    },
    {
        "name": "Zuberi",
        "title": "Outlands Warlord",
        "faction": "FF",
        "set": 4,
    },
    {
        "name": "Brand",
        "title": "Without Fear",
        "alt": [
            "fear",
        ],
        "faction": "FF",
        "set": 4,
    },
    {
        "name": "Gnash",
        "title": "Pridemaster",
        "faction": "TT",
        "set": 4,
    },
    {
        "name": "Alhed",
        "title": "Mount Breaker",
        "faction": "TT",
        "set": 4,
    },
    {
        "name": "Geomar",
        "title": "the Steel Tempest",
        "alt": [
            "steel tempest",
        ],
        "faction": "JJ",
        "set": 4,
    },
    {
        "name": "Marley",
        "title": "Sheriff",
        "faction": "JJ",
        "set": 4,
    },
    {
        "name": "Sigvard",
        "title": "the Last Bastion",
        "alt": [
            "last bastion",
        ],
        "faction": "JJ",
        "set": 4,
    },
    {
        "name": "Aeva",
        "title": "Eilyn's Elite",
        "alt": [
            "eilyns elite",
        ],
        "faction": "PP",
        "set": 4,
    },
    {
        "name": "Kenna",
        "title": "Shaman of the Scale",
        "alt": [
            "shaman scale",
            "shaman of scale",
            "shaman the scale",
        ],
        "faction": "PPP",
        "set": 4,
    },
    {
        "name": "Fenris",
        "title": "Nightshade",
        "faction": "S",
        "set": 4,
    },
    {
        "name": "Mazag",
        "title": "the Waking Terror",
        "alt": [
            "waking terror",
        ],
        "faction": "SSS",
        "set": 4,
    },
    {
        "name": "Rizahn",
        "title": "Greatbow Master",
        "faction": "FFJJ",
        "set": 4,
    },
    {
        "name": "Crunch",
        "title": "the Hoarder",
        "alt": [
            "hoarder",
        ],
        "faction": "FP",
        "set": 4,
    },
    {
        "name": "Tamarys",
        "title": "the Geomancer",
        "alt": [
            "geomancer",
        ],
        "faction": "FP",
        "set": 4,
    },
    {
        "name": "Crill",
        "title": "Merciless Pillager",
        "faction": "FFPP",
        "set": 4,
    },
    {
        "name": "Wyatt",
        "title": "Junk Collector",
        "faction": "FS",
        "set": 4,
    },
    {
        "name": "Jekk",
        "title": "Lone Gun",
        "faction": "FFSS",
        "set": 4,
    },
    {
        "name": "Alessi",
        "title": "Combrei Archmage",
        "faction": "TJ",
        "set": 4,
    },
    {
        "name": "Irel IV",
        "title": "Genetrix",
        "faction": "TTJJ",
        "set": 4,
    },
    {
        "name": "Derry Cathain",
        "title": "Ripclaw Rider",
        "faction": "TP",
        "set": 4,
    },
    {
        "name": "Caiphus",
        "title": "Wandering King",
        "faction": "N",
        "set": 4,
    },
    {
        "name": "Nika",
        "title": "the Freescaler",
        "alt": [
            "freescaler",
        ],
        "faction": "FFF",
        "set": 5,
    },
    {
        "name": "Xo",
        "title": "of the Endless Hoard",
        "alt": [
            "of endless hoard",
            "the endless hoard",
            "endless hoard",
        ],
        "faction": "FFFF",
        "set": 5,
    },
    {
        "name": "Cykalis",
        "title": "the Burning Sand",
        "alt": [
            "burning sand",
        ],
        "faction": "TT",
        "set": 5,
    },
    {
        "name": "Ravid",
        "title": "Insect Master",
        "faction": "TT",
        "set": 5,
    },
    {
        "name": "Hojan",
        "title": "Crownbreaker",
        "faction": "J",
        "set": 5,
    },
    {
        "name": "Kemmo",
        "title": "Ijin's Apprentice",
        "alt": [
            "ijins apprentice",
        ],
        "faction": "J",
        "set": 5,
    },
    {
        "name": "Reyna",
        "title": "the Unwavering",
        "alt": [
            "unwavering",
        ],
        "faction": "JJJ",
        "set": 5,
    },
    {
        "name": "Justa",
        "title": "Regglar Jotun",
        "faction": "PPP",
        "set": 5,
    },
    {
        "name": "Eilyn",
        "title": "the Rising Storm",
        "alt": [
            "rising storm",
        ],
        "faction": "PPP",
        "set": 5,
    },
    {
        "name": "Mokhnati",
        "title": "Restored",
        "faction": "PP",
        "set": 5,
    },
    {
        "name": "Severin",
        "title": "Star-Reader",
        "alt": [
            "star reader",
            "starreader",
        ],
        "faction": "S",
        "set": 5,
    },
    {
        "name": "Tavia",
        "title": "Lethrai Raidleader",
        "faction": "S",
        "set": 5,
    },
    {
        "name": "Rhysta",
        "title": "Acantha's Herald",
        "alt": [
            "acanthas herald",
        ],
        "faction": "SS",
        "set": 5,
    },
    {
        "name": "Sahin",
        "title": "Governor",
        "faction": "S",
        "set": 5,
    },
    {
        "name": "Acantha",
        "title": "the Huntress",
        "alt": [
            "huntress",
        ],
        "faction": "SS",
        "set": 5,
    },
    {
        "name": "Darya",
        "title": "Warrior Poet",
        "faction": "FFTT",
        "set": 5,
    },
    {
        "name": "Milos",
        "title": "Unwavering Idealist",
        "faction": "FJ",
        "set": 5,
    },
    {
        "name": "Eaton",
        "title": "Seditious Noble",
        "faction": "FFJJ",
        "set": 5,
    },
    {
        "name": "Syl",
        "title": "Hand of the Cabal",
        "alt": [
            "hand cabal",
            "hand of cabal",
            "hand the cabal",
        ],
        "faction": "FFSS",
        "set": 5,
    },
    {
        "name": "Deleph",
        "title": "Cursed Prophet",
        "faction": "TS",
        "set": 5,
    },
    {
        "name": "Aniyah",
        "title": "Arctic Sheriff",
        "faction": "JJPP",
        "set": 5,
    },
    {
        "name": "Zende",
        "title": "the Heart-Binder",
        "alt": [
            "heart-binder",
            "heartbinder",
            "the heartbinder",
            "the heart binder",
        ],
        "faction": "PPSS",
        "set": 5,
    },
    {
        "name": "Zal Chi",
        "title": "Herald of War",
        "alt": [
            "herald war",
        ],
        "faction": "FFTTPP",
        "set": 5,
    },
    {
        "name": "Quinn",
        "title": "Lone Wanderer",
        "faction": "FFJJPP",
        "set": 5,
    },
    {
        "name": "Brel",
        "title": "Solist Apostate",
        "faction": "FFJJSS",
        "set": 5,
    },
    {
        "name": "Grinva",
        "title": "Breaker of Will",
        "alt": [
            "breaker will",
        ],
        "faction": "TTJJSS",
        "set": 5,
    },
    {
        "name": "Jishu",
        "title": "the Burning Brush",
        "alt": [
            "burning brush",
        ],
        "faction": "F",
        "set": 6,
    },
    {
        "name": "Kimmi",
        "title": "Expedition Guide",
        "faction": "T",
        "set": 6,
    },
    {
        "name": "Tocas",
        "title": "Waystone Harvester",
        "faction": "TT",
        "set": 6,
    },
    {
        "name": "Xumucan",
        "title": "the Surveyor",
        "alt": [
            "surveyor",
        ],
        "faction": "TTTTT",
        "set": 6,
    },
    {
        "name": "Siraf",
        "title": "Grand Strategist",
        "faction": "J",
        "set": 6,
    },
    {
        "name": "Sediti",
        "title": "the Killing Steel",
        "alt": [
            "killing steel",
        ],
        "faction": "JJJJJ",
        "set": 6,
    },
    {
        "name": "Nikos",
        "title": "the Unifier",
        "alt": [
            "unifier",
        ],
        "faction": "JJ",
        "set": 6,
    },
    {
        "name": "Larai",
        "title": "the Appraiser",
        "alt": [
            "appraiser",
        ],
        "faction": "P",
        "set": 6,
    },
    {
        "name": "Bam",
        "title": "Sneakeepeekee",
        "faction": "PP",
        "set": 6,
    },
    {
        "name": "Rost",
        "title": "the Waking Glacier",
        "alt": [
            "waking glacier",
        ],
        "faction": "PPPPP",
        "set": 6,
    },
    {
        "name": "Tamarys",
        "title": "Earthshaker",
        "faction": "PP",
        "set": 6,
    },
    {
        "name": "Olly",
        "title": "Maniacal Graverobber",
        "faction": "SS",
        "set": 6,
    },
    {
        "name": "Livia",
        "title": "Hexweaver",
        "faction": "SS",
        "set": 6,
    },
    {
        "name": "Vishni",
        "title": "Lethrai Highblood",
        "faction": "SS",
        "set": 6,
    },
    {
        "name": "Tasbu",
        "title": "the Forbidden",
        "alt": [
            "forbidden",
        ],
        "faction": "SSSSS",
        "set": 6,
    },
    {
        "name": "Albon Roa",
        "title": "of the Order",
        "alt": [
            "order",
            "of order",
            "the order",
        ],
        "faction": "TTPP",
        "set": 6,
    },
    {
        "name": "Oizio",
        "title": "Adaptive Spy",
        "faction": "PS",
        "set": 6,
    },
    {
        "name": "Merizo",
        "title": "Gladiator Hero",
        "faction": "TT",
        "set": 7,
    },
    {
        "name": "Yojra",
        "title": "The Tale Keeper",
        "alt": [
            "tale keeper",
        ],
        "faction": "P",
        "set": 7,
    },
    {
        "name": "Verro",
        "title": "Banished Inquisitor",
        "faction": "SS",
        "set": 7,
    },
    {
        "name": "Varret",
        "title": "Hero-in-training",
        "alt": [
            "hero in training",
            "hero training",
        ],
        "faction": "N",
        "set": 7,
    },
    {
        "name": "Daraka",
        "title": "Loyal Guardian",
        "faction": "PPP",
        "set": 8,
    },
    {
        "name": "Eremot",
        "title": "Mindsplinter",
        "faction": "SSSS",
        "set": 8,
    },
    {
        "name": "Gerrit",
        "title": "Throne Guardian",
        "faction": "TJ",
        "set": 8,
    },
    {
        "name": "Naoki",
        "title": "Valiant Warrior",
        "faction": "FFTTJJ",
        "set": 8,
    },
    {
        "name": "Dova",
        "title": "the Fearmonger",
        "alt": [
            "fearmonger",
            "fear monger",
        ],
        "faction": "FFTTSS",
        "set": 8,
    },
    {
        "name": "Wren",
        "title": "Traditionalist",
        "faction": "TTJJPP",
        "set": 8,
    },
    {
        "name": "Zadia",
        "title": "Revered Outcast",
        "faction": "JJPPSS",
        "set": 8,
    },
    {
        "name": "Ijin",
        "title": "Walking Armory",
        "alt": [
            "walking armoury",
        ],
        "faction": "FF",
        "set": 9,
    },
    {
        "name": "Vadius",
        "title": "Proud Duelist",
        "faction": "FF",
        "set": 9,
    },
    {
        "name": "Ferno",
        "title": "Rageborn",
        "faction": "FFFFF",
        "set": 9,
    },
    {
        "name": "Ragnar",
        "title": "Lord",
        "faction": "FF",
        "set": 9,
    },
    {
        "name": "Kaleb",
        "title": "Claimless",
        "faction": "FFF",
        "set": 9,
    },
    {
        "name": "Ubsat",
        "title": "the Savior",
        "alt": [
            "savior",
            "saviour",
            "the saviour",
        ],
        "faction": "TTTTT",
        "set": 9,
    },
    {
        "name": "Touvon",
        "title": "Skybreak Giant",
        "faction": "TTT",
        "set": 9,
    },
    {
        "name": "Talir",
        "title": "Timeless",
        "faction": "TTT",
        "set": 9,
    },
    {
        "name": "Oskar",
        "title": "Chief Tinker",
        "faction": "JJ",
        "set": 9,
    },
    {
        "name": "Telut",
        "title": "The Iron Gate",
        "alt": [
            "iron gate",
        ],
        "faction": "JJJJJ",
        "set": 9,
    },
    {
        "name": "Tavrod",
        "title": "Auric Financier",
        "faction": "JJJ",
        "set": 9,
    },
    {
        "name": "Svetya",
        "title": "Lawbringer",
        "faction": "JJJ",
        "set": 9,
    },
    {
        "name": "Rolant",
        "title": "Merciless",
        "faction": "JJJ",
        "set": 9,
    },
    {
        "name": "Makto",
        "title": "Valorous Savior",
        "alt": [
            "valorous saviour",
        ],
        "faction": "JJ",
        "set": 9,
    },
    {
        "name": "Helio",
        "title": "the Skywinder",
        "alt": [
            "skywinder",
        ],
        "faction": "P",
        "set": 9,
    },
    {
        "name": "Eilyn",
        "title": "Fearless",
        "faction": "PPP",
        "set": 9,
    },
    {
        "name": "Ayan",
        "title": "Dark Conduit",
        "faction": "SS",
        "set": 9,
    },
    {
        "name": "Tasbu",
        "title": "the Tempter",
        "alt": [
            "tempter",
        ],
        "faction": "SSSSS",
        "set": 9,
    },
    {
        "name": "Elias",
        "title": "Shadow Wing",
        "faction": "SSS",
        "set": 9,
    },
    {
        "name": "Severin",
        "title": "of the Dark",
        "alt": [
            "dark",
            "of dark",
            "the dark",
        ],
        "faction": "SS",
        "set": 9,
    },
    {
        "name": "Vara",
        "title": "Limitless",
        "faction": "SSS",
        "set": 9,
    },
    {
        "name": "Angelica",
        "title": "Praxis Infuser",
        "faction": "FFTTTT",
        "set": 9,
    },
    {
        "name": "Ironthorn",
        "title": "Lawman",
        "faction": "FJJJ",
        "set": 9,
    },
    {
        "name": "Marley",
        "title": "Heroic Marshal",
        "faction": "FFFFJJ",
        "set": 9,
    },
    {
        "name": "Crill",
        "title": "Clan Raider",
        "faction": "FFFP",
        "set": 9,
    },
    {
        "name": "Kenna",
        "title": "Uncontained",
        "faction": "FFPPPP",
        "set": 9,
    },
    {
        "name": "Syl",
        "title": "Cabal Strongarm",
        "alt": [
            "cabal strong arm",
        ],
        "faction": "FSSS",
        "set": 9,
    },
    {
        "name": "Bathon",
        "title": "Death's Reach",
        "alt": [
            "deaths reach",
        ],
        "faction": "FFFFSS",
        "set": 9,
    },
    {
        "name": "Generix Irel",
        "title": "Wayward",
        "faction": "TTTJ",
        "set": 9,
    },
    {
        "name": "Diana",
        "title": "Faith's Shield",
        "alt": [
            "faiths shield",
        ],
        "faction": "TTJJJJ",
        "set": 9,
    },
    {
        "name": "Wump",
        "title": "& Mizo",
        "alt": [
            "mizo",
            "and mizo",
        ],
        "faction": "TPPP",
        "set": 9,
    },
    {
        "name": "Danica",
        "title": "Runed Witch",
        "faction": "TTTTP",
        "set": 9,
    },
    {
        "name": "Katra",
        "title": "The First Seal",
        "alt": [
            "first seal",
        ],
        "faction": "TTSSSS",
        "set": 9,
    },
    {
        "name": "Aniyah",
        "title": "Master Sleuth",
        "faction": "JJJP",
        "set": 9,
    },
    {
        "name": "Roshi",
        "title": "the Entrancer",
        "alt": [
            "entrancer",
        ],
        "faction": "JJPPPP",
        "set": 9,
    },
    {
        "name": "Bartholo",
        "title": "Beguiling",
        "faction": "JSSS",
        "set": 9,
    },
    {
        "name": "Rolant",
        "title": "Iron Tyrant",
        "faction": "JJJSS",
        "set": 9,
    },
    {
        "name": "Rindra",
        "title": "Infiltrator",
        "faction": "PPSSSS",
        "set": 9,
    },
].map((hero, i) => ({
    ...hero,
    id: i + 1,
}));