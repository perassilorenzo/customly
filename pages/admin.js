import { getAllCustomizers } from "../data/customizers.js";
import { getStatus, setStatus } from "../utils/product-status.js";
import { getOrders, deleteOrder, clearOrders } from "../utils/formspree.js";

function esc(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderLogin() {
  let h = '<div class="page"><div class="container"><div class="admin-login">';
  h += '<div class="admin-login-card">';
  h += "<h2>Admin Panel</h2>";
  h += "<p>Inserisci la password per accedere.</p>";
  h +=
    '<input class="cfg-input" id="admin-pass" type="password" placeholder="Password" autofocus>';
  h += '<div id="admin-pass-err" class="cfg-form-err"></div>';
  h +=
    '<button class="cfg-btn cfg-btn-primary" id="admin-login-btn">Accedi</button>';
  h += "</div></div></div></div>";
  return h;
}

function renderProductList(customizers) {
  let h = "";
  for (const c of customizers) {
    h += '<div class="admin-customizer-group">';
    h += '<h3 class="admin-customizer-name">' + esc(c.name) + "</h3>";
    if (!c.products || !c.products.length) {
      h += '<p class="admin-empty">Nessun prodotto.</p>';
    } else {
      h += '<div class="admin-products">';
      for (const p of c.products) {
        const st = getStatus(p);
        h += '<div class="admin-product" data-admin-product="' + p.id + '">';
        h += '<div class="admin-product-img">';
        if (p.image)
          h +=
            '<img src="' +
            p.image +
            '" alt="' +
            esc(p.name) +
            '" loading="lazy">';
        h += "</div>";
        h += '<div class="admin-product-info">';
        h += '<span class="admin-product-name">' + esc(p.name) + "</span>";
        h += '<span class="admin-product-price">\u20ac' + p.price + "</span>";
        h += "</div>";
        h +=
          '<select class="admin-product-status" data-status-select="' +
          p.id +
          '" data-customizer-id="' +
          c.id +
          '">';
        h +=
          '<option value="available"' +
          (st === "available" ? " selected" : "") +
          ">Disponibile</option>";
        h +=
          '<option value="in_trattativa"' +
          (st === "in_trattativa" ? " selected" : "") +
          ">In trattativa</option>";
        h +=
          '<option value="sold"' +
          (st === "sold" ? " selected" : "") +
          ">Venduto</option>";
        h += "</select>";
        h += "</div>";
      }
      h += "</div>";
    }
    h += "</div>";
  }
  return h;
}

function renderOrderList(orders) {
  if (!orders.length)
    return '<p class="admin-empty">Nessun ordine ricevuto.</p>';
  let h = '<div class="admin-orders">';
  for (const o of orders) {
    h += '<div class="admin-order" data-order-id="' + o._id + '">';
    h += '<div class="admin-order-header">';
    h += '<span class="admin-order-name">' + esc(o.name) + "</span>";
    h +=
      '<span class="admin-order-date">' +
      new Date(o._ts).toLocaleDateString("it-IT") +
      "</span>";
    h +=
      '<button class="admin-order-delete" data-delete-order="' +
      o._id +
      '">\u2715</button>';
    h += "</div>";
    h += '<div class="admin-order-details">';
    h += "<span><strong>Email:</strong> " + esc(o.email) + "</span>";
    h += "<span><strong>Contatto:</strong> " + esc(o.contact) + "</span>";
    h += "<span><strong>Capo:</strong> " + esc(o.capo) + "</span>";
    h += "<span><strong>Modifiche:</strong> " + esc(o.modifiche) + "</span>";
    h += "<span><strong>Totale:</strong> " + esc(o.totale) + "</span>";
    if (o.note && o.note !== "Nessuna")
      h += "<span><strong>Note:</strong> " + esc(o.note) + "</span>";
    h += "</div></div>";
  }
  h += "</div>";
  return h;
}

function renderDashboard() {
  const customizers = getAllCustomizers();
  const orders = getOrders();
  const totalProducts = customizers.reduce(
    (n, c) => n + (c.products ? c.products.length : 0),
    0,
  );

  let h = '<div class="page"><div class="container"><div class="admin-panel">';
  h += '<div class="admin-header"><h1>Admin Panel</h1>';
  h +=
    '<button class="cfg-btn cfg-btn-ghost" id="admin-logout">Esci</button></div>';

  h += '<div class="admin-stats">';
  h +=
    '<div class="admin-stat"><span class="admin-stat-num">' +
    customizers.length +
    '</span><span class="admin-stat-label">Customizer</span></div>';
  h +=
    '<div class="admin-stat"><span class="admin-stat-num">' +
    totalProducts +
    '</span><span class="admin-stat-label">Prodotti</span></div>';
  h +=
    '<div class="admin-stat"><span class="admin-stat-num">' +
    orders.length +
    '</span><span class="admin-stat-label">Ordini</span></div>';
  h += "</div>";

  h +=
    '<div class="admin-section"><div class="admin-section-header"><h2>Prodotti</h2></div>';
  h += renderProductList(customizers);
  h += "</div>";

  h +=
    '<div class="admin-section"><div class="admin-section-header"><h2>Ordini ricevuti (' +
    orders.length +
    ")</h2>";
  if (orders.length)
    h +=
      '<button class="cfg-btn cfg-btn-ghost cfg-btn-small" id="admin-clear-orders">Cancella tutti</button>';
  h += "</div>";
  h += renderOrderList(orders);
  h += "</div>";

  h += "</div></div></div>";
  return h;
}

export function renderAdmin() {
  return '<div id="admin-root"></div>';
}

export function initAdmin() {
  const root = document.getElementById("admin-root");
  if (!root) return;

  let logged = sessionStorage.getItem("customly:admin") === "1";

  function paint() {
    root.innerHTML = logged ? renderDashboard() : renderLogin();
  }

  paint();

  root.addEventListener("click", (e) => {
    if (
      e.target.id === "admin-login-btn" ||
      e.target.closest("#admin-login-btn")
    ) {
      const pass = document.getElementById("admin-pass");
      if (pass && pass.value === "perassi2026") {
        sessionStorage.setItem("customly:admin", "1");
        logged = true;
        paint();
      } else {
        const err = document.getElementById("admin-pass-err");
        if (err) err.textContent = "Password errata.";
      }
      return;
    }

    if (e.target.id === "admin-logout") {
      sessionStorage.removeItem("customly:admin");
      logged = false;
      paint();
      return;
    }

    const del = e.target.closest("[data-delete-order]");
    if (del) {
      deleteOrder(del.dataset.deleteOrder);
      paint();
      return;
    }

    if (
      e.target.id === "admin-clear-orders" ||
      e.target.closest("#admin-clear-orders")
    ) {
      clearOrders();
      paint();
    }
  });

  root.addEventListener("change", (e) => {
    const sel = e.target.closest("[data-status-select]");
    if (sel) setStatus(sel.dataset.statusSelect, sel.value);
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "admin-pass") {
      const btn = root.querySelector("#admin-login-btn");
      if (btn) btn.click();
    }
  });
}
