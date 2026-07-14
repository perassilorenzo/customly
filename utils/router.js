import { applySeo } from "./seo.js";
import { applyJsonLd } from "./jsonld.js";

const routes = {};
const dynamicRoutes = [];
let outlet = null;
let afterRenderCb = null;

// Detect base path from module URL (e.g. /customly from GitHub Pages subdirectory)
export const BASE_PATH =
  new URL("..", import.meta.url).pathname.replace(/\/$/, "") || "";

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

  /* Handle GitHub Pages 404 redirect (?p=/customly/customizers) */
  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get("p");
  if (redirectPath) {
    const cleanPath = redirectPath.startsWith(BASE_PATH)
      ? redirectPath.slice(BASE_PATH.length) || "/"
      : redirectPath;
    history.replaceState(null, "", BASE_PATH + cleanPath);
  }

  /* Intercept all internal <a> clicks — use navigate() instead of browser */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      a.target === "_blank"
    )
      return;
    e.preventDefault();
    navigate(href);
  });

  window.addEventListener("popstate", resolve);
  resolve();
}

export function navigate(path) {
  const current = getPath();
  if (current === path) return;
  history.pushState(null, "", BASE_PATH + path);
  resolve();
}

export function getPath() {
  let raw = window.location.pathname;
  if (BASE_PATH && raw.startsWith(BASE_PATH)) {
    raw = raw.slice(BASE_PATH.length) || "/";
  }
  if (raw !== "/" && raw.endsWith("/")) {
    raw = raw.slice(0, -1);
  }
  return raw || "/";
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
    window.scrollTo(0, 0);
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
