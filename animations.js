/* animations.js
   Sostituisce/estende setState per aggiungere transizioni fade+slide
   Deve essere incluso DOPO Script.js (che definisce la setState originale).
*/

/* Configurazione timing */
const PT_DURATION = 380; // ms, deve corrispondere a --ui-duration in CSS (360-380 ok)

/* Conserva il riferimento alla eventuale precedente setState (se definita) */
const _previousSetState = window.setState || null;

/* Funzione helper per animare il titolo mobile */
function animateMobileTitle(newText) {
  const headerTitle = document.getElementById('mobile-header-title');
  if (!headerTitle) return;
  headerTitle.classList.remove('title-fade-in');
  headerTitle.classList.add('title-fade-out');
  setTimeout(() => {
    headerTitle.textContent = newText;
    headerTitle.classList.remove('title-fade-out');
    headerTitle.classList.add('title-fade-in');
  }, 140);
}

/* New setState con animazioni */
function setState(page) {
  const target = document.getElementById('page-' + page);
  if (!target) {
    console.warn('setState: pagina non trovata ->', page);
    // fallback: chiama la precedente se presente
    if (_previousSetState) _previousSetState(page);
    return;
  }

  // Individua la pagina visibile (non-hidden). Supporta classi Tailwind 'hidden'
  const pages = Array.from(document.querySelectorAll('.page'));
  let current = pages.find(p => !p.classList.contains('hidden') && p !== target);

  // se la target è già visibile, aggiorniamo titolo e torniamo
  const targetIsVisible = !target.classList.contains('hidden');
  if (targetIsVisible) {
    animateMobileTitle((window.titles && window.titles[page]) || page || 'I.T.I. G. Marconi');
    // mantieni evidenziazione sidebar come fa navigateSidebar
    return;
  }

  // Funzione che mostra target con animazione in
  function showTarget() {
    // rimuovi hidden (Tailwind) e prepara per anim-in
    target.classList.remove('hidden');
    // rimuovi eventuali classi residue
    target.classList.remove('pt-anim-out', 'page-hidden', 'page-visible', 'pt-anim-in');
    target.classList.add('pt-anim-in');

    // Force reflow per assicurare transizione
    // eslint-disable-next-line no-unused-expressions
    target.offsetHeight;

    // Avvia animazione verso lo stato visibile
    target.classList.remove('pt-anim-in');
    target.classList.add('page-visible');

    // Dopo animazione: pulisci classi di transizione temporanea
    setTimeout(() => {
      target.classList.remove('pt-anim-in');
      target.classList.remove('pt-anim-out');
      target.classList.remove('page-hidden');
      target.classList.add('page-visible');
    }, PT_DURATION + 20);
  }

  // Se esiste current, animalo fuori, poi mostra target
  if (current) {
    // se current ha già la classe pt-anim-out non ripetere
    current.classList.remove('pt-anim-in', 'page-visible');
    current.classList.add('pt-anim-out');

    // After animation hide current (use timeout)
    setTimeout(() => {
      current.classList.add('hidden');
      current.classList.remove('pt-anim-out');
      current.classList.remove('page-visible');
      current.classList.add('page-hidden');

      // mostra il target
      showTarget();
    }, PT_DURATION);
  } else {
    // nessuna pagina corrente visibile (prima apertura) -> mostra direttamente target
    showTarget();
  }

  // Aggiorna il titolo mobile con animazione
  const titlesMap = {
    home: 'Home',
    virtual_tour: 'Virtual Tour',
    biennio_page: 'Biennio',
    triennio_page: 'Triennio',
    indirizzi_studio: 'Indirizzi di Studio',
    progetti: 'Progetti & Attività'
  };
  animateMobileTitle(titlesMap[page] || 'I.T.I. G. Marconi');

  // NOTE: la gestione della classe .sidebar-active la fa navigateSidebar()
  // se chiamata. Se vuoi che setState si occupi anche di highlight, puoi
  // attivarla qui (ma meglio lasciare a navigateSidebar).
}

/* Se desideri esporre la map dei titoli globalmente (opzionale) */
window.titles = {
  home: 'Home',
  virtual_tour: 'Virtual Tour',
  biennio_page: 'Biennio',
  triennio_page: 'Triennio',
  indirizzi_studio: 'Indirizzi di Studio',
  progetti: 'Progetti & Attività'
};

/* Se vuoi che navigateSidebar() usi questa nuova funzione senza cambiare altro,
   non fare nulla: navigateSidebar chiama setState(page) e userà questa versione. */

/* Piccolo miglioramento: intercetta il click sul mobile menu per chiudere overlay (se presente) */
(function attachMobileOverlay() {
  const mobileBtn = document.getElementById('mobile-menu-button');
  if (!mobileBtn) return;
  // aggiunge overlay element se non esiste (facoltativo)
  if (!document.getElementById('mobile-overlay')) {
    const ov = document.createElement('div');
    ov.id = 'mobile-overlay';
    ov.style.position = 'fixed';
    ov.style.inset = '0';
    ov.style.zIndex = '45';
    ov.style.background = 'rgba(2,6,23,0.45)';
    ov.style.pointerEvents = 'none';
    ov.style.opacity = '0';
    ov.style.transition = `opacity ${PT_DURATION}ms ease`;
    document.body.appendChild(ov);
  }
  const overlay = document.getElementById('mobile-overlay');

  mobileBtn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const isClosed = sidebar.classList.contains('-translate-x-full') || sidebar.classList.contains('sidebar-closed');
    if (isClosed) {
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
    } else {
      overlay.style.pointerEvents = 'none';
      overlay.style.opacity = '0';
    }
  });

  overlay.addEventListener('click', () => {
    // chiudi sidebar mobile (se usi -translate-x-full)
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.add('-translate-x-full');
    }
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
  });
})();