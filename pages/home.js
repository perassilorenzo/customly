import { navigate } from "../utils/router.js";

export function renderHome() {
  return `
<div class="page">

  <section class="hero">
    <div class="container">
      <h1>
        <span class="line">Your idea. Your style.</span>
        <span class="line"><span class="highlight">Make it yours.</span></span>
      </h1>
      <p>Trova un customizer italiano, configura un capo personalizzato e trasforma la tua idea in qualcosa di concreto. Custom fashion, streetwear su misura e capi unici — tutto in un unico posto.</p>
      <div class="hero-btns">
        <button class="btn btn-primary" data-nav-creator>Scopri i customizer</button>
        <button class="btn btn-secondary" data-nav-how>Come funziona</button>
      </div>
    </div>
  </section>

  <section class="section" id="problema">
    <div class="container">
      <div class="section-header">
        <span class="label">Il problema</span>
        <h2>Creare qualcosa di unico non dovrebbe essere cos&igrave; difficile</h2>
        <p>Chi cerca un capo personalizzato, streetwear su misura o un jeans custom non sa da dove iniziare. Chi crea fatica a farsi trovare. Il risultato? Idee perse e collaborazioni mai avviate.</p>
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
        <p>Trovi un artigiano della custom fashion, configuri il capo con il configuratore visivo, definisci ogni dettaglio e avvii la collaborazione. Semplice e diretto.</p>
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

  <section class="section" style="background:var(--bg-alt)">
    <div class="container">
      <div class="section-header">
        <span class="label">Perch&egrave; Customly</span>
        <h2>Costruito per chi crea e per chi sogna</h2>
        <p>Ogni funzionalit&agrave; &egrave; pensata per rendere il processo di personalizzazione pi&ugrave; semplice, professionale e diretto.</p>
      </div>
      <div class="vision-grid">
        <div class="vision-item">
          <h4>Trova il professionista giusto</h4>
          <p>Filtra per stile, specializzazione e zona. Contatta direttamente chi pu&ograve; dare forma alla tua idea di abbigliamento personalizzato.</p>
        </div>
        <div class="vision-item">
          <h4>Configura visivamente il progetto</h4>
          <p>Seleziona modello, dettagli e modifiche in modo visivo e immediato. Il customizer riceve tutto ci&ograve; che serve per iniziare.</p>
        </div>
        <div class="vision-item">
          <h4>Profili professionali</h4>
          <p>Ogni customizer ha un profilo con i propri lavori, servizi e stile. Una vetrina professionale sempre accessibile.</p>
        </div>
        <div class="vision-item">
          <h4>Una community in crescita</h4>
          <p>Scopri nuovi talenti della custom fashion, condividi ispirazioni e costruisci una rete di professionisti e appassionati di capi unici.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="faq">
    <div class="container">
      <div class="section-header">
        <span class="label">Domande frequenti</span>
        <h2>FAQ</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item" data-faq>
          <button class="faq-question" type="button" aria-expanded="false">
            <span>Come funziona Customly?</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <p>Customly mette in contatto clienti e customizer indipendenti. L'utente pu&ograve; scegliere un professionista, configurare un capo con il configuratore visivo e inviare una richiesta strutturata. Il customizer riceve il progetto completo e pu&ograve; valutare, preventivare e avviare la collaborazione.</p>
          </div>
        </div>
        <div class="faq-item" data-faq>
          <button class="faq-question" type="button" aria-expanded="false">
            <span>Chi realizza il capo?</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <p>Ogni capo viene realizzato direttamente dal customizer scelto dal cliente. Customly fornisce gli strumenti per configurare e inviare il progetto, ma la realizzazione &egrave; affidata al professionista selezionato.</p>
          </div>
        </div>
        <div class="faq-item" data-faq>
          <button class="faq-question" type="button" aria-expanded="false">
            <span>Customly gestisce i pagamenti?</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <p>No. Customly mette in contatto cliente e customizer. Accordi, pagamenti e spedizioni vengono gestiti direttamente tra le parti.</p>
          </div>
        </div>
        <div class="faq-item" data-faq>
          <button class="faq-question" type="button" aria-expanded="false">
            <span>Posso personalizzare un mio capo?</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <p>S&igrave;, il cliente pu&ograve; inviare una richiesta per modificare un capo esistente secondo le possibilit&agrave; offerte dal customizer. Il configuratore permette di scegliere tra diverse modifiche come crop, flared, stampe, ricami e altro.</p>
          </div>
        </div>
        <div class="faq-item" data-faq>
          <button class="faq-question" type="button" aria-expanded="false">
            <span>Come trovo il customizer giusto?</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <p>Ogni customizer dispone di un profilo con stile, competenze, portfolio e lavori realizzati. Puoi cercare per nome, citt&agrave;, stile o tecnica e confrontare i profili prima di scegliere il professionista giusto per il tuo progetto di personalizzazione vestiti.</p>
          </div>
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
          <h4>Seguimi</h4>
          <div class="about-tags">
            <a href="https://instagram.com/diario_di_uno_09" target="_blank" rel="noopener"><span class="tag-ig"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>Instagram</span></a>
            <a href="https://tiktok.com/@diario_di_uno_09" target="_blank" rel="noopener"><span class="tag-tt"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15v-3.45a4.85 4.85 0 01-5.58-2.72V6.69h5.58z"/></svg>TikTok</span></a>
            <a href="https://youtube.com/@diario_di_uno_09" target="_blank" rel="noopener"><span class="tag-yt"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube</span></a>
            <a href="https://github.com/perassilorenzo" target="_blank" rel="noopener"><span class="tag-gh"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>GitHub</span></a>
            <a href="https://www.linkedin.com/in/perassilorenzo" target="_blank" rel="noopener"><span class="tag-li"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</span></a>
            <a href="https://perassilorenzo.github.io/portfolio" target="_blank" rel="noopener"><span class="tag-portfolio"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>Portfolio</span></a>
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
    .querySelector("[data-nav-creator]")
    ?.addEventListener("click", () => navigate("/customizers"));
  document.querySelector("[data-nav-how]")?.addEventListener("click", () => {
    document
      .getElementById("soluzione")
      ?.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelectorAll("[data-faq] .faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.closest(".faq-item")?.classList.toggle("open");
    });
  });
}
