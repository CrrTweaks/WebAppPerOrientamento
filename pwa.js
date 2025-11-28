let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// Nascondi il banner se app già installata
if (window.matchMedia("(display-mode: standalone)").matches) {
  console.log("✅ App già installata");
  installUI.remove();
}

// Cattura l'evento di installazione
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("🎉 PWA installabile!");

  // Previeni il prompt automatico
  e.preventDefault();

  // Salva l'evento per usarlo dopo
  deferredPrompt = e;

  // Mostra il banner personalizzato
  installUI.style.display = "flex";
});

// Click sul bottone Installa
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    console.error("❌ Prompt non disponibile");
    alert("L'installazione non è disponibile. Usa il menu del browser.");
    return;
  }

  // Nascondi il banner
  installUI.style.display = "none";

  // Mostra il prompt nativo del browser
  deferredPrompt.prompt();

  // Aspetta la scelta dell'utente
  const { outcome } = await deferredPrompt.userChoice;

  console.log(
    outcome === "accepted" ? "✅ App installata!" : "❌ Installazione annullata"
  );

  // Reset
  deferredPrompt = null;
});

// Rileva installazione completata
window.addEventListener("appinstalled", () => {
  console.log("🎊 App installata con successo!");
  installUI.style.display = "none";
});

console.log("📱 PWA pronta");
