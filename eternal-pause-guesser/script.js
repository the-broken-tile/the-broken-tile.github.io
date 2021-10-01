const $ambush = document.getElementById('ambush');
$ambush.indeterminate = true;
const $expedition = document.getElementById('expedition');
const $maxManaCost = document.getElementById('max-mana-cost');
const $minManaCost = document.getElementById('min-mana-cost');
const $influence = document.getElementById('influence');
const $result = document.getElementById('result');
const $advancedFilters = document.getElementById('advanced-filters');
const $advancedFiltersCheck = document.getElementById('advanced-filters-check');

const normalize = card => {
    const result = {};

    for (const [key, value] of Object.entries(card)) {
        result[key.charAt(0).toLowerCase() + key.slice(1)] = value;
    }

    return result;
};
const filterRelevantCard = ({type, cardText}) => type === CARD_TYPE_FAST_SPELL || (type === CARD_TYPE_UNIT && HAS_AMBUSH_REGEX.test(cardText));
const getDependency = ({set, id}) => {
    const dependencies = DEPENDENCIES.find(config => config.id[0] === set && config.id[1] === id);

    return dependencies ?? {};
};

const addDependencies = card => {
    const {setNumber, eternalID} = card;
    const dependencies = getDependency({set: setNumber, id: eternalID});

    return {
        ...card,
        ...dependencies,
    }
};

const loadJSON = callback => {

    const request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', './eternal-cards.json', true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    };
    request.send();
}
let cards;

const getAdvancedFilters = () => {
    const $checkedBoxes = $advancedFilters.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
    let filters = [];
    $checkedBoxes.forEach($checkbox => {
        if (!$checkbox.checked) {
            return;
        }
        const { value } = $checkbox;
        filters.push(value);
    });

    return filters;
};

const currentCriteria = {
    ambush: undefined,
    maxManaCost: undefined,
    minManaCost: undefined,
    influence: {f: 0, t: 0, j: 0, p: 0, s: 0},
    expedition: false,
};

const renderResultRow = card => `<a href=${card.detailsUrl} target="_blank" rel="external">${card.name}</a>`;

const filter = () => {
    const ambushFilter = ({cardText}) =>
         currentCriteria.ambush === undefined || currentCriteria.ambush ===  HAS_AMBUSH_REGEX.test(cardText);
    const maxManaCostFilter = ({cost}) =>
        currentCriteria.maxManaCost === undefined || cost <= currentCriteria.maxManaCost;
    const minManaCostFilter = ({cost}) =>
        currentCriteria.minManaCost === undefined || cost > currentCriteria.minManaCost;
    const filterInfluence = ({influence}) => {
        for (const [inf, count] of Object.entries(currentCriteria.influence)) {
            const regex = new RegExp(inf, 'gi');
            const occurrences = (influence.match(regex)||[]).length;
            if (occurrences > count) {
                return false;
            }
        }

        return true;
    };
    const advancedFilter = (card) => {
        if (!$advancedFiltersCheck.checked) {
            return true;
        }

        return advancedFilterMatch(card, getAdvancedFilters())
    };
    const filterExpedition = ({setNumber, eternalID}) =>
        !currentCriteria.expedition
        || EXPEDITION_SETS.find(([expeditionSetNumber, expeditionEternalID = eternalID]) =>
            expeditionSetNumber === setNumber && expeditionEternalID === eternalID) !== undefined;

    const filteredCards = cards
        .filter(ambushFilter)
        .filter(maxManaCostFilter)
        .filter(minManaCostFilter)
        .filter(filterInfluence)
        .filter(filterExpedition)
        .filter(advancedFilter);
    $result.innerHTML = filteredCards.length + '<br><br>' + filteredCards.map(renderResultRow).join('<br>');

};

document.body.addEventListener('click', function (e) {
    const { target } = e;
    if (!target.classList.contains('indeterminable')) {
        return;
    }

    if (target.readOnly) {
        target.checked = false;
        target.readOnly = false;
        return;
    }
    if (target.checked) {
        return;
    }
    target.readOnly = true;
    target.indeterminate = true;
});

$ambush.addEventListener('change', function () {
   if (this.indeterminate) {
       currentCriteria.ambush = undefined;
       filter();
       return;
   }

    currentCriteria.ambush = this.checked;
    filter();
});
$expedition.addEventListener('change', function () {
    currentCriteria.expedition = this.checked;
    filter();
});

$maxManaCost.addEventListener('input', function() {
    if (this.value === '') {
        currentCriteria.maxManaCost = undefined;
        filter();
        return;
    }

    currentCriteria.maxManaCost = parseInt(this.value, 10);
    filter();
});

$minManaCost.addEventListener('input', function() {
    if (this.value === '') {
        currentCriteria.minManaCost = undefined;
        filter();
        return;
    }

    currentCriteria.minManaCost = parseInt(this.value, 10);
    filter();
});

$influence.addEventListener('click', function (e) {
    const {id} = e.target;
    if (!id) {
        return;
    }
    const [influence, value] = id.split('-');
    const intValue = parseInt(value, 10);
    const allIcons = document.querySelectorAll(`.influence-icon.${influence}`);;

    if (currentCriteria.influence[influence] === intValue) {
        currentCriteria.influence[influence] = 0;
        allIcons.forEach(icon => icon.classList.remove('highlighted'));
        filter();
        return;
    }

    currentCriteria.influence[influence] = intValue;
    allIcons.forEach(icon =>
        icon.classList.toggle('highlighted', parseInt(icon.id.replace(/[^\d]+/, ''), 10) <= intValue)
    );
    filter();
});

$advancedFilters.addEventListener('change', function (e) {
    const { target } = e;
    if (!target || target.type !== 'checkbox') {
        return;
    }
    const $li = target.closest('li');

    $li.querySelectorAll('ul li').forEach($child => {
        const $checkbox = $child.querySelector('input[type="checkbox"]')
        $checkbox.checked = target.checked;
        $checkbox.disabled = target.checked;
    });
    filter();
});
$advancedFiltersCheck.addEventListener('change', function () {
    filter();
});
loadJSON(response => {
    cards = response.map(normalize).filter(filterRelevantCard).filter(({deckBuildable}) => deckBuildable).map(addDependencies);

    filter();
});

