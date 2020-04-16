import EventDispatcher from './EventDispatcher.js';
import * as listeners from './Listener';

const register = () => {
    Object.keys(listeners).forEach(key => EventDispatcher.subscribe(listeners[key]));
};

export default {
    register,
}