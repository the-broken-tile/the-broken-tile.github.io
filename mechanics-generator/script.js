const MIN = 1;
const MAX = 5;
const RESULTS_ON_CLASS = 'results-on';
const THEME = 'theme';
const MECHANICS = 'mechanics';
const COMPONENTS = 'components';
const CONFIG = [
    {
        id: 0,
        name: 'weather',
        type: THEME,
    }, {
        id: 1,
        name: 'plants',
        type: THEME,
    }, {
        id: 2,
        name: 'robots',
        type: THEME,
    }, {
        id: 3,
        name: 'the moon',
        type: THEME,
    }, {
        id: 4,
        name: 'poison',
        type: THEME,
    }, {
        id: 5,
        name: 'castles',
        type: THEME,
    }, {
        id: 6,
        name: 'carnival',
        type: THEME,
    }, {
        id: 7,
        name: 'candles',
        type: THEME,
    }, {
        id: 8,
        name: 'penguins',
        type: THEME,
    }, {
        id: 9,
        name: 'cacti',
        type: THEME,
    }, {
        id: 10,
        name: 'bacon',
        type: THEME,
    }, {
        id: 11,
        name: 'take that',
        type: MECHANICS,
    }, {
        id: 12,
        name: 'worker placement',
        type: MECHANICS,
    }, {
        id: 13,
        name: 'auction',
        type: MECHANICS,
    }, {
        id: 14,
        name: 'dexterity',
        type: MECHANICS,
    }, {
        id: 15,
        name: 'co-op',
        type: MECHANICS,
    }, {
        id: 16,
        name: 'roll & write',
        type: MECHANICS,
    }, {
        id: 17,
        name: 'D10',
        type: COMPONENTS,
    }, {
        id: 18,
        name:  'D20',
        type: COMPONENTS,
    }, {
        id: 19,
        name: '10 cards',
        type: COMPONENTS,
    }, {
        id: 20,
        name: '18 cards',
        type: COMPONENTS,
    }, {
        id: 21,
        name: 'meeples',
        type: COMPONENTS,
    }, {
        id: 22,
        name: 'no cards',
        type: COMPONENTS,
    }, {
        id: 23,
        name: 'magnets',
        type: COMPONENTS,
    }, {
        id: 24,
        name: 'sand timer',
        type: COMPONENTS,
    }, {
        id: 25,
        name: 'dry wipe pen',
        type: COMPONENTS,
    }, {
        id: 26,
        name: 'poker chips',
        type: COMPONENTS,
    }, {
        id: 27,
        name: 'spinner',
        type: COMPONENTS,
    },
];
const TYPES = Object.keys(CONFIG.reduce((carry, config) => {
    return {
        ...carry,
        [config.type]: true
    };
}, {}));

const repository = {
    getByType: type => CONFIG.filter(config => config.type === type),
    getByIds: ids => CONFIG.filter(config => ids.includes(config.id)),
};

const encode = array => encodeURIComponent(btoa(array.join(':')));
const decode = string => {
    try {
        return atob(decodeURIComponent(string))
            .split(':')
            .map(number => +number)
            .filter(value => !isNaN(value));
    } catch (e) {
        return [];
    }
};
const save = () => {
    document.location.hash = encode(results);
};
const load = () => {
    if (!document.location.hash) {
        return [];
    }
    const hash = document.location.hash.substr(1);

    const decoded = decode(hash);
    if (decoded.length === 0) {
        document.location.hash = '';
    }

    return decoded;
};
const rand = max => Math.floor(Math.random() * max);

const $inputs = TYPES.reduce((carry, type) => ({
    ...carry,
    [type]: document.getElementById(`${type}-input`),
}), {});
const $submits = TYPES.reduce((carry, type) => ({
    ...carry,
    [type]: document.getElementById(`${type}-submit`),
}), {});
const $results = TYPES.reduce((carry, type)=> ({
    ...carry,
    [type]: document.getElementById(`${type}-result`),
}), {});
const $containers = TYPES.reduce((carry, type) => ({
    ...carry,
    [type]: document.getElementById(`${type}-container`),
}), {});

const fillResults = r => {
    requestAnimationFrame(() => {
        TYPES.forEach(type => {
            $results[type].innerText = '';
        });
        repository.getByIds(r).forEach(value => {
            const $result = $results[value.type];
            $result.innerText += ($result.innerText ? ', ': '') + value.name;
        });
        TYPES.forEach(type => {
            const configs = repository.getByIds(r);
            $containers[type].classList.toggle(RESULTS_ON_CLASS,configs
                .filter(value => value.type === type)
                .length > 0);
        });
    });
};

let results = load();

TYPES.forEach(type => {
    $submits[type].addEventListener('click', () => {
        const val = +$inputs[type].value;
        if (val < MIN || val > MAX) {
            return;
        }
        const configs = repository.getByType(type);
        results = results.filter(row => row.type !== type);
        for (let i = 0; i < val; i++) {
            results.push(configs[rand(configs.length)].id);
        }
        // this will trigger the location change event and refresh the results
        save();
    });
});
window.addEventListener('hashchange', () => {
    results = load();
    fillResults(results);
});
fillResults(results);
