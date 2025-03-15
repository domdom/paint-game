
var ui = {};

ui.updateParamSilently = function (name, value = null) {
    const url = new URL(window.location);
    if (value === null) {
        url.searchParams.delete(name)
    } else {
        url.searchParams.set(name, value);
    }
    history.pushState(null, '', url);
}

ui.getParam = function (name, fallback = null) {
    const url = new URL(window.location);
    if (url.searchParams.has(name)) {
        return url.searchParams.get(name);
    }
    return fallback;
}