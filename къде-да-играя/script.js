const API_KEY = 'AIzaSyCVedUcZGITxPFXe_tK9qcuA9Txpv_LCJE';

const LINK_TYPE_LOCATION = 'location';
const LINK_TYPE_FACEBOOK = 'facebook';
const LINK_TYPE_PHONE = 'phone';

const $results = document.getElementById('results');
const $clubInfo = document.getElementById('club-info');
const $clubInfoContent = document.getElementById('club-info-content');

const translator = new Translator(LANGUAGE_BG);
const clubs = [];
const games = [];
const gamesByName = {};
const clubsBySlug = {};
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
const renderCityName = ({city}) => `<span class="small">(${translator.trans(city, {}, 'city')})</span>`;
const renderClub = slug => `<li><a href="#" class="club" data-slug="${slug}">${clubsBySlug[slug].name}</a> ${renderCityName(clubsBySlug[slug])}</li>`;
const renderMap = club => `<iframe loading="lazy" src="${club.links.find(({type}) => type === LINK_TYPE_LOCATION).value.replace(':key', API_KEY)}"></iframe>`;
const renderClubInfo = club => `<h1>${club.name}</h1>${renderMap(club)}${renderLinks(club)}`;
const renderClubs = memoize(clubs => `<ul class="clubs">${clubs.map(renderClub).join('')}</ul>`);

const renderResults = results => {
    // Double content FTW!
    return `<table>
        <thead class="hide-sm"><tr><th>Какво</th><th>Къде</th></tr></thead>
        <tbody>${results.map(game => {
            const clubs = renderClubs(game.clubs);

            return `<tr>
                <td>${game.name}<span class="hide-lg">${clubs}</span></td>
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
const init = () => {
    const term = getTerm();

    document.getElementById('q').value = term;
    const results = term ? games.filter(createMatcher(term)) : games;
    $results.innerHTML = results.length ? renderResults(results.sort(sorter)) : '<b>няма намерени резултати</b>';
}

const addGames = (gamesToAdd, club) => {
    gamesToAdd.forEach(game => {
        const lowerName = trim(game.name);
        if (gamesByName[lowerName]) {
            if (!gamesByName[lowerName].clubs.includes(club.slug)) {
                // Prevent duplicates.
                gamesByName[lowerName].clubs.push(club.slug);
            } else {
                console.warn(`${game.name} is already added to ${club.name}`);
            }
        } else {
            gamesByName[lowerName] = {
                ...game,
                clubs: [club.slug],
            };
            games.push(gamesByName[lowerName]);
        }
    });
};
const openClubInfo = content => {
    $clubInfoContent.innerHTML = content;
    $clubInfo.classList.add('open');
    document.body.classList.add('info-open');
};
const closeCLubInfo = () => {
    $clubInfo.classList.remove('open');
    document.body.classList.remove('info-open');
};

loadJSON('./data/clubs.json', response => {
    clubs.push(...response);

    let loadingGames = clubs.length;
    clubs.forEach(club => {
        clubsBySlug[club.slug] = club;
        loadJSON(`./data/${club.slug}.json`, clubGames => {
            addGames(clubGames, club);
            loadingGames--;
            if (loadingGames === 0) {
                init();
            }
        });
    });
});

document.body.addEventListener('click', e => {
    const { target } = e;
    if (!target.classList.contains('club')) {
        return;
    }
    e.preventDefault();
    openClubInfo(renderClubInfo(clubs.find(({slug}) => slug === target.dataset.slug)));
});
document.body.addEventListener('click', e => {
    const {target} = e;
    if (!target.classList.contains('close-club-info')) {
        return;
    }
    closeCLubInfo();
});
document.body.addEventListener('swiped-right', e => {
    if ($clubInfo.classList.contains('open')) {
        closeCLubInfo();
    }
});