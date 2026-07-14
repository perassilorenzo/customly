import { navigate, getPath } from "../utils/router.js";

const SVG_SUN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>`;
const SVG_MOON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

let bound = false;

export function renderNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/configuratore", label: "Configuratore" },
    { href: "/creator", label: "Customizers" },
    { href: "/contatti", label: "Contatti" },
  ];
  const path = getPath();
  const dark = localStorage.getItem("theme") === "dark";
  return `
<nav aria-label="Navigazione principale">
  <div class="container">
    <a href="/" class="nav-logo" data-nav>Custom<span>ly</span></a>
    <div class="nav-links" id="nav-links">
      ${links.map((l) => `<a href="${l.href}" class="${path === l.href ? "active" : ""}"${path === l.href ? ' aria-current="page"' : ""}>${l.label}</a>`).join("")}
    </div>
    <button class="theme-btn${dark ? " dark" : ""}" id="theme-btn" aria-label="Cambia tema">
      <span class="theme-knob">${dark ? SVG_MOON : SVG_SUN}</span>
    </button>
    <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">&#9776;</button>
  </div>
</nav>`;
}

export function initNav() {
  if (!bound) {
    bound = true;
    document.addEventListener("click", (e) => {
      if (e.target.closest("#theme-btn")) {
        const dark = document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem("theme", dark ? "dark" : "light");
        syncBtn();
      }
      if (e.target.closest("#mobile-toggle")) {
        const btn = document.getElementById("mobile-toggle");
        const links = document.getElementById("nav-links");
        links?.classList.toggle("open");
        if (btn)
          btn.setAttribute("aria-expanded", links?.classList.contains("open"));
      }
      if (e.target.closest("[data-nav]")) {
        e.preventDefault();
        navigate("/");
      }
      if (e.target.closest(".nav-links a")) {
        const links = document.getElementById("nav-links");
        links?.classList.remove("open");
        const btn = document.getElementById("mobile-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }
  applySavedTheme();
}

export function reinitNav() {
  syncBtn();
}

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  const dark = saved === "dark";
  document.documentElement.classList.toggle("dark-mode", dark);
  syncBtn();
}

function syncBtn() {
  const dark = document.documentElement.classList.contains("dark-mode");
  const btn = document.getElementById("theme-btn");
  if (!btn) return;
  btn.classList.toggle("dark", dark);
  const knob = btn.querySelector(".theme-knob");
  if (knob) knob.innerHTML = dark ? SVG_MOON : SVG_SUN;
}
