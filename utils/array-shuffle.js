//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffle = array => {
    let currentIndex = array.length;
    while (0 !== currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};