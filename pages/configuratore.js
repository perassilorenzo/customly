import { renderSVG, getColorLabel } from "../data/products.js";
import { send } from "../utils/formspree.js";

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

const CUSTOMIZATIONS = {
  jeans: [
    {
      id: "flared",
      label: "Bottom Triangle Panels (Flared)",
      desc: "Add triangular fabric panels to the bottom of the jeans to create a flared effect.",
      price: 15,
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
          label: "Choose size",
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
      label: "Side Triangle Panels",
      desc: "Allows widening the jeans from the ankle up to the pocket seam.",
      price: 18,
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
          label: "Choose size",
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
      label: "Bottom Hem",
      desc: "Choose the finish for the bottom of the jeans.",
      price: 5,
      settings: [
        {
          key: "finish",
          label: "Choose finish",
          type: "select",
          default: "standard",
          options: [
            { id: "standard", label: "Standard hem", price: 0 },
            { id: "raw-cut", label: "Raw cut", price: 3 },
            {
              id: "frayed",
              label: "Frayed hem with visible white threads",
              price: 5,
            },
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
      settings: [
        {
          key: "length",
          label: "Choose crop length",
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
      id: "shorten",
      label: "Shorten Shirt",
      desc: "Shorten the overall length of the shirt.",
      price: 8,
      settings: [
        {
          key: "length",
          label: "Choose new length",
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
      desc: "Shorten the sleeves while keeping the original sewn hem.",
      price: 6,
      settings: [
        {
          key: "amount",
          label: "Choose amount",
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
      desc: "Cuts the sleeves completely to create a tank top.",
      price: 5,
      settings: [],
    },
  ],
};

function initState() {
  return {
    step: "start",
    hasGarment: null,
    garmentType: null,
    model: null,
    brand: "",
    customizations: [],
    color: "#c13535",
    idCounter: 0,
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
    submitted: false,
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

  root.innerHTML = `
    <div class="cfg-layout">
      <div class="cfg-main">
        <div class="cfg-search">
          <div class="cfg-search-bar">
            <svg class="cfg-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" id="cfg-search-input" placeholder="Search products or start customizing..." autocomplete="off">
          </div>
          <div id="cfg-search-results" class="cfg-search-results"></div>
        </div>
        ${renderCurrentStep()}
      </div>
      <div class="cfg-sidebar" id="cfg-sidebar">${renderSummary()}</div>
    </div>
  `;

  bindSearch();
  bindStepEvents();
  updateSidebar();
}

function renderCurrentStep() {
  if (s.submittedOk) return renderDone();
  if (s.step === "start") return renderStepStart();
  if (s.step === "garment") return renderStepGarment();
  if (s.step === "customize") return renderStepCustomize();
  if (s.step === "review") return renderStepReview();
  return "";
}

function renderDone() {
  return `
    <div class="cfg-done">
      <div class="cfg-done-icon">✓</div>
      <h2>Richiesta inviata!</h2>
      <p>La tua configurazione è stata ricevuta. Il venditore ti contatterà con un preventivo.</p>
      <button class="cfg-btn cfg-btn-primary" onclick="location.reload()">Nuova configurazione</button>
    </div>
  `;
}

function renderStepStart() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 1</span>
        <h2>Do you already have a garment?</h2>
      </div>
      <div class="cfg-choice-grid">
        <button class="cfg-choice-card${s.hasGarment === true ? " active" : ""}" data-has-garment="true">
          <span class="cfg-choice-icon">✓</span>
          <span class="cfg-choice-label">Yes</span>
          <span class="cfg-choice-desc">I have a garment to customize</span>
        </button>
        <button class="cfg-choice-card${s.hasGarment === false ? " active" : ""}" data-has-garment="false">
          <span class="cfg-choice-icon">✕</span>
          <span class="cfg-choice-label">No</span>
          <span class="cfg-choice-desc">I want to buy from a vendor</span>
        </button>
      </div>
    </div>
  `;
}

function renderStepGarment() {
  const types = Object.entries(GARMENT);
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 2</span>
        <h2>Select your garment</h2>
      </div>
      <div class="cfg-type-grid">
        ${types
          .map(
            ([id, g]) => `
          <button class="cfg-type-card${s.garmentType === id ? " active" : ""}" data-garment-type="${id}">
            <span class="cfg-type-icon">${g.icon}</span>
            <span class="cfg-type-label">${g.label}</span>
          </button>
        `,
          )
          .join("")}
      </div>
      ${
        s.garmentType
          ? `
        <div class="cfg-section">
          <h3 class="cfg-section-title">Choose the model</h3>
          <div class="cfg-opt-group">
            ${GARMENT[s.garmentType].models
              .map(
                (m) => `
              <button class="cfg-opt${s.model === m.id ? " active" : ""}" data-model="${m.id}">${m.label}</button>
            `,
              )
              .join("")}
          </div>
        </div>
        <div class="cfg-section">
          <h3 class="cfg-section-title">Brand <span class="cfg-optional">(optional)</span></h3>
          <input class="cfg-input" id="cfg-brand" type="text" placeholder="e.g. Nike, Zara, Vintage, Blank..." value="${escHtml(s.brand)}">
        </div>
        <button class="cfg-btn cfg-btn-primary cfg-btn-next" id="cfg-to-customize">Continue to Customizations →</button>
      `
          : ""
      }
    </div>
  `;
}

function renderStepCustomize() {
  const defs = CUSTOMIZATIONS[s.garmentType] || [];
  const available = defs.filter(
    (d) => !s.customizations.find((c) => c.id === d.id),
  );

  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 3</span>
        <h2>Customize your ${GARMENT[s.garmentType].label}</h2>
      </div>
      <div class="cfg-section">
        <h3 class="cfg-section-title">Color</h3>
        <div class="cfg-color-grid">
          ${COLORS.map(
            (c) => `
            <button class="cfg-color-swatch${s.color === c.id ? " active" : ""}" data-color="${c.id}" style="--swatch:${c.id}" title="${c.label}">
              <span class="cfg-color-dot"></span>
            </button>
          `,
          ).join("")}
        </div>
      </div>
      ${s.customizations.map((c, i) => renderCustomizationItem(c, i)).join("")}
      ${
        available.length > 0
          ? `
        <div class="cfg-add-section">
          <button class="cfg-btn cfg-btn-secondary" id="cfg-show-add">+ Add customization</button>
          <div class="cfg-add-dropdown" id="cfg-add-dropdown" style="display:none">
            ${available
              .map(
                (d) => `
              <button class="cfg-add-opt" data-add-cust="${d.id}">${d.label} <span class="cfg-price">+€${d.price}</span></button>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
      <div class="cfg-step-actions">
        <button class="cfg-btn cfg-btn-ghost" id="cfg-back-garment">← Back</button>
        <button class="cfg-btn cfg-btn-primary cfg-btn-next" id="cfg-to-review">Review Order →</button>
      </div>
    </div>
  `;
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
        </div>
      `;
      }
      if (setting.type === "select") {
        const optHtml = setting.options
          .map(
            (o) => `
        <button class="cfg-opt${val === o.id ? " active" : ""}" data-cust-opt="${i}" data-setting-key="${setting.key}" data-opt-id="${o.id}">${o.label}${o.price ? ` <span class="cfg-price">+€${o.price}</span>` : ""}</button>
      `,
          )
          .join("");
        return `
        <div class="cfg-setting">
          <span class="cfg-setting-label">${setting.label}</span>
          <div class="cfg-opt-group">${optHtml}</div>
        </div>
      `;
      }
      return "";
    })
    .join("");

  return `
    <div class="cfg-cust-item">
      <div class="cfg-cust-header" data-toggle-cust="${i}">
        <div class="cfg-cust-info">
          <span class="cfg-cust-name">${def.label}</span>
          <span class="cfg-cust-price">+€${custPrice(c)}</span>
        </div>
        <div class="cfg-cust-actions">
          <button class="cfg-cust-toggle" data-toggle-cust="${i}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="${open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}"/></svg>
          </button>
          <button class="cfg-cust-remove" data-remove-cust="${i}">✕</button>
        </div>
      </div>
      <div class="cfg-cust-settings" style="display:${open ? "block" : "none"}">
        ${settingRows}
      </div>
    </div>
  `;
}

function renderStepReview() {
  return `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">Step 4</span>
        <h2>Review & Order</h2>
      </div>
      <div class="cfg-section">
        <h3 class="cfg-section-title">Your Information</h3>
        <div class="cfg-form-grid">
          <input class="cfg-input" id="f-name" type="text" placeholder="Name *" value="${escHtml(s.form.name)}">
          <input class="cfg-input" id="f-surname" type="text" placeholder="Surname *" value="${escHtml(s.form.surname)}">
          <input class="cfg-input" id="f-email" type="email" placeholder="Email *" value="${escHtml(s.form.email)}">
          <input class="cfg-input" id="f-instagram" type="text" placeholder="Instagram (optional)" value="${escHtml(s.form.instagram)}">
          <input class="cfg-input" id="f-phone" type="text" placeholder="Phone (optional)" value="${escHtml(s.form.phone)}">
        </div>
        <textarea class="cfg-input cfg-textarea" id="f-notes" placeholder="Additional notes (optional)">${escHtml(s.form.notes)}</textarea>
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
        <button class="cfg-btn cfg-btn-ghost" id="cfg-back-customize">← Back</button>
        <button class="cfg-btn cfg-btn-primary" id="cfg-submit" ${s.submitting ? "disabled" : ""}>${s.submitting ? "Sending..." : "Submit Order"}</button>
      </div>
    </div>
  `;
}

function renderSummary() {
  if (s.submittedOk) return "";
  const garmentInfo = s.garmentType ? GARMENT[s.garmentType] : null;
  const modelLabel =
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
      <h3 class="cfg-summary-title">Order Summary</h3>
      ${
        garmentInfo
          ? `
        <div class="cfg-summary-row">
          <span class="cfg-summary-label">Garment</span>
          <span class="cfg-summary-value">${garmentInfo.label}</span>
        </div>
      `
          : ""
      }
      ${
        modelLabel
          ? `
        <div class="cfg-summary-row">
          <span class="cfg-summary-label">Model</span>
          <span class="cfg-summary-value">${modelLabel}</span>
        </div>
      `
          : ""
      }
      ${
        s.brand
          ? `
        <div class="cfg-summary-row">
          <span class="cfg-summary-label">Brand</span>
          <span class="cfg-summary-value">${escHtml(s.brand)}</span>
        </div>
      `
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
          </div>
        `;
        })
        .join("")}
      <div class="cfg-summary-divider"></div>
      <div class="cfg-summary-total">
        <span>Total</span>
        <span class="cfg-summary-amount">€${total.toFixed(2)}</span>
      </div>
      <div class="cfg-summary-edit" id="cfg-edit-cust">
        <button class="cfg-btn cfg-btn-ghost cfg-btn-small" id="cfg-back-to-cust">Edit customizations</button>
      </div>
    </div>
  `;
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
    const hasCrop = s.customizations.find((c) => c.id === "crop");
    if (hasCrop) cfg.cropped = true;
    const hasShorten = s.customizations.find((c) => c.id === "shorten");
    if (hasShorten) cfg.length = "short";
    const hasRemove = s.customizations.find((c) => c.id === "remove-sleeves");
    if (hasRemove) cfg.sleeves = "none";
  }
  if (s.garmentType === "jeans") {
    const m = GARMENT.jeans.models.find((x) => x.id === s.model);
    if (m) cfg.leg = m.id;
    const hasFlared = s.customizations.find((c) => c.id === "flared");
    if (hasFlared) cfg.leg = "flared";
    const hasSideP = s.customizations.find((c) => c.id === "side-panels");
    if (hasSideP && !hasFlared) cfg.leg = "wide";
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

    for (const [key, g] of Object.entries(GARMENT)) {
      if (g.label.toLowerCase().includes(q) || key.includes(q)) {
        hits.push({ type: "garment", label: g.label, id: key });
      }
      for (const m of g.models) {
        if (m.label.toLowerCase().includes(q) || m.id.includes(q)) {
          hits.push({
            type: "model",
            label: `${g.label} — ${m.label}`,
            garmentType: key,
            modelId: m.id,
          });
        }
      }
    }

    for (const [gtype, list] of Object.entries(CUSTOMIZATIONS)) {
      for (const c of list) {
        if (c.label.toLowerCase().includes(q) || c.id.includes(q)) {
          hits.push({
            type: "cust",
            label: c.label,
            garmentType: gtype,
            custId: c.id,
          });
        }
      }
    }

    if (hits.length === 0) {
      results.innerHTML =
        '<div class="cfg-search-empty">No results found</div>';
    } else {
      results.innerHTML = hits
        .map((h) => {
          if (h.type === "garment")
            return `<button class="cfg-search-item" data-search-garment="${h.id}">${h.label}</button>`;
          if (h.type === "model")
            return `<button class="cfg-search-item" data-search-model="${h.garmentType}:${h.modelId}">${h.label}</button>`;
          return `<button class="cfg-search-item" data-search-cust="${h.garmentType}:${h.custId}">${h.label}</button>`;
        })
        .join("");
    }
    results.classList.add("open");

    results.querySelectorAll("[data-search-garment]").forEach((el) => {
      el.addEventListener("click", () => {
        s.hasGarment = true;
        s.garmentType = el.dataset.searchGarment;
        s.step = "garment";
        input.value = "";
        results.innerHTML = "";
        results.classList.remove("open");
        render();
      });
    });
    results.querySelectorAll("[data-search-model]").forEach((el) => {
      const [gt, mid] = el.dataset.searchModel.split(":");
      s.hasGarment = true;
      s.garmentType = gt;
      s.model = mid;
      s.step = "customize";
      input.value = "";
      results.innerHTML = "";
      results.classList.remove("open");
      render();
    });
    results.querySelectorAll("[data-search-cust]").forEach((el) => {
      const [gt, cid] = el.dataset.searchCust.split(":");
      s.hasGarment = true;
      s.garmentType = gt;
      s.step = "customize";
      const def = findCustDef(gt, cid);
      if (def && !s.customizations.find((x) => x.id === cid)) {
        addCustomization(cid);
      }
      input.value = "";
      results.innerHTML = "";
      results.classList.remove("open");
      render();
    });
  }

  input.addEventListener("input", search);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cfg-search")) {
      results.classList.remove("open");
    }
  });
}

function bindStepEvents() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;

  root.querySelectorAll("[data-has-garment]").forEach((el) => {
    el.addEventListener("click", () => {
      const v = el.dataset.hasGarment === "true";
      s.hasGarment = v;
      if (v) {
        s.step = "garment";
      } else {
        s.step = null;
        renderNoGarment();
        return;
      }
      render();
    });
  });

  root.querySelectorAll("[data-garment-type]").forEach((el) => {
    el.addEventListener("click", () => {
      s.garmentType = el.dataset.garmentType;
      s.model = null;
      s.customizations = [];
      render();
    });
  });

  root.querySelectorAll("[data-model]").forEach((el) => {
    el.addEventListener("click", () => {
      s.model = el.dataset.model;
      render();
    });
  });

  const brandInput = document.getElementById("cfg-brand");
  if (brandInput) {
    brandInput.addEventListener("input", () => {
      s.brand = brandInput.value;
    });
  }

  document.getElementById("cfg-to-customize")?.addEventListener("click", () => {
    if (!s.model) return;
    s.step = "customize";
    render();
  });

  document.getElementById("cfg-to-review")?.addEventListener("click", () => {
    s.step = "review";
    render();
  });

  document.getElementById("cfg-back-garment")?.addEventListener("click", () => {
    s.step = "garment";
    render();
  });

  document
    .getElementById("cfg-back-customize")
    ?.addEventListener("click", () => {
      s.step = "customize";
      bindFormState();
      render();
    });

  document.getElementById("cfg-back-to-cust")?.addEventListener("click", () => {
    s.step = "customize";
    render();
  });

  // Color
  root.querySelectorAll("[data-color]").forEach((el) => {
    el.addEventListener("click", () => {
      s.color = el.dataset.color;
      root
        .querySelectorAll("[data-color]")
        .forEach((x) => x.classList.remove("active"));
      el.classList.add("active");
      updateSidebar();
    });
  });

  // Add customization dropdown
  document.getElementById("cfg-show-add")?.addEventListener("click", () => {
    const dd = document.getElementById("cfg-add-dropdown");
    if (dd) dd.style.display = dd.style.display === "none" ? "block" : "none";
  });

  root.querySelectorAll("[data-add-cust]").forEach((el) => {
    el.addEventListener("click", () => {
      addCustomization(el.dataset.addCust);
      render();
    });
  });

  // Toggle customization panel
  root.querySelectorAll("[data-toggle-cust]").forEach((el) => {
    el.addEventListener("click", () => {
      const i = parseInt(el.dataset.toggleCust);
      const c = s.customizations[i];
      if (c) c._open = !c._open;
      render();
    });
  });

  // Remove customization
  root.querySelectorAll("[data-remove-cust]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const i = parseInt(el.dataset.removeCust);
      s.customizations.splice(i, 1);
      render();
    });
  });

  // Setting toggles
  root.querySelectorAll("[data-cust-setting]").forEach((el) => {
    el.addEventListener("change", () => {
      const i = parseInt(el.dataset.custSetting);
      const key = el.dataset.settingKey;
      const c = s.customizations[i];
      if (c) {
        c.settings[key] = el.checked;
        render();
      }
    });
  });

  // Setting selects
  root.querySelectorAll("[data-cust-opt]").forEach((el) => {
    el.addEventListener("click", () => {
      const i = parseInt(el.dataset.custOpt);
      const key = el.dataset.settingKey;
      const optId = el.dataset.optId;
      const c = s.customizations[i];
      if (c) {
        c.settings[key] = optId;
        render();
      }
    });
  });

  // Form fields
  [
    "f-name",
    "f-surname",
    "f-email",
    "f-instagram",
    "f-phone",
    "f-notes",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        s.form[id.replace("f-", "")] = el.value;
      });
    }
  });
  const terms = document.getElementById("f-terms");
  if (terms) {
    terms.addEventListener("change", () => {
      s.form.acceptTerms = terms.checked;
    });
  }

  document.getElementById("cfg-submit")?.addEventListener("click", submitOrder);
}

function renderNoGarment() {
  const root = document.getElementById("configuratore-root");
  if (!root) return;
  const main = root.querySelector(".cfg-main");
  if (!main) return;
  main.innerHTML = `
    <div class="cfg-step">
      <div class="cfg-step-header">
        <span class="cfg-step-num">No garment?</span>
        <h2>Browse our vendors</h2>
        <p>Check out our vendors to find the perfect piece to customize.</p>
      </div>
      <div class="cfg-vendor-cta">
        <a class="cfg-btn cfg-btn-primary" href="#/venditori">Browse Vendors →</a>
        <button class="cfg-btn cfg-btn-ghost" id="cfg-back-start">← Start over</button>
      </div>
    </div>
  `;
  document.getElementById("cfg-back-start")?.addEventListener("click", () => {
    Object.assign(s, initState());
    render();
  });
}

function addCustomization(id) {
  if (s.customizations.find((c) => c.id === id)) return;
  const def = findCustDef(s.garmentType, id);
  if (!def) return;
  const settings = {};
  for (const setting of def.settings) {
    settings[setting.key] = setting.default;
  }
  s.customizations.push({ id, settings, _open: true });
}

function updateSidebar() {
  const sidebar = document.getElementById("cfg-sidebar");
  if (!sidebar) return;
  sidebar.innerHTML = renderSummary();
  const backBtn = document.getElementById("cfg-back-to-cust");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      s.step = "customize";
      render();
    });
  }
}

function bindFormState() {
  for (const key of [
    "name",
    "surname",
    "email",
    "instagram",
    "phone",
    "notes",
  ]) {
    const el = document.getElementById("f-" + key);
    if (el) el.value = s.form[key];
  }
  const terms = document.getElementById("f-terms");
  if (terms) terms.checked = s.form.acceptTerms;
}

async function submitOrder() {
  const name = document.getElementById("f-name")?.value || "";
  const surname = document.getElementById("f-surname")?.value || "";
  const email = document.getElementById("f-email")?.value || "";
  const instagram = document.getElementById("f-instagram")?.value || "";
  const phone = document.getElementById("f-phone")?.value || "";
  const notes = document.getElementById("f-notes")?.value || "";
  const acceptTerms = document.getElementById("f-terms")?.checked || false;
  const errEl = document.getElementById("cfg-form-err");

  s.form = { name, surname, email, instagram, phone, notes, acceptTerms };

  if (!name.trim() || !surname.trim()) {
    errEl.textContent = "Please enter your name and surname.";
    return;
  }
  if (!email.trim()) {
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
  const previewCfg = buildPreviewCfg();
  const svg = renderSVG(type, {}, s.color, null, previewCfg);

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
      type: "configurazione",
      mode: "own",
      name: (name + " " + surname).trim(),
      email: email.trim(),
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

export function initConfiguratore() {
  s = initState();
  render();
}
