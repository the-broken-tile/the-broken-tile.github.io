const API_KEY = 'AIzaSyCVedUcZGITxPFXe_tK9qcuA9Txpv_LCJE';
const LINK_TYPE_LOCATION = 'location';
const LINK_TYPE_FACEBOOK = 'facebook';
const LINK_TYPE_PHONE = 'phone';

const $results = document.getElementById('results');
const $sidePanel = document.getElementById('side-panel');
const $sidePanelContent = document.getElementById('side-panel-content');

const translator = new Translator(LANGUAGE_BG);
let clubs;
let games;
let artists;
let categories;
let designers;
let families;
let mechanics;
let compilations;
const LOADING_FILES_COUNT  = 8;

const prepareData = () => {
    Object.values(clubs).forEach(club => {
        club.games = club.games.map(gameId => {
            const game = games[gameId];
            game.clubs = game.clubs || [];
            game.clubs.push(club);

            return game;
        });
    });

    initApp();
};

const QUERY_REGEXP = /\?какво=([^&$]+)/;
const ICONS_MAP = {
    [LINK_TYPE_FACEBOOK]: '<i class="icon fab fa-facebook-f"></i>',
    [LINK_TYPE_PHONE]: '<i class="icon fas fa-phone"></i>',
};
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
const getTerm = () => {
    const matches = decodeURIComponent(location.search.replace(/\+/g, '%20')).match(QUERY_REGEXP);

    return matches ? matches[1].toLowerCase() : null;
};

const renderLink = ({type, value}) => `<li><a target="_blank" href="${value}">${ICONS_MAP[type]} ${value.replace(/^.+:\/{0,2}/, '')}</a></li>`
const renderLinks = club => `<ul>${club.links.filter(({type}) => type !== LINK_TYPE_LOCATION).map(renderLink).join('')}</ul>`;
const renderCityName = city => `<span class="small">${translator.trans(city, {}, 'city')}</span>`;
const renderClub = ({ slug, name, city }) => `<li><a href="#" class="club" data-slug="${slug}">${name}</a> ${renderCityName(city)}</li>`;
const renderMap = club => `<iframe loading="lazy" src="${club.links.find(({type}) => type === LINK_TYPE_LOCATION).value.replace(':key', API_KEY)}"></iframe>`;
const renderClubInfo = club => `<h1>${club.name}</h1>${renderMap(club)}${renderLinks(club)}`;
const renderClubs = clubs => {
  return `<ul class="clubs">${clubs.map(renderClub).join('')}</ul>`;
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

const createMatcher = term => {
    const trimmedTerm = trim(term);
    return game => {
        const trimmedName = trim(game.name);

        return trimmedName.indexOf(trimmedTerm) !== -1;
    }
}
const sorter = (a, b) => a.name.localeCompare(b.name);
const initApp = () => {
    const term = getTerm();
    const gamesArr = Object.values(games);

    document.getElementById('q').value = term;
    const results = term ? gamesArr.filter(createMatcher(term)) : gamesArr;
    $results.innerHTML = results.length ? renderResults(results.sort(sorter)) : '<b>няма намерени резултати</b>';
}

const openClubInfo = (content = '') => {
    if (content) {
        $sidePanelContent.innerHTML = content;
    }
    $sidePanel.classList.add('open');
    document.body.classList.add('info-open');
};
const closeCLubInfo = () => {
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
};

document.body.addEventListener('click', e => {
    const { target } = e;
    if (!target.classList.contains('club')) {
        return;
    }
    e.preventDefault();
    openClubInfo(renderClubInfo(clubs[target.dataset.slug]));
});
document.body.addEventListener('click', e => {
    const {target} = e;
    if (!target.classList.contains('close-side-panel')) {
        return;
    }
    closeCLubInfo();
});
document.body.addEventListener('swiped-right', e => {
    if ($sidePanel.classList.contains('open')) {
        closeCLubInfo();
    }
});
document.body.addEventListener('swiped-left', () => {
    if (document.getElementById('side-panel-content').innerHTML && !$sidePanel.classList.contains('open')) {
        openClubInfo();
    }
});

init();