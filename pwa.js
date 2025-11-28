let deferredPrompt;
const installScreen = document.getElementById("install-screen");
const installBtn = document.getElementById("installBtn");
const closeBtn = document.getElementById("closeInstall");

// 🔹 Controllo se è mobile/tablet
function isMobile() {
  return /Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(
    navigator.userAgent
  );
}

// 🔹 Nascondi schermata se non mobile o già installato
function checkInitialState() {
  if (!isMobile() || localStorage.getItem("pwaInstalled")) {
    installScreen.style.display = "none";
  }
}

// 🔹 Evento A2HS (Add To Home Screen)
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt event fired");
  e.preventDefault();
  deferredPrompt = e;

  // Mostra overlay solo se mobile e non già visto
  if (isMobile() && !localStorage.getItem("pwaInstalled")) {
    installScreen.style.display = "flex";
  }
});

// 🔹 Click su "Installa"
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    console.log("Install button clicked");

    if (!deferredPrompt) {
      console.error("deferredPrompt is null - prompt not available");

      // Mostra istruzioni manuali per iOS o browser non supportati
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        alert(
          "Per installare su iOS:\n1. Tocca il pulsante Condividi\n2. Scorri e seleziona 'Aggiungi a Home'"
        );
      } else {
        alert(
          "L'installazione non è disponibile. Prova ad aprire il menu del browser e cercare 'Installa app' o 'Aggiungi a schermata Home'"
        );
      }

      installScreen.style.display = "none";
      localStorage.setItem("pwaInstalled", "true");
      return;
    }

    try {
      // Mostra il prompt nativo
      deferredPrompt.prompt();

      // Aspetta la scelta dell'utente
      const choiceResult = await deferredPrompt.userChoice;

      console.log("User choice:", choiceResult.outcome);

      if (choiceResult.outcome === "accepted") {
        console.log("PWA installation accepted");
        localStorage.setItem("pwaInstalled", "true");
      } else {
        console.log("PWA installation dismissed");
      }

      // Reset del prompt
      deferredPrompt = null;
      installScreen.style.display = "none";
    } catch (error) {
      console.error("Error during installation:", error);
      alert(
        "Si è verificato un errore durante l'installazione. Riprova più tardi."
      );
    }
  });
}

// 🔹 Click "Continua senza installare"
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    console.log("User dismissed install screen");
    installScreen.style.display = "none";
    localStorage.setItem("pwaInstalled", "true");
  });
}

// 🔹 Rileva se l'app è già installata/standalone
window.addEventListener("DOMContentLoaded", () => {
  // Controlla se già in modalità standalone (già installata)
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  ) {
    console.log("App already running in standalone mode");
    localStorage.setItem("pwaInstalled", "true");
    installScreen.style.display = "none";
  } else {
    checkInitialState();
  }
});

// 🔹 Evento appinstalled (quando l'app viene effettivamente installata)
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed successfully");
  localStorage.setItem("pwaInstalled", "true");
  installScreen.style.display = "none";
  deferredPrompt = null;
});

// 🔹 Debug: verifica supporto PWA
console.log("PWA Support Check:");
console.log("- Is Mobile:", isMobile());
console.log("- Service Worker supported:", "serviceWorker" in navigator);
console.log("- Already installed:", localStorage.getItem("pwaInstalled"));
console.log(
  "- Standalone mode:",
  window.matchMedia("(display-mode: standalone)").matches
);
