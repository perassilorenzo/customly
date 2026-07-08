export function renderFooter() {
  return `
<footer>
  <div class="container">
    <div class="grid">
      <div class="footer-brand">
        <span class="logo">Custom <span>Configurator</span></span>
        <p>Piattaforma per la personalizzazione di abbigliamento. Ideata e sviluppata da Lorenzo Perassi.</p>
      </div>
      <div>
        <h4>Naviga</h4>
        <a href="#/">Home</a><br>
        <a href="#/configuratore">Configuratore</a><br>
        <a href="#/venditori">Venditori</a><br>
        <a href="#/contatti">Contatti</a>
      </div>
      <div>
        <h4>Social</h4>
        <a href="#">Instagram</a><br>
        <a href="#">GitHub</a><br>
        <a href="#">LinkedIn</a><br>
        <a href="#">TikTok</a>
      </div>
      <div>
        <h4>Info</h4>
        <a href="mailto:lorenzo@example.com">Email</a><br>
        <a href="#">Privacy</a><br>
        <a href="#">Termini</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Lorenzo Perassi</span>
      <span>Custom Configurator</span>
    </div>
  </div>
</footer>`;
}
