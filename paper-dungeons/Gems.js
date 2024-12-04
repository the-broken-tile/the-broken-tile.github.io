function Gems() {
    const MAX_COUNT = 10;
    let count = 0;

    this.collect = () => count = Math.max(count + 1, MAX_COUNT);
    this.getCount = () => count;
}