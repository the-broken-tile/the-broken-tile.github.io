const CELL_SIZE = 10;
const SIZE = 50;
const SECTOR_SIZE = 10;

const view = new GameView('container', SIZE, SECTOR_SIZE, CELL_SIZE);
const $generation = document.getElementById('generation');
const $nextGenerationsCount = document.getElementById('next-generations-count');
const $nextGenerationButton = document.getElementById('next-generation');
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
        generationsLeft--;
        if (generationsLeft) {
            tick();
            return;
        }
        $nextGenerationButton.disabled = false;
    }, 500);

    $generation.innerHTML = parseInt($generation.innerHTML, 10) + 1;
    $nextGenerationButton.disabled = true;
    tick();

});

$nextGenerationsCount.addEventListener('input', e => {
    e.preventDefault();
    nextGenerationsCount = parseInt($nextGenerationsCount.value, 10);
});