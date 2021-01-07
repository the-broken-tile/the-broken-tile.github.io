const SET_MAP = SETS.reduce((carry, set) => {
    carry[set.id] = set;
    return carry;
}, {});
const $setsList = document.getElementById('sets-list');
const $factionsList = document.getElementById('factions-list');
const $typeList = document.getElementById('type-list');
const $rarityList = document.getElementById('rarity-list');
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
const $showInfluence = document.getElementById('show-influence');
const $showRarity = document.getElementById('show-rarity');
const $showCost = document.getElementById('show-cost');
const $showStats = document.getElementById('show-stats');
const $showType = document.getElementById('show-type');
const $randomize = document.getElementById('randomize');
const $time = document.getElementById('timer');
const $giveUp = document.getElementById('give-up');
const $showMissed = document.getElementById('show-missed');
const $tryAgain = document.getElementById('try-again');
const $menu = document.getElementById('menu');

let columns = 2;
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
const $getInfluenceIcons = influence => {
    if (influence.length > 1) {
        return influence.split('').map($getInfluenceIcons).join('');
    }

    return `<span class="influence-icon ${influence.toLowerCase()}"></span>`;
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
const generateChosenHeroes = () => {
    selectedSets = [...$setsList.querySelectorAll('input[type="checkbox"]:checked')]
        .map($input => parseInt($input.value, 10));
    selectedFactions = [...$factionsList.querySelectorAll('input[type="checkbox"]:checked')]
        .map($input => $input.value);
    const selectedTypes = [...$typeList.querySelectorAll('input[type="checkbox"]:checked')]
        .map($input => $input.value);
    const selectedRarities = [...$rarityList.querySelectorAll('input[type="checkbox"]:checked')]
        .map($input => $input.value);

    chosenHeroes = HEROES
        .filter(hero => selectedSets.includes(hero.set))
        .filter(hero => {
            const factions = unique(hero.influence.split(''));

            return intersect(factions, selectedFactions).length > 0;
        })
        .filter(hero => intersect(hero.type, selectedTypes).length > 0)
        .filter(hero => selectedRarities.includes(hero.rarity));
};
const init = () => {
    $setsList.innerHTML = SETS.map(set =>
        `<li><label><input type="checkbox" value="${set.id}" checked>${set.name}</label></li>`
    ).join('');
    $factionsList.innerHTML = FACTIONS.map(faction =>
        `<li><label><input type="checkbox" value="${faction.id}" checked>${faction.name}</label></li>`
    ).join('');
    $typeList.innerHTML = HEROES
        .reduce((types, hero) => {
            hero.type.forEach(type => {
                if (!types.includes(type)) {
                    types.push(type);
                }
            });

            return types;
        }, [])
        .sort()
        .map(type =>
        `<li><label><input type="checkbox" value="${type}" checked>${type}</label></li>`
        )
        .join('');
    $rarityList.innerHTML = HEROES
        .reduce((rarities, hero) => rarities.includes(hero.rarity) ? rarities : [...rarities, hero.rarity], [])
        .sort()
        .map(rarity =>
        `<li><label><input type="checkbox" value=${rarity} checked>${rarity}</label></li>`
        )
        .join('');
};
const initResultsTable = () => {
    $resultsTable.innerHTML =
        '<table>' +
        '<thead>' +
            '<tr>' +
                '<th>Name</th>' +
                '<th>Title</th>' +
                '<th class="set">Set</th>' +
                '<th class="influence">Influence</th>' +
                '<th class="rarity">Rarity</th>' +
                '<th class="cost">Cost</th>' +
                '<th class="stats">Stats</th>' +
                '<th class="type">Type</th>' +
            '</tr>' +
        '</thead>' +
        '<tbody>' +
        chosenHeroes.map(hero =>
            `<tr id="hero-${hero.id}"><td>${hero.name}</td>
            <td class="guess"></td>
            <td class="set">${SET_MAP[hero.set].name}</td>
            <td class="influence">${$getInfluenceIcons(hero.influence)}</td>
            <td class="rarity">${hero.rarity}</td>
            <td class="cost">${hero.cost}</td>
            <td class="stats">${hero.stats.join('/')}</td>
            <td class="type">${hero.type.join(' ')}</td>
        </tr>`).join('') +
        '</tbody>' +
        '</table>';
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
            <span class="influence">${$getInfluenceIcons(currentHero.influence)}</span>
            ${currentHero.name}<span class="set">(${SET_MAP[currentHero.set].name})</span>`;
    }
};
const updateColumnsWidth = addOrRemove => {
    $container.classList.remove('columns-' + columns);
    columns += addOrRemove ? 1 : -1;
    $container.classList.add('columns-' + columns);
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
const getTime = sets => sets.length * 5;
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
    generateChosenHeroes();
    if (chosenHeroes.length === 0) {
        alert('No heroes found with this criteria');

        return;
    }
    $input.disabled = false;
    $giveUp.disabled = false;
    $prev.disabled = false;
    $next.disabled = false;
    if ($randomize.checked) {
        shuffle(chosenHeroes);
    } else {
        sort(chosenHeroes);
    }
    totalAnswers = chosenHeroes.length;
    generateGuessMap();
    forceOrder = $forceOrder.checked;
    initResultsTable();
    if (forceOrder) {
        setCurrentHero(chosenHeroes[0]);
        $container.classList.add('force-order');
    }
    window.scrollTo(0, 0);
    updateInfo();
    $container.classList.add('playing', 'columns-2');
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
    updateColumnsWidth($showSets.checked);
});
$showInfluence.addEventListener('change', () => {
    $container.classList.toggle('show-influence', $showInfluence.checked);
    updateColumnsWidth($showInfluence.checked);
});
$showRarity.addEventListener('change', () => {
    $container.classList.toggle('show-rarity', $showRarity.checked);
    updateColumnsWidth($showRarity.checked);
});
$showCost.addEventListener('change', () => {
    $container.classList.toggle('show-cost', $showCost.checked);
    updateColumnsWidth($showCost.checked);
});
$showStats.addEventListener('change', () => {
    $container.classList.toggle('show-stats', $showStats.checked);
    updateColumnsWidth($showStats.checked);
});
$showType.addEventListener('change', () => {
    $container.classList.toggle('show-type', $showType.checked);
    updateColumnsWidth($showType.checked);
});
$showMissed.addEventListener('change', () => {
    $container.classList.toggle('show-missed', $showMissed.checked);
    updateColumnsWidth($showMissed.checked);
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
selectAll($setsList.parentElement);
selectAll($factionsList.parentElement);
selectAll($typeList.parentElement);
selectAll($rarityList.parentElement);
init();