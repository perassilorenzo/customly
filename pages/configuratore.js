import { renderSVG, getColorLabel } from "../data/products.js";
import { send } from "../utils/formspree.js";
import { getParams, navigate } from "../utils/router.js";
import { getSeller, searchSellers } from "../data/sellers.js";

const COLORS = [
  { id: "#c13535", label: "Rosso" },
  { id: "#1a1410", label: "Nero" },
  { id: "#2d5a3d", label: "Verde" },
  { id: "#8b7355", label: "Cuoio" },
  { id: "#f5f0eb", label: "Crema" },
  { id: "#4a6fa5", label: "Denim" },
  { id: "#d4a017", label: "Oro" },
];

const GARMENT = {
  tshirt: {
    label: "T-Shirt",
    icon: "👕",
    models: [
      { id: "short-sleeve", label: "Short Sleeve" },
      { id: "long-sleeve", label: "Long Sleeve" },
      { id: "tank-top", label: "Tank Top" },
    ],
  },
  jeans: {
    label: "Jeans",
    icon: "👖",
    models: [
      { id: "skinny", label: "Skinny" },
      { id: "regular", label: "Regular" },
      { id: "baggy", label: "Baggy" },
    ],
  },
};

const GARMENT_CATEGORIES = [
  {
    id: "tshirt",
    label: "T-Shirt",
    icon: "👕",
    desc: "Classic, versatile, ready for customization",
  },
  {
    id: "jeans",
    label: "Jeans",
    icon: "👖",
    desc: "Denim canvas for your unique style",
  },
];

const CUSTOMIZATIONS = {
  jeans: [
    {
      id: "flared",
      label: "Flared Bottom",
      desc: "Triangular fabric panels to create a flared silhouette.",
      price: 15,
      preview: "flared",
      settings: [
        {
          key: "fabricAvailable",
          label: "Fabric available?",
          type: "boolean",
          default: true,
        },
        {
          key: "fabric",
          label: "Choose fabric",
          type: "select",
          default: "denim",
          dependsOn: { key: "fabricAvailable", value: false },
          options: [
            { id: "denim", label: "Denim", price: 8 },
            { id: "tuta", label: "Sweatpants fabric", price: 10 },
            { id: "camo", label: "Camouflage", price: 12 },
          ],
        },
        {
          key: "size",
          label: "Size",
          type: "select",
          default: "medium",
          options: [
            { id: "small", label: "Small" },
            { id: "medium", label: "Medium" },
            { id: "large", label: "Large" },
          ],
        },
      ],
    },
    {
      id: "side-panels",
      label: "Side Panels",
      desc: "Widen the jeans from ankle to pocket with fabric inserts.",
      price: 18,
      preview: "side-panels",
      settings: [
        {
          key: "fabricAvailable",
          label: "Fabric available?",
          type: "boolean",
          default: true,
        },
        {
          key: "fabric",
          label: "Choose fabric",
          type: "select",
          default: "denim",
          dependsOn: { key: "fabricAvailable", value: false },
          options: [
            { id: "denim", label: "Denim", price: 8 },
            { id: "tuta", label: "Sweatpants fabric", price: 10 },
            { id: "camo", label: "Camouflage", price: 12 },
          ],
        },
        {
          key: "size",
          label: "Size",
          type: "select",
          default: "medium",
          options: [
            { id: "small", label: "Small" },
            { id: "medium", label: "Medium" },
            { id: "large", label: "Large" },
          ],
        },
      ],
    },
    {
      id: "bottom-hem",
      label: "Raw Hem",
      desc: "Choose the finish for the bottom of your jeans.",
      price: 5,
      preview: "raw-hem",
      settings: [
        {
          key: "finish",
          label: "Finish",
          type: "select",
          default: "standard",
          options: [
            { id: "standard", label: "Standard hem", price: 0 },
            { id: "raw-cut", label: "Raw cut", price: 3 },
            { id: "frayed", label: "Frayed hem", price: 5 },
          ],
        },
      ],
    },
  ],
  tshirt: [
    {
      id: "crop",
      label: "Crop",
      desc: "Crop the shirt to your desired length.",
      price: 8,
      preview: "crop",
      settings: [
        {
          key: "length",
          label: "Length",
          type: "select",
          default: "medium",
          options: [
            { id: "small", label: "Slight crop" },
            { id: "medium", label: "Medium crop" },
            { id: "large", label: "Heavy crop" },
          ],
        },
      ],
    },
    {
      id: "shorten",
      label: "Shorten",
      desc: "Shorten the overall length of the shirt.",
      price: 8,
      preview: "shorten",
      settings: [
        {
          key: "length",
          label: "Amount",
          type: "select",
          default: "medium",
          options: [
            { id: "small", label: "Small" },
            { id: "medium", label: "Medium" },
            { id: "large", label: "Large" },
          ],
        },
      ],
    },
    {
      id: "shorten-sleeves",
      label: "Shorten Sleeves",
      desc: "Shorten sleeves while keeping the original hem.",
      price: 6,
      preview: "shorten-sleeves",
      settings: [
        {
          key: "amount",
          label: "Amount",
          type: "select",
          default: "medium",
          options: [
            { id: "small", label: "Small" },
            { id: "medium", label: "Medium" },
            { id: "large", label: "Large" },
          ],
        },
      ],
    },
    {
      id: "remove-sleeves",
      label: "Remove Sleeves",
      desc: "Cut sleeves completely for a tank top look.",
      price: 5,
      preview: "remove-sleeves",
      settings: [],
    },
  ],
};

function initState() {
  return {
    step: "start",
    creator: null,
    hasGarment: null,
    garmentType: null,
    model: null,
    brand: "",
    customizations: [],
    color: "#c13535",
    form: {
      name: "",
      surname: "",
      email: "",
      instagram: "",
      phone: "",
      notes: "",
      acceptTerms: false,
    },
    submitting: false,
    submittedOk: false,
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
    const ci = s.creator ? getSeller(s.creator) : null;
    root.innerHTML = `
    <div class="cfg-layout">
      <div class="cfg-main">
        <div class="cfg-search">
          <div class="cfg-search-bar">
            <svg class="cfg-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" id="cfg-search-input" placeholder="Search professionals, products or customizations..." autocomplete="off">
          </div>
          <div id="cfg-search-results" class="cfg-search-results"></div>
        </div>
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
        <div id="cfg-step-content"></div>
      </div>
      <div class="cfg-sidebar" id="cfg-sidebar"></div>
    </div>`;
    bindSearch();
    listen();
  }

  renderStep();
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
  if (s.step === "garment") return renderStepGarment();
  if (s.step === "customize") return renderStepCustomize();
  if (s.step === "review") return renderStepReview();
  return "";
}

function renderDone() {
  return `
    <div class="cfg-done">
      <div class="cfg-done-icon">✓</div>
      <h2>Request sent!</h2>
      <p>Your project has been received. ${s.creator ? "The professional will contact you with a quote." : "The professional will contact you with a quote."}</p>
      <button class="cfg-btn cfg-btn-primary" type="button" id="cfg-new-project">New project</button>
    </div>`;
}

function renderStepStart() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 1</span>
        <h2>Do you already have a garment?</h2>
        <p>Tell us where to start — we'll guide you through every step.</p>
      </div>
      <div class="cfg-choice-grid">
        <button class="cfg-choice-card${s.hasGarment === true ? " active" : ""}" type="button" data-has-garment="true">
          <span class="cfg-choice-icon">✓</span>
          <span class="cfg-choice-label">Yes</span>
          <span class="cfg-choice-desc">I already have a garment to transform</span>
        </button>
        <button class="cfg-choice-card${s.hasGarment === false ? " active" : ""}" type="button" data-has-garment="false">
          <span class="cfg-choice-icon">✕</span>
          <span class="cfg-choice-label">No</span>
          <span class="cfg-choice-desc">I want to create from scratch</span>
        </button>
      </div>
    </div>`;
}

function renderStepNoGarment() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Start fresh</span>
        <h2>Create from scratch</h2>
        <p>Find a professional, choose a garment from their collection, and build your unique piece.</p>
      </div>
      <div class="cfg-vendor-cta">
        <a class="cfg-btn cfg-btn-primary" href="#/creator">Discover available customizers →</a>
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-start">← Start over</button>
      </div>
    </div>`;
}

function renderStepGarment() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 2</span>
        <h2>Select your garment</h2>
        <p>Choose the piece you want to customize.</p>
      </div>
      <div class="cfg-type-grid">
        ${GARMENT_CATEGORIES.map(
          (c) => `
          <button class="cfg-type-card${s.garmentType === c.id ? " active" : ""}" type="button" data-garment-type="${c.id}">
            <span class="cfg-type-icon">${c.icon}</span>
            <span class="cfg-type-label">${c.label}</span>
            <span class="cfg-type-desc">${c.desc}</span>
          </button>`,
        ).join("")}
      </div>
      ${
        s.garmentType
          ? `
        <div class="cfg-section">
          <h3 class="cfg-section-title">Model</h3>
          <div class="cfg-opt-group">
            ${GARMENT[s.garmentType].models
              .map(
                (m) => `
              <button class="cfg-opt${s.model === m.id ? " active" : ""}" type="button" data-model="${m.id}">${m.label}</button>`,
              )
              .join("")}
          </div>
        </div>
        <div class="cfg-section">
          <h3 class="cfg-section-title">Brand <span class="cfg-optional">(optional)</span></h3>
          <input class="cfg-input" id="cfg-brand" type="text" placeholder="Vintage, Nike, Levi's, Zara..." value="${escHtml(s.brand)}">
        </div>
        <button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-customize">Continue →</button>`
          : ""
      }
    </div>`;
}

function renderCustContent() {
  const defs = CUSTOMIZATIONS[s.garmentType] || [];
  const available = defs.filter(
    (d) => !s.customizations.find((c) => c.id === d.id),
  );
  return `
      ${
        s.customizations.length > 0
          ? `
        <div class="cfg-section">
          <h3 class="cfg-section-title">Active Customizations</h3>
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
          <h3 class="cfg-section-title">Available Modifications</h3>
          <div class="cfg-cust-cards">
            ${available
              .map(
                (d) => `
              <div class="cfg-cust-card">
                <div class="cfg-cust-card-info">
                  <span class="cfg-cust-card-name">${d.label}</span>
                  <span class="cfg-cust-card-desc">${d.desc}</span>
                </div>
                <div class="cfg-cust-card-action">
                  <span class="cfg-cust-card-price">+€${d.price}</span>
                  <button class="cfg-cust-card-add" type="button" data-add-cust="${d.id}">+ Add</button>
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
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 3</span>
        <h2>Customize your ${GARMENT[s.garmentType].label}</h2>
        <p>Pick a color and add the modifications you want.</p>
      </div>
      <div class="cfg-section">
        <h3 class="cfg-section-title">Color</h3>
        <div class="cfg-color-grid">
          ${COLORS.map(
            (c) => `
            <button class="cfg-color-swatch${s.color === c.id ? " active" : ""}" type="button" data-color="${c.id}" style="--swatch:${c.id}" title="${c.label}">
              <span class="cfg-color-dot"></span>
            </button>`,
          ).join("")}
        </div>
      </div>
      <div id="cfg-cust-content">${renderCustContent()}</div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-garment">← Back</button>
        <button class="cfg-btn cfg-btn-primary cfg-btn-next" type="button" id="cfg-to-review">Review Order →</button>
      </div>
    </div>`;
}

function renderCustomizationItem(c, i) {
  const def = findCustDef(s.garmentType, c.id);
  if (!def) return "";
  const open = c._open;

  const settingRows = def.settings
    .map((setting) => {
      const val =
        c.settings[setting.key] !== undefined
          ? c.settings[setting.key]
          : setting.default;
      if (!isSettingVisible(setting, c)) return "";
      if (setting.type === "boolean") {
        return `
        <div class="cfg-setting">
          <label class="cfg-toggle">
            <input type="checkbox" data-cust-setting="${i}" data-setting-key="${setting.key}" ${val ? "checked" : ""}>
            <span class="cfg-toggle-track"></span>
            <span class="cfg-toggle-label">${setting.label}</span>
          </label>
        </div>`;
      }
      if (setting.type === "select") {
        const optHtml = setting.options
          .map(
            (o) => `
        <button class="cfg-opt${val === o.id ? " active" : ""}" type="button" data-cust-opt="${i}" data-setting-key="${setting.key}" data-opt-id="${o.id}">${o.label}${o.price ? ` <span class="cfg-price">+€${o.price}</span>` : ""}</button>`,
          )
          .join("");
        return `
        <div class="cfg-setting">
          <span class="cfg-setting-label">${setting.label}</span>
          <div class="cfg-opt-group">${optHtml}</div>
        </div>`;
      }
      return "";
    })
    .join("");

  return `
    <div class="cfg-cust-item">
      <div class="cfg-cust-header" data-toggle-cust="${i}">
        <div class="cfg-cust-info">
          <span class="cfg-cust-check">✓</span>
          <span class="cfg-cust-name">${def.label}</span>
          <span class="cfg-cust-price">+€${custPrice(c)}</span>
        </div>
        <div class="cfg-cust-actions">
          <button class="cfg-cust-toggle" type="button" data-toggle-cust="${i}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="${open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}"/></svg>
          </button>
          <button class="cfg-cust-remove" type="button" data-remove-cust="${i}">✕</button>
        </div>
      </div>
      <div class="cfg-cust-settings" style="display:${open ? "block" : "none"}">
        ${settingRows}
      </div>
    </div>`;
}

function renderStepReview() {
  const ci = s.creator ? getSeller(s.creator) : null;
  const gi = s.garmentType ? GARMENT[s.garmentType] : null;
  const ml =
    s.garmentType && s.model
      ? GARMENT[s.garmentType].models.find((m) => m.id === s.model)?.label
      : null;
  const total = calculateTotal();

  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 4</span>
        <h2>Review your project</h2>
        <p>Check everything is right before sending.</p>
      </div>
      <div class="cfg-project-card">
        <div class="cfg-project-card-header">
          <span class="cfg-project-card-label">Custom Project</span>
        </div>
        <div class="cfg-project-card-body">
          ${
            ci
              ? `
          <div class="cfg-project-row">
            <span class="cfg-project-label">Creator</span>
            <span class="cfg-project-value">${ci.name}</span>
          </div>`
              : ""
          }
          <div class="cfg-project-row">
            <span class="cfg-project-label">Garment</span>
            <span class="cfg-project-value">${gi ? gi.label : ""}${ml ? " — " + ml : ""}${s.brand ? " (" + s.brand + ")" : ""}</span>
          </div>
          <div class="cfg-project-row">
            <span class="cfg-project-label">Color</span>
            <span class="cfg-project-value">
              <span class="cfg-project-color-dot" style="background:${s.color}"></span>
              ${getColorLabel(s.color)}
            </span>
          </div>
          ${
            s.customizations.length > 0
              ? `
          <div class="cfg-project-section">
            <span class="cfg-project-label">Modifications</span>
            <ul class="cfg-project-list">
              ${s.customizations
                .map((c) => {
                  const def = findCustDef(s.garmentType, c.id);
                  if (!def) return "";
                  const details = def.settings
                    .map((st) => {
                      const v = c.settings[st.key];
                      if (st.type === "boolean") return "";
                      const opt = st.options?.find((o) => o.id === v);
                      return opt && opt.label && opt.label !== v
                        ? opt.label
                        : "";
                    })
                    .filter(Boolean)
                    .join(", ");
                  return `<li>${def.label}${details ? " — " + details : ""} <span class="cfg-project-price">+€${custPrice(c)}</span></li>`;
                })
                .join("")}
            </ul>
          </div>`
              : ""
          }
          <div class="cfg-project-total">
            <span>Estimated total</span>
            <span class="cfg-project-total-amount">€${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div class="cfg-section" style="margin-top:32px">
        <h3 class="cfg-section-title">Your details</h3>
        <div class="cfg-form-grid">
          <input class="cfg-input" id="f-name" type="text" placeholder="Name *" value="${escHtml(s.form.name)}">
          <input class="cfg-input" id="f-surname" type="text" placeholder="Surname *" value="${escHtml(s.form.surname)}">
          <input class="cfg-input" id="f-email" type="email" placeholder="Email *" value="${escHtml(s.form.email)}">
          <input class="cfg-input" id="f-instagram" type="text" placeholder="Instagram (optional)" value="${escHtml(s.form.instagram)}">
          <input class="cfg-input" id="f-phone" type="text" placeholder="Phone (optional)" value="${escHtml(s.form.phone)}">
        </div>
        <textarea class="cfg-input cfg-textarea" id="f-notes" placeholder="Notes — describe your vision, add references or special requests (optional)">${escHtml(s.form.notes)}</textarea>
      </div>
      <div class="cfg-section">
        <label class="cfg-checkbox">
          <input type="checkbox" id="f-terms" ${s.form.acceptTerms ? "checked" : ""}>
          <span class="cfg-checkbox-mark"></span>
          <span>I accept the terms and conditions</span>
        </label>
      </div>
      <div id="cfg-form-err" class="cfg-form-err"></div>
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" type="button" id="cfg-back-customize">← Back</button>
        <button class="cfg-btn cfg-btn-primary" type="button" id="cfg-submit" ${s.submitting ? "disabled" : ""}>${s.submitting ? "Sending..." : "Submit project"}</button>
      </div>
    </div>`;
}

function renderSummary() {
  if (s.submittedOk) return "";
  const ci = s.creator ? getSeller(s.creator) : null;
  const gi = s.garmentType ? GARMENT[s.garmentType] : null;
  const ml =
    s.garmentType && s.model
      ? GARMENT[s.garmentType].models.find((m) => m.id === s.model)?.label
      : null;
  const total = calculateTotal();
  const type =
    s.garmentType === "jeans"
      ? "jeans"
      : s.garmentType === "tshirt"
        ? "maglia"
        : "maglia";
  const previewCfg = buildPreviewCfg();
  const svg = renderSVG(type, {}, s.color, null, previewCfg);

  return `
    <div class="cfg-summary">
      <div class="cfg-summary-preview">${svg || ""}</div>
      <h3 class="cfg-summary-title">Your Custom Project</h3>
      ${
        ci
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Creator</span>
        <span class="cfg-summary-value">${ci.name}</span>
      </div>`
          : ""
      }
      ${
        gi
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Garment</span>
        <span class="cfg-summary-value">${gi.label}</span>
      </div>`
          : ""
      }
      ${
        ml
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Model</span>
        <span class="cfg-summary-value">${ml}</span>
      </div>`
          : ""
      }
      ${
        s.brand
          ? `
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Brand</span>
        <span class="cfg-summary-value">${escHtml(s.brand)}</span>
      </div>`
          : ""
      }
      <div class="cfg-summary-row">
        <span class="cfg-summary-label">Color</span>
        <span class="cfg-summary-value">${getColorLabel(s.color)}</span>
      </div>
      ${s.customizations
        .map((c) => {
          const def = findCustDef(s.garmentType, c.id);
          if (!def) return "";
          return `
        <div class="cfg-summary-row cfg-summary-cust">
          <span class="cfg-summary-label">${def.label}</span>
          <span class="cfg-summary-value">+€${custPrice(c)}</span>
        </div>`;
        })
        .join("")}
      <div class="cfg-summary-divider"></div>
      <div class="cfg-summary-total">
        <span>Estimated total</span>
        <span class="cfg-summary-amount">€${total.toFixed(2)}</span>
      </div>
      <div class="cfg-summary-edit" id="cfg-edit-cust">
        <button class="cfg-btn cfg-btn-ghost cfg-btn-small" type="button" id="cfg-back-to-cust">Edit project</button>
      </div>
    </div>`;
}

function buildPreviewCfg() {
  const cfg = { color: s.color };
  if (s.garmentType === "tshirt") {
    const m = GARMENT.tshirt.models.find((x) => x.id === s.model);
    if (m)
      cfg.sleeves =
        m.id === "short-sleeve"
          ? "short"
          : m.id === "long-sleeve"
            ? "long"
            : "none";
    if (s.customizations.find((c) => c.id === "crop")) cfg.cropped = true;
    if (s.customizations.find((c) => c.id === "shorten")) cfg.length = "short";
    if (s.customizations.find((c) => c.id === "remove-sleeves"))
      cfg.sleeves = "none";
  }
  if (s.garmentType === "jeans") {
    const m = GARMENT.jeans.models.find((x) => x.id === s.model);
    if (m) cfg.leg = m.id;
    if (s.customizations.find((c) => c.id === "flared")) cfg.leg = "flared";
    if (
      s.customizations.find((c) => c.id === "side-panels") &&
      !s.customizations.find((c) => c.id === "flared")
    )
      cfg.leg = "wide";
    const hem = s.customizations.find((c) => c.id === "bottom-hem");
    if (
      hem &&
      (hem.settings.finish === "raw-cut" || hem.settings.finish === "frayed")
    )
      cfg.rawHem = true;
  }
  return cfg;
}

function isSettingVisible(setting, cust) {
  if (!setting.dependsOn) return true;
  return cust.settings[setting.dependsOn.key] === setting.dependsOn.value;
}

function calculateTotal() {
  let t = 0;
  for (const c of s.customizations) {
    const def = findCustDef(s.garmentType, c.id);
    if (!def) continue;
    t += def.price || 0;
    for (const setting of def.settings) {
      if (!isSettingVisible(setting, c)) continue;
      if (setting.type === "select") {
        const opt = setting.options?.find(
          (o) => o.id === c.settings[setting.key],
        );
        if (opt && opt.price) t += opt.price;
      }
    }
  }
  return t;
}

function custPrice(c) {
  let t = 0;
  const def = findCustDef(s.garmentType, c.id);
  if (!def) return 0;
  t += def.price || 0;
  for (const setting of def.settings) {
    if (!isSettingVisible(setting, c)) continue;
    if (setting.type === "select") {
      const opt = setting.options?.find(
        (o) => o.id === c.settings[setting.key],
      );
      if (opt && opt.price) t += opt.price;
    }
  }
  return t;
}

function findCustDef(type, id) {
  const list = CUSTOMIZATIONS[type];
  if (!list) return null;
  return list.find((d) => d.id === id) || null;
}

function escHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bindSearch() {
  const input = document.getElementById("cfg-search-input");
  const results = document.getElementById("cfg-search-results");
  if (!input || !results) return;

  function search() {
    const q = input.value.toLowerCase().trim();
    if (!q) {
      results.innerHTML = "";
      results.classList.remove("open");
      return;
    }
    const hits = [];

    for (const cr of searchSellers(q)) {
      hits.push({
        type: "creator",
        label: cr.name,
        id: cr.id,
        sub: cr.tagline,
      });
    }
    for (const [key, g] of Object.entries(GARMENT)) {
      if (g.label.toLowerCase().includes(q) || key.includes(q))
        hits.push({ type: "garment", label: g.label, id: key });
      for (const m of g.models) {
        if (m.label.toLowerCase().includes(q) || m.id.includes(q))
          hits.push({
            type: "model",
            label: `${g.label} — ${m.label}`,
            garmentType: key,
            modelId: m.id,
          });
      }
    }
    for (const [gtype, list] of Object.entries(CUSTOMIZATIONS)) {
      for (const c of list) {
        if (c.label.toLowerCase().includes(q) || c.id.includes(q))
          hits.push({
            type: "cust",
            label: c.label,
            garmentType: gtype,
            custId: c.id,
          });
      }
    }

    if (hits.length === 0) {
      results.innerHTML =
        '<div class="cfg-search-empty">No results found</div>';
    } else {
      results.innerHTML = hits
        .map((h) => {
          if (h.type === "creator")
            return `<button class="cfg-search-item" type="button" data-search-creator="${h.id}"><strong>${h.label}</strong><br><span style="font-size:12px;color:var(--text-tertiary)">${escHtml(h.sub)}</span></button>`;
          if (h.type === "garment")
            return `<button class="cfg-search-item" type="button" data-search-garment="${h.id}">${h.label}</button>`;
          if (h.type === "model")
            return `<button class="cfg-search-item" type="button" data-search-model="${h.garmentType}:${h.modelId}">${h.label}</button>`;
          return `<button class="cfg-search-item" type="button" data-search-cust="${h.garmentType}:${h.custId}">${h.label}</button>`;
        })
        .join("");
    }
    results.classList.add("open");
  }

  input.addEventListener("input", search);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cfg-search")) results.classList.remove("open");
  });
}

function listen() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;

  root.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;

    if (t.hasAttribute("data-has-garment")) {
      const v = t.dataset.hasGarment === "true";
      s.hasGarment = v;
      s.step = v ? "garment" : "no-garment";
      render();
      return;
    }

    if (t.hasAttribute("data-garment-type")) {
      s.garmentType = t.dataset.garmentType;
      s.model = null;
      s.customizations = [];
      render();
      return;
    }

    if (t.hasAttribute("data-model")) {
      s.model = t.dataset.model;
      render();
      return;
    }

    if (t.hasAttribute("data-color")) {
      s.color = t.dataset.color;
      const swatches = root.querySelectorAll("[data-color]");
      swatches.forEach((x) => x.classList.remove("active"));
      swatches.forEach((x) => {
        if (x.dataset.color === s.color) x.classList.add("active");
      });
      updateSidebar();
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

    if (t.hasAttribute("data-cust-opt")) {
      const i = parseInt(t.dataset.custOpt);
      const key = t.dataset.settingKey;
      const optId = t.dataset.optId;
      const c = s.customizations[i];
      if (c) {
        c.settings[key] = optId;
        const parent = t.closest(".cfg-opt-group") || t.parentNode;
        if (parent) {
          parent
            .querySelectorAll(".cfg-opt")
            .forEach((x) => x.classList.remove("active"));
          t.classList.add("active");
        }
        const el = document.getElementById("cfg-cust-content");
        if (el) el.innerHTML = renderCustContent();
        updateSidebar();
      }
      return;
    }

    if (t.id === "cfg-to-customize") {
      if (!s.model) return;
      s.step = "customize";
      render();
      return;
    }

    if (t.id === "cfg-to-review") {
      s.step = "review";
      render();
      return;
    }

    if (t.id === "cfg-back-garment") {
      s.step = "garment";
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
      Object.assign(s, initState());
      s.creator = s.creator;
      render();
      return;
    }

    if (t.id === "cfg-new-project") {
      Object.assign(s, initState());
      s.creator = s.creator;
      render();
      return;
    }

    if (t.id === "cfg-submit") {
      submitOrder();
      return;
    }

    if (t.hasAttribute("data-search-creator")) {
      navigate("/creator/" + t.dataset.searchCreator);
      return;
    }

    if (t.hasAttribute("data-search-garment")) {
      s.hasGarment = true;
      s.garmentType = t.dataset.searchGarment;
      s.step = "garment";
      render();
      return;
    }

    if (t.hasAttribute("data-search-model")) {
      const [gt, mid] = t.dataset.searchModel.split(":");
      s.hasGarment = true;
      s.garmentType = gt;
      s.model = mid;
      s.step = "customize";
      render();
      return;
    }

    if (t.hasAttribute("data-search-cust")) {
      const [gt, cid] = t.dataset.searchCust.split(":");
      s.hasGarment = true;
      s.garmentType = gt;
      s.step = "customize";
      const def = findCustDef(gt, cid);
      if (def && !s.customizations.find((x) => x.id === cid))
        addCustomization(cid);
      render();
    }
  });

  root.addEventListener("input", (e) => {
    const id = e.target.id;
    if (id === "cfg-brand") s.brand = e.target.value;
    else if (id.startsWith("f-")) s.form[id.replace("f-", "")] = e.target.value;
  });

  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-cust-setting]")) {
      const i = parseInt(e.target.dataset.custSetting);
      const key = e.target.dataset.settingKey;
      const c = s.customizations[i];
      if (c) {
        c.settings[key] = e.target.checked;
        const el = document.getElementById("cfg-cust-content");
        if (el) el.innerHTML = renderCustContent();
        updateSidebar();
      }
      return;
    }
    if (e.target.id === "f-terms") {
      s.form.acceptTerms = e.target.checked;
    }
  });
}

function addCustomization(id) {
  if (s.customizations.find((c) => c.id === id)) return;
  const def = findCustDef(s.garmentType, id);
  if (!def) return;
  const settings = {};
  for (const setting of def.settings) settings[setting.key] = setting.default;
  s.customizations.push({ id, settings, _open: true });
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
  const errEl = document.getElementById("cfg-form-err");

  s.form = { name, surname, email, instagram, phone, notes, acceptTerms };

  if (!name || !surname) {
    errEl.textContent = "Please enter your name and surname.";
    return;
  }
  if (!email) {
    errEl.textContent = "Please enter your email.";
    return;
  }
  if (!acceptTerms) {
    errEl.textContent = "Please accept the terms and conditions.";
    return;
  }

  errEl.textContent = "";
  s.submitting = true;
  render();

  const total = calculateTotal();
  const garmentLabel = GARMENT[s.garmentType]?.label || "";
  const modelLabel =
    s.garmentType && s.model
      ? GARMENT[s.garmentType].models.find((m) => m.id === s.model)?.label
      : "";
  const type = s.garmentType === "jeans" ? "jeans" : "maglia";
  const svg = renderSVG(type, {}, s.color, null, buildPreviewCfg());

  const custLines = s.customizations
    .map((c) => {
      const def = findCustDef(s.garmentType, c.id);
      if (!def) return "";
      const details = def.settings
        .map((st) => {
          const v = c.settings[st.key];
          if (st.type === "boolean") return `${st.label}: ${v ? "Yes" : "No"}`;
          const opt = st.options?.find((o) => o.id === v);
          return `${st.label}: ${opt ? opt.label : v}`;
        })
        .join(", ");
      return `${def.label} (${details})`;
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
        garmentLabel +
        (modelLabel ? " — " + modelLabel : "") +
        (s.brand ? " (" + s.brand + ")" : ""),
      colore: getColorLabel(s.color),
      modifiche: custLines || "Nessuna modifica",
      totale: "€" + total.toFixed(2),
      configurazione: svg || "",
    });
    s.submitting = false;
    s.submittedOk = true;
    render();
  } catch (e) {
    s.submitting = false;
    if (errEl) errEl.textContent = "Error: " + e.message;
    render();
  }
}

function renderChooseCreator() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;
  root.innerHTML = `
    <div style="text-align:center;padding:80px 20px">
      <h2 style="font-family:var(--font-heading);font-size:28px;font-weight:600;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:12px">Choose a professional first</h2>
      <p style="color:var(--text-secondary);margin-bottom:24px">Select a professional to start customizing your garment.</p>
      <a href="#/creator" class="cfg-btn cfg-btn-primary">Discover customizers →</a>
    </div>`;
}

export function initConfiguratore() {
  const params = getParams();
  s = initState();

  const creatorId = params.creator;
  if (creatorId) {
    const seller = getSeller(creatorId);
    if (seller) {
      s.creator = creatorId;
      render();
      return;
    }
  }

  renderChooseCreator();
}
