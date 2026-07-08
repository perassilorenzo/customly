import { navigate, getPath } from "../utils/router.js";

export function renderNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/configuratore", label: "Configuratore" },
    { href: "/venditori", label: "Venditori" },
    { href: "/contatti", label: "Contatti" },
  ];
  const path = getPath();
  return `
<nav>
  <div class="container">
    <a href="#" class="nav-logo" data-nav>Custom <span>Configurator</span></a>
    <div class="nav-links" id="nav-links">
      ${links.map((l) => `<a href="#${l.href}" class="${path === l.href ? "active" : ""}">${l.label}</a>`).join("")}
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
}
