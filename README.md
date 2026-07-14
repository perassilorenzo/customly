<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="customizers/perassilorenzo/images/pfp-banner.png">
    <img src="customizers/perassilorenzo/images/pfp-banner.png" alt="Customly" width="100%">
  </picture>
</p>

<p align="center">
  <strong>Trova customizer e crea capi personalizzati</strong>
  <br>
  La piattaforma che connette clienti e customizer indipendenti per creare abbigliamento personalizzato, unico e su misura.
  <br>
  <i>Configuratore interattivo con modifiche strutturate, profili professionali e richieste dirette.</i>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#seo--geo">SEO & GEO</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## Il Problema

Ordinare un capo personalizzato oggi significa messaggi infiniti su Instagram, vocali su WhatsApp e richieste fraintese. Il cliente non riesce a spiegare cosa vuole. Il customizer perde ore a interpretare frammenti di messaggi.

**Customly colma questo gap.**

---

## Features

### Per i Clienti

- **Due modalit&agrave;**: configura un capo che gi&agrave; possiedi, o ordina da un customizer registrato
- **Tipi di capo**: Shirt, jeans — con opzioni di personalizzazione specifiche per ogni tipo
- **Modifiche**: canotta, crop, accorciamento, maniche, flared, side panels, raw hem, fondo allungato
- **Calcolatore prezzi live**: prezzo base + sovrapprezzi si aggiornano durante la personalizzazione
- **Invio diretto**: richiesta completa e strutturata inviata via email con tutti i dettagli

### Per i Customizer

- **Profili modulari**: ogni customizer ha i propri prodotti, prezzi e modifiche disponibili
- **Ordini strutturati**: ogni richiesta arriva con tutti i dettagli della configurazione, niente avanti e indietro
- **Directory cercabile**: i clienti trovano i customizer per nome, stile o specializzazione

### Portfolio & Gallerie

- **Galleria immagini**: clicca una card del portfolio per sfogliare tutte le immagini e i video in una galleria fullscreen
- **Viewer fullscreen**: clicca un'immagine del prodotto per aprire una galleria scrollabile con frecce e thumbnails
- **Link portfolio cliccabili**: gli elementi con campo `link` rendono il titolo cliccabile in una nuova scheda

### Opzioni di Personalizzazione per Capo

| Shirt                                            | Jeans                   |
| ------------------------------------------------ | ----------------------- |
| Canotta Taglio Netto (long-sleeve, short-sleeve) | Skinny / Flared / Baggy |
| Corta Cucita Bene (long-sleeve)                  | Flared Bottom           |
| Croppa Taglio Netto (tutti i modelli)            | Side Panels             |
| Croppata Cucito Bene (tutti i modelli)           | Raw Hem                 |
|                                                  | Fondo Allungato         |

---

## Tech Stack

| Tecnologia                          | Scopo                                                     |
| ----------------------------------- | --------------------------------------------------------- |
| **Vanilla JavaScript (ES Modules)** | Frontend zero-dipendenze — nessun framework, nessun build |
| **CSS (custom properties)**         | Design responsive con dark theme, CSS variables           |
| **Formspree**                       | Backend per invio form (ordini, contatti)                 |
| **SPA Router (pushState)**          | Routing client-side con URL puliti e History API          |

L'app funziona direttamente nel browser — apri `index.html` e parti.

---

## Getting Started

```bash
# Clona la repo
git clone https://github.com/perassilorenzo/custom-configurator.git
cd custom-configurator

# Nessun build necessario — basta servire la cartella
# Con Python:
python -m http.server 8000

# Oppure con VS Code Live Server, o qualsiasi server statico
```

Apri `http://localhost:8000` nel browser.

> **Nota**: gli invii form richiedono un endpoint Formspree configurato in `utils/formspree.js`.

> **Nota sul routing**: il routing usa `history.pushState`. Per servire le pagine in produzione con server statici (es. GitHub Pages), &egrave; presente un file `404.html` che gestisce il redirect delle URL dirette.

---

## Architecture

```
index.html              ← Entry point SPA (shell minima)
├── 404.html            ← Redirect trick per GitHub Pages
├── robots.txt          ← Regole crawling per motori di ricerca
├── sitemap.xml         ← Sitemap per SEO
├── llms.txt            ← Info leggibili da AI (GEO)
├── components/         ← UI riusabile (navbar, footer)
├── pages/              ← Pagine per rotta (home, configuratore, creator, contatti)
├── data/               ← Logica business e modelli dati
│   ├── customizers.js     ← Registry e ricerca customizer
│   └── color.js           ← Utilit&agrave; colori
├── customizers/        ← Profili customizer modulari
│   ├── perassilorenzo/   ← Customizer: Lorenzo Perassi
│   └── template/          ← Template per nuovi customizer
├── styles/             ← Fogli di stile
└── utils/              ← Utilit&agrave; core
    ├── router.js           ← SPA router con pushState
    ├── seo.js              ← Gestione meta tag dinamici
    ├── jsonld.js           ← JSON-LD structured data
    ├── formspree.js        ← Client API Formspree
    └── product-status.js   ← Persistenza stato prodotti
```

L'app segue il pattern **render → init**: ogni pagina espporta `renderX()` (restituisce stringa HTML) e `initX()` (lega event listener). Il router chiama queste in sequenza, wrappate da navbar + footer condivisi.

---

## SEO & GEO

### SEO Tecnica

- **Meta tag dinamici**: title, description, Open Graph e canonical URL si aggiornano automaticamente per ogni pagina
- **JSON-LD**: dati strutturati Organization, WebApplication, WebSite, FAQPage e ProfilePage
- **Sitemap XML**: sitemap completa con tutte le pagine pubbliche
- **robots.txt**: regole crawling con riferimento alla sitemap
- **URL puliti**: routing basato su History API (`/configuratore` invece di `#/configuratore`)
- **Pagina 404**: gestione errori con pagina personalizzata
- **Noscript fallback**: contenuto accessibile anche senza JavaScript

### GEO (Generative Engine Optimization)

- **llms.txt**: file con informazioni leggibili da ChatGPT, Gemini, Claude, Perplexity
- **FAQ JSON-LD**: domande frequenti strutturate per i motori AI
- **Contenuti chiari**: testi descritivi e ben strutturati per facilitare il riassunto automatico

### Accessibilit&agrave;

- Skip-to-content link
- `<main>` landmark con focus management
- `aria-label` sui bottoni e form
- `aria-live` per annunci screen reader
- `aria-current="page"` sul link attivo
- `prefers-reduced-motion` support
- Touch targets minimi 44x44px

---

## Customizer System

I customizer sono directory autonome sotto `customizers/`:

```
customizers/perassilorenzo/
├── data.js            ← Nome, bio, stili, prodotti, portfolio, servizi
└── images/            ← Immagini profilo e portfolio
```

Aggiungere un nuovo customizer significa creare una directory con un file `data.js` che segue lo schema, poi registrarlo in `data/customizers.js`. Nessuna modifica al backend.

### Customizer Attuali

| Customizer          | Stile                      | Specializzazione |
| ------------------- | -------------------------- | ---------------- |
| **Lorenzo Perassi** | Custom fashion / upcycling | Denim, Shirt     |
| **Template**        | Profilo esempio            | Tutti i capi     |

---

## Roadmap

- [x] MVP — configuratore interattivo con modifiche strutturate
- [x] Sistema customizer con profili modulari
- [x] Portfolio gallerie — popup immagini/video e viewer fullscreen
- [x] SEO tecnica — meta tag dinamici, JSON-LD, sitemap, URL puliti
- [x] GEO readiness — llms.txt, FAQ strutturate, dati leggibili da AI
- [x] Accessibilit&agrave; — aria, focus management, reduced motion
- [ ] Customizer dashboard — gestione ordini in un unico posto
- [ ] Pagine pubbliche customizer — link condivisibili per social media
- [ ] Community — segui creator, condividi configurazioni
- [ ] Marketplace — scopri nuovi artisti della personalizzazione

---

## Vision

Customly &egrave; il primo passo verso un **ecosistema completo per la personalizzazione dell'abbigliamento**. Voglio che ogni artigiano, sarto e brand indipendente abbia il proprio configuratore — una linea diretta e visiva tra la loro visione e i loro clienti.

---

## Built By

**Lorenzo Perassi** — Studente, sviluppatore e appassionato di personalizzazioneabbigliamento.
Unendo codice e creativit&agrave; per costruire strumenti che rendono la custom fashion accessibile a tutti.

[GitHub](https://github.com/perassilorenzo) · [LinkedIn](https://linkedin.com/in/lorenzo-perassi-46057a38b) · [Portfolio](https://perassilorenzo.github.io/portfolio)

---

<p align="center">
  <sub>Costruito con vanilla JS e una passione per la custom fashion.</sub>
</p>
