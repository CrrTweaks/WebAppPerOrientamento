// Panellum full screen con scene e hotspot
let fullViewer;
const panoramas = {
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
        text: "Vai Al Laboratorio boh",
        sceneId: "",
      },
      {
        pitch: -7,
        yaw: -96,
        type: "scene",
        text: "Vai Al Laboratorio Morrone",
        sceneId: "",
      },
      {
        pitch: -3,
        yaw: -152,
        type: "scene",
        text: "Vai Al Ingresso",
        sceneId: "ingresso_Lab",
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
  ingresso_Lab: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/CorridoiLabTriennio/CorridoioLabSotto1.jpg",
    hotSpots: [
      {
        pitch: -3,
        yaw: 595,
        type: "scene",
        text: "Avanza",
        sceneId: "CorridoioLabSotto2",
      },
    ],
  },
  Esterno: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/PrincipaleTriennio/EntrataPrincipale.JPG",
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
  Ingresso: {
    type: "equirectangular",
    panorama: "/img/fotoPanoramiche/triennio/PrincipaleTriennio/Ingresso.JPG",
    hotSpots: [
      { pitch: 1, yaw: 200, type: "scene", text: "Esci", sceneId: "Esterno" },
    ],
  },
};

function loadPanoramaFull(sceneId) {
  document.getElementById("panorama-full").classList.remove("hidden");
  if (fullViewer) fullViewer.destroy();
  fullViewer = pannellum.viewer("panorama-container-full", {
    default: { firstScene: sceneId, sceneFadeDuration: 800 },
    autoLoad: true,
    scenes: panoramas,
  });
}

function closePanorama() {
  if (fullViewer) {
    fullViewer.destroy();
    fullViewer = null;
  }
  document.getElementById("panorama-full").classList.add("hidden");
}
