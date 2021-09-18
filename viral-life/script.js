const CELL_SIZE = 10;
const SIZE = 50;
const SECTOR_SIZE = 10;

const view = new GameView('container', SIZE, SECTOR_SIZE, CELL_SIZE);
const $generation = document.getElementById('generation');

$generation.innerHTML = 1;

view.init();
document.getElementById('active-player').addEventListener('change', function (e) {
    e.preventDefault();
    view.updateActivePlayer(parseInt(this.value, 10));
});

document.getElementById('reset').addEventListener('click', e => {
    e.preventDefault();
    view.reset();
});

document.getElementById('next-generation').addEventListener('click', e => {
    e.preventDefault();
    view.nextGeneration();
    $generation.innerHTML = parseInt($generation.innerHTML, 10) + 1;
});