const CACHE_VERSION = "paint-game-v1";
const resources = [
    "/paint-game/",
    "/paint-game/index.html",
    "/paint-game/js/board.js",
    "/paint-game/js/cell.js",
    "/paint-game/js/levels.js",
    "/paint-game/js/ui.js",

    "/paint-game/favicon.ico",
    "/paint-game/icon.svg",
    "/paint-game/icon.png",
    "/paint-game/site.webmanifest",
];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_VERSION);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache(resources),
    );
});

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, response);
};

const fetchFirst = async (event, request) => {
    try {
        const netResponse = await fetch(request);
        if (netResponse.ok) {
            event.waitUntil(putInCache(request, netResponse.clone()));
        } else {
            const cacheResponse = await caches.match(request, {ignoreSearch: true});
            if (cacheResponse) {
                return cacheResponse;
            }
        }
        return netResponse;
    } catch (error) {
        const cacheResponse = await caches.match(request, {ignoreSearch: true});
        if (cacheResponse) {
            return cacheResponse;
        }
        return new Response("Failed: " + error.message, {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetchFirst(event, event.request)
  );
});
