const $players = document.getElementById('players');
const $expansions = document.getElementById('expansions');
const $addPlayer = document.getElementById('add-player');
const $asymmetricMaps = document.getElementById('asymmetric-maps');
const $form = document.getElementById('form');
const $result = document.getElementById('result');

const EXPANSIONS = [
    {
        id: 'base',
        isDefault: true,
        name: 'Base',
        maps: [
            {
                id: 1,
                name: 'Observation Tower',
            },
            {
                id: 2,
                name: 'Outdoor Areas',
            },
            {
                id: 3,
                name: 'Silver Lake',
            },
            {
                id: 4,
                name: 'Commercial Harbor',
            },
            {
                id: 5,
                name: 'Park Restaurant',
            },
            {
                id: 6,
                name: 'Research Institute',
            },
            {
                id: 7,
                name: 'Ice Cream Parlors',
            },
            {
                id: 8,
                name: 'Hollywood Hills',
            },
        ],
        conservationProjects: [
            'Habitat Diversity',
            'Species Diversity',
            'Herbivores',
            'Birds',
            'Primates',
            'Reptiles',
            'Predators',
            'Europe',
            'Asia',
            'Australia',
            'Africa',
            'Americas',
        ],
        bonusTiles: [
            '3 X-tokens',
            'University',
            'Partner Zoo',
            'Play a Sponsor Card',
            '3-enclosure',
            '2 reputation',
            '10 money',
            'x2 multiplier token',
            '3 card draws from reputation range',
        ],
    },
    {
        id: 'map-pack-1',
        name: 'Map Pack 1',
        isDefault: true,
        maps: [
            {
                id: 9,
                name: 'Geographical Zoo',
            },
            {
                id: 10,
                name: 'Rescue Station',
            },
        ],
    }
];

const gameState = {
    asymmetricMaps: true,
    players: [],
    expansions: [],
    conservationProjects: [],
    bonusTiles: [],
};

const removeIcon = '<span class="material-icons align-middle remove-player">person_remove</span>';
const bonusTileLabels = ['5 conservation points', '8 conservation points'];
const MAX_PLAYERS = 4;
let nextPlayer = 3;

/**
 * @param {array} expansions
 * @param {string} propName the property name to get from all expansions, values must be arrays.
 * @returns {array}
 */
const getFromExpansions = (expansions, propName) => {
    return expansions
        .map(expansion => expansion[propName])
        .filter(prop => !!prop)
        .reduce((acc, val) => [...acc, ...val], []);
};

const getConservationProjectsCount = () => gameState.players.length === 4 ? 4 : 3;

const addPlayerInput = () => {
    if (nextPlayer > MAX_PLAYERS) {
        return;
    }
    $players.innerHTML += `<li class="list-group-item player-row"><label>Player <span class="player-number">${nextPlayer++}: </span><input class="player"> ${nextPlayer >= 4 ? removeIcon : ''}</label></li>`;
}

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

const renderResult = () => {
    let result = '';
    let { players } = gameState;
    const renderMap = ({ id, name }) => `<li>${id} ${name}</li>`;
    const renderMaps = maps => `<ul class="maps">${maps.map(renderMap).join('')}</ul>`;
    const renderPlayer = ({ first, name, maps }) => {
        let playerResult = '<li class="list-group-item">';

        if (first) {
            playerResult += '<span class="material-icons align-middle">looks_one</span> '
        }

        playerResult += name;

        playerResult += maps ? renderMaps(maps) : '';
        playerResult += '</li>';

        return playerResult;
    }
    const renderTileGroup = (tileGroup, i) => `<li class="list-group-item">${bonusTileLabels[i]} ${tileGroup.join(', ')}</li>`;
    const renderBonusTiles = tileGroups => `<ul class="list-group">${tileGroups.map(renderTileGroup).join('')}</ul>`;

    players.sort((a, b) => a.first ? -1 : b.first ? 1 : 0);
    result += '<div>Players: </div>';
    result += `<ul id="players-result" class="list-group">${players.map(renderPlayer).join('')}</ul>`;

    result += '<div>Conservation projects: </div>';
    result += `<ol class="list-group list-group-numbered">${gameState.conservationProjects.map(conservationProject => `<li class="list-group-item">${conservationProject}</li>`).join('')}</ol>`;
    result += '<div>Bonus tiles: </div>';
    result += renderBonusTiles(gameState.bonusTiles);
    $result.innerHTML = result;
};


$asymmetricMaps.addEventListener('change', e => {
    const { target } = e;
    const { checked } = target;
    gameState.asymmetricMaps = checked;
});
$form.addEventListener('submit', e => {
    e.preventDefault();
    gameState.players = [];
    // Players
    gameState.players = [...document.querySelectorAll('.player')]
        .map(({value}) => ({
            name: value,
            first: false,
        }))
    // First player
    const firstPlayer = random(0, gameState.players.length);
    gameState.players[firstPlayer].first = true;

    // Expansions
    gameState.expansions = [...document.querySelectorAll('.expansion:checked')]
        .map(({ value }) => EXPANSIONS.find(({id}) => value === id));

    if (gameState.asymmetricMaps) {
        // Maps
        let maps = getFromExpansions(gameState.expansions, 'maps');
        shuffle(maps);
        gameState.players.forEach(player => {
            player.maps = maps.splice(0,2);
        });
    }

    // Conservation projects
    const count = getConservationProjectsCount();

    let conservationProjects = getFromExpansions(gameState.expansions, 'conservationProjects');

    shuffle(conservationProjects);
    gameState.conservationProjects = conservationProjects.slice(0, count);

    let bonusTiles = getFromExpansions(gameState.expansions, 'bonusTiles');
    shuffle(bonusTiles);
    gameState.bonusTiles = [bonusTiles.splice(0, 2), bonusTiles.splice(0, 2)];

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