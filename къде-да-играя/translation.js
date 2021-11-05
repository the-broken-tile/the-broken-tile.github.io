const LANGUAGE_BG = 'bg';
const TRANSLATIONS = {
    [LANGUAGE_BG]: {
        messages: {

        },
        city: {
            Plovdiv: 'Пловдив',
            Sofia: 'София'
        }
    },
};

function Translator(language) {
    this.trans = function trans(term, params = {}, domain = 'messages') {
        // @todo use params, if needed.
        return TRANSLATIONS[language][domain][term] ?? term;
    };
}