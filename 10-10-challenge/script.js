const GAMES = 10;
const MAX_PLAYS = 10;
const CACHE_KEY = 'ten10';

const generateTable = () => {
    return '<table id="grid"><thead><tr><th>Name</th>'
        + [...Array(MAX_PLAYS).keys()].map(i => '<th>' + (i + 1) + '</th>').join('')
        + '</tr></thead>'
        + '<tbody>'
        + [...Array(GAMES).keys()].map(() => '<tr><th contenteditable></th>'
            + [...Array(MAX_PLAYS).keys()].map(() => '<td></td>').join('')
            + '</tr>').join('')
        + '</tbody>'
        + '</table>';
};

const data = window.localStorage.getItem(CACHE_KEY) || generateTable();

const $root = document.getElementById('root');

const save = () =>
    window.localStorage.setItem(CACHE_KEY, $root.innerHTML);

$root.innerHTML = data;
$root.addEventListener('click', e => {
    const td = e.target.closest('td');

    if (!td) {
        return;
    }
    td.classList.toggle('meeple');
    save();
});

$root.addEventListener('input', e => {
    if (e.target.closest('[contenteditable]')) {
        save();
    }
});