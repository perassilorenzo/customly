export function renderFooter() {
  return `
<footer>
  <div class="container">
    <div class="grid">
      <div class="footer-brand">
        <span class="logo">Custom<span>ly</span></span>
        <p style="font-style:italic;color:var(--accent)">Make it yours.</p>
        <p>La piattaforma per la custom fashion. Trova un professionista, configura un capo, rendilo tuo.</p>
      </div>
      <div>
        <h4>Naviga</h4>
        <a href="/">Home</a><br>
        <a href="/configuratore">Configuratore</a><br>
        <a href="/creator">Customizers</a><br>
        <a href="/contatti">Contatti</a>
      </div>
      <div>
        <h4>Social</h4>
        <a href="https://instagram.com/diario_di_uno_09" target="_blank" rel="noopener noreferrer">Instagram</a><br>
        <a href="https://github.com/perassilorenzo" target="_blank" rel="noopener noreferrer">GitHub</a><br>
        <a href="https://www.linkedin.com/in/perassilorenzo" target="_blank" rel="noopener noreferrer">LinkedIn</a><br>
        <a href="https://tiktok.com/@diario_di_uno_09" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
      <div>
        <h4>Info</h4>
        <a href="mailto:lorenzo@example.com">Email</a><br>
        <a href="/privacy">Privacy</a><br>
        <a href="/terms">Termini</a>
      </div>
    </div>
    <div class="footer-bottom" style="text-align:center;justify-content:center">
      <span>A Lorenzo Perassi Production</span>
    </div>
  </div>
</footer>`;
}
