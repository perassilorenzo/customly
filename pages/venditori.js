export function renderVenditori() {
  return `
<div class="page">

  <section class="hero" style="padding-bottom:40px">
    <div class="container">
      <h1>
        <span class="line">Per i <span class="highlight">professionisti</span></span>
        <span class="line">La piattaforma sta arrivando</span>
      </h1>
      <p>Customly &egrave; una piattaforma pensata per dare a ogni customizer, artigiano e brand gli strumenti per offrire personalizzazioni senza caos.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="container">
      <div class="section-header">
        <span class="label">La visione</span>
        <h2>Il futuro della personalizzazione</h2>
        <p>Ogni professionista avr&agrave; il proprio spazio sulla piattaforma, con strumenti professionali per gestire capi, modifiche, prezzi e ordini.</p>
      </div>

      <div class="seller-features">
        <div class="sf-card">
          <div class="marker">Prossimamente</div>
          <h4>Configuratore personalizzato</h4>
           <p>Ogni professionista potr&agrave; creare il proprio configuratore con i propri capi, le proprie modifiche e i propri prezzi. Niente template uguali per tutti.</p>
        </div>
        <div class="sf-card">
          <div class="marker">Prossimamente</div>
          <h4>Catalogo capi</h4>
          <p>Aggiungi, modifica e organizza i tuoi capi con tutte le varianti possibili. Ogni capo pu&ograve; avere modifiche, prezzi e immagini dedicati.</p>
        </div>
        <div class="sf-card">
          <div class="marker">Prossimamente</div>
          <h4>Gestione ordini</h4>
          <p>Dashboard dedicata con tutti gli ordini ricevuti, gi&agrave; organizzati con dettagli e configurazioni. Niente pi&ugrave; messaggi persi.</p>
        </div>
        <div class="sf-card">
          <div class="marker">Prossimamente</div>
          <h4>Pagina pubblica</h4>
           <p>Ogni professionista avr&agrave; una pagina unica e condivisibile, personalizzata con il proprio brand, da condividere su social e sito web.</p>
        </div>
        <div class="sf-card">
          <div class="marker">Prossimamente</div>
          <h4>Analytics</h4>
          <p>Statistiche in tempo reale su visualizzazioni, ordini, capi pi&ugrave; richiesti e trend del tuo mercato.</p>
        </div>
        <div class="sf-card">
          <div class="marker">Prossimamente</div>
          <h4>Community</h4>
          <p>I tuoi clienti possono seguirti, salvarsi le configurazioni preferite e condividere i loro capi personalizzati.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-alt)">
    <div class="container">
      <div class="section-header">
        <span class="label">Perch&eacute; funzioner&agrave;</span>
        <h2>Pensato per chi crea e per chi acquista</h2>
        <p>La piattaforma &egrave; progettata per mettere d&rsquo;accordo entrambi i lati del mercato.</p>
      </div>
      <div class="problem-grid">
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>Per chi crea</h3>
            <p>Ricevi richieste gi&agrave; complete e organizzate. Niente pi&ugrave; messaggi interminabili per capire cosa vuole il cliente. Ogni progetto arriva con tutti i dettagli gi&agrave; pronti.</p>
          </div>
          <div class="card">
            <h3>Per chi acquista</h3>
            <p>Vedi esattamente cosa stai ordinando. Configuri il capo, lo vedi in anteprima e invii una richiesta chiara. Niente pi&ugrave; fraintendimenti o risultati diversi dalle aspettative.</p>
          </div>
        </div>
        <div class="card">
          <h3>Perch&eacute; ora</h3>
          <p>Il mercato della personalizzazione &egrave; in crescita. Sempre pi&ugrave; persone cercano capi unici e personalizzati. Customizer e artigiani hanno bisogno di strumenti digitali per gestire questa domanda senza impazzire.</p>
          <p style="margin-top:12px">Customly nasce per colmare questo gap: portare la tecnologia nel mondo dell&rsquo;artigianato e della moda indipendente, senza snaturarlo.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="text-align:center">
    <div class="container">
      <div class="section-header" style="margin-bottom:24px">
        <span class="label">Sei interessato?</span>
        <h2>Entra nella lista d&rsquo;attesa</h2>
        <p style="margin:0 auto">Se sei un customizer, artigiano o brand e vuoi essere tra i primi ad accedere alla piattaforma, lasciami la tua email.</p>
      </div>
      <div style="max-width:440px;margin:0 auto">
        <div style="display:flex;gap:8px">
          <input type="email" placeholder="La tua email" id="waitlist-email" style="flex:1;padding:12px 16px;border:1px solid var(--border);background:var(--bg-card);color:var(--text);font-size:15px;outline:none">
          <button class="btn btn-primary" id="waitlist-btn">Avvisami</button>
        </div>
        <div id="waitlist-msg" style="font-size:13px;margin-top:8px;color:var(--text-tertiary)"></div>
      </div>
    </div>
  </section>

</div>`;
}

export function initVenditori() {
  document.getElementById("waitlist-btn")?.addEventListener("click", () => {
    const email = document.getElementById("waitlist-email")?.value;
    const msg = document.getElementById("waitlist-msg");
    if (!email || !email.includes("@")) {
      msg.innerHTML = "Inserisci un'email valida";
      msg.style.color = "var(--accent)";
      return;
    }
    msg.innerHTML =
      "Grazie! Ti avviseremo quando la piattaforma sar&agrave; pronta.";
    document.getElementById("waitlist-email").value = "";
  });
}
