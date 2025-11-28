let deferredPrompt;
const installScreen = document.getElementById("install-screen");
const installBtn = document.getElementById("installBtn");

// 🔹 Controllo se è mobile/tablet
function isMobile() {
  return /Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(
    navigator.userAgent
  );
}

// 🔹 Se non è mobile → non mostra l'overlay
if (!isMobile()) {
  installScreen.style.display = "none";
}

// 🔹 Se ha già visto o installato → non mostra più
if (localStorage.getItem("pwaInstalled")) {
  installScreen.style.display = "none";
}

// 🔹 Evento A2HS (Add To Home Screen)
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Mostra solo se mobile e prima volta
  if (isMobile() && !localStorage.getItem("pwaInstalled")) {
    installScreen.style.display = "flex";
  }
});

// 🔹 Click installa
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;
  if (choice.outcome === "accepted") {
    localStorage.setItem("pwaInstalled", true);
  }
  installScreen.style.display = "none";
});

// 🔹 Click "continua senza installare"
document.getElementById("closeInstall").onclick = () => {
  installScreen.style.display = "none";
  localStorage.setItem("pwaInstalled", true);
};
