let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// ========== DEBUG (RIMUOVI DOPO) ==========
console.log("🔍 PWA CHECK:");
console.log(
  "1. HTTPS:",
  location.protocol === "https:" || location.hostname === "localhost"
);
console.log("2. Service Worker:", "serviceWorker" in navigator);
console.log(
  "3. Manifest:",
  document.querySelector('link[rel="manifest"]') !== null
);

// Test Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistration().then((reg) => {
    console.log("4. SW Registrato:", !!reg);
    if (reg) console.log("   SW Attivo:", reg.active !== null);
  });
}

// Test Manifest
fetch("/manifest.json")
  .then((r) => r.json())
  .then((m) => {
    console.log("5. Manifest OK:", m.name);
    console.log("   Icons:", m.icons?.length || 0);
  })
  .catch((e) => console.error("❌ Manifest errore:", e));

// Test Icons
fetch("/icons/icon-192x192.png")
  .then((r) => console.log("6. Icon 192:", r.ok ? "✅" : "❌"))
  .catch(() => console.error("❌ Icon 192 mancante!"));

fetch("/icons/icon-512x512.png")
  .then((r) => console.log("7. Icon 512:", r.ok ? "✅" : "❌"))
  .catch(() => console.error("❌ Icon 512 mancante!"));

// Attendi evento
let eventReceived = false;
setTimeout(() => {
  if (!eventReceived) {
    console.error("❌ beforeinstallprompt NON ricevuto dopo 3s");
    console.log("💡 Controlla i log sopra - qualcosa manca");
  }
}, 3000);
// ========== FINE DEBUG ==========

// Intercetta install prompt
window.addEventListener("beforeinstallprompt", (e) => {
  eventReceived = true;
  console.log("✅ beforeinstallprompt ricevuto!");

  e.preventDefault();
  deferredPrompt = e;

  // Mostra il pannello
  installUI.style.display = "flex";
});

// Quando cliccano INSTALLA
installBtn.addEventListener("click", () => {
  installUI.style.display = "none";
  deferredPrompt.prompt();

  deferredPrompt.userChoice.then((result) => {
    console.log(
      result.outcome === "accepted"
        ? "📌 Utente ha installato l'app"
        : "❌ Installazione rifiutata"
    );
    deferredPrompt = null;
  });
});
