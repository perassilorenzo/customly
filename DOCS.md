# Documentazione tecnica — Customly

> Guida completa alla struttura, architettura e funzionamento del progetto.
> Destinata a sviluppatori che devono mantenere ed evolvere il codice.

---

# 1. Panoramica generale

Customly è una **single-page application (SPA)** per la personalizzazione di abbigliamento. Mette in contatto clienti che vogliono capi unici con customizer indipendenti.

**Tecnologia**: JavaScript vanilla (ES Modules) — nessun framework, nessun bundler, nessun build step. Il progetto si apre direttamente da file, servito da un qualsiasi server HTTP statico.

**Come funziona**:

- L'utente naviga tra le pagine via URL puliti (`/creator`, `/configuratore`)
- Il router intercetta i cambiamenti di URL via History API (`pushState`), carica la pagina giusta e la inserisce nel DOM
- Per il deploy su GitHub Pages, un file `404.html` gestisce il redirect delle URL dirette
- Ogni pagina è un modulo JavaScript che esporta due funzioni: `render*(ctx)` per generare l'HTML e `init*(ctx)` per attaccare gli eventi
- I dati dei customizer vivono in file JavaScript separati, importati come moduli
- I meta tag (title, description, Open Graph, canonical) si aggiornano dinamicamente per ogni pagina
- I dati strutturati JSON-LD vengono iniettati automaticamente per SEO e GEO

**Parti del progetto**:
| Parte | Ruolo |
|---|---|
| `index.html` | Shell minima — carica il router e registra le route |
| `404.html` | Redirect trick per GitHub Pages SPA routing |
| `robots.txt` | Regole crawling per motori di ricerca |
| `sitemap.xml` | Sitemap XML per SEO |
| `llms.txt` | Informazioni leggibili da motori AI (GEO) |
| `utils/router.js` | Sistema di routing basato su History API |
| `utils/seo.js` | Gestione meta tag dinamici per pagina |
| `utils/jsonld.js` | Iniezione JSON-LD structured data |
| `pages/*.js` | Pagine dell'applicazione (home, configuratore, creator, contatti, venditori) |
| `components/*.js` | Componenti UI riutilizzabili (navbar, footer) |
| `data/*.js` | Dati e registry (customizer, prodotti, colori) |
| `customizers/*/data.js` | Profili dei customizer |
| `styles/main.css` | Tutti gli stili dell'applicazione |

---

# 2. Albero completo del progetto

```
customly/
│
├── index.html                          # Entry point SPA
├── 404.html                            # GitHub Pages SPA redirect trick
├── robots.txt                          # Regole crawling motori di ricerca
├── sitemap.xml                         # Sitemap XML per SEO
├── llms.txt                            # Info leggibili da AI (GEO)
├── README.md                           # Documentazione del progetto
├── .gitignore                          # File ignorati da Git
│
├── assets/                             # Risorse statiche (immagini)
│   ├── .gitkeep
│   ├── first-solution.jpg              # Immagine timeline sezione soluzione
│   └── wallpaper.jpg                   # Sfondo hero page
│
├── components/                         # Componenti UI riutilizzabili
│   ├── navbar.js                       # Barra di navigazione
│   └── footer.js                       # Footer del sito
│
├── configurator/                       # Riservato per futura espansione
│   └── .gitkeep
│
├── customizers/                        # Profili customizer (nuovo sistema)
│   ├── lorenzo-perassi/
│   │   └── data.js                     # Dati profilo Lorenzo Perassi
│   └── template/
│       └── data.js                     # Dati profilo template
│
├── data/                               # Registry e utility dati
│   ├── color.js                        # Utility shade() per schiarire/scurire colori
│   ├── customizers.js                  # Registry customizer (getAll/getById)
│   ├── garment-types.js                # (Legacy) Definizioni capi alternativa
│   ├── products.js                     # Motore di rendering SVG
│   └── sellers.js                      # Registry venditori (getAll/getById/search)
│
├── pages/                              # Pagine dell'applicazione
│   ├── configuratore.js                # Configuratore (1222 righe — file principale)
│   ├── contatti.js                     # Pagina contatti
│   ├── creator.js                      # Lista e profilo customizer
│   ├── home.js                         # Home page
│   └── venditori.js                    # Landing page "Per i professionisti"
│
├── sellers/                            # Profili venditori (sistema legacy)
│   ├── admin/                          # Venditore amministratore
│   │   ├── data.js                     # Dati e prodotti
│   │   ├── configuratore/.gitkeep      # Riservato
│   │   └── immagini/.gitkeep           # Riservato
│   ├── demon-handmade/                 # Venditore Demon Handmade
│   │   ├── data.js
│   │   ├── configuratore/.gitkeep
│   │   └── immagini/.gitkeep
│   ├── perassi/                        # Venditore Lorenzo Perassi (per configuratore)
│   │   └── data.js
│   ├── raw-spirit/                     # Venditore Raw Spirit
│   │   ├── data.js
│   │   ├── configuratore/.gitkeep
│   │   └── immagini/.gitkeep
│   ├── venditore1/                     # Venditore 1
│   │   ├── data.js
│   │   ├── configuratore/.gitkeep
│   │   └── immagini/.gitkeep
│   └── venditore2/                     # Venditore 2
│       ├── data.js
│       ├── configuratore/.gitkeep
│       └── immagini/.gitkeep
│
├── styles/
│   └── main.css                        # Tutti gli stili (2391 righe)
│
└── utils/                              # Utility generiche
    ├── formspree.js                    # Client API Formspree
    ├── router.js                       # Router basato su History API (pushState)
    ├── seo.js                          # Gestione meta tag dinamici per pagina
    ├── jsonld.js                       # Iniezione JSON-LD structured data
    └── store.js                        # (Legacy) Store reattivo minimale
```

### Spiegazione cartelle

| Cartella        | Perché esiste                                   | Cosa contiene            | Ruolo                                                  |
| --------------- | ----------------------------------------------- | ------------------------ | ------------------------------------------------------ |
| `assets/`       | Risorse statiche del sito                       | 2 immagini JPG           | Hero background e timeline                             |
| `components/`   | Codice UI riutilizzabile                        | navbar, footer           | Usato da TUTTE le pagine tramite `wrap()`              |
| `configurator/` | Riservato per file upload/configurazioni future | `.gitkeep`               | Non utilizzato al momento                              |
| `customizers/`  | Profili customizer (sistema NUOVO)              | 2 cartelle con `data.js` | Alimenta la pagina `/creator`                          |
| `data/`         | Registry e motori dati                          | 5 file JS                | Centralizza accesso a customizer, sellers, colori, SVG |
| `pages/`        | Pagine dell'app                                 | 5 file JS                | Una per ogni route                                     |
| `sellers/`      | Profili venditori (sistema VECCHIO)             | 6 cartelle con `data.js` | Alimenta il configuratore e la ricerca                 |
| `styles/`       | Stili                                           | `main.css`               | Tutto il CSS in un file                                |
| `utils/`        | Utility trasversali                             | 3 file JS                | Router, formspree, store                               |

---

# 3. Linguaggi e tecnologie utilizzate

### HTML

**Cos'è**: Linguaggio di markup per pagine web.
**Dove**: `index.html` — il solo file HTML. Contiene solo la struttura minima: `<div id="app">`, collegamento CSS, e un tag `<script type="module">` che carica l'app.
**Perché**: Tutto il rendering è generato via JavaScript. L'HTML è solo un contenitore vuoto.

### CSS

**Cos'è**: Linguaggio per lo stile delle pagine web.
**Dove**: Unico file `styles/main.css` (2391 righe).
**Perché**: Design system coeso con variabili CSS personalizzate. Nessun framework CSS — tutto scritto a mano.
**Cosa permette**: Palette colori coerente, layout responsive (mobile/tablet/desktop), animazioni (timeline, hover card, fade-in step), pattern di sfondo con linee verticali.

### JavaScript (ES Modules)

**Cos'è**: Linguaggio di programmazione per il web. Usato in modalità "moduli ES" (`import`/`export`).
**Dove**: Tutti i file dentro `pages/`, `components/`, `data/`, `utils/`, `customizers/`, `sellers/`.
**Perché**: Nessun framework — l'applicazione è interamente in JS vanilla.
**Cosa permette**:

- Routing lato client senza ricaricare la pagina
- Rendering dinamico dell'HTML tramite template literals (`` `${...}` ``)
- Gestione dello stato del configuratore con una macchina a stati
- Generazione di SVG inline per l'anteprima dei capi
- Comunicazione con API esterna (Formspree)

### SVG (inline)

**Cos'è**: Formato vettoriale per grafica.
**Dove**: Generato dinamicamente in `data/products.js` e inserito direttamente nell'HTML.
**Perché**: Anteprima live del capo personalizzato senza bisogno di immagini. Vettoriale = si adatta a qualsiasi schermo.
**Cosa permette**: Disegnare magliette, pantaloni e felpe con modifiche visibili in tempo reale (colore, tagli, stampe, ricami).

### Formspree

**Cos'è**: Servizio esterno che riceve submit di form HTML e li inoltra via email.
**Dove**: `utils/formspree.js`.
**Perché**: Soluzione zero-backend per l'invio delle richieste di personalizzazione.
**Nota**: Al momento l'ID Formspree è vuoto — i dati vengono solo loggati in console.

---

# 4. Architettura del progetto

### Schema di comunicazione

```
Utente
  │
  ▼
Naviga a #/pagina  (clicca link, cambia hash)
  │
  ▼
Router (utils/router.js)
  │  hashchange event → resolve()
  │  trova la route corrispondente (statica o dinamica)
  ▼
Pagina (es. pages/creator.js)
  │  render(ctx) genera HTML come stringa
  │  wrap() in index.html aggiunge navbar + footer
  ▼
innerHTML = HTML_completo  (router inserisce nel DOM)
  │
  ▼
window._pageInit(ctx)  (router chiama la funzione init della pagina)
  │
  ▼
init*(ctx)  attacca event listener al DOM appena creato
  │
  ▼
Interazione utente → eventi → stato → re-render
```

### Flusso dati

```
┌─────────────────────────────────────────┐
│            index.html                    │
│  import { route, init } da router.js    │
│  route("/path", wrap(renderFn, initFn)) │
│  init(document.getElementById("app"))    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│      utils/router.js         │
│  registra route statiche +   │
│  dinamiche (:param)          │
│                              │
│  resolve():                  │
│    1. matcha hash → route    │
│    2. outlet.innerHTML =     │
│       render(ctx)            │
│    3. window._pageInit(ctx)  │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│    pages/*.js                │
│  render*(ctx) → HTML string  │
│                              │
│  init*(ctx):                 │
│    querySelector +           │
│    addEventListener          │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│    data/*.js                 │
│  import { getCustomizer }    │
│  import { renderSVG }        │
│  dati letti dai registry     │
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│  customizers/*/data.js       │
│  sellers/*/data.js           │
│  Dati puri (oggetti JSON)    │
└──────────────────────────────┘
```

### Due sistemi dati paralleli

Il progetto ha **due sistemi dati** che convivono:

| Sistema                | Cartella       | Registry              | Usato da                 | Scopo                                          |
| ---------------------- | -------------- | --------------------- | ------------------------ | ---------------------------------------------- |
| **Customizer** (nuovo) | `customizers/` | `data/customizers.js` | `pages/creator.js`       | Profili pubblici, lista e dettaglio            |
| **Seller** (legacy)    | `sellers/`     | `data/sellers.js`     | `pages/configuratore.js` | Prodotti, opzioni, prezzi per il configuratore |

Il configuratore cerca il creator in entrambi: prima controlla `getSeller(id)`, poi `getCustomizer(id)`.

---

# 5. Routing

### Come funziona

Il sistema di routing è **hash-based**: l'URL usa il carattere `#` per indicare la pagina corrente.

```
https://dominio.com/#/creator
                   ^^^^^^^^^^
                   hash — letto da window.location.hash
```

Vantaggio: non serve un server che gestisca le route — funziona anche servendo staticamente `index.html`.

### Dove sono definite le route

In `index.html`, righe 36-43:

```js
route("/", wrap(renderHome(), initHome));
route("/configuratore", wrap(renderConfiguratore(), initConfiguratore));
route("/venditore", wrap(renderConfiguratore(), initConfiguratore));
route("/venditori", wrap(renderVenditori(), initVenditori));
route("/contatti", wrap(renderContatti(), initContatti));
route("/creator", wrap(renderCreator, initCreator));
route("/creator/", wrap(renderCreator, initCreator));
route("/creator/:id", wrap(renderCreator, initCreator));
```

Nota: `/venditore` è un alias di `/configuratore` (legacy).

### Route statiche vs dinamiche

Router.js supporta due tipi:

- **Statiche**: esatte, tipo `/creator`, `/configuratore`. Memorizzate nell'oggetto `routes`.
- **Dinamiche**: con `:param`, tipo `/creator/:id`. Memorizzate in `dynamicRoutes` come regex.

Quando arriva una richiesta, `resolve()` cerca prima nelle route statiche, poi scorre quelle dinamiche fino a che una matcha. I parametri catturati vengono messi in `ctx`:

```js
// URL: #/creator/lorenzo-perassi
// ctx = { id: "lorenzo-perassi" }
```

### Query parameters

`getParams()` estrae i parametri dalla parte dopo `?` nell'hash:

```js
// URL: #/configuratore?creator=lorenzo-perassi
// getParams() → { creator: "lorenzo-perassi" }
```

### Passaggio dati tra pagine

I dati passano da una pagina all'altra tramite **URL parameters** (`?chiave=valore`). Non c'è stato globale condiviso tra pagine — ogni pagina re-inizializza il proprio stato quando viene chiamata.

Esempio: profilo customizer → configuratore

1. Utente clicca "Start customizing" su `/creator/lorenzo-perassi`
2. `initCreator()` chiama `navigate("/configuratore?creator=lorenzo-perassi")`
3. Router carica `configuratore.js`
4. `initConfiguratore()` legge `getParams().creator` → `"lorenzo-perassi"`
5. Cerca il customizer in sellers e customizers, imposta `s.creator`

---

# 6. Spiegazione di ogni file importante

---

## 6.1 `index.html`

**Scopo**: Entry point dell'applicazione. Contiene la struttura minima, importa tutti i moduli e registra le route.

**Contiene**:

- Tag `<html lang="it">` con viewport, description, title
- `<div id="app">` — contenitore dove il router inserisce l'HTML
- Blocco `<script type="module">` che importa tutte le pagine e avvia il routing

**Funzione interna `wrap()`**:

```
wrap(html, initFn) → funzione che:
  1. Salva initFn in window._pageInit
  2. Se html è funzione, la chiama con ctx
  3. Restituisce renderNav() + contenuto + renderFooter()
```

Cio significa: ogni pagina viene automaticamente incorniciata da navbar e footer.

**Avvio**:

```js
init(document.getElementById("app")); // avvia il router
initNav(); // attacca eventi navbar
```

---

## 6.2 `utils/router.js`

**Scopo**: Router SPA hash-based. Gestisce la navigazione lato client senza ricaricare la pagina.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `route(path, render)` | Registra una route (statica o dinamica) |
| `init(el)` | Avvia il router: ascolta `hashchange`, risolve l'hash corrente |
| `navigate(path)` | Cambia l'hash → attiva `hashchange` |
| `getPath()` | Restituisce il percorso senza query string |
| `getParams()` | Restituisce un oggetto con i parametri della query string |

**Funzioni interne**:
| Funzione | Scopo |
|---|---|
| `resolve()` | Matcha l'hash corrente con una route, esegue render, chiama init, aggiorna nav attiva |
| `updateActiveLink(path)` | Aggiunge/toglie classe `active` ai link della navbar |

**Flusso `resolve()`**:

1. Legge `getPath()` (es. `/creator/lorenzo-perassi`)
2. Cerca nelle route statiche (esatte)
3. Se non trova, scorre le route dinamiche con regex → matcha `/:id`
4. Prepara `ctx` con i parametri catturati
5. `outlet.innerHTML = render(ctx)` — inserisce HTML nel DOM
6. `window._pageInit(ctx)` — chiama l'init della pagina
7. `updateActiveLink(path)` — evidenzia il link attivo nella navbar

---

## 6.3 `utils/formspree.js`

**Scopo**: Inviare richieste HTTP a Formspree per la consegna via email.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `send(data)` | Invia POST a Formspree con i dati del form |

**Nota**: La variabile `ID` è una stringa vuota. Quando è vuota, `send()` logga i dati in console senza inviarli. Per attivare: inserire l'ID Formspree.

---

## 6.4 `utils/store.js`

**Scopo**: Store reattivo minimale (pattern publish/subscribe).

**Esporta**:
| Funzione | Scopo |
|---|---|
| `get(key)` | Legge un valore (o tutto lo stato) |
| `set(key, val)` | Imposta un valore e notifica i listener |
| `onChange(fn)` | Iscrive un listener ai cambiamenti |

**Nota**: Questo file **non è utilizzato** da nessuna pagina al momento. È un'utility legacy.

---

## 6.5 `components/navbar.js`

**Scopo**: Barra di navigazione principale, presente su ogni pagina.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderNav()` | Genera HTML della navbar |
| `initNav()` | Attacca event listener (toggle mobile, logo → home, chiudi menu su click link) |

**Struttura HTML generata**:

```
<nav>
  <div class="container">
    <a class="nav-logo">Custom<span>ly</span></a>
    <div class="nav-links" id="nav-links">
      <a href="#/">Home</a>
      <a href="#/configuratore">Configuratore</a>
      <a href="#/creator">Customizers</a>
      <a href="#/contatti">Contatti</a>
    </div>
    <button class="mobile-toggle">☰</button>
  </div>
</nav>
```

---

## 6.6 `components/footer.js`

**Scopo**: Footer del sito, presente su ogni pagina.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderFooter()` | Genera HTML del footer |

**Sezioni**: Brand + descrizione, Naviga (link), Social (placeholder), Info (contatti, privacy, termini).

---

## 6.7 `pages/home.js`

**Scopo**: Home page — presentazione del progetto.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderHome()` | Genera HTML completo della home |
| `initHome()` | Attacca event listener (bottoni CTA, IntersectionObserver per timeline) |

**Sezioni**:

1. **Hero**: schermo intero, frase "Your vision. Your style. Make it yours.", 3 bottoni
2. **Il problema**: 5 punti elenco, 2 card (per chi compra / per chi crea)
3. **La soluzione**: timeline animata a 4 step
4. **Anteprima**: mockup statico del configuratore con SVG
5. **La visione**: 4 card sulla visione del progetto
6. **About + Roadmap**: chi ha creato Customly, roadmap in 3 tappe

---

## 6.8 `pages/creator.js`

**Scopo**: Pagina lista customizer e pagine profilo individuali.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderCreator(ctx)` | Handler route: se ctx.id è presente mostra profilo, altrimenti lista |
| `initCreator()` | Attacca evento al pulsante "Start customizing" |

**Funzioni interne**:
| Funzione | Scopo |
|---|---|
| `renderProfile(seller)` | Genera HTML del profilo customizer (avatar, nome, bio, stili, esempi, contatti, CTA) |
| `renderList()` | Genera HTML della griglia di tutti i customizer |

**Template profilo**:

```
┌─────────────────────────────────────────┐
│  [Avatar]  Customizer                   │
│            Nome Customizer              │
│            Tagline                      │
├──────────────────────┬──────────────────┤
│  About               │  Instagram link  │
│  Bio paragrafo       │                  │
│                      │  [Start customiz │
│  Specialized in      │   ing →]        │
│  [tag] [tag] [tag]   │                  │
│                      │  Configure your  │
│  Example works       │  garment with... │
│  • lavoro 1          │                  │
│  • lavoro 2          └──────────────────┤
│  • lavoro 3          │← Go to configur  │
└──────────────────────┴──────────────────┘
```

**Dati utilizzati**: `data/customizers.js` → `getAllCustomizers()` per la lista, `getCustomizer(id)` per il profilo.

---

## 6.9 `pages/configuratore.js`

**Scopo**: Configuratore interattivo — il file più grande e complesso del progetto (1222 righe).

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderConfiguratore()` | Genera HTML contenitore del configuratore |
| `initConfiguratore()` | Legge parametro `creator` dall'URL, inizializza stato, avvia rendering |

**Macchina a stati**:

```
       ┌──────────────┐
       │    start     │  "Do you already have a garment?"
       └──────┬───────┘
              │
        ┌─────┴─────┐
        │           │
        ▼           ▼
  ┌─────────┐  ┌─────────────┐
  │ garment │  │ no-garment  │  "Create from scratch" → link a /creator
  └────┬────┘  └─────────────┘
       │
       ▼
  ┌───────────┐
  │ customize │  Colore + modifiche
  └─────┬─────┘
        │
        ▼
  ┌────────┐
  │ review │  Riepilogo + form contatto
  └────┬───┘
       │
       ▼
  ┌──────┐
  │ done │  "Request sent!"
  └──────┘
```

**Dati interni**:
| Variabile | Scopo |
|---|---|
| `COLORS` | Array di 7 colori predefiniti con label |
| `GARMENT` | Oggetto con tipi di capo (T-Shirt, Jeans) e relativi modelli |
| `CUSTOMIZATIONS` | Oggetto con modifiche disponibili per tipo di capo, prezzi e impostazioni |
| `s` | Stato globale del configuratore (modulo) |

**Stato `s`**:

```js
{
  step: "start",             // step corrente
  creator: null,             // ID del creator selezionato
  hasGarment: null,          // true/false/non ancora scelto
  garmentType: null,         // "tshirt" | "jeans"
  model: null,               // modello specifico
  brand: "",                 // marca opzionale
  customizations: [],        // modifiche attive con impostazioni
  color: "#c13535",          // colore selezionato
  form: { name, surname, email, instagram, phone, notes, acceptTerms },
  submitting: false,
  submittedOk: false
}
```

**Funzioni principali**:
| Funzione | Scopo |
|---|---|
| `initState()` | Crea stato fresco |
| `render()` | Monta layout se non presente, poi renderizza step + sidebar |
| `renderCurrentStep()` | Dispatcher: chiama `renderStep*()` giusto |
| `renderStepStart()` | Scelta "Hai già un capo?" |
| `renderStepNoGarment()` | Reindirizzamento a /creator |
| `renderStepGarment()` | Scelta tipo capo, modello, marca |
| `renderStepCustomize()` | Colore + modifiche |
| `renderCustContent()` | Lista modifiche attive e disponibili |
| `renderStepReview()` | Riepilogo + form |
| `renderSummary()` | Sidebar: preview SVG + riepilogo prezzi |
| `calculateTotal()` | Calcola prezzo totale |
| `buildPreviewCfg()` | Mappa stato → config per SVG |
| `submitOrder()` | Valida form, invia a Formspree |
| `bindSearch()` | Barra di ricerca live |
| `listen()` | Event delegation centralizzata (click, input, change) |

---

## 6.10 `pages/venditori.js`

**Scopo**: Landing page "Per i professionisti" — spiega la piattaforma ai potenziali customizer.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderVenditori()` | Genera HTML |
| `initVenditori()` | Attacca evento alla waitlist email |

**Sezioni**: Hero, 6 feature card "Prossimamente", "Perché funzionerà", waitlist form (finto — nessun backend).

---

## 6.11 `pages/contatti.js`

**Scopo**: Pagina contatti con form di contatto.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderContatti()` | Genera HTML (form + canali) |
| `initContatti()` | Attacca submit form e validazione |

**Campi form**: Nome, Email, Oggetto (select), Messaggio. Invia a Formspree con tipo "contatto".

---

## 6.12 `data/sellers.js`

**Scopo**: Registry dei venditori per il configuratore.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `getSeller(id)` | Cerca venditore per ID (o null) |
| `getAllSellers()` | Tutti i venditori |
| `searchSellers(q)` | Cerca per nome, ID, tagline |

**Venditori registrati**: `venditore1`, `venditore2`, `admin`, `perassi`.

**Nota**: `demon-handmade` e `raw-spirit` hanno cartella e dati ma **non sono importati** in questo registry.

---

## 6.13 `data/customizers.js`

**Scopo**: Registry dei customizer per la pagina creator.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `getCustomizer(id)` | Cerca customizer per ID (o null) |
| `getAllCustomizers()` | Tutti i customizer |

**Customizer registrati**: `lorenzo-perassi`, `template`.

---

## 6.14 `data/products.js`

**Scopo**: Motore di rendering SVG per l'anteprima dei capi.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `renderSVG(type, opts, color, brand, cfg)` | Genera SVG del capo |
| `getColorLabel(hex)` | Converte esadecimale → nome colore |

**Tipi supportati**:
| Tipo | Funzione interna |
|---|---|
| `maglia` / `tshirt` | `renderShirt()` |
| `jeans` | `renderPants()` |
| `felpa` | `renderHoodie()` |

**Parametri di configurazione (`cfg`)**:

- Shirt: `sleeves` (short/long/none), `cropped`, `rawHem`, `print`, `patch`, `ricamo`
- Pants: `leg` (regular/skinny/baggy/flared/wide/taper), `rawHem`, `tears`, `patch`, `bleach`, `ricamo`
- Hoodie: `sleeves`, `zip`, `cropped`, `rawHem`, `print`, `patch`, `ricamo`, `bleach`
- Tutti: `color`

---

## 6.15 `data/color.js`

**Scopo**: Utility per schiarire o scurire un colore esadecimale.

**Esporta**:
| Funzione | Scopo |
|---|---|
| `shade(hex, amt)` | Aggiunge `amt` a ogni canale RGB (negativo = scurisce) |

Usato da `products.js` per generare ombre e dettagli del capo con tonalità lievemente diversa dal colore base.

---

## 6.16 `styles/main.css`

**Scopo**: Tutti gli stili dell'applicazione in un unico file (2391 righe).

**Sezioni principali**:
| Sezione | Righe | Cosa contiene |
|---|---|---|
| `:root` | 1-24 | Variabili CSS (colori, font, layout) |
| Reset/base | 26-78 | Box-sizing, body pattern, resets |
| `.container` | 79-83 | Layout centrale (max-width: 1200px) |
| `nav` | 85-176 | Navbar fissa, responsive |
| `footer` | 178-253 | Footer 4 colonne, responsive |
| `.hero` | 255-324 | Hero full-screen, overlay, titolo |
| Bottoni | 325-353 | `.btn`, `.btn-primary`, `.btn-secondary` |
| Timeline | 466-616 | Timeline animata 4 step |
| Configuratore v1 | 760-931 | Prima versione configuratore |
| Configuratore v2 | 1252-1953 | Versione attuale del configuratore |
| Creator profile | 1955-2391 | Profilo e lista customizer |

**Design system**:

- Colore primario: `#c13535` (rosso acceso)
- Sfondo: `#f5f0eb` (crema caldo)
- Testo: `#1a1410` (quasi nero)
- Heading: Oswald (Google Fonts)
- Body: system-ui (font di sistema)
- Bordo: `#d4c9b8` (marrone chiaro)
- Raggio bordo: 4px (minimale/industriale)

---

# 7. Componenti

### Cosa sono i componenti

Nel progetto Customly, un **componente** è un modulo JavaScript che esporta due funzioni:

- `render*()` → restituisce una stringa HTML
- `init*()` → attacca event listener al DOM dopo il rendering

### Componenti esistenti

| Componente          | File                                   | Riutilizzato in                       |
| ------------------- | -------------------------------------- | ------------------------------------- |
| **Navbar**          | `components/navbar.js`                 | Tutte le pagine (tramite `wrap()`)    |
| **Footer**          | `components/footer.js`                 | Tutte le pagine (tramite `wrap()`)    |
| **ProfileTemplate** | `pages/creator.js` → `renderProfile()` | Tutti i profili customizer            |
| **Configuratore**   | `pages/configuratore.js`               | Route `/configuratore` e `/venditore` |

### Come comunicano

I componenti **non comunicano direttamente tra loro**. La comunicazione avviene in due modi:

1. **Tramite URL**: quando un componente vuole passare dati a un altro, naviga a un URL con parametri:
   - `navigate("/configuratore?creator=lorenzo-perassi")`

2. **Tramite funzioni di registry**: i componenti condividono dati importando funzioni dai moduli `data/`:
   - `pages/creator.js` importa `getCustomizer` da `data/customizers.js`
   - `pages/configuratore.js` importa `getSeller` da `data/sellers.js`

Non esiste uno stato globale condiviso tra pagine — ogni pagina reinizializza il proprio stato quando viene montata.

---

# 8. Sistema customizer

### Dove vengono salvati

I customizer vivono in cartelle individuali dentro `customizers/`:

```
customizers/
├── lorenzo-perassi/
│   └── data.js      # Esporta: export const customizer = { ... }
└── template/
    └── data.js      # Esporta: export const customizer = { ... }
```

Ogni cartella contiene un file `data.js` che esporta un oggetto `customizer` con la struttura:

```js
export const customizer = {
  id: "lorenzo-perassi",       // Identificatore unico (usato nell'URL)
  name: "Lorenzo Perassi",      // Nome visualizzato
  tagline: "...",               // Frase sotto il nome
  bio: "...",                   // Biografia
  style: "tag1, tag2, tag3",   // Stili separati da virgola
  image: null,                  // URL avatar (null = placeholder iniziale)
  cover: null,                  // URL copertina (non ancora utilizzato)
  city: "Saluzzo",              // Città
  category: "denim",            // Categoria di specializzazione
  links: { instagram, email },  // Link social
  contacts: { instagram, email }, // Contatti
  social: { instagram },        // URL social
  examples: ["lavoro1", ...],   // Esempi di lavori
}
```

### Come vengono caricati

`data/customizers.js` importa manualmente ogni customizer e li registra in un oggetto:

```js
import { customizer as lp } from "../customizers/lorenzo-perassi/data.js";
import { customizer as tmpl } from "../customizers/template/data.js";

const registry = {
  "lorenzo-perassi": lp,
  template: tmpl,
};
```

Poi espone due funzioni:

- `getCustomizer(id)` → restituisce il customizer o null
- `getAllCustomizers()` → restituisce tutti come array

### Come funziona il template profilo

Tutti i customizer usano **la stessa identica funzione** `renderProfile(seller)` in `pages/creator.js`. La funzione prende un oggetto customizer e genera l'HTML. Non c'è differenza nel template tra Lorenzo Perassi e Template Profile — cambiano solo i dati.

### Lorenzo Perassi

Lorenzo Perassi è un customizer come tutti gli altri. Ha:

- Una cartella `customizers/lorenzo-perassi/data.js` con i suoi dati
- Un profilo su `/creator/lorenzo-perassi` che usa `renderProfile()`
- Una entry in `data/customizers.js` con ID `"lorenzo-perassi"`

È identico a Template Profile nella struttura. Nessun trattamento speciale.

### Come aggiungere un nuovo customizer

1. Crea `customizers/nome-customizer/data.js`
2. Esporta `export const customizer = { ... }` con tutti i campi
3. Aggiungi l'import in `data/customizers.js`:
   ```js
   import { customizer as mio } from "../customizers/nome-customizer/data.js";
   ```
4. Aggiungi al registry:
   ```js
   const registry = {
     "lorenzo-perassi": lp,
     template: tmpl,
     "nome-customizer": mio,
   };
   ```

Fatto. Il nuovo customizer apparirà automaticamente nella lista su `/creator` e sarà accessibile via `/creator/nome-customizer`.

---

# 9. Configuratore

### Flusso utente completo

```
1. START
   │
   ├─ "Do you already have a garment?"
   │
   ├─ SÌ ──────────────────────────────────── NO
   │                                          │
   ▼                                          ▼
2. GARMENT                               NO-GARMENT
   │                                          │
   │ Scegli: T-Shirt o Jeans                  "Find a professional to start"
   │ Modello                                  Link a /creator
   │ Marca (opzionale)                        Bottone "Start over"
   │
   ▼
3. CUSTOMIZE
   │
   │ Scegli colore (7 opzioni)
   │ Aggiungi modifiche:
   │   T-Shirt: Crop, Shorten, Shorten Sleeves, Remove Sleeves
   │   Jeans: Flared Bottom, Side Panels, Raw Hem
   │
   │ Ogni modifica ha impostazioni aggiuntive:
   │   - boolean toggle (es. "Fabric available?")
   │   - select con opzioni (es. tipo di tessuto, lunghezza)
   │
   ▼
4. REVIEW
   │
   │ Riepilogo completo:
   │   - Creator selezionato
   │   - Tipo capo + modello + marca
   │   - Colore
   │   - Modifiche con dettagli
   │   - Prezzo totale
   │
   │ Form contatto:
   │   Nome, Cognome, Email, Instagram (opt), Telefono (opt)
   │   Note (opt), Accetta termini
   │
   ▼
5. DONE
   │
   │ "Request sent!"
   │ Bottone "New project"
```

### Gestione delle scelte

Lo stato `s` tiene traccia di ogni scelta dell'utente. Quando l'utente clicca qualcosa:

1. L'evento viene catturato da `listen()` (event delegation su `#configuratore-root`)
2. La funzione modifica lo stato `s`
3. Viene chiamato `render()` o `updateSidebar()` per aggiornare la UI

Esempio — scelta del colore:

```js
if (t.hasAttribute("data-color")) {
  s.color = t.dataset.color; // aggiorna stato
  // aggiorna classe active sui pulsanti
  swatches.forEach((x) => x.classList.remove("active"));
  t.classList.add("active");
  updateSidebar(); // aggiorna preview + riepilogo
}
```

### Calcolo del prezzo

`calculateTotal()` somma:

- Prezzo base di ogni modifica (es. Flared = €15)
- Prezzo delle opzioni selezionate nelle impostazioni (es. tessuto camo = €12 aggiuntivi)

```js
function calculateTotal() {
  let t = 0;
  for (const c of s.customizations) {
    const def = findCustDef(s.garmentType, c.id);
    if (!def) continue;
    t += def.price || 0; // prezzo base modifica
    for (const setting of def.settings) {
      // se è un select con prezzo, lo aggiunge
      const opt = setting.options?.find(
        (o) => o.id === c.settings[setting.key],
      );
      if (opt && opt.price) t += opt.price;
    }
  }
  return t;
}
```

### Anteprima SVG

`renderSummary()` chiama `renderSVG()` da `products.js` con la configurazione corrente. La funzione genera un elemento SVG come stringa, che viene inserito nella sidebar.

`buildPreviewCfg()` traduce lo stato del configuratore nel formato che `renderSVG()` si aspetta:

```js
function buildPreviewCfg() {
  const cfg = { color: s.color };
  if (s.garmentType === "tshirt") {
    cfg.sleeves = mappaModelloManiche(s.model);
    if (haModifica("crop")) cfg.cropped = true;
    // ...
  }
  if (s.garmentType === "jeans") {
    cfg.leg = mappaModelloGambe(s.model);
    if (haModifica("flared")) cfg.leg = "flared";
    // ...
  }
  return cfg;
}
```

### Invio del progetto

`submitOrder()`:

1. Legge i campi del form dal DOM
2. Valida: nome, cognome, email, accetta termini
3. Prepara i dati
4. Genera SVG finale
5. Chiama `send(data)` da `utils/formspree.js`
6. Se successo: `s.submittedOk = true`, mostra schermata "Done"
7. Se errore: mostra messaggio errore

---

# 10. Gestione dati

### Dati statici

Tutti i dati sono **statici** — non c'è database, API o backend. I dati vivono in file JavaScript importati come moduli ES.

| Tipo di dato          | Dove                              | Formato                        |
| --------------------- | --------------------------------- | ------------------------------ |
| Profili customizer    | `customizers/*/data.js`           | Oggetto JS esportato           |
| Profili venditori     | `sellers/*/data.js`               | Oggetto JS esportato           |
| Colori configuratore  | `pages/configuratore.js` (inline) | Array di oggetti               |
| Tipi capo             | `pages/configuratore.js` (inline) | Oggetto annidato               |
| Modifiche disponibili | `pages/configuratore.js` (inline) | Oggetto annidato               |
| SVG markup            | `data/products.js`                | Funzioni che generano stringhe |
| Utility colori        | `data/color.js`                   | Funzione `shade()`             |

### Come vengono importati

```
customizers/lorenzo-perassi/data.js
        → importato da data/customizers.js
                → importato da pages/creator.js

sellers/perassi/data.js
        → importato da data/sellers.js
                → importato da pages/configuratore.js

data/products.js
        → importato da pages/configuratore.js
```

### Differenza tra dati e registry

I file dentro `customizers/` e `sellers/` contengono solo **dati puri** (oggetti). I file dentro `data/` sono **registry** che importano quei dati e li espongono con funzioni di accesso (`getById`, `getAll`, `search`).

### Come aggiungere nuovi dati

Per aggiungere un nuovo **customizer**:

1. Crea cartella + `data.js` in `customizers/`
2. Aggiungi import + entry in `data/customizers.js`

Per aggiungere un nuovo **venditore/seller**:

1. Crea cartella + `data.js` in `sellers/`
2. Aggiungi import + entry in `data/sellers.js`

Per aggiungere nuovi **colori** nel configuratore:

1. Aggiungi un oggetto all'array `COLORS` in `pages/configuratore.js`

Per aggiungere nuove **modifiche** nel configuratore:

1. Aggiungi un oggetto all'array appropriato in `CUSTOMIZATIONS` in `pages/configuratore.js`

---

# 11. CSS e design system

### Struttura

Un unico file: `styles/main.css` (2391 righe). Tutto in un file solo — nessun CSS modulare o framework.

### Organizzazione

Le sezioni sono in ordine di apparizione nel layout:

1. Variabili `:root`
2. Reset/base
3. Container
4. Nav
5. Footer
6. Hero
7. Bottoni
8. Sezioni generali
9. Card
10. Timeline
11. Problem section
12. Vision section
13. About inline
14. Roadmap
15. Configuratore v1 (legacy)
16. Configuratore v2 (attuale)
17. Creator profile/list

### Variabili CSS (design system)

```css
:root {
  --bg: #f5f0eb;              // Sfondo principale (crema)
  --bg-alt: #ece4d9;          // Sfondo alternativo
  --bg-card: #ffffff;          // Sfondo card
  --text: #1a1410;            // Testo principale
  --text-secondary: #6b5c4e;  // Testo secondario
  --text-tertiary: #9a8a7a;   // Testo terziario
  --accent: #c13535;          // Colore accento (rosso)
  --accent-hover: #a32d2d;    // Rosso scuro hover
  --accent-light: rgba(193,53,53,0.08); // Rosso trasparente
  --border: #d4c9b8;          // Bordi
  --border-light: #e5ddd2;    // Bordi chiari
  --success: #2d5a3d;         // Verde successo
  --error: #c13535;           // Rosso errore

  --font-heading: "Oswald", "Impact", sans-serif;  // Font titoli
  --font-body: system-ui, -apple-system, sans-serif; // Font corpo

  --nav-h: 64px;              // Altezza navbar
  --radius: 4px;              // Raggio bordo
  --max-w: 1200px;            // Larghezza massima container
}
```

### Responsive

Breakpoint usati:

- **768px**: Nav → hamburger, footer 2 colonne, timeline single-column
- **900px**: Configuratore → layout singola colonna
- **960px**: Configuratore v2 → singola colonna
- **1024px**: Timeline card più strette
- **480px**: Footer 1 colonna

### Pattern di sfondo

Il body ha un pattern sutilissimo di linee verticali:

```css
body {
  background:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 40px,
      rgba(212, 201, 184, 0.22) 40px,
      rgba(212, 201, 184, 0.22) 41px
    ),
    var(--bg);
}
```

### Come mantenere lo stile

1. Usa sempre le variabili CSS (`var(--accent)`, `var(--text-secondary)`, ecc.)
2. Non aggiungere nuovi file CSS — tutto in `main.css`
3. Segui la convenzione di nomenclatura: `cfg-*` per configuratore, `creator-*` per creator page
4. I bottoni del configuratore usano classe `.cfg-btn` e varianti `.cfg-btn-primary`, `.cfg-btn-secondary`, `.cfg-btn-ghost`

---

# 12. Flusso completo di un utente

### Scenario: un utente vuole personalizzare un jeans con Lorenzo Perassi

```
1. HOME PAGE
   │
   │ URL: #/
   │ L'utente arriva sulla home. Vede hero, problemi, soluzione, visione.
   │ Clicca "Scopri i customizer"
   │
   ▼
2. LISTA CUSTOMIZER
   │
   │ URL: #/creator
   │ Router carica pages/creator.js → renderList()
   │ Vede due card: Lorenzo Perassi e Template Profile
   │ Clicca su Lorenzo Perassi
   │
   ▼
3. PROFILO LORENZO PERASSI
   │
   │ URL: #/creator/lorenzo-perassi
   │ Router matcha route dinamica /creator/:id
   │ renderProfile(seller) genera HTML profilo:
   │   - Avatar (placeholder "L")
   │   - Nome, tagline
   │   - Bio, stili, esempi lavori
   │   - Instagram, CTA
   │ Clicca "Start customizing →"
   │
   ▼
4. CONFIGURATORE (con creator selezionato)
   │
   │ URL: #/configuratore?creator=lorenzo-perassi
   │ Router carica pages/configuratore.js
   │ initConfiguratore() legge params.creator = "lorenzo-perassi"
   │ getSeller("lorenzo-perassi") → null
   │ getCustomizer("lorenzo-perassi") → trova Lorenzo
   │ s.creator = "lorenzo-perassi"
   │ Badge mostra: "Customizer — Lorenzo Perassi"
   │
   ├─ Step 1: "Do you already have a garment?"
   │   L'utente clicca "Sì" (ha un jeans)
   │
   ├─ Step 2: Select your garment
   │   Sceglie "Jeans", poi modello "Baggy"
   │   Opzionale: marca "Levi's"
   │   Clicca "Continue →"
   │
   ├─ Step 3: Customize
   │   Sceglie colore "Denim" (#4a6fa5)
   │   Aggiunge modifica "Flared Bottom" (€15)
   │     Imposta tessuto: "Camouflage" (+€12)
   │   Aggiunge modifica "Raw Hem" (€5)
   │     Imposta finish: "Frayed hem" (+€5)
   │
   │   Sidebar mostra:
   │   ┌───────────────────────────────┐
   │   │  [anteprima SVG jeans blu]    │
   │   │  Your Custom Project          │
   │   │  Creator: Lorenzo Perassi     │
   │   │  Garment: Jeans               │
   │   │  Model: Baggy                 │
   │   │  Color: Denim                 │
   │   │  Flared Bottom: +€27         │
   │   │  Raw Hem: +€10               │
   │   │  ─────────────────────        │
   │   │  Total: €37.00               │
   │   └───────────────────────────────┘
   │
   │   Clicca "Review Order →"
   │
   ├─ Step 4: Review
   │   Vede riepilogo completo
   │   Compila form: Nome, Cognome, Email
   │   Aggiunge note: "Vorrei le zip laterali"
   │   Accetta termini
   │   Clicca "Submit project"
   │
   │   submitOrder() → send(data) → console.log (Formspree non configurato)
   │
   ▼
5. DONE
   │
   │ "Request sent!"
   │ "The professional will contact you with a quote."
   │ Bottone "New project" → ricomincia
```

---

# 13. Come modificare il progetto in futuro

### Aggiungere un nuovo customizer

**File da modificare:**

1. **CREA** `customizers/nuovo-customizer/data.js` — esporta oggetto `customizer`
2. **MODIFICA** `data/customizers.js` — aggiungi import e riga nel registry

Nessun altro file deve essere toccato. Il nuovo customizer appare subito su `/creator` e `/creator/nuovo-customizer`.

### Aggiungere una nuova pagina

1. **CREA** `pages/nuova-pagina.js` — esporta `renderNuovaPagina()` e `initNuovaPagina()`
2. **MODIFICA** `index.html` — aggiungi `import` della nuova pagina e `route("/nuova-path", wrap(renderNuovaPagina, initNuovaPagina))`
3. **MODIFICA** `components/navbar.js` — aggiungi link alla navbar
4. **MODIFICA** `components/footer.js` — aggiungi link nel footer (opzionale)

### Aggiungere una modifica al configuratore

1. **MODIFICA** `pages/configuratore.js` — aggiungi oggetto all'array appropriato in `CUSTOMIZATIONS`:
   ```js
   jeans: [
     {
       id: "nuova-modifica",
       label: "Nome Modifica",
       desc: "Descrizione della modifica",
       price: 10,
       preview: "effetto",
       settings: [ ... ]
     },
   ]
   ```
2. Se la modifica cambia l'aspetto visivo, **MODIFICA** `data/products.js` — aggiorna la funzione `renderPants()`, `renderShirt()` o `renderHoodie()` per gestire il nuovo parametro
3. Se la modifica ha bisogno di un nuovo effetto visivo, aggiorna `buildPreviewCfg()` in `pages/configuratore.js`

### Aggiungere un nuovo colore

**MODIFICA** `pages/configuratore.js` — aggiungi oggetto all'array `COLORS`:

```js
const COLORS = [
  { id: "#c13535", label: "Rosso" },
  { id: "#ff6600", label: "Arancione" }, // nuovo
  // ...
];
```

### Aggiungere un nuovo tipo di capo (es. Felpa)

1. **MODIFICA** `pages/configuratore.js`:
   - Aggiungi entry a `GARMENT` con modelli
   - Aggiungi array a `CUSTOMIZATIONS` con le modifiche disponibili
   - Aggiorna `GARMENT_CATEGORIES`
   - Aggiorna `buildPreviewCfg()` per gestire il nuovo tipo

2. **MODIFICA** `data/products.js` — se serve una nuova funzione di rendering

### Aggiungere un nuovo venditore/seller

1. **CREA** `sellers/nuovo-venditore/data.js` — esporta oggetto `seller` con prodotti
2. **MODIFICA** `data/sellers.js` — aggiungi import e riga nel registry

### Modificare lo stile

Tutto in `styles/main.css`. Segui le variabili CSS esistenti e la sezione giusta.

---

# 14. Glossario

| Termine                   | Significato                                                        | Esempio in Customly                                          |
| ------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| **Component**             | Blocco di UI riutilizzabile con render + init                      | `navbar.js`, `footer.js`, `renderProfile()`                  |
| **Route**                 | Associazione tra un URL e una pagina                               | `route("/creator/:id", wrap(renderCreator, initCreator))`    |
| **Parametro**             | Variabile nell'URL catturata dal router                            | `:id` in `/creator/:id` → `ctx.id`                           |
| **Query string**          | Parametri dopo `?` nell'URL                                        | `?creator=lorenzo-perassi` → `getParams().creator`           |
| **Stato**                 | Dati che cambiano durante l'interazione utente                     | Variabile `s` in configuratore.js                            |
| **Macchina a stati**      | Pattern dove lo stato determina cosa mostrare                      | `s.step` → "start", "garment", "customize", "review", "done" |
| **Event delegation**      | Un solo listener sull'elemento padre che gestisce eventi dei figli | `listen()` in configuratore.js su `#configuratore-root`      |
| **Registry**              | Oggetto che tiene traccia di entità (customizer, sellers)          | `data/customizers.js`, `data/sellers.js`                     |
| **Module**                | File JS con `import`/`export`                                      | Tutti i file nel progetto                                    |
| **Template literal**      | Stringa JS con `${variabile}` per interpolare valori               | `` `<h1>${name}</h1>` ``                                     |
| **SPA**                   | Single-Page Application — non ricarica mai la pagina               | L'intero progetto                                            |
| **Hash routing**          | Navigazione via `#/path` nel URL                                   | `window.location.hash = "#/creator"`                         |
| **SVG inline**            | Grafica vettoriale scritta direttamente nell'HTML                  | Generato da `data/products.js`                               |
| **Formspree**             | Servizio che inoltra form HTML via email                           | `utils/formspree.js`                                         |
| **CSS custom properties** | Variabili CSS definite in `:root`                                  | `var(--accent)`, `var(--text-secondary)`                     |
| **Responsive**            | Il layout si adatta a schermi grandi e piccoli                     | Media query a 768px, 900px, 480px                            |
| **IntersectionObserver**  | API browser per rilevare quando un elemento è visibile             | Animazione timeline in home.js                               |
| **Design system**         | Insieme coerente di colori, font, spaziature                       | Variabili `:root` in main.css                                |
