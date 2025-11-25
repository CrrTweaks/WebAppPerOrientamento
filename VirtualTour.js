// Panellum full screen con scene e hotspot
let fullViewer;
let currentAvatar = null;

// Biennio e Triennio
const panoramas = {
  // Corridoi e laboratori Triennio
  CorridoioLabSopra2: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/CorridoiLabTriennio/CorridoioLabSopra2.jpg",
    autoLoad: true,
    hotSpots: [
      {
        pitch: -10,
        yaw: -109,
        type: "scene",
        text: "Vai al laboratorio sistemi",
        sceneId: "laboratorio_sistemi",
      },
      {
        pitch: -14,
        yaw: 43,
        type: "scene",
        text: "Vai al laboratorio informatica",
        sceneId: "laboratorio_informatica",
      },
      {
        pitch: -21,
        yaw: 114,
        type: "scene",
        text: "Vai al laboratorio telecomunicazioni",
        sceneId: "laboratorio_telecomunicazioni",
      },
      {
        pitch: -1,
        yaw: 12,
        type: "scene",
        text: "Vai al laboratorio sistemi elettrici",
        sceneId: "laboratorio_sistemi_eletrici",
      },
      {
        pitch: -2,
        yaw: -60,
        type: "scene",
        text: "Vai al Corridoio1",
        sceneId: "CorridoioLabSopra1",
      },
    ],
  },
  CorridoioLabSopra1: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/CorridoiLabTriennio/CorridoioLabSopra1.jpg",
    hotSpots: [
      {
        pitch: -13,
        yaw: -162,
        type: "scene",
        text: "Vai Giu",
        sceneId: "CorridoioLabSotto2",
      },
      {
        pitch: -14,
        yaw: 34,
        type: "scene",
        text: "Vai al Corridio2",
        sceneId: "CorridoioLabSopra2",
      },
      {
        pitch: 20,
        yaw: -20,
        createTooltipFunc: hotspotDiv,
        createTooltipArgs: "",
      },
    ],
  },
  CorridoioLabSotto2: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/CorridoiLabTriennio/CorridoioLabSotto2.jpg",
    hotSpots: [
      {
        pitch: -7,
        yaw: 27,
        type: "scene",
        text: "Vai Su",
        sceneId: "CorridoioLabSopra1",
      },
      {
        pitch: -4,
        yaw: 38,
        type: "scene",
        text: "Vai Al Laboratorio di Elettrotecnica ed Elettronica",
        sceneId: "laboratorio_Elettrotecnica_Elettronica",
      },
      {
        pitch: 3,
        yaw: 63,
        type: "scene",
        text: "Vai Al Laboratorio di Elettrotecnica",
        sceneId: "laboratorio_ElettroTecnica",
      },
      {
        pitch: -7,
        yaw: -10,
        type: "scene",
        text: "Vai Al Laboratorio di Proggettazione Elettrotecnica",
        sceneId: "Laboratorio_Progettazione_Elettrotecnica",
      },
      {
        pitch: -7,
        yaw: -96,
        type: "scene",
        text: "Vai Al Laboratorio Morrone",
        sceneId: "",
      },
      {
        pitch: -2,
        yaw: -153,
        type: "scene",
        text: "Torna all'ingresso dei laboratori",
        sceneId: "ingresso_Lab",
      },
      {
        pitch: 30,
        yaw: -10,
        createTooltipFunc: hotspotDiv,
        createTooltipArgs:
          "Qui troverai 4 laboratori specializzati. Ed la possibilità di salire al piano superiore.",
      },
    ],
  },
  laboratorio_sistemi: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LaboratorioSistemi.jpg",
    hotSpots: [
      {
        pitch: -7,
        yaw: 520,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSopra2",
      },
    ],
  },
  laboratorio_informatica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LaboratorioInformatica.jpg",
    hotSpots: [
      {
        pitch: -7,
        yaw: 590,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSopra2",
      },
    ],
  },
  laboratorio_telecomunicazioni: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LaboratorioTelecomunicazioni.jpg",
    hotSpots: [
      {
        pitch: -3,
        yaw: 68,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSopra2",
      },
    ],
  },
  laboratorio_sistemi_eletrici: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LaboratorioSistemiElettrici.jpg",
    hotSpots: [
      {
        pitch: -7,
        yaw: 75,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSopra2",
      },
    ],
  },
  laboratorio_Elettrotecnica_Elettronica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/laboratorioElettrotecnicaEdElettronica1.jpg",
    hotSpots: [
      {
        pitch: -7,
        yaw: 75,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSotto2",
      },
      {
        pitch: -7,
        yaw: -97,
        type: "scene",
        text: "Entra lab alta tensione",
        sceneId: "laboratorio_Elettrotecnica_Elettronica2",
      },
    ],
  },
  laboratorio_Elettrotecnica_Elettronica2: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/laboratorioElettrotecnicaEdElettronica2.jpg",
    hotSpots: [
      {
        pitch: -7,
        yaw: 95,
        type: "scene",
        text: "Esci",
        sceneId: "laboratorio_Elettrotecnica_Elettronica",
      },
    ],
  },
  laboratorio_ElettroTecnica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LabboratorioElettroTecnica.jpg",
    hotSpots: [
      {
        pitch: -3,
        yaw: -100,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSotto2",
      },
    ],
  },
  Laboratorio_Progettazione_Elettrotecnica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LaboratorioProgettazioneElettrotecnica.jpg",
    hotSpots: [
      {
        pitch: -3,
        yaw: 0,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabSotto2",
      },
    ],
  },
  ingresso_Lab: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/CorridoiLabTriennio/CorridoioLabSotto1.jpg",
    hotSpots: [
      {
        pitch: -1,
        yaw: -55,
        type: "scene",
        text: "Avanza",
        sceneId: "CorridoioLabSotto2",
      },
      {
        pitch: 0,
        yaw: 0,
        createTooltipFunc: hotspotDiv,
        createTooltipArgs:
          "Benvenuti nei laboratori del Triennio. Avanza per esplorarli!",
      },
      {
        pitch: -5,
        yaw: 30,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          showSpeech("benvenuti ai laboratori!", e.target);
        },
      },
    ],
  },

  // Ingresso Principale Triennio
  Entrata_Principale_Triennio: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/PrincipaleTriennio/EntrataPrincipale.jpg",
    autoLoad: true,
    hotSpots: [
      {
        pitch: 1,
        yaw: -18,
        type: "scene",
        text: "Vai all'Ingresso",
        sceneId: "Ingresso",
      },
    ],
  },

  // Ingresso Principale Biennio e corridoi e laboratori
  CorridoioLabFisicaRobotica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/CorridoiLabBiennio/CorridoioFisicaRobotica.jpg",
    hotSpots: [
      {
        pitch: -1,
        yaw: 52,
        type: "scene",
        text: "Entra nel laboratorio di Robotica",
        sceneId: "Laboratorio_Robotica",
      },
      {
        pitch: -1,
        yaw: -54,
        type: "scene",
        text: "Entra nel laboratorio di Fisica",
        sceneId: "Laboratorio_Fisica",
      },
      {
        pitch: -1,
        yaw: -87,
        type: "scene",
        text: "Avanza",
        sceneId: "CorridoioLabChimica",
      },
      {
        pitch: -1,
        yaw: 75,
        type: "scene",
        text: "Torna al ingresso principale",
        sceneId: "ingresso_Biennio",
      },
    ],
  },
  Laboratorio_Robotica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/LaboratorioRobotica.jpg",
    hotSpots: [
      {
        pitch: -9,
        yaw: 135,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabFisicaRobotica",
      },
    ],
  },
  Laboratorio_Fisica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/LaboratorioFisica.jpg",
    hotSpots: [
      {
        pitch: -6,
        yaw: 110,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabFisicaRobotica",
      },
    ],
  },
  CorridoioLabChimica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/CorridoiLabBiennio/CorridoioChimica.jpg",
    hotSpots: [
      {
        pitch: -1,
        yaw: 5,
        type: "scene",
        text: "Torna indietro",
        sceneId: "CorridoioLabFisicaRobotica",
      },
      {
        pitch: -10,
        yaw: -77,
        type: "scene",
        text: "Entra nel laboratorio di Chimica",
        sceneId: "Laboratorio_Chimica",
      },
    ],
  },
  Laboratorio_Chimica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/LaboratorioChimica.jpg",
    hotSpots: [
      {
        pitch: -6,
        yaw: -143,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabChimica",
      },
    ],
  },
  CorridoioLabInformatica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/CorridoiLabBiennio/CorridoioInformatica.jpg",
    hotSpots: [
      {
        pitch: -10,
        yaw: 20,
        type: "scene",
        text: "Entra nel laboratorio di Informatica",
        sceneId: "Laboratorio_Informatica",
      },
      {
        pitch: 0,
        yaw: 90,
        type: "scene",
        text: "Avanza",
        sceneId: "CorridoioLabCantarella",
      },
      {
        pitch: 0,
        yaw: -90,
        type: "scene",
        text: "Torna all ingresso principale",
        sceneId: "ingresso_Biennio",
      },
    ],
  },
  Laboratorio_Informatica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/LaboratorioInformatica.jpg",
    hotSpots: [
      {
        pitch: -5,
        yaw: 153,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabInformatica",
      },
    ],
  },
  CorridoioLabCantarella: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/CorridoiLabBiennio/CorridoioCantarella.jpg",
    hotSpots: [
      {
        pitch: -10,
        yaw: 3,
        type: "scene",
        text: "Entra nel laboratorio di Scenze",
        sceneId: "Laboratorio_Cantarella",
      },
      {
        pitch: -2,
        yaw: 85,
        type: "scene",
        text: "Avanza",
        sceneId: "CorridoioLabPagano",
      },
      {
        pitch: 0,
        yaw: -87,
        type: "scene",
        text: "Torna indietro",
        sceneId: "CorridoioLabInformatica",
      },
    ],
  },
  Laboratorio_Cantarella: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/LaboratorioCantarella.jpg",
    hotSpots: [
      {
        pitch: -5,
        yaw: -45,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabCantarella",
      },
    ],
  },
  CorridoioLabPagano: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/CorridoiLabBiennio/CorridoioPagano.jpg",
    hotSpots: [
      {
        pitch: -10,
        yaw: 40,
        type: "scene",
        text: "Entra nel laboratorio di Tecnologia",
        sceneId: "Laboratorio_Pagano",
      },
      {
        pitch: 0,
        yaw: -68,
        type: "scene",
        text: "Torna indietro",
        sceneId: "CorridoioLabCantarella",
      },
    ],
  },
  Laboratorio_Pagano: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/LaboratorioPagano.jpg",
    hotSpots: [
      {
        pitch: -2,
        yaw: 157,
        type: "scene",
        text: "Esci",
        sceneId: "CorridoioLabPagano",
      },
    ],
  },
  ingresso_Biennio: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/PrincipaleBiennio/IngressoBiennio.jpg",
    hotSpots: [
      {
        pitch: -2,
        yaw: 162,
        type: "scene",
        text: "Vai al lato sinistro dei corridoi",
        sceneId: "CorridoioLabFisicaRobotica",
      },
      {
        pitch: -2,
        yaw: 188,
        type: "scene",
        text: "Vai al lato destro dei corridoi",
        sceneId: "CorridoioLabInformatica",
      },
      {
        pitch: -2,
        yaw: 25,
        type: "scene",
        text: "Vai al l aula di educazione fisica",
        sceneId: "Aula_Educazione_Fisica",
      },
    ],
  },
  Aula_Educazione_Fisica: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/Biennio/LaboratoriBiennio/Aula_Educazione_Fisica.jpg",
    hotSpots: [
      {
        pitch: -5,
        yaw: 173,
        type: "scene",
        text: "Esci",
        sceneId: "ingresso_Biennio",
      },
    ],
  },
};

function loadPanoramaFull(sceneId) {
  document.getElementById("panorama-full").classList.remove("hidden");
  if (fullViewer) fullViewer.destroy();
  fullViewer = pannellum.viewer("panorama-container-full", {
    default: {
      firstScene: sceneId,
      sceneFadeDuration: 800,
      hfov: 90,
      minHfov: 60,
      maxHfov: 90,
    },
    autoLoad: true,
    scenes: panoramas,
  });

  fullViewer.on("animatefinished", updateSpeechBoxPosition);
  fullViewer.on("yawchange", updateSpeechBoxPosition);
  fullViewer.on("pitchchange", updateSpeechBoxPosition);
}

function closePanorama() {
  if (fullViewer) {
    fullViewer.destroy();
    fullViewer = null;
  }
  document.getElementById("panorama-full").classList.add("hidden");
}

function hotspotDiv(hotSpotDiv, args) {
  hotSpotDiv.classList.add("custom-tooltip");
  hotSpotDiv.innerHTML = args;
}

// CREAZIONE HOTSPOT AVATAR
function createAvatarHotspot(hotSpotDiv) {
  const img = document.createElement("img");
  img.src = "avatar.png";
  hotSpotDiv.appendChild(img);
}

let speechLoopRunning = false;

function updateSpeechBoxPosition() {
  if (!currentAvatar) {
    speechLoopRunning = false;
    return;
  }

  const box = document.getElementById("speechBox");
  const rect = currentAvatar.getBoundingClientRect();

  box.style.left = rect.left + rect.width / 2 - box.offsetWidth / 2 + "px";
  box.style.top = rect.top - 40 + "px";

  if (speechLoopRunning) requestAnimationFrame(updateSpeechBoxPosition);
}

function showSpeech(text, hotspotDiv) {
  currentAvatar = hotspotDiv;

  const box = document.getElementById("speechBox");
  box.innerText = text;
  box.style.display = "block";

  // Avvia audio
  speakText(text);

  // Avvia il loop se non è attivo
  if (!speechLoopRunning) {
    speechLoopRunning = true;
    requestAnimationFrame(updateSpeechBoxPosition);
  }

  setTimeout(() => {
    box.style.display = "none";
    currentAvatar = null;
    speechLoopRunning = false;
  }, 6000);
}

function speakText(text) {
  speechSynthesis.cancel();

  setTimeout(() => {
    const msg = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(msg);
  }, 50);
}
