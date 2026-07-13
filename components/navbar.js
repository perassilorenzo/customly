import { navigate, getPath } from "../utils/router.js";

export function renderNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/configuratore", label: "Configuratore" },
    { href: "/creator", label: "Customizers" },
    { href: "/contatti", label: "Contatti" },
  ];
  const path = getPath();
  const dark =
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return `
<nav>
  <div class="container">
    <a href="#" class="nav-logo" data-nav>Custom<span>ly</span></a>
    <div class="nav-links" id="nav-links">
      ${links.map((l) => `<a href="#${l.href}" class="${path === l.href ? "active" : ""}">${l.label}</a>`).join("")}
    </div>
    <div class="theme-switch" id="theme-switch">
      <button class="theme-opt${dark ? "" : " active"}" data-theme="light">&#9788; <span class="theme-label">Luce</span></button>
      <button class="theme-opt${dark ? " active" : ""}" data-theme="dark">&#9790; <span class="theme-label">Scuro</span></button>
    </div>
    <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu">&#9776;</button>
  </div>
</nav>`;
}

export function initNav() {
  document.getElementById("mobile-toggle")?.addEventListener("click", () => {
    document.getElementById("nav-links")?.classList.toggle("open");
  });
  document.querySelectorAll("[data-nav]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("/");
    });
  });
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () =>
      document.getElementById("nav-links")?.classList.remove("open"),
    );
  });
  document.querySelectorAll(".theme-opt").forEach((btn) => {
    btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
  });
  applySavedTheme();
}

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  const dark =
    saved === "dark" ||
    (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark-mode", dark);
  syncToggle(dark);
}

function applyTheme(mode) {
  const dark = mode === "dark";
  document.documentElement.classList.toggle("dark-mode", dark);
  localStorage.setItem("theme", mode);
  syncToggle(dark);
}

function syncToggle(dark) {
  document.querySelectorAll(".theme-opt").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.dataset.theme === (dark ? "dark" : "light"),
    );
  });
}
