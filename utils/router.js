import { applySeo } from "./seo.js";
import { applyJsonLd } from "./jsonld.js";

const routes = {};
const dynamicRoutes = [];
let outlet = null;
let afterRenderCb = null;

export function route(path, render) {
  if (path.includes(":")) {
    const parts = path.split("/");
    const keys = [];
    const pattern = parts
      .map((p) => {
        if (p.startsWith(":")) {
          keys.push(p.slice(1));
          return "([^/]+)";
        }
        return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("/");
    dynamicRoutes.push({ re: new RegExp("^" + pattern + "$"), keys, render });
  } else {
    routes[path] = render;
  }
}

export function afterRender(fn) {
  afterRenderCb = fn;
}

export function init(el) {
  outlet = el;

  // GitHub Pages SPA redirect: read ?p= param and restore path
  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get("p");
  if (redirectPath) {
    history.replaceState(null, "", redirectPath);
  }

  window.addEventListener("popstate", resolve);
  resolve();
}

export function navigate(path) {
  if (getPath() === path) {
    resolve();
    return;
  }
  history.pushState(null, "", path);
  resolve();
  window.scrollTo(0, 0);
}

export function getPath() {
  const p = window.location.pathname;
  return p === "" ? "/" : p;
}

export function getParams() {
  const qs = window.location.search.slice(1);
  const p = {};
  for (const part of qs.split("&")) {
    if (!part) continue;
    const [k, v] = part.split("=");
    p[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return p;
}

function resolve() {
  const path = getPath();
  let render = routes[path];
  let ctx = {};

  if (!render) {
    for (const dr of dynamicRoutes) {
      const m = path.match(dr.re);
      if (m) {
        render = dr.render;
        dr.keys.forEach((k, i) => {
          ctx[k] = decodeURIComponent(m[i + 1]);
        });
        break;
      }
    }
  }

  if (render) {
    outlet.innerHTML = render(ctx);
    if (window._pageInit) window._pageInit(ctx);
    applySeo(path);
    applyJsonLd(path);
    updateActiveLink(path);
    if (afterRenderCb) afterRenderCb();
    const main = document.getElementById("content");
    if (main) {
      main.focus({ preventScroll: false });
    }
    const live = document.getElementById("aria-live-region");
    if (live) {
      const heading = document.querySelector("h1, h2");
      live.textContent = heading ? heading.textContent : "";
    }
  } else {
    outlet.innerHTML = render404();
    applySeo("/");
    if (afterRenderCb) afterRenderCb();
  }
}

function render404() {
  return `
<div class="page">
  <div class="container" style="text-align:center;padding:120px 20px">
    <h1 style="font-family:var(--font-heading);font-size:72px;font-weight:700;color:var(--accent);margin-bottom:8px">404</h1>
    <p style="font-size:18px;color:var(--text-secondary);margin-bottom:32px">Pagina non trovata.</p>
    <a href="/" class="btn btn-primary">Torna alla home</a>
  </div>
</div>`;
}

function updateActiveLink(path) {
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    a.classList.toggle("active", href === path);
  });
}
