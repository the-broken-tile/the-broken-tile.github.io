const $questions = document.getElementById('questions');
const $mandatoryQuestions = document.getElementById('mandatory-questions');
const $answer = document.getElementById('answer');

const $statsTotal = document.getElementById('stats-total');
const $statsSkipped = document.getElementById('stats-skipped');
const $statsGuessed = document.getElementById('stats-guessed');
const $statsErrored = document.getElementById('stats-errored');

const $setup = document.getElementById('setup');
const $playing = document.getElementById('playing');
const $input = document.getElementById('input');
const $time = document.getElementById('timer');
const $skip = document.getElementById('skip');
const $tryAgain = document.getElementById('try-again');
const queryString = window.location.search;
const timer = new Timer();

const urlParams = new URLSearchParams(queryString);

const QUESTIONS_URL_PARAM = 'questions';
const ERRORS_URL_PARAM = 'errors';
const ERRORS = urlParams.has(ERRORS_URL_PARAM);
document.body.classList.toggle('playing-with-errors', ERRORS);

const UNITS = STEALTH_UNITS.reduce(function (carry, unit) {
    if (unit.intrigue) {
        carry.push({...unit, ...unit.intrigue});
    }

    carry.push(unit);
    return carry;
}, []);
const INFLUENCE_MAP = {
    [FIRE]: 'f',
    [TIME]: 't',
    [JUSTICE]: 'j',
    [PRIMAL]: 'p',
    [SHADOW]: 's',
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const gameState = {
    playing: false,
};
const renderInfluence = availableInfluence => {
    let result = [];
    for (const [influence, value] of Object.entries(availableInfluence)) {
        for (let i = 0; i < value; i ++) {
            result.push(`<span class="influence-icon ${INFLUENCE_MAP[influence]}">${influence.toLowerCase()}</span>`);
        }
    }

    return result.join(' ');
};

const generateInfluenceQuestion = () => {
    const availableInfluence = INFLUENCE_TRIOS[random(0, INFLUENCE_TRIOS.length - 1)];

    return {
        mandatory: true,
        text: `Opponent has exactly ${renderInfluence(availableInfluence)} influence.`,
        filter: unit => Object.keys(unit.influence).reduce((carry, influence) => carry && unit.influence[influence] <= availableInfluence[influence], true)
    }
};
const generateCostQuestion = () => {
    const cost = Math.random() < 0.5 ? 3 : 5;

    return {
        mandatory: true,
        text: `It costs ${cost}.`,
        filter: unit => unit.cost === cost,
    }
};
const generateTurnsPassedQuestion = () => {
    return {
        mandatory: true,
        text: () => {
            const { turns } = gameState;

            return `${turns} ${turns === 1 ? 'turn has' : 'turns have'} passed.`;
        },
        filter: ({ reveals }) => {
            const turns = random(0, 2);
            gameState.turns = turns;
            if (turns === 0) {
                return true;
            }

            return !reveals || !reveals.atStartOfTurn;
        },
    };
};
const generateMandatoryQuestions = () => [generateInfluenceQuestion(), generateCostQuestion(), generateTurnsPassedQuestion()];

const generateQuestions = function () {
    let units;
    let questionsPoll;
    let questions = [];
    const filter = () => questions.forEach(question => {
        units = units.filter(unit => {
            const { turns } = gameState;
            const { atStartOfTurn } = unit;
            const extraAttack = atStartOfTurn ? atStartOfTurn.attack * turns : 0;
            const extraHealth = atStartOfTurn ? atStartOfTurn.health * turns : 0;

            return question.filter({
                ...unit,
                attack: extraAttack + unit.attack,
                health: extraHealth + unit.health,
            });
        });
    });

    const reset = () => {
        questions = generateMandatoryQuestions();
        units = UNITS;
        filter();
        questionsPoll = [...QUESTIONS];
    }

    reset();

    while (units.length !== 1) {
        //start trying to find a single solution
        let index = random(0, questionsPoll.length - 1);
        let question = questionsPoll[index];
        questions.push(question);
        questionsPoll.splice(index,1);

        filter();

        if (units.length === 0) {
            reset();
        }
    }

    return [questions, units];
};

const renderStats = () => {
    const { guessed, total, skipped, errored } = gameState;
    $statsGuessed.innerHTML = guessed;
    $statsSkipped.innerText = skipped;
    $statsErrored.innerHTML = errored;
    $statsTotal.innerHTML = `${guessed + skipped + errored}/${total}`;
};

const renderQuestion = question => {
    const { text } = question;

    return `<li class="list-group-item">${text instanceof Function ? text() : text}</li>`
}

const renderPlayArea = () => {
    const { questions } = gameState;
    renderStats();

    $mandatoryQuestions.innerHTML = questions.filter(question => question.mandatory).map(renderQuestion).join('')
    $questions.innerHTML = questions.filter(question => !question.mandatory).map(renderQuestion).join('');
    $input.value = '';
    $input.focus();
};
const trim = text => text.replace(/(\s|,)+/g, '');
const pad = i => i < 10 ? `0${i}` : i;
const flashAnswer = (unit, className) => {
    const { name } = unit;
    $answer.innerHTML = `It was <b>${name[0]}</b>`;
    $answer.className = '';
    $answer.classList.add(className)
    setTimeout(() => $answer.innerHTML = '&nbsp;', 1500);
};
const match = (guess, unit) => {
    let trimmed = trim(guess).toLowerCase();
    const { name } = unit;
    for (let i = 0, l = name.length; i < l; i++) {
        const trimmedName = trim(name[i]).toLowerCase();
        if (trimmed === trimmedName) {
            return true;
        }
    }

    return false;
};

const matchWithError = (guess, unit) => {
    const matched = match(guess, unit);
    if (!ERRORS) {
        return matched || null;
    }
    if (matched) {
        return true;
    }
    const error = UNITS
        .filter(u => u !== unit)
        .filter(u => match(guess, u))
        .length > 0;

    return error ? false : null;
}

const makeGuess = name => {
    const { unit } = gameState;
    //partial guess, we don't mark it as wrong, because the user is still typing.
    const matched = matchWithError(name, unit);
    if (matched === true) {
        gameState.guessed++;
        flashAnswer(unit, 'success');
        nextQuestion();
        renderPlayArea();
        return;
    }
    //error
    if (matched === false) {
        gameState.errored++;
        flashAnswer(unit, 'error');
        nextQuestion();
        renderPlayArea();
    }
    //next question
    // console.log(name);
};

const tick = () => {
    const time = Math.floor(timer.getTime() / 1000);
    $time.innerText = `${pad(Math.max(0, Math.floor(time / 60)))}:${pad(Math.max(0, time % 60))}`;
};

const gameOver = () => {
    gameState.playing = false;
    renderStats();
    timer.stop();
    $input.style.display = 'none';
    $skip.style.display = 'none';
    $tryAgain.style.display = 'inline-block';
};

const start = count => {
    gameState.playing = true;
    gameState.total = count;
    gameState.guessed = 0;
    gameState.skipped = 0;
    gameState.errored = 0;
    nextQuestion();
    renderPlayArea();
    timer.start(count);
    timer.onTimeUp(gameOver);
    timer.onTick(tick);
};

const nextQuestion = () => {
    if (gameState.guessed + gameState.skipped + gameState.errored === gameState.total) {
        gameOver();
        return;
    }
    gameState.turns = 0;
    const [questions, units] = generateQuestions();
    const [unit] = units;
    const mandatoryQuestionsCount = 3;
    const shuffled = [...questions.slice(0, mandatoryQuestionsCount), ...shuffle(questions.slice(mandatoryQuestionsCount))];
    gameState.unit = unit;
    gameState.questions = shuffled;
};

if (urlParams.has(QUESTIONS_URL_PARAM)) {
    $playing.classList.add('active')
    start(parseInt(urlParams.get(QUESTIONS_URL_PARAM), 10));
} else {
    $setup.classList.add('active');
}

$input.addEventListener('input', () => {
    if (gameState.playing) {
        makeGuess($input.value);
    }
});
$skip.addEventListener('click', e => {
    e.preventDefault();
    if (gameState.playing) {
        gameState.skipped++;
        flashAnswer(gameState.unit, 'skip');
        nextQuestion();
        renderPlayArea();
    }
});
