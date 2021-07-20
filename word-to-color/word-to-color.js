const REGEX = /^\w+$/i;
const COEF = 1.5;

const wordToColor = word => {
    if (!REGEX.test(word)) {
        throw new Error('Invalid argument');
    }
    if (word.length === 1) {
        return wordToColor(word + word);
    }

    if (word.length === 2) {
        return wordToColor(word[0] + word[1] + word[2]);
    }

    const upped = word.toUpperCase();
    const result = [0, 122, 255];

    for (let i = 0; i < upped.length; i += 1) {
        result[i % 3] += Math.floor(upped.charCodeAt(i) * COEF);
    }

    return '#' + result.map(number => number % 255).map(number => number.toString(16)).join('');
};