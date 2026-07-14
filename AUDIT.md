# Customly — Auditoria Completa (Architettura / Sicurezza / Scalabilità)

> Generata il 2026-07-08. Ogni finding è classificata:
>
> - 🔴 CRITICAL — impatto diretto su dati utente o funzionamento
> - 🟠 IMPORTANT — problema concreto che richiede intervento
> - 🟡 RECOMMENDED — miglioramento consigliato per qualità/mantenibilità
> - 🟢 NICE-TO-HAVE — miglioramento opzionale

---

## 1 — ARCHITETTURA

### A1 — Nomenclatura file inconsistente

📁 `pages/creator.js:1-1564` · `pages/configuratore.js:1-1375` · `pages/contatti.js:1-104` · `pages/venditori.js:1-118`

I nomi dei file non seguono una convenzione uniforme: `creator`, `configuratore`, `contatti`, `venditori` mischiano italiano e inglese. `creator.js` è ambiguo (è una lista di customizer, non un "creator").

**Impatto:** confonde chi naviga il codice per la prima volta e rende i percorsi nei riferimenti (`import ... from './pages/creator.js'`) poco leggibili.

**Raccomandazione:** adottare una convenzione inglese coerente:

```
pages/home.js           → OK
pages/configuratore.js  → pages/configurator.js
pages/creator.js        → pages/customizers.js  (o pages/creators.js)
pages/contatti.js       → pages/contact.js
pages/venditori.js      → pages/sellers.js
```

Aggiornare tutti i riferimenti in `index.html` (righe 31-45) e gli import interni.

---

### A2 — File monolitico: `pages/creator.js` (1.564 righe)

📁 `pages/creator.js:1-1564`

Questo file gestisce **due funzioni completamente diverse**:

1. La **lista dei customizer** (`renderList` + filtri/search/paginazione)
2. Il **profilo singolo** (`renderProfile` + modal contatto + social)

Ha **14 funzioni esportate**, una `handleProfileImageError` globale, e un blocco DOMContentLoaded di ~300 righe (righe 1527-1564) con event delegation enorme.

**Impatto:** qualsiasi modifica richiede capire 1.500 righe di contesto misto; bug di un componente rompono l'altro.

**Raccomandazione:** spezzare in:

```
pages/customizers/list.js         → renderList + search + filters + pagination
pages/customizers/profile.js      → renderProfile + modal + social
pages/customizers/index.js         → re-export
components/customizer-card.js     → singola card
components/social-icon.js         → icona social
components/modal.js               → modale contatto
```

---

### A3 — File monolitico: `pages/configuratore.js` (1.375 righe)

📁 `pages/configuratore.js:1-1375`

Contiene:

- State machine (`s` mutable, riga 249)
- Funzioni di rendering (toolbar, preview, sides, filters)
- Logica di mutazione (aggiunta/modifica/rimozione capi, colori, testi)
- Pannelli condizionali (~300 righe di `if` nested)
- Costanti enormi inline: `TERMS_SECTIONS` e `PRIVACY_SECTIONS` (~400 righe di stringhe HTML)

**Impatto:** rende impossibile fare refactoring sicuro; il file è un "God Object".

**Raccomandazione:**

```
configurator/state.js        → creaState() + mutate()
configurator/render.js       → orchestratore dei pannelli
configurator/toolbar.js      → toolbar + side selector
configurator/preview.js      → canvas preview
configurator/panels/*.js     → pannelli condizionali singoli
configurator/constants.js    → TERMS_SECTIONS, PRIVACY_SECTIONS
configurator/filters.js      → filtri colore/materiale
```

---

### A4 — Duplicazione: `escHtml()` / `esc()`

📁 `pages/configuratore.js:845-855` · `pages/creator.js:10-19`

La stessa funzione di escape HTML è definita due volte con nomi diversi:

```js
// configuratore.js:845
function escHtml(s) { ... }

// creator.js:10
function esc(s) { ... }
```

Entrambe fanno la stessa cosa: `s.replace(/&/g,"&amp;").replace(/</g,"&lt;")...` ma le versioni **non sono identiche** (creator.js:10-19 ha un'implementazione leggermente diversa).

**Impatto:** se un lato viene corretto l'altro resta vulnerable; duplicazione viola DRY.

**Raccomandazione:** creare `utils/sanitize.js`:

```js
// utils/sanitize.js
export function esc(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

Importare ovunque. Le funzioni attuali rimuovere.

---

### A5 — Nessun sistema di errori centralizzato

📁 Globale — nessun file `error.js` o `error-handler.js`

Gli errori vengono gestiti in modo ad-hoc:

- `pages/configuratore.js:369` → `console.error('ERRORE nel rendering:', e)` con fallback HTML inline
- `pages/creator.js:1508-1513` → `img.onerror` con `console.warn()` e fallback
- `pages/creator.js:71` → `console.error('Errore nel caricamento dati:', e)` con errore mostrato in innerHTML
- `utils/router.js:67` → `console.error('Router: errore durante il rendering:', e)` ma non mostra nulla all'utente

**Impatto:** l'utente vede pagine vuote senza spiegazione; i bug non vengono tracciati.

**Raccomandazione:**

```js
// utils/error-handler.js
export function showErrorUI(container, msg) {
  container.innerHTML = `
    <div class="error-message" style="padding:2rem;text-align:center">
      <p>Si è verificato un errore. Riprova più tardi.</p>
      <button onclick="location.reload()">Ricarica</button>
    </div>`;
}
export function logError(err, context) {
  console.error(`[${context}]`, err);
}
```

Usare in ogni `catch` e `onerror`.

---

### A6 — State management fragile

📁 `pages/configuratore.js:249`

Lo stato è un singolo `let s` a livello di modulo, mutato da **27+ funzioni** diverse:

- `addItem`, `removeItem`, `updateItem`, `setDesignSide`, `setActivePanel`, `setColor`, `setText`, `setTextSize`, `setColorHex`, ecc.

Il mutatore principale è `mutate(partial)` (riga 298) che fa shallow merge, ma nessuna funzione validazione dello stato.

**Impatto:** impossibile fare undo/redo; bug di stato molto difficili da tracciare; se un mutatore dimentica `mutate()` lo stato è inconsistent.

**Raccomandazione:**

```js
// configuratore/state.js
const INITIAL = Object.freeze({ ... });

export function createState() {
  let state = { ...INITIAL };
  const listeners = new Set();

  return {
    get: () => ({ ...state }),
    set: (patch) => {
      state = { ...state, ...patch };
      listeners.forEach(fn => fn(state));
    },
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    reset: () => { state = { ...INITIAL }; listeners.forEach(fn => fn(state)); }
  };
}
```

Per undo/redo: tenere uno stack di snapshot.

---

### A7 — Routing: nessun guard, nessuna transizione

📁 `utils/router.js:1-87`

Il router gestisce solo: parsa hash → trova matching route → chiama `mount(unmount)` → aspetta `ready()` → render `el`.

**Cosa manca:**

- **Route guard** (autenticazione, permessi)
- **Transizioni** di pagina (fade, slide)
- **Scroll restoration** dopo navigazione
- **Loading state** durante il mount

**Impatto:**用户体验 è istantanea ma "secca"; per dashboard/private routes serve un guard.

**Raccomandazione:**

```js
// Aggiungere al router:
const router = {
  guards: [],
  beforeNavigate(fn) {
    this.guards.push(fn);
  },
  async navigate(hash) {
    for (const g of this.guards) {
      if ((await g(hash)) === false) return;
    }
    // ... logica esistente
  },
};

// Transizione:
const newEl = await route.mount();
el.style.opacity = "0";
requestAnimationFrame(() => {
  el.replaceWith(newEl);
  requestAnimationFrame(() => {
    newEl.style.opacity = "1";
  });
});
```

---

### A8 — Nessun lazy loading / code splitting

📁 `index.html:31-45`

Tutti i moduli vengono importati **subito all'avvio** della SPA:

```html
<script type="module">
  import { start, wrap } from "./utils/router.js";
  import { Navbar } from "./components/navbar.js";
  import { Footer } from "./components/footer.js";
  import { Home } from "./pages/home.js";
  import { Configuratore } from "./pages/configuratore.js";
  // ... tutti i page modules
</script>
```

Anche se il browser fa tree-shaking a livello di module, tutti i `data/*.js` e `customizers/*/data.js` vengono scaricati subito.

**Impatto:** il bundle iniziale include pagine che l'utente potrebbe non visitare mai (creator, venditori, termini, privacy).

**Raccomandazione:** usare dynamic import nel router:

```js
const routes = {
  "#/": {
    mount: async () => {
      const { Home } = await import("./pages/home.js");
      return wrap(Home);
    },
    unmount: null,
    ready: () => Promise.resolve(),
  },
  "#/creator/:slug": {
    mount: async () => {
      const { CreatorProfile } = await import("./pages/creator.js");
      return wrap(CreatorProfile);
    },
    // ...
  },
};
```

---

### A9 — Nessun test

📁 Nessun file `*.test.js`, `*.spec.js`, nessun `__tests__/`

Non esiste nessun test nel progetto. Nessun framework di test è configurato (nessun `jest.config`, `vitest.config`, `mocha`).

**Impatto:** qualsiasi refactor è rischioso; bug ricorrenti non vengono catturati.

**Raccomandazione:**

1. Aggiungere `vitest` (è leggero e nativo per ESM):

```bash
bun add -d vitest
```

2. Creare `vitest.config.js`:

```js
export default { test: { environment: "happy-dom" } };
```

3. Test prioritari:
   - `utils/sanitize.test.js` — test esc()
   - `utils/formspree.test.js` — test sendForm()
   - `pages/configuratore.test.js` — test mutate() e render()
4. Aggiungere al `package.json` scripts:

```json
"scripts": { "test": "vitest run", "test:watch": "vitest" }
```

---

### A10 — `DOCS.md` obsoleto (riferimenti a file eliminati)

📁 `DOCS.md:1-1329`

Il file documenta la struttura del progetto includendo file che **non esistono più**:

- `sellers/` directory (righe 119-153)
- `garment-types.js` (riga 63)
- `store.js` (riga 103)

**Impatto:** chi legge la documentazione viene ingannato sulla struttura attuale.

**Raccomandazione:** riscrivere DOCS.md basandosi sulla struttura reale, o meglio, migrare la documentazione in README.md e eliminare DOCS.md.

---

### A11 — Nessun gestore di dipendenze / package.json

📁 Nessun `package.json` nella root

Non esiste un `package.json`. Il progetto è puramente statico, ma questo rende impossibile:

- Installare e lanciare test
- Usare linters (ESLint, Prettier)
- Definire scripts di build/deploy

**Impatto:** impossibile automatizzare quality control.

**Raccomandazione:** creare `package.json` minimo:

```json
{
  "name": "customly",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "npx serve .",
    "lint": "npx eslint .",
    "test": "vitest run"
  },
  "devDependencies": {
    "vitest": "^3.2.1",
    "eslint": "^9.0.0",
    "serve": "^14.0.0"
  }
}
```

---

## 2 — SICUREZZA

### S1 — 🔴 XSS via innerHTML con dati non sanitizzati

📁 `pages/creator.js:189-192` · `pages/creator.js:141-160` · `pages/configuratore.js:380-384` · `pages/contatti.js:21-22` · `pages/configuratore.js:867-869`

Il progetto costruisce **tutta** l'HTML via `innerHTML` con stringhe template. Molti inserti **non usano `esc()`/`escHtml()`**.

Esempio critico — `pages/creator.js:189`:

```js
<div class="venditori-name">${p.name}</div> // ← NON SANITIZZATO
```

`p.name` viene da `data/customizers.js` (riga 10): `"Lorenzo Perassi"`. Se domani questo dato viene da un database o da un form utente, è un vettore XSS diretto.

Altri punti non sanitizzati:

- `pages/creator.js:146` → `${p.slogan}` nel tagline
- `pages/creator.js:151` → `${p.services.join(', ')}` nei servizi
- `pages/creator.js:159` → `${p.experienceYears}+` negli anni
- `pages/configuratore.js:384` → `${opt.title}` nel titolo customizer
- `pages/contatti.js:22` → `${venditoreData.name}` nel select del venditore
- `pages/home.js:121-127` → `${card.sellerName}`, `${card.garmentLabel}` nei Featured cards

**Impatto:** 🔴 CRITICAL. Se anche UN SOLO dato arriva da input utente (form, URL, localStorage), un attaccante può iniettare JavaScript.

**Raccomandazione:**

```js
import { esc } from "../utils/sanitize.js";

// In ogni template, SANITIZZARE ogni variabile:
`<div class="name">${esc(p.name)}</div>``<div class="tagline">${esc(p.slogan)}</div>``<div class="services">${esc(p.services.join(", "))}</div>`;
```

Per i dati che sono **HTML intenzionali** (come `venditoreData.description` in `creator.js:165`), usare DOMPurify:

```js
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.es.mjs";
sanitized = DOMPurify.sanitize(dirty);
```

---

### S2 — 🔴 XSS via `data-gallery-items` (JSON inserito in HTML attribute)

📁 `pages/creator.js:986`

```js
<div class="gallery-grid" data-gallery-items='${JSON.stringify(profile.gallery)}'>
```

`JSON.stringify()` **non fa escape di single quote**. Se un URL in `profile.gallery` contiene `'`, il JSON si rompe e inietta HTML/JS.

Esempio d'attacco:

```js
gallery = ["https://evil.com/img.jpg' onerror='alert(1)' x='"];
```

Il risultato sarebbe:

```html
<div
  data-gallery-items='["https://evil.com/img.jpg'
  onerror="alert(1)"
  x='"]'
></div>
```

**Impatto:** 🔴 CRITICAL. Vettore XSS diretto.

**Raccomandazione:** usare double-quote e escape, oppure usare un data attribute diverso:

```js
// Opzione 1: escape le single quote
data-gallery-items='${JSON.stringify(profile.gallery).replace(/'/g, "&#39;")}'

// Opzione 2: usa un <script type="application/json"> nascosto
<script type="application/json" id="gallery-data">
${JSON.stringify(profile.gallery)}
</script>
const gallery = JSON.parse(document.getElementById('gallery-data').textContent);
```

---

### S3 — 🟠 Nessuna validazione input nel form contatti

📁 `pages/contatti.js:29-44`

Il form di contatto invia direttamente a Formspree senza alcuna validazione:

```js
const email = form.elements.email.value;
const nome = form.elements.nome.value;
const telefono = form.elements.telefono.value;
const messaggio = form.elements.messaggio.value;
// → invio diretto, nessuna validazione
```

**Impatto:** 🟠 IMPORTANT. Messaggi vuoti, email invalidi, campi obbligatori mancanti vengono tutti accettati.

**Raccomandazione:**

```js
function validate(form) {
  const errors = [];
  const email = form.elements.email.value.trim();
  const nome = form.elements.nome.value.trim();
  const messaggio = form.elements.messaggio.value.trim();

  if (!nome) errors.push("Il nome è obbligatorio");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Email non valida");
  if (!messaggio) errors.push("Il messaggio è obbligatorio");
  if (messaggio.length > 2000)
    errors.push("Messaggio troppo lungo (max 2000 caratteri)");

  return errors;
}

// Nel submit:
const errors = validate(form);
if (errors.length) {
  showError(errors.join("<br>"));
  return;
}
```

---

### S4 — 🟠 Nessun rate limiting sui form

📁 `pages/contatti.js:29-44`

Non c'è nessun meccanismo per prevenire l'invio multiplo:

- L'utente può cliccare "Invia" 100 volte di seguito
- Non c'è debounce
- Non c'è CAPTCHA (Formspree ha un proprio limite, ma è a livello piano)

**Impatto:** 🟠 IMPORTANT. Abuso di Formspree (rate limit gratuito: 50 submissions/mese).

**Raccomandazione:**

```js
let lastSubmit = 0;
const COOLDOWN = 3000; // 3 secondi

async function handleSubmit(e) {
  e.preventDefault();
  const now = Date.now();
  if (now - lastSubmit < COOLDOWN) {
    showError("Attendi qualche secondo prima di inviare di nuovo.");
    return;
  }
  lastSubmit = now;
  // ... resto della logica
}
```

---

### S5 — 🟠 Nessuna protezione CSRF

📁 `pages/contatti.js:29-44`

Il form non include alcun token CSRF. Anche se Formspree gestisce questo lato server, se in futuro il form cambia destinazione, il progetto è esposto.

**Impatto:** 🟠 IMPORTANTE. Rischio concreto se il target del form cambia.

**Raccomandazione:** aggiungere un hidden field con token casuale:

```js
// Nel render del form:
`<input type="hidden" name="_csrf" value="${crypto.randomUUID()}">`;

// Nel submit:
if (form.elements._csrf.value !== expectedToken) return reject("Invalid");
```

---

### S6 — 🟠 Nessun Content Security Policy (CSP)

📁 `index.html:1-58`

Non c'è nessun meta CSP o header CSP configurato. L'app carica:

- Font Awesome da CDN (riga 17-18)
- Google Fonts da CDN (riga 19-20)
- Nessun script inline è bloccato

**Impatto:** 🟠 IMPORTANTE. Un attaccante può iniettare qualsiasi script da qualsiasi dominio.

**Raccomandazione:**

```html
<!-- In index.html, dopo <head> -->
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://formspree.io;
"
/>
```

Nota: `'unsafe-inline'` per gli style è necessario per i Google Fonts; idealmente si userebbero nonce.

---

### S7 — 🟠 Nessun header di sicurezza HTTP

📁 `.github/workflows/static.yml`

GitHub Pages non permette di configurare header HTTP personalizzati. Il deploy non include:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

**Impatto:** 🟠 IMPORTANTE. Clickjacking, MIME sniffing, data leakage.

**Raccomandazione:**

```yaml
# .github/workflows/static.yml — aggiungere step post-build
- name: Create _headers
  run: |
    cat > _headers << 'EOF'
    /*
      X-Content-Type-Options: nosniff
      X-Frame-Options: DENY
      Referrer-Policy: strict-origin-when-cross-origin
      Permissions-Policy: camera=(), microphone=(), geolocation=()
    EOF
```

Oppure migrare su Cloudflare Pages / Netlify che supportano header custom.

---

### S8 — 🟡 Nessuna validazione URL nei link esterni (open redirect)

📁 `pages/creator.js:316-340`

I social link vengono renderizzati direttamente come `href`:

```js
<a href="${s.url}" target="_blank" rel="noopener noreferrer">
```

Se `s.url` è controllato dall'utente, può puntare a:

- `javascript:alert(1)` (XSS)
- `https://evil.com/redirect?to=...` (phishing)

**Impatto:** 🟡 RACCOMANDATO. Dipende da quanto i dati sono trusted.

**Raccomandazione:**

```js
function isSafeUrl(url) {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Prima di renderizzare:
const safeUrl = isSafeUrl(s.url) ? s.url : "#";
```

---

### S9 — 🟡 Font Awesome / Google Fonts senza SRI (Subresource Integrity)

📁 `index.html:17-20`

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
/>
```

Nessuno dei due include `integrity="sha384-..."`. Se il CDN viene compromesso, il malicious code viene eseguito.

**Impatto:** 🟡 RACCOMANDATO. Rischio basso ma concreto (compromissione supply chain).

**Raccomandazione:**

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha384-..."
  crossorigin="anonymous"
/>

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  integrity="sha384-..."
  crossorigin="anonymous"
/>
```

Per Google Fonts: usare `fonts.googleapis.com` con `preconnect` + subresource hash oppure self-hostare i font.

---

### S10 — 🟡 Nessuna protezione clickjacking

📁 `index.html:1-58`

Non c'è `X-Frame-Options` o `frame-ancestors` CSP. Il sito può essere embedded in un iframe malevolo.

**Impatto:** 🟡 RACCOMANDATO. Clickjacking per trickare l'utente a cliccare su elementi nascosti.

**Raccomandazione:** aggiungere al CSP meta tag:

```
frame-ancestors 'none';
```

Oppure header HTTP `X-Frame-Options: DENY`.

---

### S11 — 🟢 Nessuna protezione su dati in localStorage

📁 `utils/product-status.js:8` · `utils/product-status.js:24`

Lo stato dei prodotti è in `localStorage` senza cifratura o validazione:

```js
export function getStatus(id) {
  const products = JSON.parse(localStorage.getItem("products") || "{}");
  return products[id] || null;
}
```

**Impatto:** 🟢 NICE-TO-HAVE. Qualsiasi JavaScript sulla stessa origin può leggere/modificare i dati. Non è critico (sono solo status pubblici) ma è da considerare per dati futuri.

**Raccomandazione:** per dati sensibili futuri, usare un backend con session token; per questo caso attuale va bene così.

---

## 3 — SCALABILITÀ (preparazione a features future)

### SC1 — 🟠 Nessun sistema di autenticazione

📁 Globale — nessun file `auth.js` o simile

Il progetto non ha concetto di "utente loggato". Non c'è:

- Login/logout
- Session management
- Ruoli (admin vs utente)

**Impatto:** 🟠 IMPORTANTE per dashboard, area personale, gestione contenuti.

**Raccomandazione:**

```js
// utils/auth.js
export const Auth = {
  currentUser: null,

  async login(email, password) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    this.currentUser = await res.json();
    localStorage.setItem("session", this.currentUser.token);
  },

  async logout() {
    this.currentUser = null;
    localStorage.removeItem("session");
  },

  requireAuth() {
    if (!this.currentUser) {
      router.navigate("#/login");
      return false;
    }
    return true;
  },
};

// Usare nei route guard:
router.beforeNavigate((hash) => {
  if (hash.startsWith("#/admin") && !Auth.requireAuth()) return false;
});
```

---

### SC2 — 🟠 Nessun backend / API layer

📁 Globale

Tutti i dati sono hardcoded nei file JS:

- `data/products.js` — prodotti e SVG
- `data/customizers.js` — lista customizer
- `customizers/*/data.js` — profili singoli

Non c'è nessuna chiamata API (tranne Formspree per i contatti).

**Impatto:** 🟠 IMPORTANTE. Impossibile avere contenuti dinamici, utenti, ordini, o dashboard senza backend.

**Raccomandazione:**

```
Struttura consigliata per il backend:

/customly-api/               (Node.js + Hono o Express)
├── src/
│   ├── routes/
│   │   ├── auth.js          → login, register, refresh
│   │   ├── products.js      → CRUD prodotti
│   │   ├── customizers.js   → CRUD customizer profiles
│   │   └── orders.js        → gestione ordini
│   ├── middleware/
│   │   ├── auth.js          → JWT verification
│   │   └── rateLimit.js     → rate limiting
│   ├── db/
│   │   └── schema.js        → Drizzle schema
│   └── index.js
├── drizzle.config.ts
└── package.json

Opzioni consigliate:
- Database: SQLite (libSQL/Turso) o PostgreSQL (Neon/Supabase)
- Auth: better-auth o Lucia
- ORM: Drizzle
- Hosting: Railway / Fly.io / Vercel
```

---

### SC3 — 🟠 Nessun database

📁 Globale — nessun file di schema o migration

Per features future (dashboard, ordini, utenti, contenuti dinamici) serve un database.

**Raccomandazione:**

```ts
// schema (Drizzle + SQLite)
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("user"),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  base_price: integer("base_price").notNull(),
  created_by: text("created_by").references(() => users.id),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const customizers = sqliteTable("customizers", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
});
```

---

### SC4 — 🟠 Nessun sistema di upload immagini

📁 `customizers/*/images/` — solo file statici

Le immagini sono statiche nella repo. Non c'è:

- Upload da dashboard
- Image optimization
- CDN per immagini
- Gestione dimensioni

**Impatto:** 🟠 IMPORTANTE. Ogni nuova immagine richiede un commit git.

**Raccomandazione:**

```js
// Frontend: upload component
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const { url } = await res.json();
  return url; // → https://cdn.customly.com/images/xyz.webp
}

// Backend: endpoint (Hono example)
app.post("/api/upload", authMiddleware, async (c) => {
  const file = await c.req.formData("image");
  // Validare tipo, dimensione
  // Upload su S3/R2
  // Return URL
});
```

**Servizi consigliati:**

- Cloudflare R2 (gratis fino a 10GB, nessun egress fee)
- Uploadthing (gratuito per progetti piccoli)

---

### SC5 — 🟡 Nessun sistema di caching

📁 Globale

Non c'è nessuna strategia di caching:

- Nessun `Cache-Control` header
- Nessun Service Worker
- Nessun stale-while-revalidate

**Impatto:** 🟡 RACCOMANDATO. Performance peggiori su visitatori ripetuti; costi CDN più alti.

**Raccomandazione:**

```js
// Service Worker base: sw.js
const CACHE_NAME = "customly-v1";
const PRECACHE = ["/", "/index.html", "/styles/main.css"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

// Registrazione in index.html:
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

---

### SC6 — 🟡 Nessuna ottimizzazione bundle

📁 `styles/main.css:1-4592` · `index.html:31-45`

Un singolo file CSS di 4.592 righe (~140KB). Non c'è:

- CSS splitting (caricare solo lo stile della pagina visitata)
- Purging di CSS inutilizzato
- Minificazione

**Impatto:** 🟡 RACCOMANDATO. L'utente scarica 140KB di CSS anche se visita solo la home.

**Raccomandazione:**

```bash
# Opzione 1: CSS splitting manuale
styles/
├── base.css          → reset, font, variabili
├── home.css          → stili home
├── configurator.css  → stili configuratore
├── creator.css       → stili creator/contatti
└── utils.css         → componenti riutilizzabili

# Opzione 2: Usare PurgeCSS durante build
npx purgecss --css styles/main.css --content "**/*.js" --output styles/
```

---

### SC7 — 🟡 Nessun sistema di notifiche / real-time

📁 Globale

Non c'è supporto per:

- WebSocket / Server-Sent Events
- Notifiche push
- Aggiornamenti real-time di stati ordini

**Impatto:** 🟡 RACCOMANDATO. Limita le features tipo "order status update".

**Raccomandazione:** per ora non serve. Quando si aggiunge un backend, considerare:

```js
// SSE per aggiornamenti in tempo reale
const events = new EventSource("/api/events");
events.onmessage = (e) => {
  const data = JSON.parse(e.data);
  if (data.type === "order_status") {
    updateOrderUI(data.orderId, data.status);
  }
};
```

---

### SC8 — 🟡 Nessun sistema di paginazione server-side

📁 `pages/creator.js:1310-1336`

La paginazione è client-side: tutti i customizer vengono caricati in memoria e paginati lato JS.

**Impatto:** 🟡 RACCOMANDATO. Con 10 customizer va bene; con 1.000+ diventa un problema.

**Raccomandazione:** implementare paginazione API:

```js
// API endpoint
GET /api/customizers?page=1&limit=20&search=lorenzo

// Frontend
async function loadCustomizers(page = 1) {
  const res = await fetch(`/api/customizers?page=${page}&limit=20`);
  const { data, total, page: p, limit } = await res.json();
  renderList(data);
  renderPagination(p, Math.ceil(total / limit));
}
```

---

### SC9 — 🟢 Nessun i18n / localizzazione

📁 Globale — tutto in italiano

Tutte le stringhe sono hardcoded in italiano. Nessun sistema di traduzione.

**Impatto:** 🟢 NICE-TO-HAVE. Limita l'espansione internazionale.

**Raccomandazione:** usare un leggero i18n library:

```js
// utils/i18n.js
const translations = {
  it: { home_title: 'Benvenuto su Customly', ... },
  en: { home_title: 'Welcome to Customly', ... }
};

export function t(key, lang = 'it') {
  return translations[lang]?.[key] || key;
}
```

---

### SC10 — 🟢 Nessun sistema di analytics

📁 Globale

Non c'è nessun tracking:

- Google Analytics / Plausible
- Event tracking
- Conversion funnel

**Impatto:** 🟢 NICE-TO-HAVE. Impossibile misurare l'efficacia del configuratore.

**Raccomandazione:** usare Plausible (privacy-friendly, ~1KB):

```html
<script
  defer
  data-domain="customly.it"
  src="https://plausible.io/js/script.js"
></script>
```

Oppure自托管 con umami.

---

## SUMMARY TABLE

| #    | Finding                                     | Severity | File                                                  |
| ---- | ------------------------------------------- | -------- | ----------------------------------------------------- |
| A1   | Nomenclatura file inconsistente             | 🟡       | Globale                                               |
| A2   | `creator.js` monolitico (1.564 righe)       | 🟠       | pages/creator.js                                      |
| A3   | `configuratore.js` monolitico (1.375 righe) | 🟠       | pages/configuratore.js                                |
| A4   | `escHtml()` duplicato                       | 🟡       | configuratore.js:845 · creator.js:10                  |
| A5   | Nessun error handler centralizzato          | 🟡       | Globale                                               |
| A6   | State management fragile                    | 🟠       | configuratore.js:249                                  |
| A7   | Router senza guard/transizioni              | 🟡       | utils/router.js                                       |
| A8   | Nessun lazy loading / code splitting        | 🟡       | index.html:31-45                                      |
| A9   | Nessun test                                 | 🟡       | Globale                                               |
| A10  | DOCS.md obsoleto                            | 🟢       | DOCS.md                                               |
| A11  | Nessun package.json                         | 🟢       | Root                                                  |
| S1   | 🔴 XSS via innerHTML non sanitizzato        | 🔴       | creator.js · configuratore.js · contatti.js · home.js |
| S2   | 🔴 XSS via data-gallery-items               | 🔴       | creator.js:986                                        |
| S3   | Nessuna validazione form contatti           | 🟠       | contatti.js:29-44                                     |
| S4   | Nessun rate limiting form                   | 🟠       | contatti.js:29-44                                     |
| S5   | Nessuna protezione CSRF                     | 🟠       | contatti.js                                           |
| S6   | Nessun CSP                                  | 🟠       | index.html                                            |
| S7   | Nessun header sicurezza HTTP                | 🟠       | workflows/static.yml                                  |
| S8   | Open redirect potenziale                    | 🟡       | creator.js:316-340                                    |
| S9   | CDN senza SRI                               | 🟡       | index.html:17-20                                      |
| S10  | Nessuna protezione clickjacking             | 🟡       | index.html                                            |
| S11  | localStorage non protetto                   | 🟢       | product-status.js                                     |
| SC1  | Nessun sistema auth                         | 🟠       | Globale                                               |
| SC2  | Nessun backend / API layer                  | 🟠       | Globale                                               |
| SC3  | Nessun database                             | 🟠       | Globale                                               |
| SC4  | Nessun sistema upload immagini              | 🟠       | Globale                                               |
| SC5  | Nessun caching strategy                     | 🟡       | Globale                                               |
| SC6  | Nessuna ottimizzazione bundle               | 🟡       | styles/main.css                                       |
| SC7  | Nessun sistema real-time                    | 🟡       | Globale                                               |
| SC8  | Paginazione solo client-side                | 🟡       | creator.js:1310-1336                                  |
| SC9  | Nessun i18n                                 | 🟢       | Globale                                               |
| SC10 | Nessun analytics                            | 🟢       | Globale                                               |

---

## PRIORITY ROADMAP

### Fase 1 — Sicurezza (1-2 giorni)

1. ✅ Creare `utils/sanitize.js` con `esc()`
2. ✅ Applicare `esc()` a **tutti** gli inserti HTML dinamici (S1)
3. ✅ Fix XSS via `data-gallery-items` (S2)
4. ✅ Aggiungere validazione form (S3)
5. ✅ Aggiungere CSP meta tag (S6)
6. ✅ Aggiungere SRI a CDN links (S9)

### Fase 2 — Architettura (3-5 giorni)

1. ✅ Creare `package.json` con vitest + eslint
2. ✅ Creare `utils/sanitize.js` centralizzato (fix duplicazione S4)
3. ✅ Creare `utils/error-handler.js` (A5)
4. ✅ Refactor `creator.js` in moduli (A2)
5. ✅ Refactor `configuratore.js` in moduli (A3)
6. ✅ Aggiungere test base (A9)

### Fase 3 — Backend + Database (1-2 settimane)

1. Scegliere stack backend (Hono + Drizzle + SQLite consigliato)
2. Creare schema DB (utenti, prodotti, customizer, ordini)
3. Implementare auth (login/register)
4. Migrare dati hardcoded a DB
5. Aggiungere API CRUD
6. Deploy backend (Railway / Fly.io)

### Fase 4 — Features (2-4 settimane)

1. Dashboard admin
2. Upload immagini (Cloudflare R2)
3. Paginazione server-side
4. Service Worker per caching
5. Analytics (Plausible)
