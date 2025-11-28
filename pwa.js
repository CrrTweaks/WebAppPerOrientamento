// pwa.js - Gestione Progressive Web App per I.I.S. G. Marconi

class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.hasShownPrompt = false;
    this.isAppInstalled = false;

    this.init();
  }

  init() {
    // Controlla se l'app è già installata
    this.checkIfAppInstalled();

    // Ascolta l'evento di installazione
    this.setupInstallListener();

    // Registra il service worker
    this.registerServiceWorker();
  }

  setupInstallListener() {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("PWA: beforeinstallprompt event fired");

      // Previene il prompt automatico del browser
      e.preventDefault();

      // Salva l'evento per usarlo dopo
      this.deferredPrompt = e;

      // Mostra il nostro prompt personalizzato solo su dispositivi mobili
      if (
        this.isMobileOrTablet() &&
        !this.hasShownPrompt &&
        !this.isAppInstalled
      ) {
        // Aspetta un po' prima di mostrare il prompt per una migliore UX
        setTimeout(() => {
          this.showInstallPrompt();
        }, 2000);
      }
    });
  }

  showInstallPrompt() {
    if (this.hasShownPrompt || this.isAppInstalled) return;

    console.log("PWA: Mostrando prompt di installazione");

    // Crea il modal di installazione
    const installModal = document.createElement("div");
    installModal.id = "pwa-install-modal";
    installModal.innerHTML = this.getInstallModalHTML();

    document.body.appendChild(installModal);

    // Gestione click sui pulsanti
    document
      .getElementById("pwa-install-confirm")
      .addEventListener("click", () => {
        this.installApp();
      });

    document
      .getElementById("pwa-install-cancel")
      .addEventListener("click", () => {
        this.hideInstallPrompt();
        // Salva nelle preferenze utente per non mostrare più
        this.setUserPreference("pwaPromptShown", true);
      });

    // Chiudi il modal cliccando sullo sfondo
    installModal.addEventListener("click", (e) => {
      if (e.target.id === "pwa-install-modal") {
        this.hideInstallPrompt();
        this.setUserPreference("pwaPromptShown", true);
      }
    });

    this.hasShownPrompt = true;
  }

  getInstallModalHTML() {
    return `
            <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[99999] p-4 animate-fadeIn">
                <div class="bg-white rounded-3xl p-6 max-w-md w-full transform transition-all duration-300 scale-95 animate-scaleIn">
                    <div class="flex justify-center mb-4">
                        <div class="text-6xl bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-2xl">📱</div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-3 text-center">Installa l'App Marconi</h3>
                    <p class="text-gray-600 mb-6 text-center leading-relaxed">
                        Aggiungi l'app alla schermata home per un accesso più rapido, 
                        esperienza fullscreen e funzionalità offline!
                    </p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="text-green-500 text-lg">✓</span>
                            <span>Apertura immediata come app nativa</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="text-green-500 text-lg">✓</span>
                            <span>Funziona anche offline</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm text-gray-700">
                            <span class="text-green-500 text-lg">✓</span>
                            <span>Nessun download dall'app store</span>
                        </div>
                    </div>
                    
                    <div class="flex gap-3">
                        <button id="pwa-install-cancel" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition active:scale-95">
                            Continua sul Web
                        </button>
                        <button id="pwa-install-confirm" class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition active:scale-95 shadow-lg">
                            Installa App
                        </button>
                    </div>
                    
                    <p class="text-xs text-gray-400 text-center mt-4">
                        Gratuita • Nessuno spazio di archiviazione
                    </p>
                </div>
            </div>
        `;
  }

  installApp() {
    if (!this.deferredPrompt) {
      console.log("PWA: deferredPrompt non disponibile");
      return;
    }

    console.log("PWA: Avviando installazione");

    // Mostra il prompt di installazione del browser
    this.deferredPrompt.prompt();

    // Aspetta che l'utente risponda al prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA: Utente ha accettato l'installazione");
        this.trackInstallation("accepted");
      } else {
        console.log("PWA: Utente ha rifiutato l'installazione");
        this.trackInstallation("dismissed");
      }

      this.deferredPrompt = null;
      this.hideInstallPrompt();
    });
  }

  hideInstallPrompt() {
    const installModal = document.getElementById("pwa-install-modal");
    if (installModal) {
      installModal.style.opacity = "0";
      installModal.style.transform = "scale(0.9)";

      setTimeout(() => {
        if (installModal.parentNode) {
          installModal.parentNode.removeChild(installModal);
        }
      }, 300);
    }
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Usa path relativo per il service worker
        navigator.serviceWorker
          .register("./service-worker.js")
          .then((registration) => {
            console.log(
              "PWA: ServiceWorker registrato con successo:",
              registration.scope
            );
          })
          .catch((error) => {
            console.log("PWA: Registrazione ServiceWorker fallita:", error);
          });
      });
    }
  }

  checkIfAppInstalled() {
    // Controlla se l'app è già installata
    if (window.matchMedia("(display-mode: standalone)").matches) {
      this.isAppInstalled = true;
      console.log("PWA: App già installata in modalità standalone");
    }

    // Ascolta quando l'app viene installata
    window.addEventListener("appinstalled", (evt) => {
      this.isAppInstalled = true;
      console.log("PWA: App installata con successo!");
      this.trackInstallation("installed");
    });
  }

  isMobileOrTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(
      userAgent
    );

    const screenWidth = window.innerWidth;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    return isMobile || isTablet || (screenWidth <= 1024 && isTouchDevice);
  }

  getUserPreference(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  setUserPreference(key, value) {
    try {
      localStorage.setItem(key, value.toString());
    } catch (e) {
      console.log("PWA: Impossibile salvare preferenze");
    }
  }

  trackInstallation(action) {
    // Qui puoi aggiungere analytics per tracciare le installazioni
    console.log(`PWA: Tracking installation - ${action}`);

    // Esempio con Google Analytics (se presente)
    if (typeof gtag !== "undefined") {
      gtag("event", "pwa_install", {
        event_category: "PWA",
        event_label: action,
      });
    }
  }

  // Metodo per mostrare manualmente il prompt (puoi chiamarlo da altri script)
  showManualInstallPrompt() {
    if (this.deferredPrompt && !this.isAppInstalled) {
      this.showInstallPrompt();
    } else {
      console.log("PWA: Installazione non disponibile");
      this.showInstallInstructions();
    }
  }

  showInstallInstructions() {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);

    let instructions = "";

    if (isIOS) {
      instructions = `
                <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                    <h4 class="font-semibold text-yellow-800 mb-2">Per installare su iOS:</h4>
                    <ol class="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                        <li>Tocca il pulsante "Condividi" 📤</li>
                        <li>Scorri verso il basso e seleziona "Aggiungi alla schermata Home"</li>
                        <li>Conferma con "Aggiungi" nell'angolo in alto a destra</li>
                    </ol>
                </div>
            `;
    } else if (isAndroid) {
      instructions = `
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <h4 class="font-semibold text-blue-800 mb-2">Per installare su Android:</h4>
                    <ol class="text-sm text-blue-700 list-decimal list-inside space-y-1">
                        <li>Tocca il menu (tre puntini) in alto a destra</li>
                        <li>Seleziona "Aggiungi alla schermata Home"</li>
                        <li>Conferma l'installazione</li>
                    </ol>
                </div>
            `;
    } else {
      instructions = `
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                    <h4 class="font-semibold text-gray-800 mb-2">Per installare l'app:</h4>
                    <p class="text-sm text-gray-700">Cerca l'opzione "Installa app" o "Aggiungi alla schermata Home" nel menu del tuo browser.</p>
                </div>
            `;
    }

    // Mostra le istruzioni in un toast o modal
    this.showToast(instructions, 8000);
  }

  showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.innerHTML = `
            <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-4 rounded-xl shadow-lg z-[99999] max-w-md animate-fadeInUp">
                ${message}
            </div>
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 20px)";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
}

// Inizializza PWA quando il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
  window.marconiPWA = new PWAInstaller();
});

// Esporta la classe per uso in moduli (se usi ES6 modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = PWAInstaller;
}
