import { send } from "../utils/formspree.js";
import { getParams, navigate } from "../utils/router.js";
import { getCustomizer } from "../data/customizers.js";

const GARMENT_CATEGORIES = [
  { id: "maglia", label: "Maglia", desc: "Il capo base per eccellenza" },
  { id: "polo", label: "Polo", desc: "Eleganza e personalizzazione" },
  { id: "camicia", label: "Camicia", desc: "Stile classico da trasformare" },
  { id: "jeans", label: "Jeans", desc: "Denim come tela per il tuo stile" },
];

const GARMENT_TYPES = {
  maglia: [
    { id: "canotta", label: "Canotta" },
    { id: "manica-corta", label: "Manica corta" },
    { id: "manica-lunga", label: "Manica lunga" },
  ],
  polo: [
    { id: "canotta", label: "Canotta" },
    { id: "manica-corta", label: "Manica corta" },
    { id: "manica-lunga", label: "Manica lunga" },
  ],
  camicia: [
    { id: "canotta", label: "Canotta" },
    { id: "manica-corta", label: "Manica corta" },
    { id: "manica-lunga", label: "Manica lunga" },
  ],
};

const JEANS_MODELS = [
  { id: "skinny", label: "Skinny" },
  { id: "regular", label: "Regular" },
  { id: "baggy", label: "Baggy" },
  { id: "flared", label: "Flared" },
];

const CUSTOMIZATIONS = {
  maglia: {
    "manica-lunga": [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/maglia-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/maglia-crop-netto.jpg",
        needsFabric: false,
      },
      {
        id: "accorcia-maniche",
        label: "Accorcia maniche",
        desc: "Riduci la lunghezza delle maniche.",
        price: 8,
        image: "assets/modifications/maglia-accorcia-maniche.jpg",
        needsFabric: false,
      },
      {
        id: "canotta-taglio-netto",
        label: "Trasforma in canotta con taglio netto",
        desc: "Converti in canotta con taglio netto sulle maniche.",
        price: 12,
        image: "assets/modifications/maglia-canotta-netto.jpg",
        needsFabric: false,
      },
    ],
    "manica-corta": [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/maglia-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/maglia-crop-netto.jpg",
        needsFabric: false,
      },
    ],
    canotta: [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/maglia-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/maglia-crop-netto.jpg",
        needsFabric: false,
      },
    ],
  },
  polo: {
    "manica-lunga": [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/polo-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/polo-crop-netto.jpg",
        needsFabric: false,
      },
      {
        id: "accorcia-maniche",
        label: "Accorcia maniche",
        desc: "Riduci la lunghezza delle maniche.",
        price: 8,
        image: "assets/modifications/polo-accorcia-maniche.jpg",
        needsFabric: false,
      },
      {
        id: "canotta-taglio-netto",
        label: "Trasforma in canotta con taglio netto",
        desc: "Converti in canotta con taglio netto sulle maniche.",
        price: 12,
        image: "assets/modifications/polo-canotta-netto.jpg",
        needsFabric: false,
      },
    ],
    "manica-corta": [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/polo-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/polo-crop-netto.jpg",
        needsFabric: false,
      },
    ],
    canotta: [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/polo-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/polo-crop-netto.jpg",
        needsFabric: false,
      },
    ],
  },
  camicia: {
    "manica-lunga": [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/camicia-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/camicia-crop-netto.jpg",
        needsFabric: false,
      },
      {
        id: "accorcia-maniche",
        label: "Accorcia maniche",
        desc: "Riduci la lunghezza delle maniche.",
        price: 8,
        image: "assets/modifications/camicia-accorcia-maniche.jpg",
        needsFabric: false,
      },
      {
        id: "canotta-taglio-netto",
        label: "Trasforma in canotta con taglio netto",
        desc: "Converti in canotta con taglio netto sulle maniche.",
        price: 12,
        image: "assets/modifications/camicia-canotta-netto.jpg",
        needsFabric: false,
      },
    ],
    "manica-corta": [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/camicia-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/camicia-crop-netto.jpg",
        needsFabric: false,
      },
    ],
    canotta: [
      {
        id: "crop-con-orlo",
        label: "Crop con orlo",
        desc: "Accorciamento con orlo finito e cucito.",
        price: 10,
        group: "crop",
        image: "assets/modifications/camicia-crop-orlo.jpg",
        needsFabric: false,
      },
      {
        id: "crop-taglio-netto",
        label: "Crop con taglio netto",
        desc: "Accorciamento con taglio netto, senza orlo.",
        price: 12,
        group: "crop",
        image: "assets/modifications/camicia-crop-netto.jpg",
        needsFabric: false,
      },
    ],
  },
  jeans: {
    _all: [
      {
        id: "fondo-raw-hem",
        label: "Togliere orlo (Raw Hem)",
        desc: "Rimuovi l'orlo per un look grezzo e naturale.",
        price: 5,
        group: "fondo",
        image: "assets/modifications/jeans-raw-hem.jpg",
        needsFabric: false,
      },
      {
        id: "fondo-allargare",
        label: "Allargare il fondo",
        desc: "Inserisci pannelli per allargare il fondo della gamba.",
        price: 15,
        group: "fondo",
        image: "assets/modifications/jeans-fondo-allargare.jpg",
        needsFabric: true,
      },
      {
        id: "fondo-allargare-interno",
        label: "Allargare il fondo dall'interno",
        desc: "Allargamento dal retro con inserimento tessuto interno.",
        price: 18,
        group: "fondo",
        image: "assets/modifications/jeans-fondo-interno.jpg",
        needsFabric: true,
      },
      {
        id: "accorcia-taglio-netto",
        label: "Accorciare con taglio netto",
        desc: "Accorcia con taglio netto lasciando fili bianchi visibili, senza orlo.",
        price: 8,
        image: "assets/modifications/jeans-accorcia-netto.jpg",
        needsFabric: false,
      },
      {
        id: "allargare-vestibilita",
        label: "Allargare vestibilità",
        desc: "Allarga leggermente tutto il pantalone dall'esterno.",
        price: 15,
        image: "assets/modifications/jeans-vestibilita.jpg",
        needsFabric: true,
      },
      {
        id: "copri-buchi",
        label: "Coprire buchi",
        desc: "Ripara e copri i buchi con patch di tessuto.",
        price: 10,
        image: "assets/modifications/jeans-copri-buchi.jpg",
        needsFabric: true,
      },
      {
        id: "ripara-tagli",
        label: "Riparare tagli",
        desc: "Cuci e rinforza i tagli esistenti.",
        price: 12,
        image: "assets/modifications/jeans-ripara-tagli.jpg",
        needsFabric: false,
      },
    ],
  },
};

const FABRIC_OPTIONS = [
  { id: "denim", label: "Jeans/Denim" },
  { id: "camo", label: "Camo" },
  { id: "tuta", label: "Tuta" },
  { id: "altro", label: "Altro" },
];

function initState() {
  return {
    step: "start",
    creator: null,
    basePrice: 0,
    hasGarment: null,
    garmentCategory: null,
    garmentType: null,
    jeansModel: null,
    brand: "",
    customizations: [],
    form: {
      name: "",
      surname: "",
      email: "",
      instagram: "",
      phone: "",
      notes: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
    submitting: false,
    submittedOk: false,
    modal: null,
  };
}

let s;

export function renderConfiguratore() {
  return `
<div class="page">
  <div class="container">
    <div id="configuratore-root"></div>
  </div>
</div>`;
}

function render() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;

  if (!root.querySelector(".cfg-layout")) {
    const ci = s.creator ? getCustomizer(s.creator) : null;
    root.innerHTML = `
    <div class="cfg-layout">
      <div class="cfg-main">
        ${
          ci
            ? `
        <div class="cfg-creator-badge">
          <div class="cfg-creator-badge-avatar">${ci.name.charAt(0)}</div>
          <div class="cfg-creator-badge-info">
            <span class="cfg-creator-badge-label">Customizer</span>
            <span class="cfg-creator-badge-name">${ci.name}</span>
          </div>
        </div>`
            : ""
        }
        <div class="cfg-progress" id="cfg-progress"></div>
        <div id="cfg-step-content"></div>
      </div>
      <div class="cfg-sidebar" id="cfg-sidebar"></div>
    </div>`;
    listen();
  }

  const sidebar = document.getElementById("cfg-sidebar");
  const progress = document.getElementById("cfg-progress");
  if (s.submittedOk) {
    if (sidebar) sidebar.style.display = "none";
    if (progress) progress.style.display = "none";
  } else {
    if (sidebar) sidebar.style.display = "";
    if (progress) progress.style.display = "";
  }
  updateProgress();
  renderStep();
  renderModal();
  updateSidebar();
}

function renderStep() {
  const el = document.getElementById("cfg-step-content");
  if (!el) return;
  el.innerHTML = renderCurrentStep();
}

function renderCurrentStep() {
  if (s.submittedOk) return renderDone();
  if (s.step === "start") return renderStepStart();
  if (s.step === "no-garment") return renderStepNoGarment();
  if (s.step === "garment-category") return renderStepGarmentCategory();
  if (s.step === "garment-type") return renderStepGarmentType();
  if (s.step === "jeans-model") return renderStepJeansModel();
  if (s.step === "customize") return renderStepCustomize();
  if (s.step === "review") return renderStepReview();
  return "";
}

function getStepIdx() {
  const st = s.step;
  if (st === "start" || st === "no-garment") return 0;
  if (st === "garment-category") return 1;
  if (st === "garment-type" || st === "jeans-model") return 2;
  if (st === "customize") return 3;
  if (st === "review") return 4;
  return -1;
}

function renderProgress() {
  const idx = getStepIdx();
  if (idx < 0) return "";
  const labels = ["Capo", "Categoria", "Modello", "Personalizza", "Riepilogo"];
  return `<div class="cfg-progress-inner">${labels
    .map(
      (l, i) =>
        `<div class="cfg-progress-step${i === idx ? " active" : ""}${i < idx ? " done" : ""}"><span class="cfg-progress-dot">${i < idx ? "✓" : i + 1}</span></div>${i < labels.length - 1 ? `<div class="cfg-progress-line${i < idx ? " done" : ""}"></div>` : ""}`,
    )
    .join("")}</div><div class="cfg-progress-labels">${labels
    .map(
      (l, i) =>
        `<span class="cfg-progress-label${i === idx ? " active" : ""}">${l}</span>`,
    )
    .join("")}</div>`;
}

function updateProgress() {
  const el = document.getElementById("cfg-progress");
  if (el) el.innerHTML = renderProgress();
}

function renderDone() {
  return `
    <div class="cfg-done">
      <div class="cfg-done-icon">✓</div>
      <h2>Richiesta inviata!</h2>
      <p>Il tuo progetto è stato ricevuto. ${s.creator ? "Il customizer ti contatterà con un preventivo." : "Il professionista ti contatterà con un preventivo."}</p>
      <button class="cfg-btn cfg-btn-primary" type="button" id="cfg-new-project">Nuovo progetto</button>
    </div>`;
}

function renderStepStart() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">1 / 5</span>
        <h2>Possiedi già il capo da personalizzare?</h2>
        <p>Dicci da dove partire — ti guideremo passo dopo passo.</p>
      </div>
      <div class="cfg-choice-grid">
        <button class="cfg-choice-card${s.hasGarment === true ? " active" : ""}" type="button" data-has-garment="true">
          <span class="cfg-choice-icon">✓</span>
          <span class="cfg-choice-label">Sì</span>
          <span class="cfg-choice-desc">Ho già un capo da trasformare</span>
        </button>
        <button class="cfg-choice-card${s.hasGarment === false ? " active" : ""}" type="button" data-has-garment="false">
          <span class="cfg-choice-icon">✕</span>
          <span class="cfg-choice-label">No</span>
          <span class="cfg-choice-desc">Scegli dalla collezione del customizer</span>
        </button>
      </div>
    </div>`;
}

function renderStepNoGarment() {
  const ci = s.creator ? getCustomizer(s.creator) : null;
  const items = (ci?.availableForCustomization || []).filter(
    (a) => a.garmentType,
  );
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Scegli il capo</span>
        <h2>Scegli dalla collezione</h2>
        <p>${ci ? `Seleziona un capo base dalla collezione di <strong>${escHtml(ci.name)}</strong> per iniziare la personalizzazione.` : "Trova un professionista, scegli un capo dalla sua collezione e costruisci il tuo pezzo unico."}</p>
      </div>
      ${
        items.length
          ? `
      <div class="cfg-no-garment-items">
        ${items
          .map(
            (a) => `
          <button class="cfg-no-garment-item" type="button" data-choose-base="${a.garmentType}" data-base-price="${a.basePrice || 0}" data-item-name="${escHtml(a.item)}">
            <div class="cfg-no-garment-item-info">
              <strong>${escHtml(a.item)}</strong>
              <span>${escHtml(a.technique)}</span>
            </div>
            <span class="cfg-no-garment-item-price">+€${a.basePrice || 0}</span>
          </button>`,
          )
          .join("")}
      </div>`
          : ci
            ? `<p style="color:var(--text-tertiary);margin-top:16px">Nessun capo disponibile da questo customizer.</p>`
            : `<div class="cfg-vendor-cta"><p style="color:var(--text-secondary);margin-bottom:8px">Nessun capo disponibile da questo customizer.</p><a class="cfg-btn cfg-btn-primary" href="/customizers?from=configure">Scegli un altro customizer →</a></div>`
      }
      <div class="cfg-step-actions" style="margin-top:24px">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-start">← Ricomincia</button>
      </div>
    </div>`;
}

function renderStepGarmentCategory() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">2 / 5</span>
        <h2>Scegli il tipo di capo</h2>
        <p>Seleziona la categoria del capo che vuoi personalizzare.</p>
      </div>
      <div class="cfg-type-grid">
        ${GARMENT_CATEGORIES.map(
          (c) => `
          <button class="cfg-type-card${s.garmentCategory === c.id ? " active" : ""}" type="button" data-garment-category="${c.id}">
            <span class="cfg-type-label">${c.label}</span>
            <span class="cfg-type-desc">${c.desc}</span>
          </button>`,
        ).join("")}
      </div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-start">← Indietro</button>
        ${
          s.garmentCategory
            ? s.garmentCategory === "jeans"
              ? `<button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-jeans-model">Continua →</button>`
              : `<button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-garment-type">Continua →</button>`
            : ""
        }
      </div>
    </div>`;
}

function renderStepGarmentType() {
  const cat = s.garmentCategory;
  const types = GARMENT_TYPES[cat] || [];
  const catLabel = GARMENT_CATEGORIES.find((c) => c.id === cat)?.label || "";
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">3 / 5</span>
        <h2>Che tipo di capo è?</h2>
        <p>Scegli il modello della tua ${escHtml(catLabel)}.</p>
      </div>
      <div class="cfg-type-grid">
        ${types
          .map(
            (t) => `
          <button class="cfg-type-card${s.garmentType === t.id ? " active" : ""}" type="button" data-garment-type="${t.id}">
            <span class="cfg-type-label">${t.label}</span>
          </button>`,
          )
          .join("")}
      </div>
      <div class="cfg-section">
        <h3 class="cfg-section-title">Marca <span class="cfg-optional">(opzionale)</span></h3>
        <input class="cfg-input" id="cfg-brand" type="text" placeholder="Vintage, Nike, Levi's, Zara..." value="${escHtml(s.brand)}">
      </div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-category">← Indietro</button>
        ${
          s.garmentType
            ? `<button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-customize">Continua →</button>`
            : ""
        }
      </div>
    </div>`;
}

function renderStepJeansModel() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">3 / 5</span>
        <h2>Scegli il modello</h2>
        <p>Seleziona il modello del tuo jeans.</p>
      </div>
      <div class="cfg-type-grid">
        ${JEANS_MODELS.map(
          (m) => `
          <button class="cfg-type-card${s.jeansModel === m.id ? " active" : ""}" type="button" data-jeans-model="${m.id}">
            <span class="cfg-type-label">${m.label}</span>
          </button>`,
        ).join("")}
      </div>
      <div class="cfg-section">
        <h3 class="cfg-section-title">Marca <span class="cfg-optional">(opzionale)</span></h3>
        <input class="cfg-input" id="cfg-brand" type="text" placeholder="Levi's, Diesel, Zara..." value="${escHtml(s.brand)}">
      </div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-category">← Indietro</button>
        ${
          s.jeansModel
            ? `<button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-customize">Continua →</button>`
            : ""
        }
      </div>
    </div>`;
}

function getActiveCustomizations() {
  if (s.garmentCategory === "jeans") return CUSTOMIZATIONS.jeans._all || [];
  const cat = CUSTOMIZATIONS[s.garmentCategory];
  if (!cat) return [];
  if (!s.garmentType) return Object.values(cat).flat();
  return cat[s.garmentType] || [];
}

function getAvailableCustomizations() {
  const defs = getActiveCustomizations();
  const activeGroups = new Set(
    s.customizations.map((c) => findCustDef(c.id)?.group).filter(Boolean),
  );
  return defs.filter((d) => {
    if (s.customizations.find((c) => c.id === d.id)) return false;
    if (d.group && activeGroups.has(d.group)) return false;
    return true;
  });
}

function renderCustContent() {
  const available = getAvailableCustomizations();
  return `
      ${
        s.customizations.length > 0
          ? `
        <div class="cfg-section">
          <h3 class="cfg-section-title">Modifiche attive</h3>
          <div class="cfg-active-custs">
            ${s.customizations.map((c, i) => renderCustomizationItem(c, i)).join("")}
          </div>
        </div>`
          : ""
      }
      ${
        available.length > 0
          ? `
        <div class="cfg-section">
          <h3 class="cfg-section-title">Modifiche disponibili</h3>
          <div class="cfg-cust-cards">
            ${available
              .map(
                (d) => `
              <div class="cfg-cust-card">
                ${
                  d.image
                    ? `<div class="cfg-cust-card-image"><img src="${d.image}" alt="${escHtml(d.label)}" onerror="this.parentElement.style.display='none'"></div>`
                    : ""
                }
                <div class="cfg-cust-card-info">
                  <span class="cfg-cust-card-name">${d.label}</span>
                  <span class="cfg-cust-card-desc">${d.desc}</span>
                </div>
                <div class="cfg-cust-card-action">
                  <span class="cfg-cust-card-price">+€${d.price}</span>
                  <button class="cfg-cust-card-add" type="button" data-add-cust="${d.id}">+ Aggiungi</button>
                </div>
              </div>`,
              )
              .join("")}
          </div>
        </div>`
          : ""
      }`;
}

function renderStepCustomize() {
  const catLabel =
    GARMENT_CATEGORIES.find((c) => c.id === s.garmentCategory)?.label || "";
  let typeLabel = "";
  if (s.garmentCategory === "jeans") {
    typeLabel = JEANS_MODELS.find((m) => m.id === s.jeansModel)?.label || "";
  } else {
    typeLabel =
      GARMENT_TYPES[s.garmentCategory]?.find((t) => t.id === s.garmentType)
        ?.label || "";
  }
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">4 / 5</span>
        <h2>Personalizza la tua ${escHtml(catLabel)}</h2>
        <p>Aggiungi le modifiche che desideri${typeLabel ? " al tuo capo " + escHtml(typeLabel) : ""}.</p>
      </div>
      <div id="cfg-cust-content">${renderCustContent()}</div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-type">← Indietro</button>
        <button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-review">Riepilogo →</button>
      </div>
    </div>`;
}

function renderCustomizationItem(c, i) {
  const def = findCustDef(c.id);
  if (!def) return "";
  const open = c._open;

  const fabricRows = def.needsFabric
    ? `
      <div class="cfg-setting">
        <span class="cfg-setting-label">Tessuto</span>
        <div class="cfg-opt-group">
          ${FABRIC_OPTIONS.map(
            (fo) => `
          <button class="cfg-opt${c.fabric === fo.id ? " active" : ""}" type="button" data-cust-fabric="${i}" data-fabric-id="${fo.id}">${fo.label}</button>`,
          ).join("")}
        </div>
        ${
          c.fabric === "altro"
            ? `<input class="cfg-input" style="margin-top:8px" id="cfg-fabric-custom-${i}" type="text" placeholder="Specifica il tessuto..." value="${escHtml(c.fabricCustom || "")}">`
            : ""
        }
      </div>`
    : "";

  return `
    <div class="cfg-cust-item">
      <div class="cfg-cust-header" data-toggle-cust="${i}">
        <div class="cfg-cust-info">
          <span class="cfg-cust-check">✓</span>
          <span class="cfg-cust-name">${def.label}</span>
          <span class="cfg-cust-price">+€${def.price}</span>
        </div>
        <div class="cfg-cust-actions">
          <button class="cfg-cust-toggle" type="button" data-toggle-cust="${i}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="${open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}"/></svg>
          </button>
          <button class="cfg-cust-remove" type="button" data-remove-cust="${i}">✕</button>
        </div>
      </div>
      <div class="cfg-cust-settings" style="display:${open ? "block" : "none"}">
        ${fabricRows}
      </div>
    </div>`;
}

function renderStepReview() {
  const ci = s.creator ? getCustomizer(s.creator) : null;
  const catLabel =
    GARMENT_CATEGORIES.find((c) => c.id === s.garmentCategory)?.label || "";
  let typeLabel = "";
  if (s.garmentCategory === "jeans") {
    typeLabel = JEANS_MODELS.find((m) => m.id === s.jeansModel)?.label || "";
  } else {
    typeLabel =
      GARMENT_TYPES[s.garmentCategory]?.find((t) => t.id === s.garmentType)
        ?.label || "";
  }
  const total = calculateTotal();

  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">5 / 5</span>
        <h2>Riepilogo del progetto</h2>
        <p>Controlla che tutto sia corretto prima di inviare.</p>
      </div>
      <div class="cfg-review-visual">
        <div class="cfg-review-garment">
          <div class="cfg-review-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a2 2 0 00-1.34 1.86v14.36A2 2 0 004.62 21.54L8 20l4 3.5 4-3.5 3.38 1.54a2 2 0 002.34-1.86V5.32a2 2 0 00-1.34-1.86z"/><line x1="12" y1="22" x2="12" y2="5.5"/></svg>
          </div>
          <div class="cfg-review-garment-info">
            <span class="cfg-review-garment-type">${catLabel}${typeLabel ? " — " + typeLabel : ""}</span>
            ${s.brand ? `<span class="cfg-review-garment-brand">${escHtml(s.brand)}</span>` : ""}
          </div>
          ${ci ? `<div class="cfg-review-customizer"><span class="cfg-review-customizer-dot"></span>${escHtml(ci.name)}</div>` : ""}
        </div>
        ${
          s.customizations.length > 0
            ? `
        <div class="cfg-review-mods">
          <div class="cfg-review-mods-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Modifiche (${s.customizations.length})
          </div>
          <div class="cfg-review-mods-list">
            ${s.customizations
              .map((c) => {
                const def = findCustDef(c.id);
                if (!def) return "";
                const fabricLine =
                  def.needsFabric && c.fabric
                    ? `<span class="cfg-review-mod-fabric">${c.fabric === "altro" ? c.fabricCustom || "Altro" : FABRIC_OPTIONS.find((fo) => fo.id === c.fabric)?.label || c.fabric}</span>`
                    : "";
                return `
                <div class="cfg-review-mod-item">
                  <span class="cfg-review-mod-name">${def.label}${fabricLine}</span>
                  <span class="cfg-review-mod-price">+€${def.price}</span>
                </div>`;
              })
              .join("")}
          </div>
        </div>`
            : ""
        }
        <div class="cfg-review-total">
          <span class="cfg-review-total-label">Totale stimato</span>
          <span class="cfg-review-total-amount">€${total.toFixed(2)}</span>
        </div>
      </div>
      <div class="cfg-section" style="margin-top:32px">
        <h3 class="cfg-section-title">I tuoi dati</h3>
        <div class="cfg-form-grid">
          <input class="cfg-input" id="f-name" type="text" placeholder="Nome *" value="${escHtml(s.form.name)}">
          <input class="cfg-input" id="f-surname" type="text" placeholder="Cognome *" value="${escHtml(s.form.surname)}">
          <input class="cfg-input" id="f-email" type="email" placeholder="Email *" value="${escHtml(s.form.email)}">
          <input class="cfg-input" id="f-instagram" type="text" placeholder="Instagram (opzionale)" value="${escHtml(s.form.instagram)}">
          <input class="cfg-input" id="f-phone" type="text" placeholder="Telefono (opzionale)" value="${escHtml(s.form.phone)}">
        </div>
        <textarea class="cfg-input cfg-textarea" id="f-notes" placeholder="Note — descrivi la tua visione, aggiungi riferimenti o richieste speciali (opzionale)">${escHtml(s.form.notes)}</textarea>
      </div>
      <div class="cfg-section">
        <label class="cfg-checkbox">
          <input type="checkbox" id="f-terms" ${s.form.acceptTerms ? "checked" : ""}>
          <span class="cfg-checkbox-mark"></span>
          <span>Ho letto e accetto i <button type="button" class="cfg-link-btn" id="cfg-open-terms">Termini e condizioni</button></span>
        </label>
        <label class="cfg-checkbox" style="margin-top:12px">
          <input type="checkbox" id="f-privacy" ${s.form.acceptPrivacy ? "checked" : ""}>
          <span class="cfg-checkbox-mark"></span>
          <span>Ho letto la <button type="button" class="cfg-link-btn" id="cfg-open-privacy">Privacy Policy</button> e autorizzo il trattamento dei miei dati personali per la gestione della richiesta</span>
        </label>
      </div>
      <div id="cfg-form-err" class="cfg-form-err"></div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-customize">← Indietro</button>
        <button class="cfg-btn cfg-btn-primary" type="button" id="cfg-submit" ${s.submitting ? "disabled" : ""}>${s.submitting ? "Invio in corso..." : "Invia progetto"}</button>
      </div>
    </div>`;
}

function renderSummary() {
  if (s.submittedOk) return "";
  const ci = s.creator ? getCustomizer(s.creator) : null;
  const catLabel =
    GARMENT_CATEGORIES.find((c) => c.id === s.garmentCategory)?.label || "";
  let typeLabel = "";
  if (s.garmentCategory === "jeans") {
    typeLabel = JEANS_MODELS.find((m) => m.id === s.jeansModel)?.label || "";
  } else {
    typeLabel =
      GARMENT_TYPES[s.garmentCategory]?.find((t) => t.id === s.garmentType)
        ?.label || "";
  }
  const total = calculateTotal();

  return `
    <div class="cfg-summary">
      <div class="cfg-summary-preview"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a2 2 0 00-1.34 1.86v14.36A2 2 0 004.62 21.54L8 20l4 3.5 4-3.5 3.38 1.54a2 2 0 002.34-1.86V5.32a2 2 0 00-1.34-1.86z"/><line x1="12" y1="22" x2="12" y2="5.5"/></svg></div>
      <h3 class="cfg-summary-title">Il tuo progetto</h3>
      ${
        ci
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Customizer</span>
        <span class="cfg-summary-value">${ci.name}</span>
      </div>`
          : ""
      }
      ${
        catLabel
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Capo</span>
        <span class="cfg-summary-value">${catLabel}</span>
      </div>`
          : ""
      }
      ${
        typeLabel
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Modello</span>
        <span class="cfg-summary-value">${typeLabel}</span>
      </div>`
          : ""
      }
      ${
        s.brand
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Marca</span>
        <span class="cfg-summary-value">${escHtml(s.brand)}</span>
      </div>`
          : ""
      }
      ${s.customizations
        .map((c) => {
          const def = findCustDef(c.id);
          if (!def) return "";
          return `
        <div class="cfg-summary-row cfg-summary-cust">
          <span class="cfg-summary-label">${def.label}</span>
          <span class="cfg-summary-value">+€${def.price}</span>
        </div>`;
        })
        .join("")}
      <div class="cfg-summary-divider"></div>
      <div class="cfg-summary-total">
        <span>Totale stimato</span>
        <span class="cfg-summary-amount">€${total.toFixed(2)}</span>
      </div>
      <div class="cfg-summary-edit" id="cfg-edit-cust">
        <button class="cfg-btn cfg-btn-ghost cfg-btn-small" type="button" id="cfg-back-to-cust">Modifica progetto</button>
      </div>
    </div>`;
}

function findCustDef(id) {
  if (s.garmentCategory === "jeans") {
    return (CUSTOMIZATIONS.jeans._all || []).find((d) => d.id === id) || null;
  }
  const cat = CUSTOMIZATIONS[s.garmentCategory];
  if (!cat) return null;
  const list = cat[s.garmentType] || [];
  return list.find((d) => d.id === id) || null;
}

function calculateTotal() {
  let t = s.basePrice || 0;
  for (const c of s.customizations) {
    const def = findCustDef(c.id);
    if (!def) continue;
    t += def.price || 0;
  }
  return t;
}

function escHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TERMS_SECTIONS = `
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">1. Funzione della piattaforma</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly è una piattaforma digitale che permette agli utenti di creare richieste di personalizzazione di capi e mettersi in contatto con customizer, artigiani, creatori indipendenti e brand specializzati.<br><br>Customly svolge esclusivamente un ruolo di intermediario tra il cliente e il customizer e non realizza direttamente i prodotti, non vende capi personalizzati e non gestisce il rapporto commerciale tra le parti.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">2. Invio del progetto</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Quando il cliente invia un progetto tramite il configuratore o tramite la piattaforma, la richiesta viene inoltrata al customizer selezionato.<br><br>L'invio della richiesta non costituisce un ordine definitivo né obbliga il customizer ad accettare il lavoro.<br><br>Il customizer potrà valutare il progetto, fornire eventuali modifiche, comunicare disponibilità, tempi e preventivo.<br><br>L'accordo relativo alla realizzazione del capo nasce esclusivamente tra cliente e customizer.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">3. Ruolo e responsabilità di Customly</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly non è responsabile della realizzazione del capo, della qualità del lavoro svolto dal customizer, dei materiali utilizzati, dei tempi di lavorazione, dei prezzi concordati, delle spedizioni, dei pagamenti o di eventuali modifiche, danni o problemi relativi al capo.<br><br>Eventuali problematiche relative al servizio richiesto dovranno essere gestite direttamente tra cliente e customizer.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">4. Informazioni fornite dal cliente</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Il cliente si impegna a fornire informazioni corrette e complete per permettere al customizer di valutare correttamente il progetto.<br><br>Eventuali immagini, riferimenti o materiali caricati dal cliente devono essere utilizzati nel rispetto dei diritti di proprietà intellettuale di eventuali terzi.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">5. Preventivi e pagamenti</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Eventuali prezzi mostrati sulla piattaforma sono indicativi e possono variare in base al progetto richiesto.<br><br>Il prezzo finale, le modalità di pagamento e le condizioni del servizio vengono stabilite direttamente tra cliente e customizer.<br><br>Customly non gestisce pagamenti, non trattiene commissioni sulle richieste e non interviene nelle transazioni tra le parti.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">6. Comunicazione dei dati al customizer</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Per permettere la gestione della richiesta, il cliente autorizza Customly a condividere con il customizer selezionato i dati necessari per essere ricontattato, inclusi nome, email e altre informazioni inserite volontariamente.<br><br>I dati vengono utilizzati esclusivamente per permettere la comunicazione relativa al progetto richiesto.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">7. Contenuti e immagini dei lavori</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Le immagini e i contenuti pubblicati dai customizer sulla piattaforma appartengono ai rispettivi proprietari.<br><br>Customly utilizza tali contenuti solamente per mostrare i profili e i lavori presenti sulla piattaforma.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">8. Limitazioni del servizio</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly non garantisce che un customizer accetti la richiesta, che il progetto venga realizzato o che il risultato finale corrisponda completamente alle aspettative del cliente.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">9. Accettazione dei termini</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Inviando una richiesta tramite Customly, il cliente dichiara di aver letto e accettato questi termini e autorizza il trattamento dei dati necessari alla gestione della richiesta secondo la Privacy Policy della piattaforma.</p>
  </section>`;

const PRIVACY_SECTIONS = `
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">1. Introduzione</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly rispetta la privacy dei propri utenti e si impegna a proteggere i dati personali raccolti attraverso la piattaforma.<br><br>La presente Privacy Policy spiega quali dati vengono raccolti, per quali finalità, come vengono trattati e quali diritti spettano agli utenti.<br><br>L'utilizzo della piattaforma implica l'accettazione delle pratiche descritte in questo documento.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">2. Titolare del trattamento</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Il titolare del trattamento dei dati raccolti attraverso la piattaforma Customly è Lorenzo Perassi.<br><br>Per qualsiasi comunicazione relativa al trattamento dei dati personali, è possibile contattare il titolare all'indirizzo email: perassi.lorenzo1804@gmail.com.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">3. Dati raccolti</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly raccoglie nome e cognome, indirizzo email, numero di telefono (opzionale), nome utente Instagram (opzionale) ed eventuali note o riferimenti inseriti dall'utente nella richiesta di personalizzazione.<br><br>Non vengono raccolti dati sensibili, dati relativi a pagamenti, né dati di navigazione al di fuori di quanto strettamente necessario al funzionamento della piattaforma.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">4. Finalità del trattamento</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">I dati personali raccolti vengono utilizzati esclusivamente per inoltrare la richiesta di personalizzazione al customizer selezionato, permettere al customizer di ricontattare l'utente, gestire la comunicazione relativa alla richiesta e migliorare la piattaforma sulla base di dati aggregati e anonimizzati.<br><br>I dati non vengono utilizzati per finalità di marketing, profilazione o pubblicità.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">5. Condivisione dei dati</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">I dati personali vengono condivisi esclusivamente con il customizer selezionato dall'utente al momento dell'invio della richiesta.<br><br>I dati non vengono venduti, ceduti o condivisi con terze parti per finalità diverse da quelle sopra descritte, salvo obblighi di legge.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">6. Conservazione dei dati</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">I dati personali vengono conservati per il tempo necessario a gestire la richiesta di personalizzazione e per eventuali comunicazioni successive, e vengono cancellati o anonimizzati entro 12 mesi dall'invio della richiesta.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">7. Servizi utilizzati</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly utilizza Formspree per l'invio delle richieste di personalizzazione via email ai customizer. Formspree agisce come responsabile del trattamento e rispetta le normative vigenti in materia di protezione dei dati.<br><br>La piattaforma è ospitata su server che rispettano gli standard di sicurezza europei.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">8. Contenuti inviati dagli utenti</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Eventuali immagini, descrizioni o riferimenti caricati dall'utente nella richiesta vengono trasmessi al customizer selezionato per la valutazione del progetto e non vengono pubblicati, condivisi o utilizzati per altri scopi.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">9. Sicurezza dei dati</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly adotta misure di sicurezza tecniche e organizzative per proteggere i dati personali da accessi non autorizzati, perdita, distruzione o divulgazione.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">10. Diritti dell'utente</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">L'utente ha il diritto di accedere ai propri dati, richiederne la rettifica o cancellazione, limitarne il trattamento, opporsi e revocare il consenso in qualsiasi momento.<br><br>Per esercitare questi diritti, l'utente può contattare il titolare del trattamento all'indirizzo email: perassi.lorenzo1804@gmail.com.<br><br>L'utente ha inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali.</p>
  </section>
  <section style="margin-bottom:24px">
    <h2 style="font-family:var(--font-heading);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">11. Modifiche alla Privacy Policy</h2>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7">Customly si riserva il diritto di aggiornare la presente Privacy Policy in qualsiasi momento. Le modifiche verranno pubblicate su questa pagina e, per modifiche sostanziali, gli utenti verranno informati tramite un avviso sulla piattaforma.</p>
  </section>`;

function buildModalHTML(type) {
  const title = type === "terms" ? "Termini e condizioni" : "Privacy Policy";
  const content = type === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;
  return `
    <div class="cfg-modal-overlay" id="cfg-modal-overlay">
      <div class="cfg-modal-panel">
        <div class="cfg-modal-header">
          <h3>${title}</h3>
          <button class="cfg-modal-close" type="button" id="cfg-modal-close">✕</button>
        </div>
        <div class="cfg-modal-body">
          ${content}
        </div>
      </div>
    </div>`;
}

function renderModal() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;
  const existing = root.querySelector(".cfg-modal-overlay");
  if (!s.modal) {
    if (existing) existing.remove();
    return;
  }
  if (existing) {
    const title =
      s.modal === "terms" ? "Termini e condizioni" : "Privacy Policy";
    const content = s.modal === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;
    const h3 = existing.querySelector("h3");
    const body = existing.querySelector(".cfg-modal-body");
    if (h3) h3.textContent = title;
    if (body) body.innerHTML = content;
    return;
  }
  root.insertAdjacentHTML("beforeend", buildModalHTML(s.modal));
}

function listen() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;

  root.addEventListener("click", (e) => {
    if (e.target.classList.contains("cfg-modal-overlay")) {
      s.modal = null;
      renderModal();
      return;
    }

    const t = e.target.closest("button, a");
    if (!t) return;

    if (t.hasAttribute("data-has-garment")) {
      const v = t.dataset.hasGarment === "true";
      s.hasGarment = v;
      s.step = v ? "garment-category" : "no-garment";
      render();
      return;
    }

    if (t.hasAttribute("data-choose-base")) {
      s.hasGarment = false;
      const base = t.dataset.chooseBase;
      if (base === "jeans") s.garmentCategory = "jeans";
      else {
        s.garmentCategory = "maglia";
        s.garmentType = base;
      }
      s.basePrice = parseFloat(t.dataset.basePrice) || 0;
      s.customizations = [];
      s.step = "customize";
      render();
      return;
    }

    if (t.hasAttribute("data-garment-category")) {
      s.garmentCategory = t.dataset.garmentCategory;
      s.garmentType = null;
      s.jeansModel = null;
      s.customizations = [];
      render();
      return;
    }

    if (t.hasAttribute("data-garment-type")) {
      s.garmentType = t.dataset.garmentType;
      s.customizations = [];
      render();
      return;
    }

    if (t.hasAttribute("data-jeans-model")) {
      s.jeansModel = t.dataset.jeansModel;
      s.customizations = [];
      render();
      return;
    }

    if (t.hasAttribute("data-add-cust")) {
      addCustomization(t.dataset.addCust);
      const el = document.getElementById("cfg-cust-content");
      if (el) el.innerHTML = renderCustContent();
      updateSidebar();
      return;
    }

    if (t.hasAttribute("data-remove-cust")) {
      e.stopPropagation();
      const i = parseInt(t.dataset.removeCust);
      s.customizations.splice(i, 1);
      const el = document.getElementById("cfg-cust-content");
      if (el) el.innerHTML = renderCustContent();
      updateSidebar();
      return;
    }

    if (t.hasAttribute("data-toggle-cust")) {
      const i = parseInt(t.dataset.toggleCust);
      const c = s.customizations[i];
      if (c) {
        c._open = !c._open;
        const item = t.closest(".cfg-cust-item");
        if (item) {
          const settings = item.querySelector(".cfg-cust-settings");
          if (settings) settings.style.display = c._open ? "block" : "none";
          const path = item.querySelector("svg path");
          if (path)
            path.setAttribute(
              "d",
              c._open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6",
            );
        }
      }
      return;
    }

    if (t.hasAttribute("data-cust-fabric")) {
      const i = parseInt(t.dataset.custFabric);
      const fabricId = t.dataset.fabricId;
      const c = s.customizations[i];
      if (c) {
        c.fabric = fabricId;
        const el = document.getElementById("cfg-cust-content");
        if (el) el.innerHTML = renderCustContent();
        updateSidebar();
      }
      return;
    }

    if (t.id === "cfg-to-garment-type") {
      if (!s.garmentCategory || s.garmentCategory === "jeans") return;
      s.step = "garment-type";
      render();
      return;
    }

    if (t.id === "cfg-to-jeans-model") {
      if (s.garmentCategory !== "jeans") return;
      s.step = "jeans-model";
      render();
      return;
    }

    if (t.id === "cfg-to-customize") {
      if (s.garmentCategory === "jeans" && !s.jeansModel) return;
      if (s.garmentCategory !== "jeans" && !s.garmentType) return;
      s.step = "customize";
      render();
      return;
    }

    if (t.id === "cfg-to-review") {
      s.step = "review";
      render();
      return;
    }

    if (t.id === "cfg-back-category") {
      s.step = "garment-category";
      s.garmentType = null;
      s.jeansModel = null;
      s.customizations = [];
      render();
      return;
    }

    if (t.id === "cfg-back-type") {
      if (s.garmentCategory === "jeans") {
        s.step = "jeans-model";
      } else {
        s.step = "garment-type";
      }
      render();
      return;
    }

    if (t.id === "cfg-back-customize") {
      s.step = "customize";
      render();
      return;
    }

    if (t.id === "cfg-back-to-cust") {
      s.step = "customize";
      render();
      return;
    }

    if (t.id === "cfg-back-start") {
      const c = s.creator;
      Object.assign(s, initState());
      s.creator = c;
      render();
      return;
    }

    if (t.id === "cfg-new-project") {
      const c = s.creator;
      Object.assign(s, initState());
      s.creator = c;
      render();
      return;
    }

    if (t.id === "cfg-open-terms") {
      e.preventDefault();
      s.modal = "terms";
      renderModal();
      return;
    }

    if (t.id === "cfg-open-privacy") {
      e.preventDefault();
      s.modal = "privacy";
      renderModal();
      return;
    }

    if (t.id === "cfg-modal-close" || t.id === "cfg-modal-overlay") {
      s.modal = null;
      renderModal();
      return;
    }

    if (t.id === "cfg-submit") {
      submitOrder();
      return;
    }

    if (t.hasAttribute("data-search-creator")) {
      navigate("/configuratore?creator=" + t.dataset.searchCreator);
      return;
    }

    if (t.hasAttribute("data-search-garment")) {
      s.hasGarment = true;
      s.garmentCategory = t.dataset.searchGarment;
      s.step = "garment-category";
      render();
      return;
    }

    if (t.hasAttribute("data-search-model")) {
      const [gt, mid] = t.dataset.searchModel.split(":");
      s.hasGarment = true;
      s.garmentCategory = gt;
      if (gt === "jeans") {
        s.jeansModel = mid;
      } else {
        s.garmentType = mid;
      }
      s.step = "customize";
      render();
      return;
    }

    if (t.hasAttribute("data-search-cust")) {
      const [gt, cid] = t.dataset.searchCust.split(":");
      s.hasGarment = true;
      s.garmentCategory = gt;
      s.step = "customize";
      if (!s.customizations.find((x) => x.id === cid)) addCustomization(cid);
      render();
    }
  });

  root.addEventListener("input", (e) => {
    const id = e.target.id;
    if (id === "cfg-brand") s.brand = e.target.value;
    else if (id.startsWith("f-")) s.form[id.replace("f-", "")] = e.target.value;
    else if (id.startsWith("cfg-fabric-custom-")) {
      const i = parseInt(id.replace("cfg-fabric-custom-", ""));
      const c = s.customizations[i];
      if (c) c.fabricCustom = e.target.value;
    }
  });

  root.addEventListener("change", (e) => {
    if (e.target.id === "f-terms") {
      s.form.acceptTerms = e.target.checked;
    }
    if (e.target.id === "f-privacy") {
      s.form.acceptPrivacy = e.target.checked;
    }
  });
}

function addCustomization(id) {
  if (s.customizations.find((c) => c.id === id)) return;
  const def = findCustDef(id);
  if (!def) return;
  if (def.group) {
    s.customizations = s.customizations.filter((c) => {
      const d = findCustDef(c.id);
      return !d || d.group !== def.group;
    });
  }
  s.customizations.push({
    id,
    fabric: def.needsFabric ? "denim" : null,
    fabricCustom: "",
    _open: true,
  });
}

function updateSidebar() {
  const sidebar = document.getElementById("cfg-sidebar");
  if (!sidebar) return;
  sidebar.innerHTML = renderSummary();
}

async function submitOrder() {
  const name = (document.getElementById("f-name")?.value || "").trim();
  const surname = (document.getElementById("f-surname")?.value || "").trim();
  const email = (document.getElementById("f-email")?.value || "").trim();
  const instagram = document.getElementById("f-instagram")?.value || "";
  const phone = document.getElementById("f-phone")?.value || "";
  const notes = document.getElementById("f-notes")?.value || "";
  const acceptTerms = document.getElementById("f-terms")?.checked || false;
  const acceptPrivacy = document.getElementById("f-privacy")?.checked || false;
  const errEl = document.getElementById("cfg-form-err");

  s.form = {
    name,
    surname,
    email,
    instagram,
    phone,
    notes,
    acceptTerms,
    acceptPrivacy,
  };

  if (!name || !surname) {
    errEl.textContent = "Inserisci nome e cognome.";
    return;
  }
  if (!email) {
    errEl.textContent = "Inserisci la tua email.";
    return;
  }
  if (!acceptTerms || !acceptPrivacy) {
    const missing = [];
    if (!acceptTerms) missing.push("Termini e condizioni");
    if (!acceptPrivacy) missing.push("Privacy Policy");
    errEl.textContent = "Accetta: " + missing.join(" e ");
    return;
  }

  errEl.textContent = "";
  s.submitting = true;
  render();

  const total = calculateTotal();
  const catLabel =
    GARMENT_CATEGORIES.find((c) => c.id === s.garmentCategory)?.label || "";
  let typeLabel = "";
  if (s.garmentCategory === "jeans") {
    typeLabel = JEANS_MODELS.find((m) => m.id === s.jeansModel)?.label || "";
  } else {
    typeLabel =
      GARMENT_TYPES[s.garmentCategory]?.find((t) => t.id === s.garmentType)
        ?.label || "";
  }

  const custLines = s.customizations
    .map((c) => {
      const def = findCustDef(c.id);
      if (!def) return "";
      const fabricLine =
        def.needsFabric && c.fabric
          ? ` — Tessuto: ${c.fabric === "altro" ? c.fabricCustom || "Altro" : FABRIC_OPTIONS.find((fo) => fo.id === c.fabric)?.label || c.fabric}`
          : "";
      return `${def.label}${fabricLine}`;
    })
    .join("\n");

  try {
    await send({
      type: "custom_project",
      creator: s.creator || "perassi",
      name: (name + " " + surname).trim(),
      email: email,
      contact: [instagram, phone].filter(Boolean).join(" / ") || "Non fornito",
      note: notes.trim() || "Nessuna",
      capo:
        catLabel +
        (typeLabel ? " — " + typeLabel : "") +
        (s.brand ? " (" + s.brand + ")" : ""),
      modifiche: custLines || "Nessuna modifica",
      totale: "€" + total.toFixed(2),
    });
    s.submitting = false;
    s.submittedOk = true;
    render();
  } catch (e) {
    s.submitting = false;
    if (errEl) errEl.textContent = "Errore: " + e.message;
    render();
  }
}

function renderChooseCreator() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;
  root.innerHTML = `
    <div style="text-align:center;padding:80px 20px">
      <h2 style="font-family:var(--font-heading);font-size:28px;font-weight:600;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:12px">Scegli un customizer</h2>
      <p style="color:var(--text-secondary);margin-bottom:24px">Seleziona un customizer per iniziare a personalizzare il tuo capo.</p>
      <a href="/customizers?from=configure" class="cfg-btn cfg-btn-primary">Sfoglia i customizer →</a>
    </div>`;
}

export function initConfiguratore() {
  const params = getParams();
  s = initState();

  const creatorId = params.creator;
  if (!creatorId) return renderChooseCreator();

  const seller = getCustomizer(creatorId);
  if (!seller) return renderChooseCreator();

  s.creator = creatorId;

  if (params.garment) {
    s.hasGarment = false;
    if (params.garment === "jeans") s.garmentCategory = "jeans";
    else s.garmentCategory = "maglia";
    s.basePrice = parseFloat(params.basePrice) || 0;
    s.customizations = [];
    s.step = "customize";
    render();
    return;
  }

  render();
}
