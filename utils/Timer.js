function Timer() {
    let time;
    let currentTimeStamp;
    let stopped = false;
    let onTick = () => {};
    let ontTimeUp = () => {};
    const tick = () => {
        if (stopped) {
            return;
        }
        if (time <= 0) {
            stopped = true;
            ontTimeUp();
            return;
        }
        window.requestAnimationFrame(tick);
        let newTimeStamp = Date.now();
        time -=  newTimeStamp - currentTimeStamp;
        currentTimeStamp = newTimeStamp;
        onTick();
    };
    this.start = totalTime => {
        // milliseconds * minutes
        time = totalTime * 1000 * 60;
        currentTimeStamp = Date.now();
        stopped = false;
        tick();
    };
    this.stop = () => {
        stopped = true;
    };

    this.getTime = () => time;

    this.onTick = cb => {
        onTick = cb;
    };
    this.onTimeUp = cb => {
        ontTimeUp = cb;
    };
}