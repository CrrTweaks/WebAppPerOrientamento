let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// Intercetta install prompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Mostra il pannello invece del bottone
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
