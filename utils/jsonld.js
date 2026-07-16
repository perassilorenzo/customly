import { getCustomizer, getAllCustomizers } from "../data/customizers.js";

const SITE = "https://customly.it";

function buildItemList(all) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Customizer italiani — Customly",
    description:
      "Directory dei customizer italiani per abbigliamento personalizzato.",
    url: SITE + "/customizers",
    numberOfItems: all.length,
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: SITE + "/customizers/" + c.id,
      name: c.name,
      description: c.tagline,
    })),
  };
}

function getJsonLd(path) {
  const all = getAllCustomizers();

  const home = [
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
        sameAs: [
          "https://instagram.com/diario_di_uno_09",
          "https://tiktok.com/@diario_di_uno_09",
          "https://github.com/perassilorenzo",
          "https://www.linkedin.com/in/perassilorenzo",
        ],
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/OnlineOnly",
        validFrom: "2025-01-01",
      },
      featureList: [
        "Configuratore visivo SVG",
        "Profili customizer con portfolio",
        "Ricerca per stile, città e tecnica",
        "Invio progetti strutturati",
      ],
      screenshot: SITE + "/assets/wallpaper.jpg",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "1",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Customly",
      url: SITE,
      logo: SITE + "/assets/wallpaper.jpg",
      description:
        "Piattaforma italiana che connette clienti e customizer indipendenti per creare abbigliamento personalizzato.",
      founder: {
        "@type": "Person",
        name: "Lorenzo Perassi",
        url: "https://perassilorenzo.github.io/portfolio",
      },
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IT",
        addressRegion: "Piemonte",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "44.5564",
        longitude: "7.4091",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Italian",
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
        logo: SITE + "/assets/wallpaper.jpg",
      },
      inLanguage: "it",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: SITE + "/customizers?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
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
        {
          "@type": "Question",
          name: "Quanto costa usare Customly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La piattaforma è gratuita per i clienti. I customizer pagano una commissione solo sulle collaborazioni avviate attraverso la piattaforma.",
          },
        },
        {
          "@type": "Question",
          name: "Posso diventare customizer su Customly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì. Puoi candidarti compilando il modulo di attesa. Customly seleziona manualmente i primi customizer in base alla qualità del lavoro e alla coerenza con lo stile della piattaforma.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE,
        },
      ],
    },
    buildItemList(all),
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Come personalizzare un capo con Customly",
      description:
        "Scopri come configurare e ordinare un capo personalizzato attraverso la piattaforma Customly.",
      step: [
        {
          "@type": "HowToStep",
          name: "Scegli il customizer",
          text: "Esplora i profili dei customizer italiani e scegli il professionista più adatto al tuo stile.",
          url: SITE + "/customizers",
        },
        {
          "@type": "HowToStep",
          name: "Configura il capo",
          text: "Usa il configuratore visivo per scegliere modello, colore, modifiche e dettagli personalizzati.",
          url: SITE + "/configuratore",
        },
        {
          "@type": "HowToStep",
          name: "Invia il progetto",
          text: "Rivedi l'anteprima e invia la richiesta direttamente al customizer scelto.",
        },
        {
          "@type": "HowToStep",
          name: "Collabora e ricevi",
          text: "Il customizer ti contatterà per preventivare e realizzare il capo su misura.",
        },
      ],
      totalTime: "P7D",
    },
  ];

  const customizers = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Customizer italiani — Customly",
      description:
        "Directory dei customizer italiani. Trova artisti e artigiani della custom fashion.",
      url: SITE + "/customizers",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: all.length,
        itemListElement: all.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: SITE + "/customizers/" + c.id,
          name: c.name,
          description: c.tagline,
          image: c.image || undefined,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Customizer",
          item: SITE + "/customizers",
        },
      ],
    },
  ];

  const routes = { "/": home, "/customizers": customizers };
  return routes[path] || [];
}

function getCreatorJsonLd(id) {
  const c = getCustomizer(id);
  if (!c)
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Customizer non trovato — Customly",
      },
    ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: c.name + " — Customizer su Customly",
      description: c.tagline + " " + (c.bio || "").slice(0, 160),
      url: SITE + "/customizers/" + id,
      dateModified: new Date().toISOString().split("T")[0],
      mainEntity: {
        "@type": "Person",
        name: c.name,
        description: c.bio,
        image: c.image || undefined,
        url: SITE + "/customizers/" + id,
        address: {
          "@type": "PostalAddress",
          addressLocality: c.city || "",
          addressRegion: c.region || "",
          addressCountry: c.country || "IT",
        },
        geo: c.city
          ? {
              "@type": "GeoCoordinates",
              address:
                c.city +
                ", " +
                (c.region || "") +
                ", " +
                (c.country || "Italia"),
            }
          : undefined,
        knowsAbout: c.techniques || [],
        hasSkill: c.skills || [],
        jobTitle: c.category || "Customizer",
        worksFor: {
          "@type": "Organization",
          name: "Customly",
          url: SITE,
        },
        sameAs: Object.values(c.links || {}).filter(Boolean),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Customizer",
          item: SITE + "/customizers",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: c.name,
          item: SITE + "/customizers/" + id,
        },
      ],
    },
  ];

  if (c.services && c.services.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Servizi di " + c.name,
      description: "Servizi offerti da " + c.name + " su Customly",
      itemListElement: c.services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: {
            "@type": "Person",
            name: c.name,
          },
          areaServed: {
            "@type": "Country",
            name: "IT",
          },
          offers: {
            "@type": "Offer",
            price: s.price || "Su richiesta",
            priceCurrency: "EUR",
          },
        },
      })),
    });
  }

  if (c.products && c.products.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Prodotti di " + c.name,
      itemListElement: c.products
        .filter((p) => p.status === "available")
        .map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: p.image || undefined,
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Person",
                name: c.name,
              },
            },
          },
        })),
    });
  }

  if (c.reviews && c.reviews.length) {
    const ratings = c.reviews.map((r) => r.rating);
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      name: c.name,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avg.toFixed(1),
        reviewCount: c.reviews.length,
        bestRating: "5",
        worstRating: "1",
      },
      review: c.reviews.map((r) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: r.name,
        },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: "5",
          worstRating: "1",
        },
      })),
    });
  }

  if (c.process && c.process.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Come lavora " + c.name,
      description:
        "Il processo creativo di " +
        c.name +
        ": dalla consegna del capo alla consegna finale.",
      step: c.process.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.description,
      })),
      totalTime: "P14D",
    });
  }

  if (c.portfolio && c.portfolio.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Portfolio di " + c.name,
      description: "Lavori e progetti realizzati da " + c.name,
      itemListElement: c.portfolio.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          description: p.description,
          image: p.images && p.images.length ? p.images[0] : undefined,
          keywords: (p.techniques || []).join(", "),
          creator: {
            "@type": "Person",
            name: c.name,
          },
        },
      })),
    });
  }

  return schemas;
}

export function applyJsonLd(path) {
  document.querySelectorAll("script[data-jsonld]").forEach((s) => s.remove());

  let schemas;
  if (path.startsWith("/customizers/")) {
    const id = path.split("/customizers/")[1];
    schemas = id ? getCreatorJsonLd(id) : [];
  } else {
    schemas = getJsonLd(path);
  }

  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-jsonld", "");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
