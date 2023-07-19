/**
 * max is exclusive and the min is inclusive.
 *
 * @param min
 * @param max
 * @returns {number}
 */
const random = (min, max)  => {
    const mn = Math.ceil(min);
    const mx = Math.floor(max);

    return Math.floor(Math.random() * (mx - mn) + mn);
}