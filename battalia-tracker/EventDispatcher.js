const listeners = {};

const subscribe = listener => {
    const eventName = listener.getSubscribedEvent();

    listeners[eventName] = listener[eventName] || [];
    listeners[eventName].push(listener);
};
const dispatch = event => (listeners[event.toString()] || []).forEach(listener => listener.invoke(event));

const EventDispatcher = {
    subscribe,
    dispatch,
};


export default EventDispatcher;