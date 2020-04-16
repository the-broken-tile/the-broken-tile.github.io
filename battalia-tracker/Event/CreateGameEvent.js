class CreateGameEvent {
    constructor(data) {
        this.data = data;
    }

    set data(value) {
        return;
    }

    toString() {
        return 'CreateGameEvent';
    }
};

export default CreateGameEvent;