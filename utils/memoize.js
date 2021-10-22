const memoize = (func) => {
    // a cache of results
    const results = {};
    // return a function for the cache of results
    return (...args) => {
        // a JSON key to save the results cache
        const argsKey = JSON.stringify(args);
        if (!results[argsKey]) {
            results[argsKey] = func(...args);
        }
        // return the cached results
        return results[argsKey];
    };
};