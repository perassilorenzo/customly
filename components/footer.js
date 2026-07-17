let _hoverCount = 0;

const _quotes = ["Zuckerberg? Sounds Irish.", "Drop the The. Just Facebook."];

const _socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/diario_di_uno_09",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  },
  {
    name: "GitHub",
    url: "https://github.com/perassilorenzo",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/perassilorenzo",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@diario_di_uno_09",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>`,
  },
];

export function renderFooter() {
  const year = new Date().getFullYear();
  const socialsHtml = _socials
    .map(
      (s) =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}" class="social-link">${s.svg}</a>`,
    )
    .join("");

  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo">Custom<span>ly</span></span>
        <p class="tagline">Make it yours.</p>
        <p>La piattaforma per la custom fashion. Trova un professionista, configura un capo, rendilo tuo.</p>
      </div>
      <div class="footer-social">
        <h4>Seguici</h4>
        <div class="social-links">
          ${socialsHtml}
        </div>
      </div>
      <div class="footer-nav footer-info">
        <a href="/privacy">Privacy</a>
        <a href="/termini">Termini</a>
        <a href="mailto:lorenzo@example.com">Email</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${year} Customly</p>
      <span class="footer-production" data-footer-easter>A Lorenzo Perassi Production</span>
    </div>
  </div>
</footer>`;
}

export function initFooter() {
  document.querySelectorAll("[data-footer-easter]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const q = _quotes[Math.min(_hoverCount, _quotes.length - 1)];
      _hoverCount++;
      el.setAttribute("data-tooltip", q);
    });
    el.addEventListener("mouseleave", () => {
      el.removeAttribute("data-tooltip");
    });
  });
}
