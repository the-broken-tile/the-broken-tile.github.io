import { EVENT_NAME } from '../Event/StartGameEvent.js'
import { $panels } from '../DOM';


const GameViewUpdateListener = {
    invoke: game => {
        for (let $panel of $panels) {
            $panel.classList.toggle('active', $panel.id === 'phase-playing');
        }
    },
    getSubscribedEvent: () => EVENT_NAME,
};

export default GameViewUpdateListener;