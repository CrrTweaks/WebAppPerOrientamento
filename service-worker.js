const CACHE = "marconi-pwa-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/index.css",
  "/animations.css",
  "/script.js",
  "/VirtualTour.js",
  "/icons/192.png",
  "/icons/512.png",
  "/img/logoScuola/LOGO_IIS_G_Marconi-2.jpeg",
];

// Installa SW e salva cache
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

// Recupero offline
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
