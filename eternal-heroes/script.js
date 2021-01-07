const SET_MAP = SETS.reduce((carry, set) => {
    carry[set.id] = set;
    return carry;
}, {});
const $setsList = document.getElementById('sets-list');
const $factionsList = document.getElementById('factions-list');
const $includeAllFactions = document.getElementById('include-all-factions');
const $settingsForm = document.getElementById('settings-form');
const $container = document.getElementById('container');
const $input = document.getElementById('input');
const $playingForm = document.getElementById('playing-form');
const $info = document.getElementById('info');
const $resultsTable = document.getElementById('results-table');
const $forceOrder = document.getElementById('force-order');
const $currentHero = document.getElementById('current-hero');
const $prev = document.getElementById('previous');
const $next = document.getElementById('skip');
const $showSets = document.getElementById('show-sets');
const $showFactions = document.getElementById('show-factions');
const $randomize = document.getElementById('randomize');
const $time = document.getElementById('timer');
const $giveUp = document.getElementById('give-up');
const $showMissed = document.getElementById('show-missed');
const $tryAgain = document.getElementById('try-again');
const $menu = document.getElementById('menu');

let forceOrder = false;
let currentHero = null;
let chosenHeroes;
let guessMap;
let result = 0;
let totalAnswers;
let selectedSets;
let selectedFactions;

const timer = new Timer();

const sort = array => {
  array.sort((a, b) => a.name.localeCompare(b.name));
};
const intersect = (arrA, arrB) =>
    arrA.filter(x => arrB.includes(x));
const unique = array => array.filter((value, index, self) =>
    self.indexOf(value) === index
);
const $getFactionIcons = faction => {
    if (faction.length > 1) {
        return faction.split('').map($getFactionIcons).join('');
    }

    return `<span class="faction-icon ${faction.toLowerCase()}"></span>`;
};
const generateGuessMap = () => {
    guessMap = chosenHeroes.reduce((carry, hero) => {
        carry[hero.title.toLowerCase()] = carry[hero.title.toLowerCase()] || [];
        carry[hero.title.toLowerCase()].push(hero);
        if (hero.alt) {
            hero.alt.forEach(alt => {
                carry[alt] = carry[alt] || [];
                carry[alt].push(hero);
            })
        }

        return carry;
    }, {});
};
const generateChosenHeroes = randomize => {
    selectedSets = [].filter.call($setsList.querySelectorAll('input[type="checkbox"]'), $input => {
        return $input.checked;
    }).map($input => parseInt($input.value, 10));
    selectedFactions = [].filter.call($factionsList.querySelectorAll('input[type="checkbox"]'), $input => {
        return $input.checked;
    }).map($input => $input.value);

    if (selectedSets.length === 0) {
        selectedSets = SETS.map(set => set.id);
    }
    if (selectedFactions.length === 0) {
        selectedFactions = FACTIONS.map(faction => faction.id);
    }
    const mustHaveAllSelectedFactions = $includeAllFactions.checked;
    chosenHeroes = HEROES
        .filter(hero => selectedSets.includes(hero.set))
        .filter(hero => {
            const factions = unique(hero.faction.split(''));
            const factionsMatch = intersect(factions, selectedFactions).length;

            return mustHaveAllSelectedFactions ? factionsMatch === selectedFactions.length : factionsMatch > 0;
        });
    if (randomize) {
        shuffle(chosenHeroes);
    } else {
        sort(chosenHeroes);
    }
    totalAnswers = chosenHeroes.length;
    generateGuessMap();
};
const init = () => {
    $setsList.innerHTML = SETS.map(set =>
        `<li><label><input type="checkbox" value="${set.id}" checked>${set.name}</label></li>`
    ).join('');
    $factionsList.innerHTML = FACTIONS.map(faction =>
        `<li><label><input type="checkbox" value="${faction.id}" checked>${faction.name}</label></li>`
    ).join('');
};
const initResultsTable = () => {
    let html = '<table><thead><tr><th>Name</th><th>Title</th><th class="set">Set</th><th class="faction">Faction</th></tr></thead>';

    html += '<tbody>';
    html += chosenHeroes.map(hero =>
         `<tr id="hero-${hero.id}"><td>${hero.name}</td>
            <td class="guess"></td>
            <td class="set">${SET_MAP[hero.set].name}</td>
            <td class="faction">${$getFactionIcons(hero.faction)}</td>
        </tr>`
    ).join('');
    html += '</tbody>';
    html += '</table>';

    $resultsTable.innerHTML = html;
};
const fillMissedAnswers = () => {
    chosenHeroes.forEach(hero => {
        document.querySelector(`#hero-${hero.id} .guess`).innerHTML = `<span class="missed">${hero.title}</span>`;
    });
};
const updateInfo = () => {
    $info.innerText = result + '/' + totalAnswers;
    if (currentHero) {
        $currentHero.innerHTML = `
            <span class="faction">${$getFactionIcons(currentHero.faction)}</span>
            ${currentHero.name}<span class="set">(${SET_MAP[currentHero.set].name})</span>`;
    }
};
const endGame = () => {
    $currentHero.innerText = '';
    $input.disabled = true;
    $giveUp.disabled = true;
    $prev.disabled = true;
    $next.disabled = true;
    $container.classList.add('end-game');
}
const win = () => {
    endGame();
    timer.stop();
};
const lose = () => {
    endGame();
    fillMissedAnswers();
};
const setCurrentHero = hero => {
    currentHero && $resultsTable.querySelector(`#hero-${currentHero.id}`).classList.remove('current');
    currentHero = hero;
    if (!currentHero) {
        return;
    }
    const el = $resultsTable.querySelector(`#hero-${currentHero.id}`);
    el.classList.add('current');
    // to show the above answer, in case you just answered it via an alternative
    const { top, height } = el.getBoundingClientRect();
    const { scrollY } = window;
    const { offsetHeight } = $menu;

    window.scroll({
        top: top + scrollY - offsetHeight - height - 2,
        behavior: 'smooth',
    });
}
const next = nextHero => {
    if (!currentHero) {
        return;
    }
    $input.value = '';
    const index = chosenHeroes.indexOf(currentHero);
    setCurrentHero(nextHero || chosenHeroes[index + 1] || chosenHeroes[0]);
};
const prev = () => {
    const index = chosenHeroes.indexOf(currentHero);
    setCurrentHero(chosenHeroes[index - 1] || chosenHeroes[chosenHeroes.length - 1]);
};
const removeFromGuessMap = hero => {
    const guess = hero.title.toLowerCase();
    guessMap[guess].splice(guessMap[guess].indexOf(hero), 1);
    hero.alt && hero.alt.forEach(alt => {
        guessMap[alt].splice(guessMap[alt].indexOf(hero));
    });
    // Remove empty arrays
    Object.keys(guessMap).forEach(key => {
        if (guessMap[key].length !== 0) {
            return;
        }
        delete guessMap[key];
    });
};
const markAsGuessed = hero => {
    result += 1;
    removeFromGuessMap(hero);
    document.getElementById(`hero-${hero.id}`).getElementsByClassName('guess')[0].innerHTML = hero.title;
    chosenHeroes.splice(chosenHeroes.indexOf(hero), 1);
    updateInfo();
    if (result === totalAnswers) {
        win();
    }
};


const checkGuess = guess => {
    const heroes = guessMap[guess];
    if (!heroes) {
        return;
    }
    if (!forceOrder) {
        [...heroes].forEach(markAsGuessed);
        $input.value = '';
        return;
    }
    if (!heroes.includes(currentHero)) {
        return;
    }
    const nextHero = chosenHeroes[chosenHeroes.indexOf(currentHero) + 1] || chosenHeroes[chosenHeroes.length - 1];
    markAsGuessed(currentHero);
    next(nextHero);
    updateInfo();
};
const getTime = sets => sets
    .reduce((carry, set) => carry + (set.type === SET_SIZE_LARGE ? 10 : 5), 0);
const getDefaultTime = () =>
    getTime(SETS.filter(set => selectedSets.includes(set.id)));
const pad = i => i < 10 ? `0${i}` : i;
const tick = () => {
    const time = Math.floor(timer.getTime() / 1000);
    $time.innerText = `${pad(Math.floor(time / 60))}:${pad(time % 60)}`;
};
const reset = () => {
    result = 0;
    currentHero = null;
};
const start = () => {
    $input.disabled = false;
    $giveUp.disabled = false;
    $prev.disabled = false;
    $next.disabled = false;
    generateChosenHeroes($randomize.checked);
    forceOrder = $forceOrder.checked;
    initResultsTable();
    if (forceOrder) {
        setCurrentHero(chosenHeroes[0]);
        $container.classList.add('force-order');
    }
    updateInfo();
    $container.classList.add('playing');
    $container.classList.remove('end-game');
    $input.focus();
    timer.start(getDefaultTime());
    timer.onTick(tick);
    timer.onTimeUp(lose);
};

$settingsForm.addEventListener('submit', e => {
    e.preventDefault();
    start();
});
$playingForm.addEventListener('submit', e => e.preventDefault());
$input.addEventListener('input', e => {
    checkGuess($input.value);
});
$showSets.addEventListener('change',  () => {
    $container.classList.toggle('show-sets', $showSets.checked);
});
$showFactions.addEventListener('change', () => {
    $container.classList.toggle('show-factions', $showFactions.checked);
});
$showMissed.addEventListener('change', () => {
    $container.classList.toggle('show-missed', $showMissed.checked);
})
$prev.addEventListener('click', e => {
    e.preventDefault();
    prev();
    $input.value = '';
    $input.focus();
    updateInfo();
});
$next.addEventListener('click', e => {
    e.preventDefault();
    next();
    $input.value = '';
    $input.focus();
    updateInfo();
});
$resultsTable.addEventListener('click', e => {
    if (!forceOrder || $container.classList.contains('end-game')) {
        return;
    }
    const tr = e.target.closest('tr');
    if (!tr) {
        return;
    }
    const id = parseInt(tr.id.replace(/^hero-/, ''));
    const hero = HEROES.find(hero => hero.id === id);
    if (hero && chosenHeroes.includes(hero)) {
        setCurrentHero(hero);
        $input.focus();
        updateInfo();
    }
});
$giveUp.addEventListener('click', e => {
    e.preventDefault();
    timer.stop();
    lose();
});
$tryAgain.addEventListener('click', e => {
    e.preventDefault();
    $container.classList.remove('playing', 'end-game');
    reset();
})
init();