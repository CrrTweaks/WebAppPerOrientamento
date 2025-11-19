console.log("Script.js loaded!");

// Navigazione pagine
function showPage(page) {
  // Nasconde tutte le pagine
  document
    .querySelectorAll(".page")
    .forEach((div) => div.classList.add("hidden"));

  // Mostra la pagina richiesta
  const pageElement = document.getElementById("page-" + page);
  if (pageElement) {
    pageElement.classList.remove("hidden");
  }

  // Aggiorna il titolo dell'header mobile in base alla pagina
  const titles = {
    home: "Home",
    virtual_tour: "Virtual Tour",
    biennio_page: "Sede Biennio",
    triennio_page: "Sede Triennio",
    indirizzi_studio: "Indirizzi di Studio",
    progetti: "Progetti & Attività",
    dove_siamo: "Dove siamo",
    social: "Social",
    sito_web: "Sito Web",
  };

  const title = titles[page] || "I.I.S. G. Marconi";
  updateMobileHeaderTitle(title);
}

// Sidebar mobile
const sidebar = document.getElementById("sidebar");
const mobileBtn = document.getElementById("mobile-menu-button");

if (mobileBtn) {
  mobileBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
}

function toggleSidebar(open) {
  if (!open) sidebar.classList.add("-translate-x-full");
}

// Sidebar con evidenziazione
function navigateSidebar(page) {
  // Mostra la pagina
  showPage(page);

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Salva la pagina corrente
  sessionStorage.setItem("currentPage", page);

  // Chiude la sidebar su mobile
  toggleSidebar(false);

  // Rimuove active da tutti i bottoni
  document.querySelectorAll(".sidebar-btn").forEach((btn) => {
    btn.classList.remove("sidebar-active");
  });

  // Aggiunge active al bottone selezionato
  const activeBtn = document.getElementById("btn-" + page);
  if (activeBtn) {
    activeBtn.classList.add("sidebar-active");
  }
}

// Header Title
function updateMobileHeaderTitle(title) {
  const headerTitle = document.getElementById("mobile-header-title");
  if (headerTitle) {
    headerTitle.textContent = title;
  }
}

// All'avvio della pagina
window.addEventListener("DOMContentLoaded", () => {
  const savedPage = sessionStorage.getItem("currentPage") || "home";
  const pageElement = document.getElementById("page-" + savedPage);
  navigateSidebar(pageElement ? savedPage : "home");
});

// compatibilità con VirtualTour.js e HTML che usano setState()
window.setState = showPage;
