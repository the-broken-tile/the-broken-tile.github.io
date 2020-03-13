const MIN = 1;
const MAX = 5;
const RESULTS_ON_CLASS = 'results-on';
const CONFIG = {
    theme: [
        'weather',
        'plants',
        'robots',
        'the moon',
        'poison',
        'castles',
        'carnival',
        'candles',
        'penguins',
        'cacti',
        'bacon',
    ],
    mechanics: [
        'take that',
        'worker placement',
        'auction',
        'dexterity',
        'co-op',
        'roll & write',
    ],
    components: [
        'D10',
        'D20',
        '10 cards',
        '18 cards',
        'meeples',
        'no cards',
        'magnets',
        'sand timer',
        'dry wipe pen',
        'poker chips',
        'spinner',
    ],
};

const encode = object => encodeURIComponent(btoa(JSON.stringify(object)));
const decode = string => {
    try {
        return JSON.parse(atob(decodeURIComponent(string)));
    } catch (e) {
        return {};
    }
};
const save = () => {
    document.location.hash = encode(results);
};
const load = () => {
    if (!document.location.hash) {
        return {};
    }
    const hash = document.location.hash.substr(1);

    const decoded = decode(hash);
    if (Object.keys(decoded).length === 0) {
        document.location.hash = '';
    }

    return decoded;
};
const rand = max => Math.floor(Math.random() * max);

const $inputs = Object.keys(CONFIG).reduce((carry, key) => ({
    ...carry,
    [key]: document.getElementById(`${key}-input`),
}), {});
const $submits = Object.keys(CONFIG).reduce((carry, key) => ({
    ...carry,
    [key]: document.getElementById(`${key}-submit`),
}), {});
const $results = Object.keys(CONFIG).reduce((carry, key)=> ({
    ...carry,
    [key]: document.getElementById(`${key}-result`),
}), {});
const $containers = Object.keys(CONFIG).reduce((carry, key) => ({
    ...carry,
    [key]: document.getElementById(`${key}-container`),
}), {});

const fillResults = r => {
    Object.keys(CONFIG).forEach(key => {
        const value = r[key];
        if (!value || !value.length) {
            $results[key].innerHTML = '';
            $containers[key].classList.remove(RESULTS_ON_CLASS);
            return;
        }
        $results[key].innerHTML = value.join(', ');
        $containers[key].classList.add(RESULTS_ON_CLASS);
    });
};

let results = load();

Object.keys(CONFIG).forEach(key => {
    $submits[key].addEventListener('click', () => {
        const val = +$inputs[key].value;
        if (val < MIN || val > MAX) {
            return;
        }
        results[key] = [];
        for (let i = 0; i < val; i++) {
            results[key].push(CONFIG[key][rand(CONFIG[key].length)]);
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
