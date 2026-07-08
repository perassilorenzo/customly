import { renderSVG, getColorLabel } from "../data/products.js";
import { garmentTypes, getGarmentType } from "../data/garment-types.js";
import { getSeller, searchSellers, getAllSellers } from "../data/sellers.js";
import { send } from "../utils/formspree.js";
import { navigate, getParams } from "../utils/router.js";

const COLORS = [
  { id: "#c13535", label: "Rosso" },
  { id: "#1a1410", label: "Nero" },
  { id: "#2d5a3d", label: "Verde" },
  { id: "#8b7355", label: "Cuoio" },
  { id: "#f5f0eb", label: "Crema" },
  { id: "#4a6fa5", label: "Denim" },
  { id: "#d4a017", label: "Oro" },
];

const state = {
  mode: "own",
  seller: null,
  product: null,
  garmentType: "maglia",
  selections: {},
  color: "#c13535",
};

export function renderConfiguratore() {
  return `
<div class="page">
  <div class="container">
    <div class="section-header">
      <span class="label">Configuratore</span>
      <h2>Progetta il tuo capo</h2>
      <p>Hai un capo da modificare o vuoi crearne uno da zero? Scegli e inizia a personalizzare.</p>
    </div>

    <div id="seller-search-section">
      <div class="seller-search-bar">
        <input type="text" id="seller-search-input" placeholder="Cerca un venditore..." autocomplete="off">
        <button class="btn btn-primary" id="seller-search-btn">Cerca</button>
      </div>
      <div id="seller-search-results" class="seller-search-results"></div>
    </div>

    <div id="config-content">
      <div class="mode-selector">
        <button class="opt-btn active" data-mode="own">Ho gi\u00e0 un capo</button>
        <button class="opt-btn" data-mode="seller">Non ho un capo (acquista da un venditore)</button>
      </div>

      <div class="config-layout">
        <div id="config-controls"></div>
        <div>
          <div class="config-preview" id="preview"><p style="color:var(--text-secondary);font-size:14px">Seleziona le opzioni per vedere l&rsquo;anteprima</p></div>
          <div class="riepilogo" id="riepilogo"></div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function getSelections() {
  const opts = getActiveOptions();
  if (!opts) return {};
  const sel = {};
  for (const [g, grp] of Object.entries(opts)) {
    if (grp.type === "single") sel[g] = state.selections[g] || grp.default;
    else if (grp.type === "multi") sel[g] = state.selections[g] || [];
  }
  return sel;
}

function getActiveOptions() {
  if (state.mode === "own") {
    const g = getGarmentType(state.garmentType);
    return g ? g.modifications : null;
  }
  if (state.mode === "seller" && state.product) {
    return state.product.options || null;
  }
  return null;
}

function getBasePrice() {
  if (state.mode === "own") return 0;
  if (state.mode === "seller" && state.product)
    return state.product.basePrice || 0;
  return 0;
}

function getPrice() {
  let total = getBasePrice();
  const opts = getActiveOptions();
  if (!opts) return total;
  const sel = getSelections();
  for (const [g, val] of Object.entries(sel)) {
    const grp = opts[g];
    if (!grp) continue;
    if (grp.type === "single") {
      const v = grp.values.find((x) => x.id === val);
      if (v) total += v.price;
    } else if (grp.type === "multi" && Array.isArray(val)) {
      for (const vid of val) {
        const v = grp.values.find((x) => x.id === vid);
        if (v) total += v.price;
      }
    }
  }
  return total;
}

function getProductType() {
  if (state.mode === "own") return state.garmentType;
  if (state.mode === "seller" && state.product) {
    if (state.product.type === "jeans") return "jeans";
    if (state.product.type === "felpa") return "felpa";
    return "maglia";
  }
  return "maglia";
}

function renderControls() {
  const el = document.getElementById("config-controls");
  if (!el) return;
  const sel = getSelections();
  const opts = getActiveOptions();
  let html = "";

  if (state.mode === "own") {
    html += `<div class="config-section"><h3>Che capo hai?</h3><div class="opt-grid">`;
    for (const [id, gt] of Object.entries(garmentTypes)) {
      html += `<button class="opt-btn${state.garmentType === id ? " active" : ""}" data-gt="${id}">${gt.name}</button>`;
    }
    html += `</div></div>`;

    const gt = getGarmentType(state.garmentType);
    if (gt && gt.desc) {
      html += `<p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px;line-height:1.6">${gt.desc}</p>`;
    }
  }

  if (state.mode === "seller" && state.seller) {
    if (state.product) {
      html += `<div class="seller-badge"><span class="seller-badge-name">${state.seller.name}</span> <span style="font-size:12px;color:var(--text-secondary)">— ${state.seller.tagline}</span> <button class="seller-badge-change" data-clear-seller>Cambia</button></div>`;
    } else {
      html += `<div class="seller-profile">
        <h3 class="seller-profile-name">${state.seller.name}</h3>
        <p class="seller-profile-tagline">${state.seller.tagline}</p>
        <div class="seller-profile-section">
          <h4>Chi &egrave;</h4>
          <p>${state.seller.bio}</p>
        </div>
        <div class="seller-profile-section">
          <h4>Stile</h4>
          <p>${state.seller.style}</p>
        </div>
        <div class="seller-profile-section">
          <h4>Contatti</h4>
          <p>${state.seller.contacts.instagram ? '<a href="' + state.seller.contacts.instagram + '" target="_blank" style="color:var(--accent)">Instagram</a>' : ""}${state.seller.contacts.instagram && state.seller.contacts.email ? " · " : ""}${state.seller.contacts.email ? '<a href="mailto:' + state.seller.contacts.email + '" style="color:var(--accent)">' + state.seller.contacts.email + "</a>" : ""}</p>
        </div>
        <button class="btn btn-secondary" data-clear-seller style="margin-top:12px;font-size:12px;padding:8px 20px">Cambia venditore</button>
      </div>`;
    }
    if (state.product) {
      html += `<p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;line-height:1.6">${state.product.desc}</p>`;
    }
  }

  if (state.mode === "seller" && state.seller && state.product === null) {
    html += `<div class="config-section"><h3>Scegli un prodotto</h3><div class="opt-grid">`;
    for (const p of state.seller.products) {
      html += `<button class="opt-btn" data-prod="${p.id}">${p.name} &mdash; da &euro;${p.basePrice}</button>`;
    }
    html += `</div></div>`;

    el.innerHTML = html;
    bindProductSelection();
    bindOwnGarmentType();
    bindClearSeller();
    return;
  }

  if (state.mode === "seller" && !state.seller) {
    html += `<p style="font-size:14px;color:var(--text-secondary);line-height:1.8">Cerca un venditore sopra per vedere i suoi prodotti e iniziare a configurare.</p>`;
    el.innerHTML = html;
    return;
  }

  if (!opts) {
    if (state.mode === "seller" && state.seller && state.product) {
      html += `<p style="font-size:14px;color:var(--text-secondary)">Nessuna opzione disponibile per questo prodotto.</p>`;
    } else {
      html += `<p style="font-size:14px;color:var(--text-secondary)">Seleziona un capo per iniziare.</p>`;
    }
    el.innerHTML = html;
    return;
  }

  html += `<div class="config-section"><h3>Colore</h3><div class="opt-grid">`;
  for (const c of COLORS) {
    const active = state.color === c.id;
    html += `<button class="opt-btn${active ? " active" : ""}" data-color="${c.id}"><span class="color-dot" style="background:${c.id}"></span>${c.label}</button>`;
  }
  html += `</div></div>`;

  for (const [key, grp] of Object.entries(opts)) {
    html += `<div class="config-section"><h3>${grp.label}</h3><div class="opt-grid" data-group="${key}">`;
    for (const v of grp.values) {
      const selected =
        grp.type === "single"
          ? sel[key] === v.id || (!sel[key] && grp.default === v.id)
          : (sel[key] || []).includes(v.id);
      const cls = selected ? " active" : "";
      html += `<button class="opt-btn${cls}" data-opt="${v.id}" data-type="${grp.type}">${v.label}${v.price > 0 ? ` <span class="opt-price">+&euro;${v.price}</span>` : ""}</button>`;
    }
    html += `</div></div>`;
  }

  el.innerHTML = html;
  bindEvents();
  renderPreview();
  renderRiepilogo();
}

function bindEvents() {
  document.querySelectorAll("[data-gt]").forEach((b) => {
    b.addEventListener("click", () => {
      state.garmentType = b.dataset.gt;
      state.selections = {};
      renderControls();
    });
  });

  document.querySelectorAll("[data-prod]").forEach((b) => {
    b.addEventListener("click", () => {
      if (!state.seller) return;
      const p = state.seller.products.find((x) => x.id === b.dataset.prod);
      if (p) {
        state.product = p;
        state.selections = {};
        renderControls();
      }
    });
  });

  document.querySelectorAll("[data-color]").forEach((b) => {
    b.addEventListener("click", () => {
      state.color = b.dataset.color;
      document
        .querySelectorAll("[data-color]")
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      renderPreview();
      renderRiepilogo();
    });
  });

  document.querySelectorAll("[data-opt][data-type='single']").forEach((b) => {
    b.addEventListener("click", () => {
      const g = b.closest("[data-group]").dataset.group;
      state.selections[g] = b.dataset.opt;
      b.closest("[data-group]")
        .querySelectorAll("[data-opt]")
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      renderPreview();
      renderRiepilogo();
    });
  });

  document.querySelectorAll("[data-opt][data-type='multi']").forEach((b) => {
    b.addEventListener("click", () => {
      const g = b.closest("[data-group]").dataset.group;
      if (!state.selections[g]) state.selections[g] = [];
      const arr = state.selections[g];
      const id = b.dataset.opt;
      if (arr.includes(id)) {
        state.selections[g] = arr.filter((x) => x !== id);
        b.classList.remove("active");
      } else {
        arr.push(id);
        b.classList.add("active");
      }
      renderPreview();
      renderRiepilogo();
    });
  });

  document.querySelectorAll("[data-clear-seller]").forEach((b) => {
    b.addEventListener("click", () => {
      state.seller = null;
      state.product = null;
      state.selections = {};
      renderControls();
      renderPreview();
      renderRiepilogo();
    });
  });
}

function bindProductSelection() {
  document.querySelectorAll("[data-prod]").forEach((b) => {
    b.addEventListener("click", () => {
      if (!state.seller) return;
      const p = state.seller.products.find((x) => x.id === b.dataset.prod);
      if (p) {
        state.product = p;
        state.selections = {};
        renderControls();
      }
    });
  });
}

function bindOwnGarmentType() {
  document.querySelectorAll("[data-gt]").forEach((b) => {
    b.addEventListener("click", () => {
      state.garmentType = b.dataset.gt;
      state.selections = {};
      renderControls();
    });
  });
}

function bindClearSeller() {
  document.querySelectorAll("[data-clear-seller]").forEach((b) => {
    b.addEventListener("click", () => {
      state.seller = null;
      state.product = null;
      state.selections = {};
      renderControls();
      renderPreview();
      renderRiepilogo();
    });
  });
}

function renderPreview() {
  const el = document.getElementById("preview");
  if (!el) return;
  const type = getProductType();
  const sel = getSelections();
  const svg = renderSVG(type, sel, state.color);
  el.innerHTML =
    svg ||
    '<p style="color:var(--text-secondary);font-size:14px">Anteprima non disponibile</p>';
}

function renderRiepilogo() {
  const el = document.getElementById("riepilogo");
  if (!el) return;
  const sel = getSelections();
  const total = getPrice();
  const opts = getActiveOptions();
  const basePrice = getBasePrice();

  let html = `<h3>Riepilogo ordine</h3>`;

  if (state.mode === "own") {
    const gt = getGarmentType(state.garmentType);
    html += `<div class="riep-row"><span class="l">Capo</span><span class="v">${gt ? gt.name : "—"}</span></div>`;
  }

  if (state.mode === "seller") {
    if (state.seller)
      html += `<div class="riep-row"><span class="l">Venditore</span><span class="v">${state.seller.name}</span></div>`;
    if (state.product)
      html += `<div class="riep-row"><span class="l">Prodotto</span><span class="v">${state.product.name}</span></div>`;
  }

  html += `<div class="riep-row"><span class="l">Colore</span><span class="v">${getColorLabel(state.color)}</span></div>`;

  if (opts) {
    for (const [g, val] of Object.entries(sel)) {
      const grp = opts[g];
      if (!grp) continue;
      let vals = "";
      if (grp.type === "single") {
        const v = grp.values.find((x) => x.id === val);
        if (v) vals = v.label;
      } else if (Array.isArray(val)) {
        vals =
          val
            .map((vid) => grp.values.find((x) => x.id === vid))
            .filter(Boolean)
            .map((x) => x.label)
            .join(", ") || "—";
      }
      if (vals)
        html += `<div class="riep-row"><span class="l">${grp.label}</span><span class="v">${vals}</span></div>`;
    }
  }

  if (basePrice > 0) {
    html += `<div class="riep-row"><span class="l">Base</span><span class="v">&euro;${basePrice.toFixed(2)}</span></div>`;
  }

  html += `<div class="riep-totale"><span>Totale</span><span class="amt">&euro;${total.toFixed(2)}</span></div>`;

  html += `<div class="riep-form" id="order-form">
    <div id="form-err"></div>
    <input type="text" id="f-name" placeholder="Nome *">
    <input type="email" id="f-email" placeholder="Email *">
    <input type="text" id="f-contact" placeholder="Instagram / Telefono (opzionale)">
    <textarea id="f-note" placeholder="Note aggiuntive (opzionale)" rows="2"></textarea>
    <button class="btn btn-primary" id="btn-order" style="width:100%;justify-content:center">Invia richiesta</button>
  </div>`;

  el.innerHTML = html;
  document.getElementById("btn-order")?.addEventListener("click", submitOrder);
}

function getModificaDetails() {
  const opts = getActiveOptions();
  const sel = getSelections();
  if (!opts) return "";
  const lines = [];
  for (const [g, val] of Object.entries(sel)) {
    const grp = opts[g];
    if (!grp) continue;
    if (grp.type === "single") {
      const v = grp.values.find((x) => x.id === val);
      if (v)
        lines.push(
          `${grp.label}: ${v.label}${v.price > 0 ? " (+€" + v.price + ")" : ""}`,
        );
    } else if (Array.isArray(val)) {
      const labels = val
        .map((vid) => grp.values.find((x) => x.id === vid))
        .filter(Boolean);
      if (labels.length)
        lines.push(
          `${grp.label}: ${labels.map((x) => x.label + (x.price > 0 ? " (+€" + x.price + ")" : "")).join(", ")}`,
        );
    }
  }
  return lines.join("\n");
}

async function submitOrder() {
  const name = document.getElementById("f-name")?.value || "";
  const email = document.getElementById("f-email")?.value || "";
  const contact = document.getElementById("f-contact")?.value || "";
  const note = document.getElementById("f-note")?.value || "";
  const errEl = document.getElementById("form-err");
  const btn = document.getElementById("btn-order");

  if (!name.trim()) {
    errEl.innerHTML = '<div class="err-msg">Inserisci il nome</div>';
    return;
  }
  if (!email.trim()) {
    errEl.innerHTML = '<div class="err-msg">Inserisci l\'email</div>';
    return;
  }
  errEl.innerHTML = "";
  btn.disabled = true;
  btn.textContent = "Invio in corso...";

  const total = getPrice();
  const modifiche = getModificaDetails();
  const type = getProductType();
  const sel = getSelections();
  const svg = renderSVG(type, sel, state.color);
  const gt = getGarmentType(state.garmentType);

  let capoDesc = "";
  if (state.mode === "own") {
    capoDesc = gt ? gt.name : state.garmentType;
  } else if (state.mode === "seller") {
    capoDesc =
      (state.seller ? state.seller.name + " — " : "") +
      (state.product ? state.product.name : "");
  }

  try {
    await send({
      type: "configurazione",
      mode: state.mode === "own" ? "own" : "seller",
      name: name.trim(),
      email: email.trim(),
      contact: contact.trim() || "Non fornito",
      note: note.trim() || "Nessuna",
      capo: capoDesc,
      colore: getColorLabel(state.color),
      modifiche: modifiche || "Nessuna modifica",
      totale: "€" + total.toFixed(2),
      configurazione: svg || "",
    });
    document.getElementById("riepilogo").innerHTML = `
      <div class="done-box">
        <div class="check">&#10003;</div>
        <h3>Richiesta inviata!</h3>
        <p>La tua configurazione &egrave; stata ricevuta. Il venditore ti contatter&agrave; con un preventivo.</p>
        <button class="btn btn-primary" onclick="location.reload()">Nuova configurazione</button>
      </div>`;
  } catch (e) {
    errEl.innerHTML = `<div class="err-msg">Errore: ${e.message}</div>`;
    btn.disabled = false;
    btn.textContent = "Invia richiesta";
  }
}

function initSellerSearch() {
  const input = document.getElementById("seller-search-input");
  const results = document.getElementById("seller-search-results");
  if (!input || !results) return;

  function search() {
    const q = input.value;
    const sellers = searchSellers(q);
    if (sellers.length === 0) {
      results.innerHTML =
        '<div class="seller-search-empty">Nessun venditore trovato</div>';
      return;
    }
    results.innerHTML = sellers
      .map(
        (s) =>
          `<div class="seller-search-item" data-seller-id="${s.id}">
            <strong>${s.name}</strong>
            <span>${s.tagline}</span>
          </div>`,
      )
      .join("");
    results.querySelectorAll("[data-seller-id]").forEach((el) => {
      el.addEventListener("click", () => {
        selectSeller(el.dataset.sellerId);
      });
    });
  }

  input.addEventListener("input", search);
  document
    .getElementById("seller-search-btn")
    ?.addEventListener("click", search);
}

function selectSeller(id) {
  const s = getSeller(id);
  if (!s) return;
  state.mode = "seller";
  state.seller = s;
  state.product = s.products[0] || null;
  state.selections = {};
  document
    .querySelectorAll("[data-mode]")
    .forEach((b) => b.classList.toggle("active", b.dataset.mode === "seller"));
  document.getElementById("seller-search-input").value = "";
  document.getElementById("seller-search-results").innerHTML = "";
  renderControls();
  renderRiepilogo();
}

export function initConfiguratore() {
  const params = getParams();
  state.mode = "own";
  state.seller = null;
  state.product = null;
  state.garmentType = "maglia";
  state.selections = {};
  state.color = "#c13535";

  document.querySelectorAll("[data-mode]").forEach((b) => {
    b.addEventListener("click", () => {
      state.mode = b.dataset.mode;
      if (state.mode === "own") {
        state.seller = null;
        state.product = null;
        state.garmentType = "maglia";
        state.selections = {};
      } else {
        state.garmentType = null;
      }
      document
        .querySelectorAll("[data-mode]")
        .forEach((x) => x.classList.toggle("active", x === b));
      renderControls();
      renderRiepilogo();
      const preview = document.getElementById("preview");
      if (preview)
        preview.innerHTML =
          '<p style="color:var(--text-secondary);font-size:14px">Seleziona le opzioni per vedere l&rsquo;anteprima</p>';
    });
  });

  initSellerSearch();

  if (params.seller) {
    selectSeller(params.seller);
  } else {
    renderControls();
    renderRiepilogo();
  }
}
