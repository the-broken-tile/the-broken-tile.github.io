const $results = document.getElementById('results');
let clubs = [];
let games = [];
const gamesByName = {};
const clubsBySlug = {};
const QUERY_REGEXP = /\?какво=([^&$]+)/;
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

const renderLink = ({type, value}) => `<a class="${type} icon" target="_blank" href="${value}"></a>`

const renderClub = slug => {
    return `<li>${clubsBySlug[slug].name} ${clubsBySlug[slug].links.map(renderLink).join('')}</li>`
};

const renderClubs = memoize(clubs => `<ul>${clubs.map(renderClub).join('')}</ul>`);

const renderResults = results => {
    // Double content FTW!
    return `<table>
        <thead><tr><th>Какво</th><th class="hide-sm">Къде</th></tr></thead>
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
const init = () => {
    const term = getTerm();
    if (!term) {
        $results.innerHTML = 'Моля въведете име на игра, за да търсите';
        return;
    }
    document.getElementById('q').value = term;

    const results = games.filter(createMatcher(term));
    $results.innerHTML = results.length ? renderResults(results) : '<b>няма намерени резултати</b>';
}

const addGames = (gamesToAdd, club) => {
    gamesToAdd.forEach(game => {
        const lowerName = trim(game.name);
        if (gamesByName[lowerName]) {
            gamesByName[lowerName].clubs.push(club.slug);
        } else {
            gamesByName[lowerName] = {
                ...game,
                clubs: [club.slug],
            };
            games.push(gamesByName[lowerName]);
        }
    });
};

loadJSON('./data/clubs.json', response => {
    clubs = response;

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
