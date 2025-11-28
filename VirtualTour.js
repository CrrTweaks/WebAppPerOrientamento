// Panellum full screen con scene e hotspot
let fullViewer;
let currentAvatar = null;

let availableVoices = [];

console.log("start");

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
        yaw: -25,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Qui ci sono i laboratori informatici e di sistemi.",
            "Puoi esplorare ogni laboratorio cliccando sui punti.",
            "Muoviti liberamente per scoprire gli ambienti.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 0,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Stai percorrendo il corridoio dei laboratori del triennio.",
            "Da qui puoi scendere o proseguire verso altri laboratori.",
            "Scegli una direzione e continua il tour!",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -10,
        yaw: -40,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Sei nel piano inferiore dei laboratori.",
            "Qui trovi Informatica, Elettrotecnica, Progettazione e altri spazi tecnici.",
            "Entra nei laboratori e scopri cosa si studia nel triennio.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
    ],
  },
  laboratorio_sistemi: {
    type: "equirectangular",
    panorama:
      "/img/fotoPanoramiche/triennio/LaboratoriTriennio/LaboratorioSistemi.jpg",
    hotSpots: [
      {
        pitch: -15,
        yaw: 200,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo è il laboratorio di Sistemi!",
            "Qui si studiano reti, protocolli, domotica e automazione.",
            "Dai un’occhiata alle postazioni e agli strumenti utilizzati.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 145,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nel laboratorio di Informatica!",
            "Qui si programmano software, siti web e applicazioni.",
            "Guarda le postazioni e immagina cosa potresti creare!",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 110,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Ti trovi nel laboratorio di Telecomunicazioni.",
            "Qui si studiano antenne, onde radio, fibra ottica e reti mobili.",
            "Un ambiente perfetto per capire come viaggia l'informazione nel mondo.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: 45,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo laboratorio è dedicato ai sistemi elettrici.",
            "Qui si studiano impianti, circuiti e dispositivi elettronici.",
            "Esplora l'ambiente e osserva gli strumenti utilizzati dagli studenti.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 100,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo è il laboratorio di Elettrotecnica ed Elettronica.",
            "Qui si progettano circuiti, impianti e sistemi elettrici.",
            "Esplora le attrezzature e scopri come nascono i progetti!",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 130,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nell’area di Alta Tensione.",
            "Qui si effettuano prove e simulazioni su circuiti e trasformatori.",
            "Osserva le postazioni e gli strumenti per esperimenti avanzati!",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -18,
        yaw: 95,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nel laboratorio di Elettrotecnica.",
            "Qui gli studenti imparano a progettare circuiti e impianti elettrici.",
            "Esplora le postazioni per vedere i progetti in corso.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: 25,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo è il laboratorio di Progettazione Elettrotecnica.",
            "Qui si progettano e simulano impianti elettrici e sistemi complessi.",
            "Guarda i progetti e scopri come nascono le soluzioni tecniche!",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -10,
        yaw: -25,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nell’area laboratori del triennio!",
            "Qui trovi i laboratori tecnici della scuola.",
            "Entra e scopri cosa si studia e si realizza in ciascun laboratorio!",
          ];

          speakSequence(frasi, e.target);
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
        pitch: -10,
        yaw: -25,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto all'ingresso principale del triennio!",
            "Qui iniziano i percorsi dei laboratori e delle aule specialistiche.",
            "Esplora la scuola cliccando sui punti interattivi per saperne di più.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: -25,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo è il corridoio dei laboratori del biennio.",
            "Da qui puoi accedere ai laboratori di Fisica e Robotica.",
            "Segui i punti per esplorare ogni ambiente e conoscere le attività degli studenti.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: -30,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nel laboratorio di Robotica!",
            "Qui si progettano e programmano robot e automazioni meccaniche.",
            "Guarda i tavoli di lavoro: spesso qui nascono piccole macchine intelligenti.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: -7,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Ti trovi nel laboratorio di Fisica.",
            "Qui si sperimentano leggi del moto, ottica, energia e fenomeni scientifici reali.",
            "Gli studenti utilizzano strumenti di misura per trasformare la teoria in pratica.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: -13,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo è il corridoio che porta al laboratorio di Chimica.",
            "Gli studenti qui svolgono esperimenti con soluzioni, elementi e reazioni chimiche.",
            "Puoi entrare nel laboratorio per scoprirne attività e strumenti.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: -60,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nel laboratorio di Chimica!",
            "Qui si analizzano materiali, sostanze e reazioni chimiche in piena sicurezza.",
            "Sui banchi si svolgono esperienze pratiche con provette, beute e reagenti reali.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: 60,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo corridoio conduce al laboratorio informatico del biennio.",
            "Qui si muovono i primi passi nella programmazione e nell’uso avanzato del PC.",
            "Segui i punti per entrare e toccare con mano la tecnologia della scuola.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 50,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Ti trovi nel laboratorio di Informatica del biennio.",
            "Qui gli studenti imparano a utilizzare il computer, i software applicativi e le basi della programmazione.",
            "È il primo passo nel mondo digitale dell’istituto: esplora le postazioni attorno a te.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: 65,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto al corridoio dei laboratori scientifici avanzati.",
            "Qui trovi il laboratorio di scenze dedicato alle Scienze sperimentali.",
            "Segui i punti interattivi per esplorare ogni ambiente.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: -80,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo è il laboratorio di scenze, dedicato alle Scienze sperimentali.",
            "Gli studenti svolgono analisi, campioni biologici, osservazioni al microscopio.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -17,
        yaw: 80,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Questo corridoio conduce al laboratorio di Tecnologia.",
            "Gli studenti qui realizzano progetti pratici e tecnologici.",
            "Esplora le postazioni e scopri cosa si crea in questo laboratorio.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -15,
        yaw: 90,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto nel laboratorio di tecnologia!",
            "Qui si apprendono tecniche costruttive e pratiche di lavorazione dei materiali.",
            "Dai un’occhiata ai banchi da lavoro: spesso diventano luoghi di invenzione!",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -10,
        yaw: -25,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Benvenuto all’ingresso del biennio!",
            "Da qui puoi accedere a tutti i laboratori e alle aule del piano.",
            "Segui i punti interattivi per iniziare il tuo tour della scuola.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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
        pitch: -20,
        yaw: 0,
        type: "custom",
        cssClass: "avatarHotspot",
        createTooltipFunc: createAvatarHotspot,
        clickHandlerFunc: function (e) {
          const frasi = [
            "Sei nell’aula di educazione fisica.",
            "Qui si svolgono attività sportive e di movimento per tutti gli studenti.",
            "Osserva lo spazio e scopri le attrezzature disponibili per l’attività fisica.",
          ];

          speakSequence(frasi, e.target);
        },
      },
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

  fullViewer.on("scenechange", () => {
    clearVoiceQueue();
    window.sequenceActive = false;
    currentAvatar = null;
    speechLoopRunning = false;
    document.getElementById("speechBox").style.display = "none";
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
function createAvatarHotspot(hotSpotDiv, args) {
  const img = document.createElement("img");
  img.src = "AvatarPepper.png";
  hotSpotDiv.appendChild(img);

  // Mostra puntini subito all'ingresso della scena
  showTalkingDots(hotSpotDiv);
}

// Handler per il click sull'avatar
function handleAvatarClick(e, args) {
  const frasi = args || [];
  const hotSpotDiv = e.target.closest(".avatarHotspot") || e.target;

  if (window.sequenceActive) {
    return;
  }

  speakSequence(frasi, hotSpotDiv);
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

function speakSequence(sentences, hotspotDiv, index = 0) {
  if (!sentences || index >= sentences.length) {
    window.sequenceActive = false;
    currentAvatar = null;
    speechLoopRunning = false;
    document.getElementById("speechBox").style.display = "none";
    return;
  }

  window.sequenceActive = true;
  currentAvatar = hotspotDiv;
  speechLoopRunning = true;
  requestAnimationFrame(updateSpeechBoxPosition);

  const text = sentences[index];

  // Mostra testo nel box
  const box = document.getElementById("speechBox");
  box.innerHTML = "";
  const textNode = document.createElement("span");
  textNode.innerText = text;
  box.appendChild(textNode);
  box.style.display = "flex";

  // Usa ResponsiveVoice
  responsiveVoice.speak(text, "Italian Male", {
    rate: 0.95,
    pitch: 1.1,
    queue: false,
    onend: () => {
      // Passa alla frase successiva
      speakSequence(sentences, hotspotDiv, index + 1);
    },
  });
}

function showTalkingDots(hotspotDiv) {
  const box = document.getElementById("speechBox");
  currentAvatar = hotspotDiv;
  box.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dot.className = "speech-dot";
    box.appendChild(dot);
  }

  box.style.display = "flex";

  if (!speechLoopRunning) {
    speechLoopRunning = true;
    requestAnimationFrame(updateSpeechBoxPosition);
  }
}

function clearVoiceQueue() {
  speechSynthesis.cancel();
  responsiveVoice.cancel();
}
