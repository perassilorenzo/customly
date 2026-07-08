import { navigate } from "../utils/router.js";

export function renderHome() {
  return `
<div class="page">

  <section class="hero">
    <div class="container">
      <h1>
        <span class="line">Il capo che hai</span>
        <span class="line">in testa, <span class="highlight">configurato</span></span>
        <span class="line">in tempo reale</span>
      </h1>
      <p>Ogni capo personalizzato nasce da una visione. Custom Configurator trasforma le tue idee in un ordine chiaro e pronto per essere realizzato, eliminando il caos di messaggi infiniti e richieste fraintese.</p>
      <div class="hero-btns">
        <button class="btn btn-primary" data-nav-config>Prova il configuratore</button>
        <button class="btn btn-secondary" data-nav-how>Come funziona</button>
      </div>
    </div>
  </section>

  <section class="section" id="problema">
    <div class="container">
      <div class="section-header">
        <span class="label">Il problema</span>
        <h2>Ordinare un capo personalizzato non dovrebbe essere cos&igrave; complicato</h2>
        <p>Oggi la maggior parte delle richieste di personalizzazione passa attraverso Instagram e WhatsApp. Il risultato &egrave; caos.</p>
      </div>
      <div class="problem-grid">
        <div class="problem-list">
          <div class="problem-item"><span class="icon">01</span> Messaggi infiniti avanti e indietro</div>
          <div class="problem-item"><span class="icon">02</span> Richieste poco chiare e difficili da interpretare</div>
          <div class="problem-item"><span class="icon">03</span> Perdita di tempo per venditore e cliente</div>
          <div class="problem-item"><span class="icon">04</span> Errori nella realizzazione del capo finale</div>
          <div class="problem-item"><span class="icon">05</span> Difficolt&agrave; a gestire pi&ugrave; ordini personalizzati</div>
        </div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>Il cliente</h3>
            <p>Non riesce a spiegare esattamente ci&ograve; che desidera. Ogni modifica richiede un nuovo messaggio, una nuova foto, una nuova spiegazione.</p>
          </div>
          <div class="card">
            <h3>Il venditore</h3>
            <p>Riceve decine di richieste frammentate. Perde ore a interpretare messaggi, a chiedere chiarimenti e a organizzare ordini che arrivano gi&agrave; pronti.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-alt)" id="soluzione">
    <div class="container">
      <div class="section-header">
        <span class="label">La soluzione</span>
        <h2>Un configuratore visuale che mette tutti d&rsquo;accordo</h2>
        <p>Il cliente configura il capo, vede il risultato in tempo reale e invia una richiesta gi&agrave; completa. Il venditore riceve tutti i dettagli gi&agrave; organizzati.</p>
      </div>
      <div class="card-grid">
        <div class="card">
          <div class="num">01</div>
          <h3>Scegli il capo</h3>
          <p>Maglia o pantalone. Seleziona il modello base che preferisci tra le opzioni disponibili.</p>
        </div>
        <div class="card">
          <div class="num">02</div>
          <h3>Personalizza ogni dettaglio</h3>
          <p>Modifica modello, fit, lunghezza, colore e dettagli. Ogni cambiamento si riflette sull&rsquo;anteprima.</p>
        </div>
        <div class="card">
          <div class="num">03</div>
          <h3>Verifica il risultato</h3>
          <p>L&rsquo;anteprima si aggiorna in tempo reale. Vedi esattamente come sar&agrave; il capo finito.</p>
        </div>
        <div class="card">
          <div class="num">04</div>
          <h3>Invia la richiesta</h3>
          <p>Compila nome ed email. La configurazione viene inviata direttamente al venditore, gi&agrave; completa e organizzata.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="label">Anteprima</span>
        <h2>Vedi come funziona</h2>
      </div>
      <div class="mockup" style="max-width:800px;margin:0 auto">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
          <div>
            <div style="font-family:var(--font-heading);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--text-secondary);margin-bottom:12px">Prodotto</div>
            <div style="display:flex;gap:6px;margin-bottom:24px">
              <div style="flex:1;padding:8px;border:2px solid var(--accent);text-align:center;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:.04em;background:var(--accent);color:var(--bg)">Maglia</div>
              <div style="flex:1;padding:8px;border:1px solid var(--border);text-align:center;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-secondary)">Pantaloni</div>
            </div>
            <div style="font-family:var(--font-heading);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--text-secondary);margin-bottom:8px">Modello</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px">
              <span style="padding:6px 14px;border:1px solid var(--border);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Maniche corte</span>
              <span style="padding:6px 14px;border:1px solid var(--accent);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;background:var(--accent);color:var(--bg)">Maniche lunghe</span>
              <span style="padding:6px 14px;border:1px solid var(--border);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Senza maniche</span>
            </div>
            <div style="font-family:var(--font-heading);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--text-secondary);margin-bottom:8px">Dettagli</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              <span style="padding:6px 14px;border:1px solid var(--accent);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;background:var(--accent);color:var(--bg)">Stampe</span>
              <span style="padding:6px 14px;border:1px solid var(--border);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Patch</span>
              <span style="padding:6px 14px;border:1px solid var(--border);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Ricami</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding-top:16px;margin-top:20px;border-top:2px solid var(--text);margin-bottom:16px">
              <span style="color:var(--text-secondary);font-size:14px">Totale</span>
              <span style="font-size:22px;font-weight:700;font-family:var(--font-heading);color:var(--accent)">€13.00</span>
            </div>
          </div>
          <div style="border:1px solid var(--border);background:var(--bg);display:flex;align-items:center;justify-content:center;padding:40px">
            <svg viewBox="0 0 200 260" width="150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M57,42 L143,42 L153,72 Q155,80 145,87 L140,175 Q148,190 105,190 Q62,190 60,175 L55,87 Q45,80 47,72 Z" fill="#c13535" stroke="#a32d2d" stroke-width="1.5"/>
              <path d="M57,44 Q100,36 143,44" stroke="#a32d2d" stroke-width="1.5" fill="none"/>
              <path d="M47,72 Q27,77 22,108 L52,103 Z" fill="#c13535" stroke="#a32d2d" stroke-width="1.5"/>
              <path d="M153,72 Q173,77 178,108 L148,103 Z" fill="#c13535" stroke="#a32d2d" stroke-width="1.5"/>
              <rect x="85" y="95" width="30" height="40" rx="2" fill="#d94c4c" opacity="0.6"/>
              <text x="100" y="118" text-anchor="middle" fill="#c13535" font-size="8" font-weight="600">LOGO</text>
              <text x="100" y="55" text-anchor="middle" fill="#a32d2d" font-size="6" font-style="italic" opacity="0.7">&#10022; nome</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-alt)">
    <div class="container">
      <div class="section-header">
        <span class="label">La visione</span>
        <h2>Una piattaforma per creator, sarti e brand</h2>
        <p>Custom Configurator &egrave; solo l&rsquo;inizio. La visione &egrave; creare un ecosistema dove ogni venditore possa offrire il proprio configuratore personalizzato.</p>
      </div>
      <div class="vision-grid">
        <div class="vision-item">
          <h4>Configuratore dedicato</h4>
          <p>Ogni venditore avr&agrave; il proprio configuratore con i propri capi, le proprie modifiche e i propri prezzi.</p>
        </div>
        <div class="vision-item">
          <h4>Gestione ordini</h4>
          <p>Dashboard centralizzata per visualizzare e gestire tutti gli ordini ricevuti in formato gi&agrave; organizzato.</p>
        </div>
        <div class="vision-item">
          <h4>Pagina condivisibile</h4>
          <p>Ogni venditore avr&agrave; una pagina pubblica unica da condividere su social e sito web.</p>
        </div>
        <div class="vision-item">
          <h4>Community</h4>
          <p>I clienti potranno seguire i propri creator preferiti e scoprire nuove possibilit&agrave; di personalizzazione.</p>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="about-inline">
      <div>
        <h3>Ideato e sviluppato da Lorenzo Perassi</h3>
        <p>Studente di Informatica, sviluppatore e appassionato di moda e customizzazione. Unisco competenze tecniche e creative per costruire strumenti che semplificano il rapporto tra chi crea e chi indossa.</p>
        <div class="about-tags">
          <span>Sviluppo web</span>
          <span>UI/UX Design</span>
          <span>Content creation</span>
          <span>Custom clothing</span>
        </div>
      </div>
      <div>
        <h3>Roadmap</h3>
        <div style="margin-top:16px">
          <div class="roadmap-item" style="padding:0 0 16px 24px;border-left:2px solid var(--border)">
            <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">MVP &mdash; Configuratore base</div>
            <p style="font-size:13px;color:var(--text-secondary)">Maglie e pantaloni personalizzabili con anteprima in tempo reale.</p>
          </div>
          <div class="roadmap-item" style="padding:0 0 16px 24px;border-left:2px solid var(--border)">
            <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Area venditori</div>
            <p style="font-size:13px;color:var(--text-secondary)">Ogni creator avr&agrave; il proprio spazio con configuratore e ordini.</p>
          </div>
          <div class="roadmap-item" style="padding:0 0 0 24px;border-left:2px solid transparent">
            <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Community &amp; marketplace</div>
            <p style="font-size:13px;color:var(--text-secondary)">Scopri e condividi configurazioni, segui i tuoi creator preferiti.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>`;
}

export function initHome() {
  document
    .querySelector("[data-nav-config]")
    ?.addEventListener("click", () => navigate("/configuratore"));
  document.querySelector("[data-nav-how]")?.addEventListener("click", () => {
    document
      .getElementById("soluzione")
      ?.scrollIntoView({ behavior: "smooth" });
  });
}
