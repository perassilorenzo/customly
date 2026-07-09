<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="">
    <img src="" alt="Custom Configurator" width="80">
  </picture>
</p>

<h1 align="center">Custom Configurator</h1>

<p align="center">
  <strong>Design your custom clothing in real time</strong>
  <br>
  A visual SPA where customers configure garments and sellers receive ready-to-fulfill orders.
  <br>
  <i>No more chaotic DMs — just a clear, structured pipeline from idea to order.</i>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#seller-system">Seller System</a>
</p>

---

## The Problem

Ordering a customized garment today means endless Instagram DMs, WhatsApp voice notes, and misunderstood requests. Clients can't explain what they want clearly. Sellers waste hours interpreting fragmented messages.

**Custom Configurator bridges that gap.**

---

## Features

### For Customers

- **Two modes**: configure a garment you already own, or order from a registered seller
- **3 garment types**: T-shirts, jeans, hoodies — each with tailored modification options
- **Real-time SVG preview**: see every change reflected instantly on an interactive garment preview
- **Modifications**: sleeve length, fit (oversize/slim), cropped, raw hem, patches, tears, bleach, prints, embroidery, color, and more
- **Live price calculator**: base price + option surcharges update as you customize
- **One-click order**: submit a complete, structured request via email with all details attached

### For Sellers

- **Modular seller profiles**: each seller has their own products, prices, and available modifications
- **Structured orders**: every submission arrives with full configuration details, no back-and-forth needed
- **Searchable directory**: customers find sellers by name or style

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
├── pages/              ← Route-level pages (home, configuratore, venditori, contatti)
├── data/               ← Business logic & data models
│   ├── garment-types.js   ← Garment definitions + modifications
│   ├── products.js        ← SVG rendering engine
│   ├── sellers.js         ← Seller registry & search
│   └── color.js           ← Color utilities
├── sellers/            ← Modular seller directories
│   ├── demon-handmade/    ← Seller: Demon Handmade
│   └── raw-spirit/        ← Seller: Raw Spirit
├── styles/             ← Stylesheets
└── utils/              ← Core utilities
    ├── router.js           ← Hash-based SPA router
    ├── store.js            ← Simple state store
    └── formspree.js        ← Formspree API client
```

The app follows a **render → init** pattern: each page exports `renderX()` (returns HTML string) and `initX()` (binds event listeners). The router calls these in sequence, wrapped by a shared navbar + footer.

---

## Seller System

Sellers are self-contained directories under `sellers/`:

```
sellers/demon-handmade/
├── data.js            ← Name, bio, style, products, prices, options
├── configuratore/     ← Reserved (seller-specific config overrides)
└── immagini/          ← Reserved (seller imagery)
```

Adding a new seller means creating a directory with a `data.js` file following the schema. No backend changes needed.

### Current Sellers

| Seller             | Style                     | Products          |
| ------------------ | ------------------------- | ----------------- |
| **Demon Handmade** | Streetwear / experimental | T-shirts, hoodies |
| **Raw Spirit**     | Minimal / raw aesthetics  | Jeans, T-shirts   |

---

## Roadmap

- [x] MVP — configurator with real-time preview
- [x] Seller system with modular profiles
- [ ] Seller dashboard — manage orders in one place
- [ ] Public seller pages — shareable links for social media
- [ ] Community features — follow creators, share configurations
- [ ] Marketplace — discover new customization artists

---

## Vision

Custom Configurator is the first step toward a full **ecosystem for clothing customization**. I want every independent creator, tailor, and brand to have their own configurator — a direct, visual line between their vision and their customers.

---

## Built By

**Lorenzo Perassi** — Student, developer, and clothing customization enthusiast.  
Blending code and creativity to build tools that make custom fashion accessible.

[GitHub](https://github.com/perassilorenzo) · [LinkedIn](https://linkedin.com/in/lorenzo-perassi-46057a38b) · [Portfolio](https://perassilorenzo.github.io/portfolio)

---

<p align="center">
  <sub>Built with vanilla JS, a lot of SVG math, and a passion for custom fashion.</sub>
</p>
