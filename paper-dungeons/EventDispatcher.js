function EventDispatcher() {
    const listeners = {};

    this.on = function(event, callback) {
        listeners[event] = listeners[event] || [];
        listeners[event].push(callback);
    };

    this.trigger = function (event, data = null) {
        if (!listeners[event]) {
            return;
        }

        listeners[event].forEach(function (listener) {
            listener(data);
        });
    };
}