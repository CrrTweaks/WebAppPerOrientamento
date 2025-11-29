let deferredPrompt;
const installUI = document.getElementById("install-pwa");
const installBtn = document.getElementById("installBtn");

// rilevare ios
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
}

// rileva safari su ios
function isSafariIOS() {
  const ua = navigator.userAgent.toLowerCase();
  return (
    isIOS() && /safari/i.test(ua) && !/chrome|crios|fxios|edgios/i.test(ua)
  );
}

// verificare installazione pwa
function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// android
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("✅ PWA installabile (Android/Desktop)!");
  e.preventDefault();
  deferredPrompt = e;

  //banner su non ios
  if (!isIOS()) {
    installUI.style.display = "flex";
  }
});

// banner su ios
window.addEventListener("DOMContentLoaded", () => {
  if (isIOS() && !isStandalone()) {
    console.log("✅ iOS rilevato - Mostra banner installazione");
    installUI.style.display = "flex";
  }
});

// INSTALLA
installBtn.addEventListener("click", () => {
  // iPhone NON Safari
  if (isIOS() && !isSafariIOS()) {
    const installContent = installUI.querySelector(".bg-white\\/10");

    installContent.innerHTML = `
      <div class="text-6xl mb-3">⚠️</div>
      <h2 class="text-3xl font-bold text-white mb-2">Apri con Safari</h2>
      <p class="text-blue-100 mb-4 leading-relaxed">
        Per installare questa app su iPhone, devi aprirla con <strong>Safari</strong>.
      </p>
      
      <div class="bg-white/10 rounded-xl p-4 mb-6">
        <p class="text-blue-100 text-sm mb-3">📋 Come fare:</p>
        <ol class="text-blue-100 text-left text-sm space-y-2 px-4">
          <li>1. Copia il link qui sotto</li>
          <li>2. Apri l'app <strong>Safari</strong></li>
          <li>3. Incolla l'indirizzo nella barra</li>
          <li>4. Premi "Installa ora"</li>
        </ol>
      </div>

      <button
        onclick="navigator.clipboard.writeText(window.location.href).then(() => { 
          this.textContent = '✅ Link copiato!'; 
          setTimeout(() => this.textContent = '📋 Copia di nuovo', 2000);
        })"
        class="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl text-lg transition mb-3 w-full"
      >
        📋 Copia link
      </button>

      <button
        onclick="document.getElementById('install-pwa').style.display='none'"
        class="px-6 py-3 bg-blue-600/50 hover:bg-blue-600 text-white font-semibold rounded-xl text-lg transition w-full"
      >
        Continua con questo browser
      </button>
    `;
    return;
  }

  // Safari e iOS
  if (isIOS() && isSafariIOS()) {
    const installContent = installUI.querySelector(".bg-white\\/10");

    installContent.innerHTML = `
      <div class="text-6xl mb-3">📱</div>
      <h2 class="text-3xl font-bold text-white mb-2">Come installare</h2>
      <p class="text-blue-100 mb-4 leading-relaxed">
        Segui questi semplici passaggi:
      </p>
      
      <ol class="text-blue-100 text-left mb-6 space-y-3 px-6">
        <li class="flex items-start gap-2">
          <span class="text-2xl">⬆️</span>
          <span>Premi il pulsante <strong>Condividi</strong> in basso</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-2xl">➕</span>
          <span>Scorri e tocca <strong>"Aggiungi a Home"</strong></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-2xl">✅</span>
          <span>Premi <strong>"Aggiungi"</strong> in alto a destra</span>
        </li>
      </ol>

      <button
        onclick="document.getElementById('install-pwa').style.display='none'"
        class="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl text-lg transition w-full"
      >
        Ho capito
      </button>

      <button
        onclick="document.getElementById('install-pwa').style.display='none'"
        class="mt-3 text-blue-200 underline hover:text-white text-sm block"
      >
        Continua senza installare
      </button>
    `;
    return;
  }

  // Android/Desktop
  if (!deferredPrompt) return;

  installUI.style.display = "none";
  deferredPrompt.prompt();

  deferredPrompt.userChoice.then((result) => {
    console.log(
      result.outcome === "accepted"
        ? "Utente ha installato l'app"
        : "Installazione rifiutata"
    );
    deferredPrompt = null;
  });
});

// Rileva installazione completata
window.addEventListener("appinstalled", () => {
  console.log("🎉 App installata!");
  installUI.style.display = "none";
});

// DEBUG
setTimeout(() => {
  if (!deferredPrompt && !isIOS()) {
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
