const PREFIX = 'save_me_';
const save = (k, v) => localStorage.setItem(PREFIX + k, JSON.stringify(v));
const load = k => JSON.parse(localStorage.getItem(PREFIX + k));

const DATA_ATTR = 'data-save-me';

const elements = document.querySelectorAll(`[${DATA_ATTR}]`);

for (let element of elements) {
    element.value = load(element.getAttribute(DATA_ATTR)) || '';
}
window.addEventListener('input', e => {
    const { target } = e;
    const k = target.getAttribute(DATA_ATTR);
    if (!k) {
        return;
    }
    save(k, target.value);
});