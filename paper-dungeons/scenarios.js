const scenarios = [
    {
        name: 'A',
        grid: {
            [A]: {
                2: {
                    directions: {
                        [B]: {2: DRAWN_WALL},
                    }
                },
                6: {
                    monster: MONSTER_1,
                },
            },
            [B]: {
                1: {
                    directions: {
                        [B]: {2: DRAWN_WALL},
                    },
                },
                2: {
                    directions: {
                        [A]: {2: DRAWN_WALL},
                        [B]: {1: DRAWN_WALL},
                    }
                },
                4: {
                    directions: {
                        [C]: {4: DRAWN_WALL},
                    }
                },
                5: {
                    directions: {
                        [C]: {5: DRAWN_WALL},
                    }
                },
            },
            [C]: {
                4: {
                    directions: {
                        [B]: {4: DRAWN_WALL},
                    }
                },
                5: {
                    directions: {
                        [B]: {5: DRAWN_WALL},
                    },
                },
            },
            [D]: {
                2: {monster: MONSTER_1},
            },
            [E]: {
                4: {
                    directions: {
                        [E]: {5: DRAWN_WALL},
                        [F]: {4: DRAWN_WALL},
                    }
                },
                5: {
                    monster: MONSTER_2,
                    directions: {
                        [F]: {5: DRAWN_WALL},
                        [E]: {4: DRAWN_WALL},
                    }
                }
            },
            [F]: {
                4: {
                    directions: {
                        [E]: {4: DRAWN_WALL},
                    },
                },
            },
        },
    },
]