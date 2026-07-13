import { navigate, getPath } from "../utils/router.js";

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
<nav>
  <div class="container">
    <a href="#" class="nav-logo" data-nav>Custom<span>ly</span></a>
    <div class="nav-links" id="nav-links">
      ${links.map((l) => `<a href="#${l.href}" class="${path === l.href ? "active" : ""}">${l.label}</a>`).join("")}
    </div>
    <button class="theme-toggle" id="theme-toggle" aria-label="Cambia tema">${dark ? "&#9788;" : "&#9790;"}</button>
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
  document
    .getElementById("theme-toggle")
    ?.addEventListener("click", toggleTheme);
  applyTheme();
}

function applyTheme() {
  const saved = localStorage.getItem("theme");
  const dark =
    saved === "dark" ||
    (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark-mode", dark);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.innerHTML = dark ? "&#9788;" : "&#9790;";
}

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("theme", dark ? "dark" : "light");
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.innerHTML = dark ? "&#9788;" : "&#9790;";
}
