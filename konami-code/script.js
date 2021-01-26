const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let current = 0;

const execute = () => {
    const zIndex = 0;

    const el = document.createElement('img');
    el.style.zIndex = zIndex;
    el.style.position = 'absolute';
    let height = 5;
    let width = 8;
    const { innerHeight, innerWidth } = window;
    const delta = 70;
    el.style.height = height + 'px';
    el.src = './facehugger.jpg';
    el.style.top = ((innerHeight - height) / 2) + 'px';
    el.style.left = ((innerWidth - width) / 2) + 'px';

    const tick = () => {
        if (height < outerHeight) {
            height += delta;
            width = el.offsetWidth;
            el.style.height = height + 'px';
            el.style.top = ((innerHeight - height) / 2) + 'px';
            el.style.left = ((innerWidth - width) / 2) + 'px';

            setTimeout(tick, 5);
        }
    };

    setTimeout(tick, 5);
    document.body.appendChild(el);

    const sound = './111497427.ogg';
    const audio = new Audio(sound);
    audio.play();
};
document.addEventListener('keydown', ({ key }) => {
    // If the key isn't in the pattern, reset
    if (pattern.indexOf(key) < 0 || key !== pattern[current]) {
        current = 0;

        return;
    }

    current++;
    // If complete, alert and reset
    if (pattern.length === current) {
        current = 0;
        execute();
    }
}, false);

