const routes = {};
const dynamicRoutes = [];
let outlet = null;

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
    updateActiveLink(path);
  }
}

function updateActiveLink(path) {
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + path);
  });
}
