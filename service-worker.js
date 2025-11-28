const CACHE_NAME = "marconi-pwa-cache-v2";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/index.css",
  "/animations.css",
  "/script.js",
  "/VirtualTour.js",
  "/animations.js",
  "/pwa.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/img/logoScuola/LOGO_IIS_G_Marconi-2.jpeg",
  "/QR/qr-code.png",
];

// Installazione - cache dei file essenziali
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Installazione in corso...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Cache aperta, aggiunta file...");
        // Usa addAll con gestione errori per file opzionali
        return cache
          .addAll(
            URLS_TO_CACHE.map((url) => new Request(url, { cache: "reload" }))
          )
          .catch((error) => {
            console.error("❌ Errore durante il caching:", error);
            // Prova a cachare file uno per uno
            return Promise.all(
              URLS_TO_CACHE.map((url) =>
                cache.add(url).catch((err) => {
                  console.warn(`⚠️ Impossibile cachare ${url}:`, err);
                })
              )
            );
          });
      })
      .then(() => {
        console.log("✅ File cachati con successo");
        return self.skipWaiting(); // Attiva subito il nuovo SW
      })
  );
});

// Attivazione - pulizia cache vecchie
self.addEventListener("activate", (event) => {
  console.log("🎯 Service Worker: Attivazione in corso...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("🗑️ Eliminazione cache obsoleta:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker attivato");
        return self.clients.claim(); // Prendi controllo delle pagine aperte
      })
  );
});

// Fetch - strategia Cache First con Network Fallback
self.addEventListener("fetch", (event) => {
  // Ignora richieste non-GET e URL esterni
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Trovato in cache, ritorna immediatamente
        console.log("📦 Servito da cache:", event.request.url);
        return cachedResponse;
      }

      // Non in cache, fetch dalla rete
      console.log("🌐 Fetch dalla rete:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Verifica risposta valida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clona la risposta (può essere letta solo una volta)
          const responseToCache = response.clone();

          // Aggiungi alla cache per il futuro
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.error("❌ Fetch fallito:", error);
          // Opzionale: ritorna una pagina offline
          return new Response("Offline - Contenuto non disponibile", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        });
    })
  );
});

console.log("🚀 Service Worker caricato");
