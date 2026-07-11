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
      <p>Customly connette persone e customizer indipendenti per progettare capi personalizzati, trasformando idee e ispirazioni in progetti pronti per essere realizzati.</p>
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
        <h2>Creare un capo unico non dovrebbe essere cos&igrave; complicato</h2>
        <p>Chi vuole qualcosa di diverso non sa a chi rivolgersi. Chi crea non ha uno spazio per mostrare il proprio lavoro. Le idee si perdono in messaggi senza struttura.</p>
      </div>
      <div class="problem-grid">
        <div class="problem-list">
          <div class="problem-item"><span class="icon">01</span> Difficile trovare un customizer con lo stile giusto</div>
          <div class="problem-item"><span class="icon">02</span> Spiegare un'idea senza strumenti visivi</div>
          <div class="problem-item"><span class="icon">03</span> Artigiani con talento ma senza visibilit&agrave;</div>
          <div class="problem-item"><span class="icon">04</span> Richieste che arrivano senza una struttura</div>
          <div class="problem-item"><span class="icon">05</span> Opportunit&agrave; perse tra messaggi infiniti</div>
        </div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>Per chi vuole un capo unico</h3>
            <p>&Egrave; difficile trovare professionisti capaci di realizzare la propria idea. Spiegare precisamente ci&ograve; che si vuole senza uno strumento visivo &egrave; frustrante.</p>
          </div>
          <div class="card">
            <h3>Per chi crea</h3>
            <p>Farsi conoscere &egrave; complicato. Manca uno spazio dove mostrare il proprio lavoro, ricevere richieste organizzate e trasformare un'idea in un progetto chiaro.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-alt)" id="soluzione">
    <div class="container">
      <div class="section-header">
        <span class="label">La soluzione</span>
        <h2>Dal pensiero al capo finale</h2>
        <p>Customly crea un collegamento diretto tra chi vuole qualcosa di diverso e chi lo pu&ograve; realizzare. Ogni professionista ha il proprio spazio, ogni cliente pu&ograve; esplorare stili, configurare un capo e renderlo davvero suo.</p>
      </div>
      <div class="timeline">
        <div class="tl-item">
          <div class="tl-card"><div class="card"><div class="num">01</div><h3>Trova il tuo customizer</h3><p>Scopri customizer indipendenti, artigiani e brand emergenti con stili diversi e scegli chi pu&ograve; dare forma alla tua idea.</p></div></div>
          <div class="tl-node"><span class="tl-num">01</span></div>
          <div class="tl-side"><img class="tl-img" src="assets/first-solution.jpg" alt=""></div>
        </div>
        <div class="tl-item">
          <div class="tl-side"></div>
          <div class="tl-node"><span class="tl-num">02</span></div>
          <div class="tl-card"><div class="card"><div class="num">02</div><h3>Progetta il tuo capo</h3><p>Scegli modello, dettagli e modifiche per creare una configurazione personalizzata che rifletta il tuo stile.</p></div></div>
        </div>
        <div class="tl-item">
          <div class="tl-card"><div class="card"><div class="num">03</div><h3>Definisci ogni dettaglio</h3><p>Visualizza il progetto, aggiungi note e riferimenti per dare al professionista tutte le informazioni necessarie.</p></div></div>
          <div class="tl-node"><span class="tl-num">03</span></div>
          <div class="tl-side"></div>
        </div>
        <div class="tl-item">
          <div class="tl-side"></div>
          <div class="tl-node"><span class="tl-num">04</span></div>
          <div class="tl-card"><div class="card"><div class="num">04</div><h3>Rendi reale la tua idea</h3><p>Invia il progetto al customizer e definitive insieme la realizzazione. Niente messaggi persi o richieste fraintese.</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="label">Anteprima</span>
        <h2>Trasforma un'idea in un progetto</h2>
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
        <h2>Un nuovo modo di vivere la custom fashion</h2>
        <p>Customly vuole creare un ecosistema dove ogni professionista possa esprimere il proprio stile e ogni persona possa trovare qualcosa che la rappresenti. Make it yours non &egrave; solo personalizzare un capo. &Egrave; trasformarlo in qualcosa che appartiene davvero a te.</p>
      </div>
      <div class="vision-grid">
        <div class="vision-item">
          <h4>Spazio per ogni professionista</h4>
          <p>Ogni professionista pu&ograve; avere un profilo personale, mostrare i propri lavori e ricevere progetti gi&agrave; organizzati.</p>
        </div>
        <div class="vision-item">
          <h4>Richieste organizzate</h4>
          <p>Ogni progetto arriva con tutte le informazioni necessarie per iniziare una collaborazione senza confusione.</p>
        </div>
        <div class="vision-item">
          <h4>Il tuo spazio digitale</h4>
          <p>Un profilo dedicato da condividere sui social e utilizzare come vetrina professionale per il tuo lavoro.</p>
        </div>
        <div class="vision-item">
          <h4>Scopri nuovi talenti</h4>
          <p>Una community dove trovare nuovi talenti e nuove possibilit&agrave; di personalizzazione.</p>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="about-inline">
      <div>
        <h3>Ideato e sviluppato da Lorenzo Perassi</h3>
        <p>Studente di Informatica, sviluppatore e customizer con la passione per tecnologia, moda e customizzazione. Customly nasce dall'unione tra mondo digitale e artigianato per creare strumenti che aiutano le persone a dare forma alle proprie idee.</p>
        <div class="about-tags">
          <span>Sviluppo web</span>
          <span>UI/UX Design</span>
          <span>Custom fashion</span>
          <span>Denim art</span>
        </div>
      </div>
      <div>
        <h3>Roadmap</h3>
        <div style="margin-top:16px">
          <div class="roadmap-item" style="padding:0 0 16px 24px;border-left:2px solid var(--border)">
            <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">MVP &mdash; Customly</div>
            <p style="font-size:13px;color:var(--text-secondary)">Il primo passo: profili professionali, configuratori personalizzati e creazione di progetti custom.</p>
          </div>
          <div class="roadmap-item" style="padding:0 0 16px 24px;border-left:2px solid var(--border)">
            <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Customizer Network</div>
            <p style="font-size:13px;color:var(--text-secondary)">La crescita: nuovi customizer, pi&ugrave; stili, pi&ugrave; possibilit&agrave; di personalizzazione.</p>
          </div>
          <div class="roadmap-item" style="padding:0 0 0 24px;border-left:2px solid transparent">
            <div style="font-family:var(--font-heading);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.04em">Fashion Community</div>
            <p style="font-size:13px;color:var(--text-secondary)">La visione: scoprire talenti, condividere idee e creare una nuova community dedicata alla custom fashion.</p>
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

  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          const tl = e.target.closest(".timeline");
          if (tl) tl.classList.add("line-drawn");
        }
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".tl-item").forEach((el) => obs.observe(el));
}
