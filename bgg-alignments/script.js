const alignments = [
    {
        name: 'Lawful good',
        id: 'lawful-good',
        game: {
            id: '822',
            name: 'Carcassonne',
        },
    }, {
        name: 'Neutral good',
        id: 'neutral-good',
        game: {name: "Catan", id: "13"}
    }, {
        name: 'Chaotic good',
        id: 'chaotic-good',
        game: {name: "Dominion", id: "36218"},
    }, {
        name: 'Lawful neutral',
        id: 'lawful-neutral',
        game: {name: "Hero Realms", id: "198994"},
    }, {
        name: 'True neutral',
        id: 'true-neutral',
        game: {name: "Discworld: Ankh-Morpork", id: "91312"},
    }, {
        name: 'Chaotic neutral',
        id: 'chaotic-neutral',
        game: {name: "AVP", id: "149896"},
    }, {
        name: 'Lawful evil',
        id: 'lawful-evil',
        game: {name: "Tzolk'in: The Mayan Calendar", id: "126163"},
    }, {
        name: 'Neutral evil',
        id: 'neutral-evil',
        game: {name: "Munchkin", id: "1927"},
    }, {
        name: 'Chaotic evil',
        id: 'chaotic-evil',
        game: {name: "Exploding Kittens", id: "172225"},
    },
];
let to;
const API_FLASH = 'https://api.apiflash.com/v1/urltoimage?access_key=8b1072300f4845e4802540dc5645defa&url=';
const TIMEOUT = 500;
const SEARCH_API = 'https://api.geekdo.com/xmlapi2/search';
const THING_API = 'https://api.geekdo.com/xmlapi2/thing';
const parser = new DOMParser();
const $submit = document.querySelector('.submit');
const $searchContainer = document.querySelector('.search-container');
const $canvas = document.querySelector('.canvas');
$canvas.style.display = 'none';
const toArray = nodeList => Array.prototype.slice.call(nodeList);
const parseXML = xmlString => parser.parseFromString(xmlString, "application/xml");

const renderImages = images => {
    $canvas.style.display = '';
    $submit.style.display = 'none';
    window.requestAnimationFrame(() => {
        images.forEach(image => {
            $canvas.innerHTML += `<div><img src="${image}"></div>`;
        });
    });
}
const init = () => {
    const queryParams = location.href.split('?');
    if (queryParams.length > 1) {
        renderImages(location.href.replace(/.+images=/, '').split(/%2C|,/).map(decodeURIComponent));
        return;
    }
    $submit.style.display = 'inline-block';
    const $container = $searchContainer.querySelector('tbody');
    alignments.forEach(alignment => {
        alignment.$container = document.createElement('tr');
        alignment.$container.id = alignment.id;
        alignment.$container.classList.add('alignment');
        alignment.$search = document.createElement('input');
        alignment.$search.type = 'search';
        const $label = document.createElement('label');
        $label.innerText = alignment.name;
        $label.htmlFor = alignment.id;

        const $labelContainer = document.createElement('td');
        $labelContainer.appendChild($label);
        alignment.$container.appendChild($labelContainer);

        alignment.$inputContainer = document.createElement('td');
        alignment.$inputContainer.appendChild(alignment.$search);
        alignment.$container.appendChild(alignment.$inputContainer);
        $container.appendChild(alignment.$container);
    });
};
const closeResults = () => {
    document.querySelectorAll('.results').forEach($results => {
        $results.parentElement.removeChild($results);
    });
};
const renderResults = alignment => {
    window.requestAnimationFrame(() => {
        closeResults();
        const $results = document.createElement('div');
        $results.classList.add('results');

        alignment.games.forEach(game => {
            $results.innerHTML += `<div class="game" id="game-${game.id}">${game.name}</div>`;
        });

        alignment.$inputContainer.appendChild($results);
    });
};
const search = alignment => {
    axios.get(SEARCH_API, {
        params: {
            query: alignment.$search.value,
        }
    }).then(response => {
        const result = parseXML(response.data);
        alignment.games = toArray(result.querySelectorAll('item')).map(item => {
            return {
                name: item.querySelector('name').getAttribute('value'),
                id: item.getAttribute('id'),
            };
        });
        renderResults(alignment);
    });
};
const selectGame = (id, alignment) => {
    alignment.game = alignment.games.find(game => game.id === id);
    alignment.$search.style.display = 'none';
    alignment.$search.style.value = '';
    alignment.$result = document.createElement('span');
    const $name = document.createElement('span');
    $name.innerText = alignment.game.name;
    alignment.$result.appendChild($name);

    const $removeButton = document.createElement('button');
    $removeButton.type = 'button';
    $removeButton.classList.add('delete');
    $removeButton.innerText = 'x';
    alignment.$result.appendChild($removeButton);

    alignment.$search.parentElement.appendChild(alignment.$result);
    closeResults();
    if (alignments.every(alignment => alignment.game)) {
        $submit.diabled = false;
    }
};
const fetchGames = () => axios.get(THING_API, {
    params: {
        id: alignments.map(a => a.game.id).join(','),
    }
    }).then(response => {
        const result = parseXML(response.data);
        alignments.forEach(alignment => {
            alignment.game.image = result.querySelector(`[id="${alignment.game.id}"] image`).innerHTML;
        });
    });

const generateImage = () => {
    $searchContainer.style.display = 'none';
    if (!alignments.every(alignment => alignment.game)) {
        return;
    }
    fetchGames().then(() => {
        if (location.hostname === 'localhost') {
            renderImages(alignments.map(a => a.game.image));
            return;
        }
        window.location = API_FLASH + encodeURIComponent(location.protocol + '//' + location.hostname + location.pathname + '?images=' + encodeURIComponent(alignments.map(a => a.game.image).join(','))) + '&element=.canvas';
    });
};

document.addEventListener('input', e => {
    const $search = e.target.closest('[type="search"]');
    const alignment = alignments.find(alignment => alignment.id === $search.closest('.alignment').id);
    if (to) {
        clearTimeout(to);
    }
    to = setTimeout(() => {
        alignment && search(alignment);
    }, TIMEOUT);
});
document.addEventListener('click', e => {
    if (!e.target.closest('.results')) {
        closeResults();
    }
});
document.addEventListener('click', e => {
    const $game = e.target.closest('.game');
    if (!$game) {
        return;
    }
    const id = $game.id.replace(/game-/, '');
    selectGame(id, alignments.find(alignment => alignment.id === $game.closest('.alignment').id));
})
document.addEventListener('click', e => {
    const $delete = e.target.closest('.delete');
    if (!$delete) {
        return;
    }
    const alignment = alignments.find(alignment => alignment.id === $delete.closest('.alignment').id);
    alignment.$search.style.display = '';
    alignment.$result.parentElement.removeChild(alignment.$result);
});
$submit.addEventListener('click', e => {
    e.preventDefault();
    $submit.classList.add('loading');
    generateImage();
})
init();