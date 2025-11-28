let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// Flag per tracciare se l'app è già installata
let isAppInstalled = false;
let eventFired = false;

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

// SOLUZIONE TEMPORANEA: Mostra il banner anche senza l'evento
setTimeout(() => {
  if (!eventFired && !isAppInstalled) {
    console.warn("⚠️ L'evento beforeinstallprompt non è stato lanciato");
    console.log(
      "📱 Mostro comunque il banner per permettere installazione manuale"
    );

    // Mostra il banner comunque
    installUI.style.display = "flex";

    // Modifica il bottone per dare istruzioni manuali
    const originalText = installBtn.textContent;
    installBtn.textContent = "➕ Come installare";

    installBtn.onclick = () => {
      if (deferredPrompt) {
        // Se per qualche motivo l'evento è arrivato dopo
        installUI.style.display = "none";
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((result) => {
          console.log(
            result.outcome === "accepted" ? "✅ Installata" : "❌ Rifiutata"
          );
          deferredPrompt = null;
        });
      } else {
        // Mostra istruzioni manuali
        showManualInstallInstructions();
      }
    };
  }
}, 2000); // Attendi 2 secondi

// Quando cliccano INSTALLA (se l'evento è disponibile)
window.addEventListener("beforeinstallprompt", () => {
  installBtn.onclick = () => {
    console.log("🖱️ Click su Installa");

    if (!deferredPrompt) {
      console.error("❌ deferredPrompt non disponibile");
      showManualInstallInstructions();
      return;
    }

    installUI.style.display = "none";
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((result) => {
      console.log(
        result.outcome === "accepted" ? "✅ Installata" : "❌ Rifiutata"
      );
      deferredPrompt = null;
    });
  };
});

// Funzione per mostrare istruzioni manuali
function showManualInstallInstructions() {
  const userAgent = navigator.userAgent.toLowerCase();
  let instructions = "";

  if (/android/i.test(userAgent)) {
    if (/chrome/i.test(userAgent)) {
      instructions = `
        <div class="text-center">
          <h3 class="text-xl font-bold mb-4">📱 Come installare su Chrome Android</h3>
          <ol class="text-left space-y-2 text-sm">
            <li>1️⃣ Tocca il menu (⋮) in alto a destra</li>
            <li>2️⃣ Seleziona "Installa app" o "Aggiungi a schermata Home"</li>
            <li>3️⃣ Conferma l'installazione</li>
          </ol>
          <button onclick="document.getElementById('install-pwa').style.display='none'" 
                  class="mt-6 px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold">
            Ho capito
          </button>
        </div>
      `;
    } else if (/brave/i.test(userAgent)) {
      instructions = `
        <div class="text-center">
          <h3 class="text-xl font-bold mb-4">🦁 Come installare su Brave Android</h3>
          <ol class="text-left space-y-2 text-sm">
            <li>1️⃣ Tocca il menu (⋮) in alto a destra</li>
            <li>2️⃣ Seleziona "Aggiungi a schermata Home"</li>
            <li>3️⃣ Conferma l'installazione</li>
          </ol>
          <button onclick="document.getElementById('install-pwa').style.display='none'" 
                  class="mt-6 px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold">
            Ho capito
          </button>
        </div>
      `;
    }
  } else {
    instructions = `
      <div class="text-center">
        <h3 class="text-xl font-bold mb-4">📱 Come installare questa app</h3>
        <p class="text-sm mb-4">Usa il menu del tuo browser per aggiungere questa app alla schermata Home</p>
        <button onclick="document.getElementById('install-pwa').style.display='none'" 
                class="mt-4 px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold">
          Ho capito
        </button>
      </div>
    `;
  }

  const content = installUI.querySelector("div > div");
  content.innerHTML = instructions;
}

// Rileva quando l'app viene installata
window.addEventListener("appinstalled", () => {
  console.log("🎊 App installata con successo!");
  isAppInstalled = true;
  installUI.style.display = "none";
});

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

console.log("💡 PWA script caricato con successo");
