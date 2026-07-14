const SITE = "https://customly.it";

const jsonLd = {
  "/": [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Customly",
      url: SITE,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      description:
        "Piattaforma italiana per trovare customizer e creare capi personalizzati. Configuratore visivo con preview SVG in tempo reale.",
      creator: {
        "@type": "Person",
        name: "Lorenzo Perassi",
        url: "https://perassilorenzo.github.io/portfolio",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Customly",
      url: SITE,
      description:
        "Piattaforma italiana che connette clienti e customizer indipendenti per creare abbigliamento personalizzato.",
      founder: {
        "@type": "Person",
        name: "Lorenzo Perassi",
      },
      sameAs: [
        "https://instagram.com/diario_di_uno_09",
        "https://tiktok.com/@diario_di_uno_09",
        "https://github.com/perassilorenzo",
        "https://www.linkedin.com/in/perassilorenzo",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Customly",
      url: SITE,
      description:
        "Piattaforma per la custom fashion. Trova un professionista, configura un capo, rendilo tuo.",
      publisher: {
        "@type": "Organization",
        name: "Customly",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Come funziona Customly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Customly mette in contatto clienti e customizer indipendenti. L'utente può scegliere un professionista, configurare un capo con il configuratore visivo e inviare una richiesta strutturata. Il customizer riceve il progetto completo e può valutare, preventivare e avviare la collaborazione.",
          },
        },
        {
          "@type": "Question",
          name: "Chi realizza il capo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ogni capo viene realizzato direttamente dal customizer scelto dal cliente. Customly fornisce gli strumenti per configurare e inviare il progetto, ma la realizzazione è affidata al professionista selezionato.",
          },
        },
        {
          "@type": "Question",
          name: "Customly gestisce i pagamenti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Customly mette in contatto cliente e customizer. Accordi, pagamenti e spedizioni vengono gestiti direttamente tra le parti.",
          },
        },
        {
          "@type": "Question",
          name: "Posso personalizzare un mio capo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, il cliente può inviare una richiesta per modificare un capo esistente secondo le possibilità offerte dal customizer. Il configuratore permette di scegliere tra diverse modifiche come crop, flared, stampe, ricami e altro.",
          },
        },
        {
          "@type": "Question",
          name: "Come trovo il customizer giusto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ogni customizer dispone di un profilo con stile, competenze, portfolio e lavori realizzati. Puoi cercare per nome, città, stile o tecnica e confrontare i profili prima di scegliere.",
          },
        },
      ],
    },
  ],
  "/creator": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Customizer italiani — Customly",
      description:
        "Directory dei customizer italiani. Trova artisti e artigiani della custom fashion.",
      url: SITE + "/creator",
    },
  ],
};

function getCreatorJsonLd(id) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: `${id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Customizer su Customly`,
      url: SITE + "/creator/" + id,
      mainEntity: {
        "@type": "Person",
        name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      },
    },
  ];
}

export function applyJsonLd(path) {
  document.querySelectorAll("script[data-jsonld]").forEach((s) => s.remove());

  let schemas = jsonLd[path] || [];
  if (path.startsWith("/creator/")) {
    const id = path.split("/creator/")[1];
    if (id) schemas = getCreatorJsonLd(id);
  }

  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-jsonld", "");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
