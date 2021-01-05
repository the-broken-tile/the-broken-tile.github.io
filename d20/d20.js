const PREFIX = 'd20-';
const ROLLING = PREFIX + 'rolling';
const FACE = PREFIX + 'face';
const CONTENT = PREFIX + 'content';
const SIDES = 20;
const INITIAL_SIDE = 1;
const ANIMATION_DURATION  = 2000;

// https://codepen.io/vicentemundim/pen/cenIh

function Die(parent) {
    const $container = document.createElement('div');
    $container.classList.add(CONTENT);
    this.$die = document.createElement('div');
    this.$die.classList.add(PREFIX + 'die');

    let lastFace;
    let timeoutId;


    const randomFace = () => {
        const face = Math.floor((Math.random() * SIDES)) + INITIAL_SIDE
        lastFace = face === lastFace ? randomFace() : face;

        return face;
    }

    this.roll = function () {
        this.$die.classList.add(ROLLING);
        const that = this;

        timeoutId = setTimeout(function () {
            clearTimeout(timeoutId)
            that.$die.dataset.face = randomFace();
            that.$die.classList.remove(ROLLING);
        }, ANIMATION_DURATION)
    };

    // Init
    for (let i = 1; i <= SIDES; ++i) {
        const figure = document.createElement('figure');
        figure.classList.add(FACE, `${PREFIX}face-${i}`);
        this.$die.appendChild(figure);
    }

    $container.appendChild(this.$die);
    parent.appendChild($container);
}
