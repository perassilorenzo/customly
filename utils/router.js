const routes = {};
let outlet = null;

export function route(path, render) {
  routes[path] = render;
}

export function init(el) {
  outlet = el;
  window.addEventListener("hashchange", resolve);
  if (!window.location.hash) window.location.hash = "#/";
  resolve();
}

export function navigate(path) {
  window.location.hash = path;
}

export function getPath() {
  const h = window.location.hash.slice(1) || "/";
  return h.split("?")[0];
}

export function getParams() {
  const h = window.location.hash.slice(1);
  const qs = h.split("?")[1] || "";
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
  const render = routes[path];
  if (render) {
    outlet.innerHTML = render();
    if (window._pageInit) window._pageInit();
    updateActiveLink(path);
  }
}

function updateActiveLink(path) {
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + path);
  });
}
