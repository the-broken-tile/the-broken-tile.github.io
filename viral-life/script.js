const CELL_SIZE = 10;
const SIZE = 50;
const SECTORS_COUNT = 5; //across, so they are actually SECTORS_COUNT^2

const view = new GameView('container', SIZE, SECTORS_COUNT, CELL_SIZE);
const $generation = document.getElementById('generation');
const $nextGenerationsCount = document.getElementById('next-generations-count');
const $nextGenerationButton = document.getElementById('next-generation');
const $sectorRow = document.getElementById('sector-row');
const $sectorColumn = document.getElementById('sector-column');
const $nukeButton = document.getElementById('nuke');
const $addEventButton = document.getElementById('add-event');
const $event = document.getElementById('event');

let nextGenerationsCount = parseInt($nextGenerationsCount.value, 10);
let generationsLeft;

view.init();

document.getElementById('active-player').addEventListener('change', function (e) {
    e.preventDefault();
    view.updateActivePlayer(parseInt(this.value, 10));
});

document.getElementById('reset').addEventListener('click', e => {
    e.preventDefault();
    view.reset();
});

$nextGenerationButton.addEventListener('click', e => {
    e.preventDefault();
    generationsLeft = nextGenerationsCount;
    const tick = () => setTimeout(() => {
        view.nextGeneration();
        $generation.innerHTML = parseInt($generation.innerHTML, 10) + 1;
        generationsLeft--;
        if (generationsLeft) {
            tick();
            return;
        }
        $nextGenerationButton.disabled = false;
    }, 300);

    $nextGenerationButton.disabled = true;
    tick();

});

$nextGenerationsCount.addEventListener('input', e => {
    e.preventDefault();
    nextGenerationsCount = parseInt($nextGenerationsCount.value, 10);
});

const resetSectorButtons = () => {
    $sectorRow.value = '';
    $sectorColumn.value = '';
    $nukeButton.disabled = true;
    $addEventButton.disabled = true;
};

$nukeButton.addEventListener('click', e => {
    e.preventDefault();
    view.nukeSector({row: parseInt($sectorRow.value, 10), column: parseInt($sectorColumn.value, 10)});
    resetSectorButtons();
});

[$sectorRow, $sectorColumn].forEach($el => $el.addEventListener('input', e => {
    e.preventDefault();
    const disabled = isNaN(parseInt($sectorRow.value, 10)) || isNaN(parseInt($sectorColumn.value, 10));
    $nukeButton.disabled = disabled;
    $addEventButton.disabled = disabled;
}));

$addEventButton.addEventListener('click', e => {
    e.preventDefault();
    view.addEvent($event.value, {row: parseInt($sectorRow.value, 10), column: parseInt($sectorColumn.value, 10)}, nextGenerationsCount);
    resetSectorButtons();
});