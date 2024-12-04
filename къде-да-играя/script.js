const API_KEY = 'AIzaSyCVedUcZGITxPFXe_tK9qcuA9Txpv_LCJE';
const LINK_TYPE_LOCATION = 'location';
const LINK_TYPE_FACEBOOK = 'facebook';
const LINK_TYPE_PHONE = 'phone';

const SIDE_PANEL_FILTER = 'side-panel-filter';
const SIDE_PANEL_CLUB = 'side-panel-club';
let currentSidePanel = null;

const $results = document.getElementById('results');
const $sidePanel = document.getElementById('side-panel');
const $clubInfo = document.getElementById('club-info');
const $filterMenu = document.getElementById('filter-menu');

const translator = new Translator(LANGUAGE_BG);
let clubs;
let games;
let artists;
let categories;
let designers;
let families;
let mechanics;
let compilations;
let cities;
const LOADING_FILES_COUNT  = 9;

const QUERY_TERM_KEY = 'какво';
const QUERY_CLUB = 'club';
const QUERY_DESIGNER = 'designer';
const QUERY_FAMILY = 'family';
const QUERY_ARTIST = 'artist';
const QUERY_CATEGORY = 'category';
const QUERY_MECHANICS = 'mechanics';
const QUERY_CITY = 'city';
const QUERY_PLAYERS = 'players';
const QUERY_YEAR = 'year-published';
const QUERY_PLAYING_TIME = 'playing-time';

const queryParams = new URLSearchParams(document.location.search);
const getSelectedValue = key => (queryParams.get(key) || '').split(',').filter(value => value);

const term = queryParams.get(QUERY_TERM_KEY) ?? '';
const prepareData = () => {
    Object.values(clubs).forEach(club => {
        club.games = club.games.map(gameId => {
            const game = games[gameId];
            game.clubs = game.clubs || [];
            game.clubs.push(club);

            return game;
        });
        club.city = cities[club.city];
    });

    initApp();
};
const ICONS_MAP = {
    [LINK_TYPE_FACEBOOK]: '<i class="icon fab fa-facebook-f"></i>',
    [LINK_TYPE_PHONE]: '<i class="icon fas fa-phone"></i>',
};
const createSorter = prop => (a, b) => a[prop].localeCompare(b[prop]);
const sorter = createSorter('name');
const valueSorter = createSorter('value');

const trims = new RegExp([
    ...[
        //English articles
        'a', 'the', 'at', 'of', 'on', 'and',
        //French articles
        'et',
        //Bulgarian articles
        'на', 'за', 'и',
    ].map(word => `\\b${word}\\b`),
    //Punctuation
    '-',
    '–',
    ':',
    '&',
    '\\.',
    '!',
    '\\)',
    '\\(',
    '\\/',
    ',',
    "'",
    '\\+'
    ]
    .join('|'), 'gi');

const trim = name => name.toLowerCase().replace(trims, '').replace(/\s+/g, '');
const renderFilterMenu = $element => {
    const selectOptions = {
        multiple: true,
        disableSelectAll: true,
        //Defaults for links (most of the selects).
        valueKey: 'id',
        labelKey: 'value',
        silentInitialValueSet: true,
        showDropboxAsPopup: false,// popup breaks on "clear" with the side-panel... z-index or somethin'
        searchPlaceholderText: translator.trans('search_placeholder'),
        additionalClasses: 'dropdown'
    };
    const gamesArray = Object.keys(games).map(id => games[id]);
    const getMixMaxFromArray = arrayProp => gamesArray.reduce(({min, max}, game) => {
        if (!game[arrayProp]) {
            return {min, max};
        }
        return {
            min: Math.min(min, game[arrayProp][0]),
            max: Math.max(max, game[arrayProp][1]),
        };
    }, {min: 9999, max: -1});
    const yearPublished = gamesArray.reduce(({min, max}, {yearPublished}) => {
        if (yearPublished === undefined) {
            return {min, max};
        }
        return {
            min: Math.min(min, yearPublished),
            max: Math.max(max, yearPublished),
        };
    }, {min: 9999, max: 0});
    const players = getMixMaxFromArray('players');
    const playingType = getMixMaxFromArray('playingTime');
    const MORE_FILTERS_OPEN = queryParams.get(QUERY_YEAR) !== null
        || getSelectedValue(QUERY_DESIGNER).length !== 0
        || getSelectedValue(QUERY_ARTIST).length !== 0
        || getSelectedValue(QUERY_CATEGORY).length !== 0
        || getSelectedValue(QUERY_FAMILY).length !== 0
        || getSelectedValue(QUERY_MECHANICS).length !== 0;

    $element.innerHTML = `<ul>
            <li>
                <div id="city"></div>
                <input type="hidden" name="city" value="${getSelectedValue(QUERY_CITY)}">
            </li>
            <li>
                <div id="club"></div>
                <input type="hidden" name="club" value="${getSelectedValue(QUERY_CLUB)}">
            </li>
            <li>
                <label for="players">${translator.trans('players_label')}</label>
                <input id="players" name="players" type="number" step="1" min="${players.min}" max="${players.max}">
            </li>
            <li>
                <label for="${QUERY_PLAYING_TIME}">${translator.trans('playing_time_label')}</label>
                <input 
                    id="${QUERY_PLAYING_TIME}"
                    value="${queryParams.get(QUERY_PLAYING_TIME)}"
                    name="${QUERY_PLAYING_TIME}"
                    type="number"
                    step="5"
                    min="${playingType.min}"
                    max="${playingType.max}"
                >
            </li>
        </ul>
        <label for="show-more-filters">${translator.trans('show_more_filters_label')}</label>
        <input type="checkbox" id="show-more-filters"${MORE_FILTERS_OPEN ? 'checked' : ''}>
        <ul id="more-filters">
            <li>
                <label for="${QUERY_YEAR}">${translator.trans('year_published_label')}</label>
                <input
                    id="${QUERY_YEAR}"
                    value="${queryParams.get(QUERY_YEAR) ?? ''}"
                    name="${QUERY_YEAR}"
                    type="number"
                    step="1"
                    min="${yearPublished.min}"
                    max="${yearPublished.max}"
                >
            </li>
            <li>
                <div id="${QUERY_DESIGNER}"></div>
                <input type="hidden" name="${QUERY_DESIGNER}" value="${getSelectedValue(QUERY_DESIGNER)}">
            </li>
            <li>
                <div id="${QUERY_ARTIST}"></div>
                <input type="hidden" name="${QUERY_ARTIST}" value="${getSelectedValue(QUERY_ARTIST)}">
            </li>
            <li>
                <div id="${QUERY_CATEGORY}"></div>
                <input type="hidden" name="${QUERY_CATEGORY}" value="${getSelectedValue(QUERY_CATEGORY)}">
            </li>
            <li>
                <div id="${QUERY_FAMILY}"></div>
                <input type="hidden" name="${QUERY_FAMILY}" value="${getSelectedValue(QUERY_FAMILY)}">
            </li>
            <li>
                <div id="${QUERY_MECHANICS}"></div>
                <input type="hidden" name="${QUERY_MECHANICS}" value="${getSelectedValue(QUERY_MECHANICS)}">
            </li>
        </ul>
    </ul>`;

    VirtualSelect.init({
        ...selectOptions,
        ele: '#city',
        valueKey: 'id',
        labelKey: 'name',
        placeholder: translator.trans('city_label'),
        options: Object.keys(cities)
            .map(id => cities[id])
            .map(({ name }) => ({id: name, name: translator.trans(name, {}, 'city')}))
            .sort(sorter),
        selectedValue: getSelectedValue(QUERY_CITY),
    });
    VirtualSelect.init({
        ...selectOptions,
        ele: '#club',
        valueKey: 'slug',
        labelKey: 'name',
        placeholder: translator.trans('club_label'),
        options: Object.keys(clubs)
            .map(slug => clubs[slug])
            .sort(sorter),
        selectedValue: getSelectedValue(QUERY_CLUB),
    });
    VirtualSelect.init({
        ...selectOptions,
        ele: '#designer',
        placeholder: translator.trans('designer_label'),
        options: Object.keys(designers)
            .map(id => designers[id])
            .sort(valueSorter),
        selectedValue: getSelectedValue(QUERY_DESIGNER),
    });
    VirtualSelect.init({
        ...selectOptions,
        ele: '#artist',
        placeholder: translator.trans('artist_label'),
        options: Object.keys(artists)
            .map(id => artists[id])
            .sort(valueSorter),
        selectedValue: getSelectedValue(QUERY_ARTIST),
    });
    VirtualSelect.init({
        ...selectOptions,
        ele: '#category',
        placeholder: translator.trans('category_label'),
        options: Object.keys(categories)
            .map(id => categories[id])
            .sort(valueSorter),
        selectedValue: getSelectedValue(QUERY_CATEGORY)
    });
    VirtualSelect.init({
        ...selectOptions,
        ele: '#family',
        placeholder: translator.trans('family_label'),
        options: Object.keys(families)
            .map(id => families[id])
            .sort(valueSorter),
        selectedValue: getSelectedValue(QUERY_FAMILY),
    });
    VirtualSelect.init({
        ...selectOptions,
        ele: '#mechanics',
        placeholder: translator.trans('mechanic_label'),
        options: Object.keys(mechanics)
            .map(id => mechanics[id])
            .sort(valueSorter),
        selectedValue: getSelectedValue(QUERY_MECHANICS),
    });
};
const renderLink = ({type, value}) => `<li><a target="_blank" href="${value}">${ICONS_MAP[type]} ${value.replace(/^.+:\/{0,2}/, '')}</a></li>`
const renderLinks = club => `<ul>${club.links.filter(({type}) => type !== LINK_TYPE_LOCATION).map(renderLink).join('')}</ul>`;
const renderCity = ({name}) => `<span class="small">${translator.trans(name, {}, 'city')}</span>`;
const renderClub = ({ slug, name, city }) => `<li><a href="#" class="club" data-slug="${slug}">${name}</a> ${renderCity(city)}</li>`;
const renderMap = club => `<iframe loading="lazy" src="${club.links.find(({type}) => type === LINK_TYPE_LOCATION).value.replace(':key', API_KEY)}"></iframe>`;
const renderClubInfo = club => `<h1>${club.name}</h1>${renderMap(club)}${renderLinks(club)}`;
const renderClubs = clubs => {
  return `<ul class="clubs">${clubs.filter(clubFilter).filter(cityFilter).map(renderClub).join('')}</ul>`;
};
const renderThumbnail = () => '';// ({thumbnail}) => thumbnail ? `<span class="thumbnail" style="background-image: url('./data/images/${thumbnail}')"></span>` : '';

const renderResults = results => {
    // Double content FTW!
    return `<table>
        <thead class="hide-sm"><tr><th>Какво</th><th>Къде</th></tr></thead>
        <tbody>${results.map(game => {
            const clubs = renderClubs(game.clubs);

            return `<tr>
                <td>
                    ${renderThumbnail(game)}
                    ${game.name}
                    <div class="hide-lg">${clubs}</div>
                </td>
                <td class="hide-sm">${clubs}</td>
            </tr>`;
        }
    ).join('')}</tbody>
    </table>`
};

const termFilter = game =>
    !term || trim(game.name).indexOf(trim(term)) !== -1;

const clubFilter = ({ slug }) => {
    const query = queryParams.get(QUERY_CLUB);
    return !query || query.split(',').includes(slug);
};

const cityFilter = ({ city }) => {
    const query = queryParams.get(QUERY_CITY);
    return !query || query.split(',').includes(city.name);
};

const playersFilter = ({ players }) => {
    const query = queryParams.get(QUERY_PLAYERS);

    if (query === null) {
        return true;
    }
    if (!players) {
        return false;
    }
    const numPlayers = parseInt(query, 10);

    return numPlayers >= players[0] && numPlayers <= players[1];
};

const playingTimeFilter = ({ playingTime }) => {
    const query = queryParams.get('playing-time');
    if (query === null) {
        return true;
    }
    if (!playingTime) {
        return false;
    }
    const time = parseInt(query, 10);

    return time >= playingTime[0] && time <= playingTime[1];
};

const yearPublishedFilter = ({ yearPublished }) => {
    const query = queryParams.get('year-published');
    if (query === null) {
        return true;
    }
    if (yearPublished === undefined) {
        return false;
    }

    return yearPublished === parseInt(query, 10);
};
const linkFilter = queryKey => {
    const query = queryParams.get(queryKey);

    return linkId => {
        if (query === null) {
            return true;
        }

        return query.split(',').map(id => parseInt(id, 10)).includes(linkId);
    };
}
const paramsMatcher = game => {
    const { clubs, designers, families, artists, categories, mechanics } = game;

    return clubs.filter(clubFilter).length !== 0
        && clubs.filter(cityFilter).length !== 0
        && playersFilter(game)
        && playingTimeFilter(game)
        && yearPublishedFilter(game)
        && (designers || [-1]).filter(linkFilter(QUERY_DESIGNER)).length !== 0
        && (families || [-1]).filter(linkFilter(QUERY_FAMILY)).length !== 0
        && (artists || [-1]).filter(linkFilter(QUERY_ARTIST)).length !== 0
        && (categories || [-1]).filter(linkFilter(QUERY_CATEGORY)).length !== 0
        && (mechanics || [-1]).filter(linkFilter(QUERY_MECHANICS)).length !== 0;
};

const initApp = () => {
    const gamesArr = Object.values(games);

    document.getElementById('q').value = term;
    const results = gamesArr
        .filter(termFilter)
        .filter(paramsMatcher)
        .sort(sorter);
    $results.innerHTML = results.length ? renderResults(results) : '<b>няма намерени резултати</b>';
}

const openSidePanel = (type = null) => {
    if (type) {
        currentSidePanel = type;
    }
    if (!currentSidePanel) {
        return;
    }
    $sidePanel.className = '';
    $sidePanel.classList.add('open');
    $sidePanel.classList.add(currentSidePanel);
    document.body.classList.add('info-open');
};
const closeSidePanel = () => {
    $sidePanel.classList.remove('open');
    document.body.classList.remove('info-open');
};

const init = () => {
    let loading = LOADING_FILES_COUNT;
    loadJSON('./data/club.json', response => {
        loading--;
        clubs = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/game.json', response => {
        loading--;
        games = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/artist.json', response => {
        loading--;
        artists = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/category.json', response => {
        loading--;
        categories = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/designer.json', response => {
        loading--;
        designers = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/family.json', response => {
        loading--;
        families = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/mechanic.json', response => {
        loading--;
        mechanics = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/compilation.json', response => {
        loading--;
        compilations = response;
        loading === 0 && prepareData();
    });
    loadJSON('./data/city.json', response => {
        loading--;
        cities = response;
        loading === 0 && prepareData();
    });
};

document.body.addEventListener('click', e => {
    const { target } = e;
    if (!target.classList.contains('club')) {
        return;
    }
    e.preventDefault();
    $clubInfo.innerHTML = renderClubInfo(clubs[target.dataset.slug]);
    openSidePanel(SIDE_PANEL_CLUB);
});
document.body.addEventListener('click', e => {
    const {target} = e;
    if (!target.classList.contains('close-side-panel')) {
        return;
    }
    closeSidePanel();
});
document.body.addEventListener('swiped-right', e => {
    if ($sidePanel.classList.contains('open')) {
        closeSidePanel();
    }
});
document.body.addEventListener('swiped-left', () => {
    if (document.getElementById('side-panel-content').innerHTML && !$sidePanel.classList.contains('open')) {
        openSidePanel();
    }
});
document.getElementById('open-filter-menu').addEventListener('click', () => {
    renderFilterMenu($filterMenu);
    openSidePanel(SIDE_PANEL_FILTER);
});
document.body.addEventListener('change', e => {
    const { target } = e;
    if (!target.classList.contains('vscomp-ele')) {
        return;
    }

    const hiddenInput = document.querySelector(`input[type="hidden"][name="${target.id}"]`);
    hiddenInput.value = target.value.join(',');
});
document.getElementById('form').addEventListener('submit', e => {
    //Remove empty values from URL.
    [...e.target.querySelectorAll('input')]
        .filter(input => !input.value)
        .forEach(filter => filter.disabled = true);
});

init();
