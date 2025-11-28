const CACHE_NAME = "marconi-pwa-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",

  /* CSS */
  "/index.css",
  "/animations.css",

  /* JS */
  "/script.js",
  "/VirtualTour.js",
  "/animations.js",

  /* ICONE PWA */
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",

  /* FOTO */
  "/img/logoScuola/LOGO_IIS_G_Marconi-2.jpeg",
  "/QR/qr-code.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
