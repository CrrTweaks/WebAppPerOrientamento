let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// Flag per tracciare se l'app è già installata
let isAppInstalled = false;

// Verifica se l'app è già installata
if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  isAppInstalled = true;
  console.log("✅ App già installata (modalità standalone)");
}

// Debug: verifica stato PWA
console.log("🔍 PWA Debug Info:");
console.log("- Service Worker supportato:", "serviceWorker" in navigator);
console.log(
  "- HTTPS attivo:",
  location.protocol === "https:" || location.hostname === "localhost"
);
console.log(
  "- Manifest presente:",
  document.querySelector('link[rel="manifest"]') !== null
);
console.log("- App già installata:", isAppInstalled);

// Mostra il banner dopo un timeout se l'evento non viene lanciato
// Questo è utile per debug o per browser che non supportano l'evento
let eventFired = false;

setTimeout(() => {
  if (!eventFired && !isAppInstalled) {
    console.warn(
      "⚠️ L'evento beforeinstallprompt non è stato lanciato dopo 3 secondi"
    );
    console.log("Possibili cause:");
    console.log("1. L'app non soddisfa i criteri PWA");
    console.log("2. Il service worker non è attivo");
    console.log("3. Il browser non supporta l'installazione PWA");
    console.log("4. L'app è già stata installata in precedenza");

    // OPZIONALE: Mostra comunque il banner per debug
    // Decommenta la riga sotto se vuoi forzare la visualizzazione
    // installUI.style.display = "flex";
  }
}, 3000);

// Intercetta install prompt
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("🎉 Evento beforeinstallprompt ricevuto!");
  eventFired = true;

  e.preventDefault();
  deferredPrompt = e;

  // Mostra il pannello
  installUI.style.display = "flex";
  console.log("📱 Banner di installazione mostrato");
});

// Quando cliccano INSTALLA
installBtn.addEventListener("click", () => {
  console.log("🖱️ Click su Installa");

  if (!deferredPrompt) {
    console.error("❌ deferredPrompt non disponibile");
    alert(
      "Installazione non disponibile. Usa il menu del browser per installare l'app."
    );
    return;
  }

  installUI.style.display = "none";

  deferredPrompt.prompt();
  console.log("💬 Prompt di installazione mostrato");

  deferredPrompt.userChoice.then((result) => {
    console.log(
      result.outcome === "accepted"
        ? "✅ Utente ha installato l'app"
        : "❌ Installazione rifiutata"
    );
    deferredPrompt = null;
  });
});

// Rileva quando l'app viene installata
window.addEventListener("appinstalled", (evt) => {
  console.log("🎊 App installata con successo!");
  isAppInstalled = true;
  installUI.style.display = "none";
});

// FALLBACK: Mostra istruzioni manuali se non supportato
const closeBtn = installUI.querySelector('button[onclick*="display"]');
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    console.log("❎ Banner chiuso dall'utente");
  });
}

// Verifica periodica dello stato del Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready
    .then((registration) => {
      console.log("✅ Service Worker attivo:", registration);
    })
    .catch((error) => {
      console.error("❌ Errore Service Worker:", error);
    });
}

// TEST: Funzione per forzare la visualizzazione del banner (solo per debug)
window.showInstallBanner = function () {
  console.log("🔧 Forzatura visualizzazione banner (DEBUG)");
  installUI.style.display = "flex";
};

// Aggiungi al console.log un helper
console.log(
  "💡 Per testare il banner manualmente, esegui: showInstallBanner()"
);

// INFO: Come installare manualmente su Android Chrome/Brave:
// 1. Menu (⋮) → "Installa app" o "Aggiungi a schermata Home"
// 2. Oppure: Impostazioni → "Aggiungi alla schermata Home"
