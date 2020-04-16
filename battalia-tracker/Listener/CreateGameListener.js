import { EVENT_NAME } from '../Event/NewButtonClickedEvent.js'
import { $panels } from '../DOM';

const CreateGameListener = {
    invoke: data => {
        console.log(data);
        // for (let $panel of $panels) {
        //     $panel.classList.toggle('active', $panel.id === 'phase-playing');
        // }
    },
    getSubscribedEvent: () => EVENT_NAME,
};

export default CreateGameListener;