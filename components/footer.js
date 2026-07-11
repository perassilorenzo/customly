export function renderFooter() {
  return `
<footer>
  <div class="container">
    <div class="grid">
      <div class="footer-brand">
        <span class="logo">Custom<span>ly</span></span>
        <p style="font-style:italic;color:var(--accent)">Make it yours.</p>
        <p>Piattaforma per la personalizzazione di abbigliamento. Trova un customizer, progetta qualcosa di unico, rendilo tuo. Ideata e sviluppata da Lorenzo Perassi.</p>
      </div>
      <div>
        <h4>Naviga</h4>
        <a href="#/">Home</a><br>
        <a href="#/configuratore">Configuratore</a><br>
        <a href="#/creator">Customizers</a><br>
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
    <div class="footer-bottom" style="text-align:center;justify-content:center">
      <span>A Lorenzo Perassi Production</span>
    </div>
  </div>
</footer>`;
}
