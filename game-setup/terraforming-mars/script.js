const $players = document.getElementById('players');
const $expansions = document.getElementById('expansions');
const $addPlayer = document.getElementById('add-player');
const $chooseCorporations = document.getElementById('choose-corporations');
const $hideCorporations = document.getElementById('hide-corporations');
const $chooseCorporationsFrom = document.getElementById('choose-corporations-from');
const $form = document.getElementById('form');
const $result = document.getElementById('result');

const gameState = {
    players: [],
    expansions: [],
    map: null,
    colonies: [],
    corporations: {
        choose: false,
        hidden: false,
        chooseFrom: 2,
    },
};

const EXPANSIONS = [
    {
        id: 'base',
        hidden: true,
        isDefault: true,
        name: 'Base',
        maps: [
            {name: 'Tharsis'},
        ],
        corporations: [
            {name: 'Tharsis Republic'},
            {name: 'Helion'},
            {name: 'ThorGate'},
            {name: 'Phobolog'},
            {name: 'Inventrix'},
            {name: 'Interplanetary Cinematics'},
            {name: 'United Nations Mars Initiative'},
            {name: 'Mining Guild'},
            {name: 'Ecoline'},
            {name: 'Credicor'},
        ],
    },
    {
        id: 'corporate-era',
        hidden: false,
        isDefault: true,
        name: 'Corporate Era',
        corporations: [
            {name: 'Teractor'},
            {name: 'Saturn Systems'},
        ],
    },
    {
        id: 'prelude',
        isDefault: true,
        name: 'Prelude',
        corporations: [
            {name: 'Point Luna'},
            {name: 'Vitor'},
            {name: 'Robinson Industries'},
            {name: 'Valley Trust'},
            {name: 'Cheung Shing Mars'},
        ],
    },
    {
        id: 'venus-next',
        isDefault: true,
        name: 'Venus Next',
        corporations: [
            {name: 'Morning Star Incorporated'},
            {name: 'Manutech'},
            {name: 'Aphrodite'},
            {name: 'Viron'},
            {name: 'Celestic'},
        ],
    },
    {
        id: 'colonies',
        isDefault: true,
        name: 'Colonies',
        colonies: [
            {name: 'Europa'},
            {name: 'Triton'},
            {name: 'Callisto'},
            {name: 'Ceres'},
            {name: 'Enceladus'},
            {name: 'Titan'},
            {name: 'Miranda'},
            {name: 'Ganymede'},
            {name: 'Luna'},
            {name: 'Io'},
            {name: 'Pluto'},
        ],
        corporations: [
            {name: 'Poseidon'},
            {name: 'Stormcraft Incorporated'},
            {name: 'Aridor'},
            {name: 'Polyphemos'},
            {name: 'Arklight'},
        ],
    },
    {
        id: 'hellas-elysium',
        isDefault: true,
        name: 'Hellas & Elysium',
        maps: [
            {name: 'Hellas'},
            {name: 'Elysium'},
        ],
    },
    {
        id: 'turmoil',
        isDefault: false,
        name: 'Turmoil',
    },
    {
        id: 'big-box',
        name: 'Big Box',
        hidden: false,
        isDefault: true,
        corporations: [
            {name: 'Astrodrill'},
            {name: 'Pharmacy Union'},
        ],
    },
    {
        id: 'terra-crimmeria',
        name: 'Terra Cimmeria',
        hidden: false,
        isDefault: true,
        maps: [
            {name: 'Terra Cimmeria'},
        ],
    },
    {
        id: 'vastitas-borealis',
        name: 'Vastitas Borealis',
        hidden: false,
        isDefault: true,
        maps: [
            {name: 'Vastitas Borealis'},
        ],
    },
    {
        id: 'utopia-planitia',
        name: 'Utopia Planitia',
        hidden: false,
        isDefault: true,
        maps: [
            {name: 'Utopia Planitia'},
        ],
    },
    {
        id: 'amazonis-planitia',
        name: 'Amazonis Planitia',
        hidden: false,
        isDefault: true,
        maps: [
            {name: 'Amazonis Planitia'},
        ],
    },
];

const removeIcon = '<span class="material-icons align-middle remove-player">person_remove</span>';
const MAX_PLAYERS = 5;
let nextPlayer = 3;

const addPlayerInput = () => {
    if (nextPlayer > MAX_PLAYERS) {
        return;
    }
    $players.innerHTML += `<li class="list-group-item player-row"><label>Player <span class="player-number">${nextPlayer++}: </span><input class="player"> ${nextPlayer >= 4 ? removeIcon : ''}</label></li>`;
}

const getColoniesCount = playersCount => Math.max(5, playersCount + 2);

EXPANSIONS.forEach(({hidden, id, isDefault, name}) => {
    $expansions.innerHTML += `<li class="list-group-item${hidden ? ' d-none' : ''}"><label class="w-100"><input class="expansion" type="checkbox" value="${id}"${isDefault ? ' checked' : ''}> ${name}</label></li>`;
});

$addPlayer.addEventListener('click', e => {
    e.preventDefault();
    addPlayerInput();
});

$players.addEventListener('click', e => {
    const { target } = e;
    const remove = target.closest('.remove-player');
    if (!remove) {
        return;
    }
    remove.closest('.player-row').remove();
    let next = remove.nextSibling;
    while (next) {
        next.querySelector('.player-number').textContent--;
        next = next.nextSibling;
    }
    nextPlayer--;
});

$chooseCorporations.addEventListener('change', e => {
    const { target } = e;
    const { checked } = target;
    gameState.corporations.choose = checked;
    if (!checked) {
        $hideCorporations.checked = false;
        $chooseCorporationsFrom.value = 2;
    }
    $hideCorporations.disabled = !checked;
    $chooseCorporationsFrom.disabled = !checked;
});

$chooseCorporationsFrom.addEventListener('input', e => {
    const { target } = e;
    const { value } = target;
    gameState.corporations.chooseFrom = parseInt(value, 10);
});

$hideCorporations.addEventListener('change', e => {
    const { target } = e;
    const { checked } = target;
    gameState.corporations.hide = checked;
});

const renderResult = () => {
    let result = '';
    let { players, map, colonies } = gameState;
    const renderCorporations = ({ corporations }) => corporations.map(({name}) => name).join(', ');
    const renderPlayer = ({ first, name, corporations }) => {
        let playerResult = '<li class="list-group-item">';

        if (first) {
            playerResult += '<span class="material-icons align-middle">looks_one</span> '
        }

        playerResult += name;
        if (gameState.corporations.choose) {
            playerResult += ': ';
            if (gameState.corporations.hide) {
                playerResult += '<span class="blur blur-toggle">';
            }
            playerResult += renderCorporations({ corporations });
            if (gameState.corporations.hide) {
                playerResult += '</span>';
            }

        }
        playerResult += '</li>';

        return playerResult;
    }

    players.sort((a, b) => a.first ? -1 : b.first ? 1 : 0);
    result += '<div>Players: </div>';
    result += `<ul id="players-result" class="list-group">${players.map(renderPlayer).join('')}</ul>`;
    result += `<div>Map: ${map.name}</div>`;
    if (colonies.length) {
        result += `<div>Colonies: ${colonies.map(({ name }) => name).join(', ')}</div>`;
    }
    $result.innerHTML = result;
};

$form.addEventListener('submit', e => {
    e.preventDefault();
    gameState.players = [];
    // Players
    gameState.players = [...document.querySelectorAll('.player')]
        .map(({value}) => ({
            name: value,
            first: false,
            corporations: [],
        }))
    // First player
    const firstPlayer = random(0, gameState.players.length);
    gameState.players[firstPlayer].first = true;

    // Expansions
    gameState.expansions = [...document.querySelectorAll('.expansion:checked')]
        .map(({ value }) => EXPANSIONS.find(({id}) => value === id));

    // Maps
    const maps = gameState.expansions.map(({ maps }) => maps)
        .filter(maps => !!maps)
        .reduce((acc, val) => [...acc, ...val], []);
    gameState.map = maps[random(0, maps.length)];

    // Colonies
    const colonies = gameState.expansions.map(({colonies}) => colonies)
        .filter(colonies => !!colonies)
        .reduce((acc, val) => [...acc, ...val], []);
    gameState.colonies = shuffle(colonies).slice(0, getColoniesCount(gameState.players.length));

    // Corporations
    if (gameState.corporations.choose) {
        const corporations = gameState.expansions.map(({corporations}) => corporations)
            .filter(corporations => !!corporations)
            .reduce((acc, val) => [...acc, ...val], []);
        const { chooseFrom } = gameState.corporations;
        let shuffledCorporations = shuffle(corporations);
        gameState.players.forEach(player => {
            player.corporations = shuffledCorporations.slice(0, chooseFrom);
            shuffledCorporations = shuffledCorporations.slice(chooseFrom);
        });
    }

    renderResult();
});

$result.addEventListener('click', e => {
    const { target } = e;
    const blur = target.closest('.blur-toggle');
    if (!blur) {
        return;
    }

    blur.classList.toggle('blur');
});