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

      // Mostra istruzioni manuali specifiche per dispositivo
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // iOS
        showManualInstructions("iOS");
      } else if (/Android/.test(navigator.userAgent)) {
        // Android
        showManualInstructions("Android");
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

// 🔹 Mostra istruzioni manuali personalizzate
function showManualInstructions(platform) {
  const instructions = {
    Android: `
      <div style="text-align: left; padding: 20px;">
        <h3 style="color: white; margin-bottom: 15px;">📱 Come installare su Android:</h3>
        <ol style="color: #e0e0e0; line-height: 1.8;">
          <li>Tocca il menu <strong>⋮</strong> (tre puntini) in alto a destra</li>
          <li>Seleziona <strong>"Installa app"</strong> o <strong>"Aggiungi a schermata Home"</strong></li>
          <li>Conferma l'installazione</li>
        </ol>
        <p style="color: #90caf9; margin-top: 15px; font-size: 14px;">
          💡 Se non vedi l'opzione, prova a ricaricare la pagina o controlla se l'app è già installata.
        </p>
      </div>
    `,
    iOS: `
      <div style="text-align: left; padding: 20px;">
        <h3 style="color: white; margin-bottom: 15px;">📱 Come installare su iOS:</h3>
        <ol style="color: #e0e0e0; line-height: 1.8;">
          <li>Tocca il pulsante <strong>Condividi</strong> 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
              <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
            </svg>
          </li>
          <li>Scorri verso il basso</li>
          <li>Seleziona <strong>"Aggiungi a Home"</strong></li>
          <li>Conferma toccando <strong>"Aggiungi"</strong></li>
        </ol>
      </div>
    `,
  };

  // Crea overlay con istruzioni
  const overlay = document.createElement("div");
  overlay.id = "manual-install-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(10, 76, 154, 0.98);
    z-index: 100000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: fadeIn 0.3s ease;
  `;

  overlay.innerHTML = `
    ${instructions[platform]}
    <button id="close-manual-instructions" style="
      margin-top: 20px;
      background: white;
      color: #0a4c9a;
      border: none;
      padding: 12px 30px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    ">
      Ho capito
    </button>
  `;

  document.body.appendChild(overlay);

  document.getElementById("close-manual-instructions").onclick = () => {
    overlay.remove();
    installScreen.style.display = "none";
    localStorage.setItem("pwaInstalled", "true");
  };
}
