<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="">
    <img src="" alt="Customly" width="80">
  </picture>
</p>

<h1 align="center">Customly</h1>

<p align="center">
  <strong>Design your custom clothing in real time</strong>
  <br>
  A visual SPA where customers configure garments and customizers receive ready-to-fulfill orders.
  <br>
  <i>No more chaotic DMs — just a clear, structured pipeline from idea to order.</i>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#customizer-system">Customizer System</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## The Problem

Ordering a customized garment today means endless Instagram DMs, WhatsApp voice notes, and misunderstood requests. Clients can't explain what they want clearly. Customizers waste hours interpreting fragmented messages.

**Customly bridges that gap.**

---

## Features

### For Customers

- **Two modes**: configure a garment you already own, or order from a registered customizer
- **3 garment types**: T-shirts, jeans, hoodies — each with tailored modification options
- **Real-time SVG preview**: see every change reflected instantly on an interactive garment preview
- **Modifications**: sleeve length, fit (oversize/slim), cropped, raw hem, patches, tears, bleach, prints, embroidery, color, and more
- **Live price calculator**: base price + option surcharges update as you customize
- **One-click order**: submit a complete, structured request via email with all details attached

### For Customizers

- **Modular profiles**: each customizer has their own products, prices, and available modifications
- **Structured orders**: every submission arrives with full configuration details, no back-and-forth needed
- **Searchable directory**: customers find customizers by name or style

### Portfolio & Galleries

- **Image gallery popup**: click any portfolio card to browse all project images and videos in a fullscreen gallery with navigation arrows and thumbnails
- **Fullscreen image viewer**: click any product image inside the product modal to open a scrollable gallery overlay with all product media, navigable with arrows and keyboard
- **Clickable portfolio links**: portfolio items with a `link` field render the title as a clickable anchor opening in a new tab
- **Dark/light mode toggle**: sewing-inspired theme switcher with stitch detail, respects system preference

### Customization Options per Garment

| T-Shirt / Maglia                        | Jeans                                           | Hoodie / Felpa                 |
| --------------------------------------- | ----------------------------------------------- | ------------------------------ |
| Short sleeves / No sleeves / Cropped    | Skinny → Baggy / Flare / Wide / Taper           | Cropped / Add zip / No sleeves |
| Oversize / Slim fit                     | Shorten / Lengthen                              | Raw hem / Prints / Patches     |
| Raw hem / Prints / Patches / Embroidery | Raw hem / Patches / Tears / Bleach / Embroidery | Embroidery / Bleach            |

---

## Tech Stack

| Technology                          | Purpose                                                |
| ----------------------------------- | ------------------------------------------------------ |
| **Vanilla JavaScript (ES Modules)** | Zero-dependency frontend — no framework, no build step |
| **CSS (custom properties)**         | Responsive design with dark theme, CSS variables       |
| **SVG (inline, generated)**         | Real-time garment preview rendered programmatically    |
| **Formspree**                       | Form submission backend (orders, contacts)             |
| **Hash-based SPA Router**           | Custom-built client-side routing                       |

The entire app runs directly in the browser — open `index.html` and go.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/perassilorenzo/custom-configurator.git
cd custom-configurator

# No build step needed — just serve the folder
# Using Python:
python -m http.server 8000

# Or using VS Code Live Server, or any static file server
```

Open `http://localhost:8000` in your browser.

> **Note**: Form submissions require a Formspree endpoint ID configured in `utils/formspree.js`.

---

## Architecture

```
index.html              ← SPA entry point (minimal shell)
├── components/         ← Reusable UI (navbar, footer)
├── pages/              ← Route-level pages (home, configuratore, creator, contatti)
├── data/               ← Business logic & data models
│   ├── customizers.js     ← Customizer registry & search
│   ├── products.js        ← SVG rendering engine
│   └── color.js           ← Color utilities
├── customizers/        ← Modular customizer profiles
│   ├── lorenzo-perassi/   ← Customizer: Lorenzo Perassi
│   └── template/          ← Template for new customizers
├── styles/             ← Stylesheets
└── utils/              ← Core utilities
    ├── router.js           ← Hash-based SPA router
    ├── formspree.js        ← Formspree API client
    └── product-status.js   ← Product status persistence
```

The app follows a **render → init** pattern: each page exports `renderX()` (returns HTML string) and `initX()` (binds event listeners). The router calls these in sequence, wrapped by a shared navbar + footer.

---

## Customizer System

Customizers are self-contained directories under `customizers/`:

```
customizers/lorenzo-perassi/
├── data.js            ← Name, bio, styles, products, portfolio, services
└── images/            ← Profile and portfolio images
```

Adding a new customizer means creating a directory with a `data.js` file following the schema, then registering it in `data/customizers.js`. No backend changes needed.

### Current Customizers

| Customizer          | Style                      | Specialization  |
| ------------------- | -------------------------- | --------------- |
| **Lorenzo Perassi** | Custom fashion / upcycling | Denim, T-shirts |
| **Template**        | Example profile            | All garments    |

---

## Roadmap

- [x] MVP — configurator with real-time preview
- [x] Customizer system with modular profiles
- [x] Portfolio galleries — image/video popup and fullscreen viewer
- [x] Dark/light mode toggle
- [ ] Customizer dashboard — manage orders in one place
- [ ] Public customizer pages — shareable links for social media
- [ ] Community features — follow creators, share configurations
- [ ] Marketplace — discover new customization artists

---

## Vision

Customly is the first step toward a full **ecosystem for clothing customization**. I want every independent creator, tailor, and brand to have their own configurator — a direct, visual line between their vision and their customers.

---

## Built By

**Lorenzo Perassi** — Student, developer, and clothing customization enthusiast.  
Blending code and creativity to build tools that make custom fashion accessible.

[GitHub](https://github.com/perassilorenzo) · [LinkedIn](https://linkedin.com/in/lorenzo-perassi-46057a38b) · [Portfolio](https://perassilorenzo.github.io/portfolio)

---

<p align="center">
  <sub>Built with vanilla JS, a lot of SVG math, and a passion for custom fashion.</sub>
</p>
