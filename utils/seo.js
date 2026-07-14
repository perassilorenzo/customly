const SITE = "https://customly.it";
const DEFAULT_OG_IMAGE = SITE + "/assets/wallpaper.jpg";

const meta = {
  "/": {
    title: "Customly | Trova customizer e crea capi personalizzati",
    description:
      "Customly connette clienti e customizer indipendenti per creare abbigliamento personalizzato, unico e su misura. Trova il professionista giusto, configura il capo e avvia la collaborazione.",
    ogType: "website",
  },
  "/configuratore": {
    title: "Configuratore Customly | Progetta il tuo capo personalizzato",
    description:
      "Usa il configuratore Customly per scegliere modello, colore e modifiche. Preview SVG in tempo reale e invio diretto al customizer.",
    ogType: "website",
  },
  "/creator": {
    title:
      "Customizer italiani | Trova artisti e artigiani della custom fashion",
    description:
      "Esplora i profili dei customizer italiani. Portfolio, servizi, stili e recensioni per trovare il professionista giusto per il tuo progetto.",
    ogType: "website",
  },
  "/venditori": {
    title: "Per i professionisti | Customly",
    description:
      "Customly è la piattaforma per customizer, artigiani e brand che vogliono offrire personalizzazioni professionali senza caos.",
    ogType: "website",
  },
  "/contatti": {
    title: "Contatti | Customly",
    description:
      "Contattaci per candidarti come customizer, proporre un'idea o richiedere informazioni sulla piattaforma Customly.",
    ogType: "website",
  },
  "/terms": {
    title: "Termini e condizioni | Customly",
    description: "Termini e condizioni di utilizzo della piattaforma Customly.",
    ogType: "website",
  },
  "/privacy": {
    title: "Privacy Policy | Customly",
    description:
      "Informativa sul trattamento dei dati personali ai sensi del GDPR. Scopri come Customly protegge la tua privacy.",
    ogType: "website",
  },
};

function getCreatorMeta(id) {
  return {
    title: `${id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Customizer — Customly`,
    description: `Profilo del customizer su Customly. Scopri stile, competenze, portfolio e servizi offerti.`,
    ogType: "profile",
  };
}

function resolve(path) {
  if (meta[path]) return meta[path];
  if (path.startsWith("/creator/")) {
    const id = path.split("/creator/")[1];
    if (id) return getCreatorMeta(id);
  }
  return {
    title: "Customly | Custom fashion su misura",
    description:
      "Customly connette clienti e customizer indipendenti per creare abbigliamento personalizzato.",
    ogType: "website",
  };
}

function setTag(tag, attrs) {
  let el = document.querySelector(
    `meta[${Object.keys(attrs)[0]}="${Object.values(attrs)[0]}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  } else {
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }
}

export function applySeo(path) {
  const data = resolve(path);
  const url = SITE + path;

  document.title = data.title;

  setTag("name", { name: "description", content: data.description });
  setTag("property", { property: "og:title", content: data.title });
  setTag("property", { property: "og:description", content: data.description });
  setTag("property", { property: "og:url", content: url });
  setTag("property", { property: "og:type", content: data.ogType });
  setTag("property", { property: "og:site_name", content: "Customly" });
  setTag("property", { property: "og:image", content: DEFAULT_OG_IMAGE });
  setTag("property", { property: "og:locale", content: "it_IT" });

  setTag("name", { name: "twitter:card", content: "summary_large_image" });
  setTag("name", { name: "twitter:title", content: data.title });
  setTag("name", { name: "twitter:description", content: data.description });
  setTag("name", { name: "twitter:image", content: DEFAULT_OG_IMAGE });

  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}
