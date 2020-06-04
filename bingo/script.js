const SIZE = 5;
const WORD_COUNT = SIZE * SIZE - 1;
const VIEW_MENU = 'menu-view';
const VIEW_PLAYING = 'playing-view';
let CURRENT_VIEW = VIEW_MENU;

let bingo = false;
let title = 'bingo';
const grid = [];
const audio = new Audio('https://retired.sounddogs.com/sound-effects/2904/mp3/377260_SOUNDDOGS__ma.mp3');
const $grid = document.getElementById('grid');
const $title = document.getElementById('title');

const playSound = () => {
  audio.play();
};
let words = [];

const checkForBingo = () => {
  for (let i = 0; i < SIZE; i += 1) {
    if (grid[i].every(cell => cell.selected)) {
      return true;
    }
  }
  for (let i = 0; i < SIZE; i += 1) {
    let col = [];
    for (let j = 0; j < SIZE; j += 1) {
      col.push(grid[j][i]);
    }
    if (col.every(cell => cell.selected)) {
      return true;
    }
  }
  return false;
};
const encode = object => encodeURIComponent(btoa(JSON.stringify(object)));
const decode = string => {
  try {
    return JSON.parse(atob(decodeURIComponent(string)));
  } catch (e) {
    return null;
  }
};
const save = () => {
  window.location.hash = encode(words);
}
const load = () => {
  const hash = window.location.hash.substr(1);
  if (!hash) {
    return;
  }
  words = decode(hash);
};

const initGrid = () => {
  let offset = 0;
  let html = '';
  $title.innerText = title;
  for (let x = 0; x < SIZE; x += 1) {
    if (!grid[x]) {
      grid[x] = [];
    }
    for (let y = 0; y < SIZE; y += 1) {
      if (x === Math.floor(SIZE / 2) && y === Math.floor(SIZE / 2)) {
        grid[x][y] = {
          selected: true,
          x,
          y,
        };
        html += '<div class="cell star"></div>';
        offset = 1;
        continue;
      }
      let word = words[x * SIZE + y - offset];
      html += '<div class="cell" data-x="' + x + '" data-y="' + y + '"><p>' + word + '</p></div>';
      grid[x][y] = {
        word,
        x,
        y,
      };
    }
  }
  $grid.innerHTML = html;
};

const setView = view => {
  document.body.classList.remove(VIEW_PLAYING, VIEW_MENU);
  document.body.classList.add(view);
  if (view === VIEW_PLAYING) {
    initGrid();
  }
}
const shuffle = array => {
  const result = [...array]
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = array[i];
    array[i] = array[j];
    array[j] = x;
  }

  return result;
};

document.addEventListener('click', e => {
  const $cell = e.target.closest('.cell');
  if (!$cell || $cell.classList.contains('star') || bingo) {
    return;
  }
  const x = $cell.dataset.x;
  const y = $cell.dataset.y;

  const cell = grid[x][y];
  if (cell.selected) {
    return;
  }
  $cell.classList.add('selected');
  cell.selected = true;
  if (checkForBingo()) {
    bingo = true;
    playSound();
  }
});

document.getElementById('menu').addEventListener('submit', e => {
  e.preventDefault();
  let wordsInput = document
    .getElementById('words')
    .value
    .split("\n")
    .filter(word => word);
  if (wordsInput.length !== WORD_COUNT) {
    alert(`Please write ${WORD_COUNT} words`);
    return;
  }
  title = document.getElementById('title-input').value;
  words = shuffle(wordsInput);
  save();
});

load();

if (words.length === WORD_COUNT) {
  setView(VIEW_PLAYING)
}
