import { EVENT_NAME}  from '../Event/NewButtonClickedEvent.js'
import { $panels } from '../DOM';

const NewGameButtonListener = {
    invoke: () => {
        for (let $panel of $panels) {
            $panel.classList.toggle('active', $panel.id === 'phase-setup');
        }
    },
    getSubscribedEvent: () => EVENT_NAME,
};

export default NewGameButtonListener;