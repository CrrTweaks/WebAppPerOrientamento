const CACHE_NAME = "marconi-app-v1.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/animations.css",
  "/script.js",
  "/VirtualTour.js",
  "/animations.js",
  "/manifest.json",
  "/pwa.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
