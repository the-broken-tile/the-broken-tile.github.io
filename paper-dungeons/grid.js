const grid = {
    [A]: {
        1: {
            minion: {type: MINION_GHOST, level: 3},
            treasure: [TREASURE_POTION, TREASURE_POTION],
            directions: {
                [A]: {2: WATER},
                [B]: {1: DOOR},
            },
            entrance: true,
        },
        2: {
            minion: {type: MINION_ZOMBIE, level: 4},
            treasure: [TREASURE_GEM_A],
            directions: {
                [A]: {1: WATER},
                [B]: {2: DOOR},
                [F]: {2: PORTAL},
            },
        },
        3: {
            treasure: [TREASURE_LEVEL_UP],
            directions: {
                [A]: {2: DOOR, 4: WATER},
                [B]: {3: DOOR},
            },
            trap: true,
        },
        4: {
            directions: {
                [A]: {3: WATER, 5: DOOR},
                [B]: {4: DOOR},
                [F]: {4: PORTAL},
            },
        },
        5: {
            minion: {type: MINION_GHOST, level: 4},
            treasure: [TREASURE_GEM_D],
            directions: {
                [A]: {4: DOOR, 6: WATER},
                [B]: {5: DOOR},
            },
        },
        6: {
            directions: {
                [A]: {5: WATER, 7: DOOR},
                [B]: {6: DOOR},
            },
        },
        7: {
            treasure: [TREASURE_POTION],
            directions: {
                [A]: {6: DOOR},
                [B]: {7: WALL},
            },
        },
    },
    [B]: {
        1: {
            minion: {type: MINION_ORC, level: 3},
            treasure: [TREASURE_CRAFT_ARTIFACT],
            directions: {
                [A]: {1: DOOR},
                [B]: {2: DOOR},
                [C]: {1: DOOR},
            },
            entrance: true,
        },
        2: {
            directions: {
                [A]: {2: DOOR},
                [B]: {1: DOOR, 3: DOOR},
                [C]: {2: DOOR},
            },
        },
        3: {
            directions: {
                [A]: {3: DOOR},
                [B]: {2: DOOR, 4: DOOR},
                [C]: {3: DOOR},
            },
            trap: true,
        },
        4: {
            treasure: [TREASURE_CRAFT_ARTIFACT],
            directions: {
                [A]: {4: DOOR},
                [B]: {3: DOOR, 5: DOOR},
                [C]: {4: DOOR},
            },
        },
        5: {
            directions: {
                [A] : {5: DOOR},
                [B] : {4: DOOR, 6: DOOR},
                [C] : {5: DOOR},
            },
            trap: true,
        },
        6: {
            treasure: [TREASURE_CRAFT_ARTIFACT],
            directions: {
                [A]: {6: DOOR},
                [B]: {5: WALL, 7: DOOR},
                [C]: {6: DOOR},
            },
            trap: true,
        },
        7: {
            treasure: [TREASURE_GEM_G],
            directions: {
                [A]: {7: WALL},
                [B]: {6: WALL},
                [C]: {7: WALL},
            },
            trap: true,
        },
    },
    [C]: {
        1: {
            treasure: [TREASURE_POTION],
            directions: {
                [B]: {1: DOOR},
                [C]: {2: DOOR},
                [D]: {1: DOOR},
            },
            entrance: true,
        },
        2: {
            directions: {
                [B]: {2: DOOR},
                [C]: {1: DOOR, 3: DOOR},
                [D]: {2: DOOR},
            },
            trap: true,
        },
        3: {
            treasure: [TREASURE_POTION],
            directions: {
                [B]: {3: DOOR},
                [C]: {2: DOOR, 4: WALL},
                [D]: {3: DOOR},
            },
        },
        4: {
            minion: {type: MINION_GOBLIN, level: 4},
            treasure: [TREASURE_GEM_C],
            directions: {
                [B]: {4: DOOR},
                [C]: {3: WALL, 5: DOOR},
                [D]: {4: DOOR},
            },
        },
        5: {
            directions: {
                [C]: {4: DOOR, 6: DOOR},
                [B]: {5: DOOR},
                [D]: {5: DOOR},
            },
            trap: true,
        },
        6: {
            directions: {
                [C]: {5: DOOR, 7: DOOR},
                [B]: {6: DOOR},
                [D]: {6: DOOR},
            },
            trap: true,
        },
        7: {
            directions: {
                [B]: {7: WALL},
                [C]: {6: DOOR},
                [D]: {7: DOOR},
            },
        },
    },
    [D]: {
        1: {
            minion:  {type: MINION_GOBLIN, level: 3},
            treasure: [TREASURE_POTION],
            directions: {
                [C]: {1: DOOR},
                [D]: {2: WALL},
                [E]: {1: DOOR},
            },
            entrance: true,
        },
        2: {
            directions: {
                [C]: {2: DOOR},
                [D]: {1: WALL, 3: DOOR},
                [D]: {1: WALL},
            },
        },
        3: {
            treasure: [TREASURE_LEVEL_UP],
            directions: {
                [C]: {3: DOOR},
                [D]: {2: DOOR, 4: DOOR},
                [E]: {3: DOOR},
            },
            trap: true,
        },
        4: {
            directions: {
                [C]: {4: DOOR},
                [D]: {3: DOOR, 5: DOOR},
                [E]: {4: DOOR},
            },
        },
        5: {
            treasure: [TREASURE_LEVEL_UP],
            directions: {
                [C]: {5: DOOR},
                [D]: {4: DOOR, 6: DOOR},
                [E]: {5: DOOR},
            },
            trap: true,
        },
        6: {
            minion: {type: MINION_ORC, level: 5},
            treasure: [TREASURE_GEM_F],
            directions: {
                [C]: {6: DOOR},
                [D]: {5: DOOR, 7: DOOR},
                [E]: {6: WATER},
            },
        },
        7: {
            treasure: [TREASURE_LEVEL_UP],
            directions: {
                [C]: {7: DOOR},
                [D]: {6: DOOR},
                [E]: {7: DOOR},
            },
            trap: true,
        },
    },
    [E]: {
        1: {
            treasure: [TREASURE_POTION],
            directions: {
                [D]: {1: DOOR},
                [F]: {1: DOOR},
                [E]: {2: DOOR},
            },
            trap: true,
            entrance: true,
        },
        2: {
            minion: {type: MINION_ZOMBIE, level: 3},
            treasure: [TREASURE_LEVEL_UP],
            directions: {
                [D]: {2: DOOR},
                [E]: {1: DOOR, 3: DOOR},
                [F]: {2: DOOR},
            },
        },
        3: {
            directions: {
                [D]: {3: DOOR},
                [E]: {2: DOOR, 4: DOOR},
                [F]: {3: DOOR},
            }
        },
        4: {
            minion: {type: MINION_GHOST, level: 4},
            treasure: [TREASURE_POTION],
            directions: {
                [D]: {4: DOOR},
                [E]: {3: DOOR, 5: DOOR},
                [F]: {4: DOOR},
            },
        },
        5: {
            directions: {
                [D]: {5: DOOR},
                [E]: {4: DOOR, 6: DOOR},
                [F]: {5: WATER},
            },
        },
        6: {
            treasure: [TREASURE_CRAFT_ARTIFACT],
            directions: {
                [D]: {6: WATER},
                [E]: {5: DOOR, 7: DOOR},
                [F]: {6: DOOR},
            },
            trap: true,
        },
        7: {
            directions: {
                [D]: {7: DOOR},
                [E]: {6: DOOR},
                [F]: {7: DOOR},
            },
        },
    },
    [F]: {
        1: {
            treasure: [TREASURE_POTION],
            directions: {
                [E]: {1: DOOR},
                [F]: {2: DOOR},
            },
            entrance: true,
        },
        2: {
            treasure: [TREASURE_CRAFT_ARTIFACT],
            directions: {
                [A]: {2: PORTAL},
                [E]: {2: DOOR},
                [F]: {1: DOOR, 3: WATER},
            },
            trap: true,
        },
        3: {
            minion: {type: MINION_ORC, level: 4},
            treasure: [TREASURE_GEM_B],
            directions: {
                [E]: {3: DOOR},
                [F]: {2: WATER, 4: DOOR},
            },
        },
        4: {
            treasure: [TREASURE_LEVEL_UP],
            directions: {
                [A]: {4: PORTAL},
                [E]: {4: DOOR},
                [F]: {3: DOOR, 5: WATER},
            },
            trap: true,
        },
        5: {
            minion: {type: MINION_GOBLIN, level: 5},
            treasure: [TREASURE_GEM_E],
            directions: {
                [E]: {5: WATER, 6: DOOR},
                [F]: {4: WATER},
            },
        },
        6: {
            directions: {
                [E]: {6: DOOR},
                [F]: {5: DOOR, 7: WALL},
            },
            trap: true,
        },
        7: {
            minion: {type: MINION_ZOMBIE, level: 5},
            treasure: [TREASURE_GEM_H],
            directions: {
                [E]: {7: DOOR},
                [F]: {6: WALL},
            },
        },
    },
};