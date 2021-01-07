const SET_SIZE_LARGE = 'large';
const SET_SIZE_SMALL = 'small';
const SETS = [
    {
        name: 'The Empty Throne',
        type: SET_SIZE_LARGE,
    },
    {
        name: 'Omens of the Past',
        type: SET_SIZE_LARGE,
    },
    {
        name: 'The Dusk road',
        type: SET_SIZE_LARGE,
    },
    {
        name: 'The Fall of Argenport',
        type: SET_SIZE_LARGE,
    },
    {
        name: 'Defiance',
        type: SET_SIZE_LARGE,
    },
    {
        name: 'Dark Frontier',
        type: SET_SIZE_SMALL,
    },
    {
        name: 'Flame of Xulta',
        type: SET_SIZE_SMALL,
    },
    {
        name: 'Echoes of Eternity',
        type: SET_SIZE_SMALL,
    },
    {
        name: 'Argent Depths',
        type: SET_SIZE_LARGE,
    },
    {
        name: 'Empire of Glass',
        type: SET_SIZE_LARGE,
    },
].map((set, i) => ({
    ...set,
    id: i + 1,
}));
