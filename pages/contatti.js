import { send } from "../utils/formspree.js";

export function renderContatti() {
  return `
<div class="page">
  <div class="container">
    <div class="section-header">
      <span class="label">Contatti</span>
      <h1>Scrivici</h1>
      <p>Vuoi candidarti come customizer, proporre un&rsquo;idea, collaborare o semplicemente fare un saluto?</p>
    </div>

    <div class="contact-wrapper">
      <div class="contact-form">
        <div id="contact-err"></div>
        <div class="frm" id="contact-form">
          <input type="text" id="c-name" placeholder="Nome *" aria-label="Nome">
          <input type="email" id="c-email" placeholder="Email *" aria-label="Email">
          <select id="c-subject" aria-label="Motivo del contatto">
            <option value="">Seleziona un motivo</option>
            <option value="creator">Voglio entrare nella piattaforma</option>
            <option value="feedback">Feedback o idea</option>
            <option value="collaborazione">Richiesta di collaborazione</option>
            <option value="altro">Altro</option>
          </select>
          <textarea id="c-msg" placeholder="Il tuo messaggio *" rows="5" aria-label="Messaggio"></textarea>
          <button class="btn btn-primary" id="c-submit" style="width:100%;justify-content:center">Invia</button>
        </div>
        <div id="contact-done" style="display:none;text-align:center;padding:60px 0">
          <div class="check" style="font-size:48px;font-weight:700;color:var(--success);margin-bottom:8px">&#10003;</div>
          <h3 style="font-family:var(--font-heading);font-size:22px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">Messaggio inviato!</h3>
          <p style="color:var(--text-secondary)">Ti risponder&agrave; al pi&ugrave; presto.</p>
        </div>
      </div>

      <div>
        <div class="contact-channels">
          <div class="contact-channel">
            <div>
              <div class="label">Instagram</div>
              <div class="desc">@diario_di_uno_09</div>
            </div>
          </div>
          <div class="contact-channel">
            <div>
              <div class="label">GitHub</div>
              <div class="desc">perassilorenzo</div>
            </div>
          </div>
          <div class="contact-channel">
            <div>
              <div class="label">LinkedIn</div>
              <div class="desc">Lorenzo Perassi</div>
            </div>
          </div>
          <div class="contact-channel">
            <div>
              <div class="label">Email diretta</div>
              <div class="desc">perassi.lorenzo1804@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>`;
}

export function initContatti() {
  document.getElementById("c-submit")?.addEventListener("click", async () => {
    const name = document.getElementById("c-name")?.value || "";
    const email = document.getElementById("c-email")?.value || "";
    const subject = document.getElementById("c-subject")?.value || "";
    const msg = document.getElementById("c-msg")?.value || "";
    const err = document.getElementById("contact-err");

    if (!name.trim() || !email.trim() || !msg.trim()) {
      err.innerHTML =
        '<div class="err-msg">Compila tutti i campi obbligatori (*)</div>';
      return;
    }
    err.innerHTML = "";
    const btn = document.getElementById("c-submit");
    btn.disabled = true;
    btn.textContent = "Invio in corso...";

    try {
      await send({
        type: "contatto",
        name: name.trim(),
        email: email.trim(),
        subject: subject || "Non specificato",
        message: msg.trim(),
      });
      document.getElementById("contact-done").style.display = "block";
      document.getElementById("contact-form").style.display = "none";
    } catch (e) {
      err.innerHTML = `<div class="err-msg">Errore: ${e.message}</div>`;
      btn.disabled = false;
      btn.textContent = "Invia";
    }
  });
}
