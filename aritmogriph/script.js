const MIN = 100;
const MAX = 799;
const MAX_TOTAL = 999;
const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';
const E = 'E';
const F = 'F';
const G = 'G';
const H = 'H';
const I = 'I';
const J = 'J';
const LETTERS = [A, B, C, D, E, F, G, H, I, J];

const $numbers = document.getElementById('numbers');
const $solutionTable = document.getElementById('solution');
let $solutionCells = {};
const $getSolutionCell = ({letter, digit}) => {
    // console.log(letter ,digit);
    if (!$solutionCells[letter] || !$solutionCells[letter][digit]) {
        $solutionCells[letter] = $solutionCells[letter] ?? {};
        $solutionCells[letter][digit] = document.getElementById(`solution-cell-${letter}-${digit}`);
    }
    return $solutionCells[letter][digit];
};
let solution = {};
let numbers;
let map = {};
const sum = numbers => numbers.reduce((carry, number) => carry + number, 0);
const random = (min = 0, max = 100)  => {
    return min +  Math.floor( Math.random() * (max - min));
}

const generate = () => {
    let numbers = [];
    let total;
    do {
        numbers = [random(MIN, MAX), random(MIN, MAX), random(MIN, MAX), random(MIN, MAX)];
        total = sum(numbers);
    } while (total > MAX_TOTAL);

    return [
        [numbers[0], numbers[1], numbers[0] + numbers[1]],
        [numbers[2], numbers[3], numbers[2] + numbers [3]],
        [numbers[0] + numbers[2], numbers[1] + numbers[3], total],
    ];
};

// they are always 3 digits!
const toDigits = number => [
    Math.floor(number / 100),
    (Math.floor(number / 10)) % 10,
    number % 10,
];

const renderSolutionTable = () => {
    let result = '<tr><td>&nbsp;</td>';

    // header
    for (let i = 0, l = LETTERS.length; i < l; i += 1) {
        result += `<th>${LETTERS[i]}</th>`;
    }
    result += '</tr>';
    // end header
    for (let i = 0, l = LETTERS.length; i < l; i += 1) {
        result += `<tr><th>${i}</th>`;
        for (let j = 0; j < l; j += 1) {
            result += `<td id="solution-cell-${LETTERS[j]}-${i}" class="solution-cell"></td>`;
        }
        result += '</tr>';
    }
    $solutionTable.innerHTML = result;
    return result;
}

const render = () => {

    const renderNumber = number => `<td>${toDigits(number).reduce((carry, digit) => carry + map[digit], '')}</td>`;
    const renderRow = row => `<tr>${row.reduce((carry, number) => carry + renderNumber(number), '')}</tr>`;
    renderSolutionTable();
    $numbers.innerHTML = numbers.reduce((carry, row) => carry + renderRow(row), '');
};

const init = () => {
    map = shuffle([...LETTERS]);
    numbers = generate();
    render();
};

init();

const updateSolutionTable = () => {
    Object.keys(solution).forEach(letter => {
        Object.keys(solution[letter]).forEach(digit => {
            const correct = solution[letter][digit];
            const $cell = $getSolutionCell({letter, digit});
            $cell.innerHTML = correct ? '✅' : '❌';
        })
    });
};
const markDigitLetterCombination = ({letter, digit, correct}) => {
    // console.log(letter, digit, correct);
    solution[letter] = solution[letter] ?? {};
    solution[letter][digit] = correct;
    if (correct) {

    }
    updateSolutionTable();
};

const clickListener = correct => e => {
    e.preventDefault();
    const REGEX = /solution-cell-([A-J])-(\d)/;
    const { target } = e;
    if (!target.classList.contains('solution-cell')) {
        return;
    }
    const matches = target.id.match(REGEX);
    if (matches) {
        markDigitLetterCombination({letter: matches[1], digit: parseInt(matches[2], 10), correct});
    }
}
$solutionTable.addEventListener('click', clickListener(false));
$solutionTable.addEventListener('contextmenu', clickListener(true));