// pwa.js - VERSIONE CORRETTA CON Z-INDEX PIÙ ALTO

class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.hasShownPrompt = false;
    this.isAppInstalled = false;

    console.log("PWA: Installer initialized");
    this.init();
  }

  init() {
    // Controlla se siamo su mobile/tablet E il blocco desktop non è visibile
    if (this.shouldInitializePWA()) {
      this.checkIfAppInstalled();
      this.setupInstallListener();
      this.registerServiceWorker();
    } else {
      console.log(
        "PWA: Skipping initialization - desktop device or block active"
      );
    }
  }

  shouldInitializePWA() {
    // Verifica se siamo su mobile/tablet
    const isMobileDevice = this.isMobileOrTablet();

    // Verifica se il blocco desktop è visibile
    const desktopBlock = document.getElementById("desktop-block");
    const isBlockVisible =
      desktopBlock && !desktopBlock.classList.contains("hidden");

    console.log(
      "PWA: Initialization check - Mobile:",
      isMobileDevice,
      "Block visible:",
      isBlockVisible
    );

    // Inizializza solo se siamo su mobile E il blocco non è visibile
    return isMobileDevice && !isBlockVisible;
  }

  setupInstallListener() {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("PWA: beforeinstallprompt event fired");

      e.preventDefault();
      this.deferredPrompt = e;

      // Mostra il prompt solo su dispositivi mobili e se il blocco non è attivo
      if (
        this.shouldInitializePWA() &&
        !this.hasShownPrompt &&
        !this.isAppInstalled
      ) {
        setTimeout(() => {
          this.showInstallPrompt();
        }, 3000);
      }
    });
  }

  showInstallPrompt() {
    if (this.hasShownPrompt || this.isAppInstalled) return;

    console.log("PWA: Showing install prompt");

    const installModal = document.createElement("div");
    installModal.id = "pwa-install-modal";
    installModal.innerHTML = this.getInstallModalHTML();

    document.body.appendChild(installModal);

    // AGGIUNGI QUESTA LINEA PER FORZARE Z-INDEX ALTO
    installModal.style.zIndex = "999999";

    document
      .getElementById("pwa-install-confirm")
      .addEventListener("click", () => {
        this.installApp();
      });

    document
      .getElementById("pwa-install-cancel")
      .addEventListener("click", () => {
        this.hideInstallPrompt();
        this.setUserPreference("pwaPromptShown", true);
      });

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
      <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999999] p-4 animate-fadeIn" style="z-index: 999999 !important;">
        <div class="bg-white rounded-3xl p-6 max-w-md w-full transform transition-all duration-300 scale-95 animate-scaleIn" style="z-index: 999999 !important;">
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
      console.log("PWA: deferredPrompt not available");
      return;
    }

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA: User accepted installation");
        this.trackInstallation("accepted");
      } else {
        console.log("PWA: User dismissed installation");
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
      setTimeout(() => {
        if (installModal.parentNode) {
          installModal.parentNode.removeChild(installModal);
        }
      }, 300);
    }
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("PWA: ServiceWorker registered:", registration.scope);
        })
        .catch((error) => {
          console.log("PWA: ServiceWorker registration failed:", error);
        });
    }
  }

  checkIfAppInstalled() {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      this.isAppInstalled = true;
      console.log("PWA: App already installed in standalone mode");
    }

    window.addEventListener("appinstalled", (evt) => {
      this.isAppInstalled = true;
      console.log("PWA: App installed successfully!");
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
      console.log("PWA: Cannot save preferences");
    }
  }

  trackInstallation(action) {
    console.log(`PWA: Tracking installation - ${action}`);
    if (typeof gtag !== "undefined") {
      gtag("event", "pwa_install", {
        event_category: "PWA",
        event_label: action,
      });
    }
  }

  // Metodo per mostrare manualmente il prompt
  showManualInstallPrompt() {
    if (this.deferredPrompt && !this.isAppInstalled) {
      this.showInstallPrompt();
      return true;
    }
    return false;
  }
}

// INIZIALIZZAZIONE MIGLIORATA
document.addEventListener("DOMContentLoaded", () => {
  console.log("PWA: DOM loaded, checking initialization...");

  // Aspetta che il blocco desktop sia processato
  setTimeout(() => {
    const desktopBlock = document.getElementById("desktop-block");
    const isBlockVisible =
      desktopBlock && !desktopBlock.classList.contains("hidden");

    if (!isBlockVisible) {
      window.marconiPWA = new PWAInstaller();
      console.log("PWA: Installer initialized successfully");
    } else {
      console.log("PWA: Skipping initialization - desktop block is active");
    }
  }, 1000);
});

// Aggiungi anche un listener per quando il blocco viene nascosto
document.addEventListener("DOMContentLoaded", function () {
  // Osserva i cambiamenti nel blocco desktop
  const desktopBlock = document.getElementById("desktop-block");
  if (desktopBlock) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
          const isBlockHidden = desktopBlock.classList.contains("hidden");
          if (isBlockHidden && !window.marconiPWA) {
            console.log("PWA: Desktop block hidden, initializing PWA");
            window.marconiPWA = new PWAInstaller();
          }
        }
      });
    });

    observer.observe(desktopBlock, { attributes: true });
  }
});
