const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
const INCREASE_DIRECTIONS = [RIGHT, UP];
const DECREASE_DIRECTIONS = [LEFT, DOWN];

const halfSelector = '.half';
const valueSelector = '.value';
const $reset = document.getElementById('reset');
const $values = document.querySelectorAll(valueSelector);

document.addEventListener('swiped', e => {
    const { target, detail } = e;
    const half = target.closest(halfSelector);
    if (!half) {
        return;
    }
    const increasingDir = half.classList.contains('inverted') ? DECREASE_DIRECTIONS : INCREASE_DIRECTIONS;

    const { dir } = detail;
    const value = half.querySelector(valueSelector);
    const currentValue = parseInt(value.innerHTML, 10);

    value.innerHTML = '' + Math.max(0, increasingDir.includes(dir) ? currentValue + 1 : currentValue - 1);
});
$reset.addEventListener('click', e => {
    e.preventDefault();
    $values.forEach($value => $value.innerText = '0');
});