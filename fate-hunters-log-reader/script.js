const $fileSelector = document.getElementById('file-selector');

const LOCAL_STORAGE_PREFIX = '_fh_';
const { localStorage } = window;
let contents;

const events = [];

const save = () => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX, JSON.stringify(contents));
};
const load = () => {
    contents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PREFIX));
};
const loadContents = string => contents = string.split("\n");
const processRow = (row, prev = null) => {
    for (let i = 0, l = processors.length; i < l; i ++) {
        if (processors[i].supports(row, prev)) {
            return processors[i].process(row, prev);
        }
    }
};
const process = () => {
    for (let i = 0, l = contents.length; i < l; i++) {
        events[i] = processRow(contents[i], events[i - 1]);
    }
};

const readFile = file => {
    if (file.type !== 'text/plain') {
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', event => {
        loadContents(event.target.result);
        save();
    });
    reader.readAsText(file);
};
$fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];

    readFile(file);
});


load();
if (contents) {
    process();
}