const LANGUAGE_BG = 'bg';
const TRANSLATIONS = {
    [LANGUAGE_BG]: {
        messages: {
            city_label: 'Град',
            club_label: 'Клуб',
            designer_label: 'Дизайнер',
            artist_label: 'Художник',
            category_label: 'Категория',
            family_label: 'Семейство',
            mechanic_label: 'Механика',
            players_label: 'Брой играчи',
            playing_time_label: 'Време за игра',
            year_published_label: 'Година на издаване',
            show_more_filters_label: 'още',
        },
        city: {
            Plovdiv: 'Пловдив',
            Sofia: 'София',
            'Veliko Tarnovo': 'Велико Търново',
        }
    },
};

function Translator(language) {
    this.trans = function trans(term, params = {}, domain = 'messages') {
        // @todo use params, if needed.
        return TRANSLATIONS[language][domain][term] ?? term;
    };
}