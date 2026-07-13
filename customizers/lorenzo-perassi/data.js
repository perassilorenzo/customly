export const customizer = {
  id: "lorenzo-perassi",
  name: "Lorenzo Perassi",
  tagline: "Sviluppatore di Customly.",
  bio: "Creo capi personalizzati attraverso rework, modifiche sartoriali e sperimentazione streetwear. Lavoro principalmente su denim e abbigliamento casual, trasformando capi esistenti in pezzi unici con un'identit\u00e0 propria.\n\nOgni progetto nasce da un'idea: un dettaglio, una modifica, un riferimento visivo o una semplice ispirazione. Parto dal capo originale e sviluppo una personalizzazione studiata insieme al cliente, curando stile, materiali e risultato finale.\n\nIl mio approccio unisce artigianato, creativit\u00e0 e recupero. Non realizzo produzioni in serie: ogni capo viene modificato per diventare qualcosa di personale e irripetibile.",
  image: "customizers/lorenzo-perassi/images/pfp.jpg",
  cover: "customizers/lorenzo-perassi/images/pfp-banner.png",
  city: "Saluzzo",
  region: "Piemonte",
  country: "Italia",
  category: "The Customizer",
  styles: ["Denim customization", "Rework", "Streetwear"],
  garments: ["Jeans", "T-Shirt", "Cargo"],
  techniques: [
    "Denim customization",
    "Cucito artigianale",
    "Upcycling",
    "Rework",
  ],
  skills: ["Denim customization", "Upcycling", "Rough cuts", "Flared jeans"],
  services: [
    {
      name: "Custom Jeans",
      description:
        "Modifica completa di jeans esistenti: tagli, inserti, flare, baggy ricostruiti, vita regolabile e molto altro.",
      price: "Da \u20ac50",
    },
    {
      name: "T-Shirt Rework",
      description:
        "Trasformazione di T-shirt con nodi, cuciture a vista, tagli, ricami e ricostruzioni creative.",
      price: "Da \u20ac25",
    },
    {
      name: "Denim Repair & Restyle",
      description:
        "Riparazione e restyling di capi denim danneggiati. Dare nuova vita ai tuoi jeans preferiti.",
      price: "Da \u20ac35",
    },
  ],
  availableForCustomization: [
    {
      item: "Flared Jeans",
      technique: "Inserti in tessuto contrast, cuciture a vista",
      image: null,
      garmentType: "jeans",
      basePrice: 30,
    },
  ],
  products: [
    {
      id: "lp-prod-1",
      name: "Camo Rework",
      image: "customizers/lorenzo-perassi/images/camo-rework-anteprima.jpg",
      gallery: [
        "customizers/lorenzo-perassi/images/camo-rework-1.MOV",
        "customizers/lorenzo-perassi/images/camo-rework-2.MOV",
        "customizers/lorenzo-perassi/images/camo-rework-3.MOV",
        "customizers/lorenzo-perassi/images/camo-rework-4.MOV",
        "customizers/lorenzo-perassi/images/camo-rework-5.MOV",
        "customizers/lorenzo-perassi/images/camo-rework-6.MOV",
        "customizers/lorenzo-perassi/images/camo-rework-7.MOV",
      ],
      description:
        "Pantaloni baggy marroni rovinati, rielaborati con inserti in tessuto camouflage. Tasche laterali in camo senza chiusura e allargamento del fondo per una forma pi\u00f9 ampia e definita.",
      popupDescription:
        "Pantaloni marroni con usura naturale, completamente rielaborati. Sul retro ho applicato del tessuto camo strappato che ho ricucito con cuciture a vista. Il fondo \u00e8 stato allargato per dare una forma baggy pi\u00f9 marcata, e sulle fiancate ho aggiunto due tasche aperte in tessuto camo. Ogni dettaglio \u00e8 fatto a mano, niente \u00e8 perfetto e niente \u00e8 uguale.",
      details:
        "Tessuto: cotone marrone con usura naturale + tessuto camo. Taglia: M. Lavorazioni: inserti camo, allargamento fondo, tasche laterali aperte, cuciture a vista.",
      sizes: ["M"],
      price: 95,
      status: "available",
    },
  ],
  portfolio: [
    {
      title: "Distressed Raw Hem",
      description:
        "Servizio di modifica e personalizzazione denim. Accorciatura con finitura raw hem, cucitura di rinforzo ed effetto sfrangiato ottenuto manualmente per un risultato pulito, durevole e su misura.",
      images: [
        "customizers/lorenzo-perassi/images/fashion-distressed-raw-hem.jpg",
        "customizers/lorenzo-perassi/images/fashion-distressed-raw-hem-2.mov",
        "customizers/lorenzo-perassi/images/fashion-distressed-raw-hem-4.mov",
        "customizers/lorenzo-perassi/images/fashion-distressed-raw-hem-3.mov",
        "customizers/lorenzo-perassi/images/fashion-distressed-raw-hem-1.mov",
      ],
      techniques: ["Alteration", "Denim", "Raw Hem"],
    },
    {
      title: "Cropped Tee Alteration",
      description:
        "T-shirt accorciata con taglio netto e rifinitura cucita sul fondo per ottenere una vestibilita cropped pulita e strutturata.",
      images: [
        "customizers/lorenzo-perassi/images/fashion-cropped-tee.jpg",
        "customizers/lorenzo-perassi/images/fashion-cropped-tee.mov",
      ],
      techniques: ["Alteration", "T-Shirt", "Cropped Hem"],
    },
    {
      title: "Raw Edge Jorts",
      description:
        "Jorts rielaborati tramite rimozione dell'orlo originale senza aggiunta di cuciture di rinforzo, lasciando il bordo grezzo per ottenere un effetto sfrangiato naturale con fili bianchi a vista.",
      images: [
        "customizers/lorenzo-perassi/images/fashion-raw-edge-jorts.jpg",
        "customizers/lorenzo-perassi/images/fashion-raw-edge-jorts.mov",
      ],
      techniques: ["Alteration", "Jorts", "Raw Hem"],
    },
    {
      title: "Flared Denim Reconstruction",
      description:
        "Jeans rielaborati tramite inserimento di pannelli triangolari in tessuto grigio proveniente da una tuta, applicati sul fondo per allargare la silhouette e creare un effetto flared strutturato e contrastato.",
      images: [
        "customizers/lorenzo-perassi/images/fashion-flared-reconstruction.jpg",
        "customizers/lorenzo-perassi/images/fashion-flared-reconstruction.mov",
      ],
      techniques: ["Custom", "Jeans", "Flared Hem"],
    },
    {
      title: "Skinny Jeans Reconstruction",
      description:
        "Jeans skinny trasformati con inserti in denim chiaro sul fondo e patch in tessuto blu e rosso sulle ginocchia per un effetto ricostruito e contrastato.",
      images: [
        "customizers/lorenzo-perassi/images/fashion-skinny-reconstruction.jpg",
        "customizers/lorenzo-perassi/images/fashion-skinny-reconstruction.mov",
      ],
      techniques: ["Rework", "Jeans", "Multi Fabric"],
    },
    {
      title: "Skinny to Flared Transformation",
      description:
        "Jeans skinny convertiti in flared tramite inserimento di denim da un altro paio, ricostruendo completamente la silhouette.",
      images: [
        "customizers/lorenzo-perassi/images/fashion-skinny-to-flared.jpg",
        "customizers/lorenzo-perassi/images/fashion-skinny-to-flared.mov",
      ],
      techniques: ["Upcycling", "Jeans", "Skinny to Flare"],
    },
    {
      title: "CRYBU Collaboration",
      description:
        "Collaborazione creativa di fashion design e sartoria. Design, prototipazione e creazione delle camicie per gli investitori di CRYBU S.R.L.",
      images: ["customizers/lorenzo-perassi/images/crybu-design.png"],
      techniques: ["Fashion Design", "Prototipazione", "Produzione Sartoriale"],
    },
  ],
  process: [
    {
      title: "Idea",
      description:
        "Parliamo di cosa vuoi ottenere. Mi racconti la tua visione, il tuo stile e su quale capo vuoi lavorare. Qualsiasi idea \u00e8 benvenuta.",
    },
    {
      title: "Progetto",
      description:
        "Definiamo insieme modifiche, tessuti, tecniche e dettagli. Ogni progetto \u00e8 personalizzato e studiato per essere realizzabile.",
    },
    {
      title: "Personalizzazione",
      description:
        "Metto mano al capo. Tagli, cuciture, ricami, ricostruzioni \u2014 ogni passaggio \u00e8 fatto a mano con attenzione ai dettagli.",
    },
    {
      title: "Revisione",
      description:
        "Documento il lavoro in corso e ti mostro i progressi. Eventuali modifiche vengono discusse e applicate prima della finale.",
    },
    {
      title: "Consegna",
      description:
        "Il capo \u00e8 pronto. Lo ricevi a casa o ci vediamo di persona. Il tuo pezzo unico \u00e8 finalmente tuo.",
    },
  ],
  reviews: [
    {
      name: "Marco R.",
      rating: 5,
      text: "Lorenzo ha trasformato un mio vecchio jeans in un capo incredibile. Professionale, creativo e super disponibile. Consigliatissimo!",
      date: "2025-11-20",
    },
  ],
  links: {
    portfolio: "https://perassilorenzo.github.io/portfolio",
    instagram: "https://instagram.com/diario_di_uno_09",
    tiktok: "https://tiktok.com/@diario_di_uno_09",
    youtube: "https://youtube.com/@diario_di_uno_09",
    github: "https://github.com/perassilorenzo",
    linkedin: "https://www.linkedin.com/in/perassilorenzo",
    email: null,
  },
  availableForCommissions: true,
};
