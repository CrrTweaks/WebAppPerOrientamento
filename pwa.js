let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// Intercetta install prompt
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("✅ PWA installabile!");
  e.preventDefault();
  deferredPrompt = e;

  // Mostra il banner
  installUI.style.display = "flex";
});

// Quando cliccano INSTALLA
installBtn.addEventListener("click", () => {
  if (!deferredPrompt) return;

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

// Rileva installazione completata
window.addEventListener("appinstalled", () => {
  console.log("🎉 App installata!");
  installUI.style.display = "none";
});

// DEBUG: Controlla perché l'evento non arriva
setTimeout(() => {
  if (!deferredPrompt) {
    console.error("❌ L'evento beforeinstallprompt NON è stato lanciato!");
    console.log("Controlla:");
    console.log(
      "1. Icone presenti?",
      "/icons/icon-192x192.png e icon-512x512.png"
    );
    console.log(
      "2. Service Worker attivo?",
      navigator.serviceWorker.controller
    );
    console.log("3. HTTPS attivo?", location.protocol === "https:");
    console.log(
      "4. Manifest valido?",
      document.querySelector('link[rel="manifest"]')
    );
  }
}, 3000);
