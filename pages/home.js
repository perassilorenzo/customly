import { navigate } from "../utils/router.js";

export function renderHome() {
  return `
<div class="page">

  <section class="hero">
    <div class="container">
      <h1>
        <span class="line">Your vision. Your style.</span>
        <span class="line"><span class="highlight">Make it yours.</span></span>
      </h1>
      <p>Trova il customizer giusto, progetta un capo su misura e trasforma la tua idea in qualcosa di concreto. Tutto in un unico posto.</p>
      <div class="hero-btns">
        <button class="btn btn-primary" data-nav-creator>Scopri i customizer</button>
        <button class="btn btn-secondary" data-nav-config>Prova il configuratore</button>
        <button class="btn btn-secondary" data-nav-how>Come funziona</button>
      </div>
    </div>
  </section>

  <section class="section" id="problema">
    <div class="container">
      <div class="section-header">
        <span class="label">Il problema</span>
        <h2>Creare qualcosa di unico non dovrebbe essere cos&igrave; difficile</h2>
        <p>Chi cerca qualcosa di speciale non sa da dove iniziare. Chi crea fatica a farsi trovare. Il risultato? Idee perse e collaborazioni mai avviate.</p>
      </div>
      <div class="problem-grid">
        <div class="problem-list">
          <div class="problem-item"><span class="icon">01</span> Trovare il customizer giusto non &egrave; semplice</div>
          <div class="problem-item"><span class="icon">02</span> Comunicare un'idea senza strumenti visivi &egrave; frustrante</div>
          <div class="problem-item"><span class="icon">03</span> Molti artigiani hanno talento ma poca visibilit&agrave;</div>
          <div class="problem-item"><span class="icon">04</span> Le richieste arrivano senza struttura</div>
          <div class="problem-item"><span class="icon">05</span> Le opportunit&agrave; si perdono tra messaggi infiniti</div>
        </div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>Vuoi un capo unico</h3>
            <p>Trovi il professionista giusto e progetti un capo su misura. Ogni dettaglio &egrave; deciso da te.</p>
          </div>
          <div class="card">
            <h3>Sei un customizer</h3>
            <p>Hai un profilo professionale, ricevi richieste strutturate e trasformi le idee in progetti concreti.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-alt)" id="soluzione">
    <div class="container">
      <div class="section-header">
        <span class="label">La soluzione</span>
        <h2>Come funziona</h2>
        <p>Trovi il professionista, configuri il capo, definisci ogni dettaglio e avvii la collaborazione. Semplice e diretto.</p>
      </div>
      <div class="steps">
        <div class="steps-line"></div>
        <div class="step">
          <div class="step-dot">01</div>
          <div class="step-content">
            <h3>Trova il customizer</h3>
            <p>Esplora profili, stili e specializzazioni. Scegli il professionista giusto per il tuo progetto.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-dot">02</div>
          <div class="step-content">
            <h3>Configura il capo</h3>
            <p>Seleziona modello, materiali e modifiche. Costruisci il capo esatto che hai in mente.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-dot">03</div>
          <div class="step-content">
            <h3>Completa il progetto</h3>
            <p>Aggiungi note, riferimenti e varianti. Hai tutto sotto controllo prima di inviare.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-dot">04</div>
          <div class="step-content">
            <h3>Invia e collabora</h3>
            <p>Invia il progetto al customizer e definisci insieme la realizzazione. Zero fraintendimenti.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="label">Configuratore</span>
        <h2>Dai forma alla tua idea</h2>
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
        <span class="label">Perch&egrave; Customly</span>
        <h2>Costruito per chi crea e per chi sogna</h2>
        <p>Ogni funzionalit&agrave; &egrave; pensata per rendere il processo pi&ugrave; semplice, professionale e diretto.</p>
      </div>
      <div class="vision-grid">
        <div class="vision-item">
          <h4>Trova il professionista giusto</h4>
          <p>Filtra per stile, specializzazione e zona. Contatta direttamente chi pu&ograve; dare forma alla tua idea.</p>
        </div>
        <div class="vision-item">
          <h4>Configura visivamente il progetto</h4>
          <p>Seleziona modello, dettagli e modifiche in modo visivo e immediato. Il customizer riceve tutto ci&ograve; che serve.</p>
        </div>
        <div class="vision-item">
          <h4>Profili professionali</h4>
          <p>Ogni customizer ha un profilo con i propri lavori, servizi e stile. Una vetrina professionale sempre accessibile.</p>
        </div>
        <div class="vision-item">
          <h4>Una community in crescita</h4>
          <p>Scopri nuovi talenti, condividi ispirazioni e costruisci una rete di professionisti e appassionati.</p>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="about-inline">
      <div>
        <h3>Ideato e sviluppato da Lorenzo Perassi</h3>
        <p>Studente di Informatica, sviluppatore e customizer con la passione per tecnologia, moda e customizzazione. Customly nasce dall'unione tra mondo digitale e artigianato per creare strumenti che aiutano le persone a dare forma alle proprie idee.</p>
        <div class="about-social">
          <h4>Let's connect</h4>
          <div class="about-tags">
            <a href="https://instagram.com/diario_di_uno_09" target="_blank" rel="noopener"><span class="tag-ig"><i class="fab fa-instagram"></i>Instagram</span></a>
            <a href="https://tiktok.com/@diario_di_uno_09" target="_blank" rel="noopener"><span class="tag-tt"><i class="fab fa-tiktok"></i>TikTok</span></a>
            <a href="https://youtube.com/@diario_di_uno_09" target="_blank" rel="noopener"><span class="tag-yt"><i class="fab fa-youtube"></i>YouTube</span></a>
            <a href="https://github.com/perassilorenzo" target="_blank" rel="noopener"><span class="tag-gh"><i class="fab fa-github"></i>GitHub</span></a>
            <a href="https://www.linkedin.com/in/perassilorenzo" target="_blank" rel="noopener"><span class="tag-li"><i class="fab fa-linkedin-in"></i>LinkedIn</span></a>
            <a href="https://perassilorenzo.github.io/portfolio" target="_blank" rel="noopener"><span class="tag-portfolio"><i class="fas fa-globe"></i>Portfolio</span></a>
          </div>
        </div>
      </div>
      <div>
        <h3>Roadmap</h3>
        <div class="roadmap">
          <div class="roadmap-item">
            <h4>MVP &mdash; <span style="font-weight:400;text-transform:none">Le fondamenta</span></h4>
            <p>Primi customizer, profili professionali, configuratore e richieste personalizzate.</p>
          </div>
          <div class="roadmap-item">
            <h4>Espansione &mdash; <span style="font-weight:400;text-transform:none">Una piattaforma in crescita</span></h4>
            <p>Pi&ugrave; professionisti, nuovi strumenti, maggiore personalizzazione e un'esperienza sempre pi&ugrave; completa.</p>
          </div>
          <div class="roadmap-item">
            <h4>Community &mdash; <span style="font-weight:400;text-transform:none">La visione</span></h4>
            <p>Customly diventa il punto di riferimento della custom fashion, creando una community dove clienti e professionisti possono incontrarsi, scoprire nuovi stili e realizzare capi unici.</p>
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
  document
    .querySelector("[data-nav-creator]")
    ?.addEventListener("click", () => navigate("/creator"));
  document.querySelector("[data-nav-how]")?.addEventListener("click", () => {
    document
      .getElementById("soluzione")
      ?.scrollIntoView({ behavior: "smooth" });
  });
}
