const k = key => 'battalia_' + key;

const repository = {
    save: (key, object) => localStorage.setItem(k(key), JSON.stringify(object)),
    load: key => JSON.parse(localStorage.getItem(k(key))),
};

export default repository;