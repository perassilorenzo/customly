import { getCustomizer, getAllCustomizers } from "../data/customizers.js";
import { navigate } from "../utils/router.js";
import {
  getStatus,
  setStatus,
  resetStatus,
  statusLabel,
} from "../utils/product-status.js";

function esc(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function avatarImg(c, size, cls) {
  if (c.image) return `<img src="${c.image}" alt="${esc(c.name)}">`;
  const s = size > 60 ? 36 : size > 40 ? 24 : 18;
  return `<div class="${cls}-placeholder">${c.name.charAt(0)}</div>`;
}

function isMov(src) {
  return src && /\.mov$/i.test(src);
}

/* ---- Profile renderers ---- */

function renderHero(c) {
  const coverContent = c.cover
    ? `<img src="${c.cover}" alt="Copertina profilo di ${esc(c.name)}" loading="eager">`
    : `<div class="creator-cover-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
  return `
    <div class="creator-hero">
      <div class="creator-cover">${coverContent}</div>
      <div class="creator-hero-body">
        <div class="creator-avatar-lg">${avatarImg(c, 110, "creator-avatar-lg")}</div>
        <div class="creator-hero-info">
          <div class="creator-badge-lg">${esc(c.category || "Customizer")}</div>
          <h1 class="creator-name">${esc(c.name)}</h1>
          <p class="creator-tagline">${esc(c.tagline)}</p>
          <div class="creator-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${esc(c.city)}${c.country ? `, ${esc(c.country)}` : ""}
          </div>
          <div class="creator-hero-actions">
            <button class="cfg-btn cfg-btn-primary" data-start-creator="${c.id}">Customize with me</button>
            ${c.portfolio && c.portfolio.length ? `<button class="cfg-btn cfg-btn-secondary" data-scroll="portfolio">View portfolio</button>` : ""}
          </div>
        </div>
      </div>
    </div>`;
}

function renderAbout(c) {
  if (!c.bio) return "";
  return `
    <div class="creator-section" data-section="about">
      <div class="creator-section-title">About</div>
      <div class="creator-about-text">${esc(c.bio)}</div>
    </div>`;
}

function renderSkills(c) {
  if (!c.skills || !c.skills.length) return "";
  return `
    <div class="creator-section" data-section="skills">
      <div class="creator-section-title">Skills & Specialties</div>
      <div class="creator-skills">
        ${c.skills.map((s) => `<span class="creator-skill">${esc(s)}</span>`).join("")}
      </div>
    </div>`;
}

function renderServices(c) {
  if (!c.services || !c.services.length) return "";
  return `
    <div class="creator-section" data-section="services">
      <div class="creator-section-title">Services</div>
      <div class="creator-services">
        ${c.services
          .map(
            (s) => `
          <div class="creator-service-card">
            <div class="creator-service-name">${esc(s.name)}</div>
            <div class="creator-service-desc">${esc(s.description)}</div>
            ${s.price ? `<div class="creator-service-price">${esc(s.price)}</div>` : ""}
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderAvailableForCustomization(c) {
  const items = c.availableForCustomization;
  if (!items || !items.length) return "";
  return `
    <div class="creator-section" data-section="available-for-customization">
      <div class="creator-section-title">Available for customization</div>
      <div class="creator-catalog">
        ${items
          .map(
            (a) => `
          <div class="creator-catalog-item">
            <div class="creator-catalog-image">
              ${a.image ? `<img src="${a.image}" alt="${esc(a.item)}" loading="lazy">` : "&#9670;"}
            </div>
            <div class="creator-catalog-body">
              <h4>${esc(a.item)}</h4>
              <p>${esc(a.technique)}</p>
              <button class="cfg-btn cfg-btn-primary" data-customize-garment="${c.id}:${a.garmentType || ""}:${a.basePrice || 0}">Customize</button>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderProducts(c) {
  if (!c.products || !c.products.length) return "";
  return `
    <div class="creator-section" data-section="products">
      <div class="creator-section-title">Shop</div>
      <div class="creator-products">
        ${c.products
          .filter((p) => getStatus(p) !== "sold")
          .map((p) => {
            const st = getStatus(p);
            return `
          <div class="creator-product-card" data-product-id="${p.id}" data-customizer-id="${c.id}">
            <div class="creator-product-image">
              ${p.image ? `<img src="${p.image}" alt="${esc(p.name)}" loading="lazy">` : "&#9670;"}
            </div>
            <div class="creator-product-body">
              <div class="creator-product-header">
                <h4>${esc(p.name)}</h4>
                <span class="creator-product-status creator-product-status--${st}">${statusLabel(st)}</span>
              </div>
              <p>${esc(p.description)}</p>
              <div class="creator-product-footer">
                <span class="creator-product-price">\u20ac${p.price}</span>
              </div>
            </div>
            <div class="creator-product-admin" data-admin-controls="${p.id}">
              <select data-status-select="${p.id}" data-customizer-id="${c.id}">
                <option value="available"${st === "available" ? " selected" : ""}>Disponibile</option>
                <option value="in_trattativa"${st === "in_trattativa" ? " selected" : ""}>In trattativa</option>
                <option value="sold"${st === "sold" ? " selected" : ""}>Venduto</option>
              </select>
            </div>
          </div>`;
          })
          .join("")}
      </div>
    </div>`;
}

function renderProductModal(p, c) {
  const st = getStatus(p);
  const mainMedia = p.image
    ? `<img src="${p.image}" alt="${esc(p.name)}">`
    : `<div class="product-modal-placeholder">&#9670;</div>`;
  const hasGallery = p.gallery && p.gallery.length;
  const allMedia = hasGallery ? [p.image, ...p.gallery] : [p.image];
  return `
    <div class="product-modal-overlay" data-product-modal>
      <div class="product-modal">
        <button class="product-modal-close" data-close-product-modal>&times;</button>
        <div class="product-modal-grid">
          <div class="product-modal-images">
            <div class="product-modal-main-image" data-media-index="0" data-fullscreen-trigger>
              ${mainMedia}
            </div>
            ${
              hasGallery
                ? `
              <button class="product-modal-arrow product-modal-arrow--left" data-gallery-prev>&lsaquo;</button>
              <button class="product-modal-arrow product-modal-arrow--right" data-gallery-next>&rsaquo;</button>
              <div class="product-modal-gallery" data-gallery-items='${JSON.stringify(allMedia)}'>
                ${allMedia
                  .map((m, i) => {
                    return `<div class="product-modal-thumb${i === 0 ? " active" : ""}" data-gallery-index="${i}">
                    ${isMov(m) ? `<video src="${m}" muted loop playsinline></video>` : `<img src="${m}" alt="">`}
                  </div>`;
                  })
                  .join("")}
              </div>`
                : ""
            }
          </div>
          <div class="product-modal-info">
            <div class="creator-product-header">
              <h3>${esc(p.name)}</h3>
              <span class="creator-product-status creator-product-status--${st}">${statusLabel(st)}</span>
            </div>
            <div class="product-modal-price">\u20ac${p.price}</div>
            <p class="product-modal-desc">${esc(p.popupDescription || p.description)}</p>
            ${p.details ? `<div class="product-modal-details">${esc(p.details)}</div>` : ""}
            <div class="product-modal-sizes">
              <strong>Misura:</strong>
              <div class="product-modal-size-options">
                ${(p.sizes || []).map((s) => `<span class="product-modal-size selected">${s}</span>`).join("")}
              </div>
            </div>
            <div class="product-modal-actions">
              ${
                st === "available"
                  ? `
                <button class="cfg-btn cfg-btn-primary" data-open-inquiry="${c.id}:${p.id}">Richiedi informazioni</button>
                <button class="cfg-btn cfg-btn-secondary" data-open-purchase="${c.id}:${p.id}">Acquista</button>
              `
                  : `
                <span class="product-sold-out-badge">Non disponibile</span>
              `
              }
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderPortfolioModal(p, c) {
  const allMedia = p.image
    ? [p.image, ...(p.gallery || [])]
    : [...(p.gallery || [])];
  const mainMedia = allMedia.length
    ? isMov(allMedia[0])
      ? `<video src="${allMedia[0]}" controls playsinline></video>`
      : `<img src="${allMedia[0]}" alt="${esc(p.name)}">`
    : `<div class="product-modal-placeholder">&#9632;</div>`;
  const hasGallery = allMedia.length > 1;
  return `
    <div class="product-modal-overlay" data-portfolio-modal>
      <div class="product-modal">
        <button class="product-modal-close" data-close-portfolio-modal>&times;</button>
        <div class="product-modal-grid">
          <div class="product-modal-images">
            <div class="product-modal-main-image" data-media-index="0">
              ${mainMedia}
            </div>
            ${
              hasGallery
                ? `
              <button class="product-modal-arrow product-modal-arrow--left" data-portfolio-gallery-prev>&lsaquo;</button>
              <button class="product-modal-arrow product-modal-arrow--right" data-portfolio-gallery-next>&rsaquo;</button>
              <div class="product-modal-gallery" data-gallery-items='${JSON.stringify(allMedia)}'>
                ${allMedia
                  .map((m, i) => {
                    return `<div class="product-modal-thumb${i === 0 ? " active" : ""}" data-gallery-index="${i}">
                    ${isMov(m) ? `<video src="${m}" muted loop playsinline></video>` : `<img src="${m}" alt="">`}
                  </div>`;
                  })
                  .join("")}
              </div>`
                : ""
            }
          </div>
          <div class="product-modal-info">
            <div class="creator-product-header">
              <h3>${esc(p.name)}</h3>
              <span class="creator-product-status creator-product-status--sold">Venduto</span>
            </div>
            <div class="product-modal-price">\u20ac${p.price}</div>
            <p class="product-modal-desc">${esc(p.description)}</p>
            <div class="product-modal-actions">
              <span class="product-sold-out-badge">Non disponibile</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderImageGalleryModal(media, autoPlay) {
  if (!media || !media.length) return "";
  const first = media[0];
  const vidAttrs = autoPlay
    ? "autoplay muted loop playsinline"
    : "controls playsinline";
  const mainContent = isMov(first)
    ? `<video src="${first}" ${vidAttrs}></video>`
    : `<img src="${first}" alt="">`;
  const hasGallery = media.length > 1;
  return `
    <div class="image-gallery-overlay" data-image-gallery-modal${autoPlay ? " data-autoplay" : ""}>
      <div class="image-gallery-backdrop" data-close-image-gallery></div>
      <button class="image-gallery-close" data-close-image-gallery>&times;</button>
      <div class="image-gallery-content">
        <div class="image-gallery-main" data-media-index="0">
          ${mainContent}
        </div>
        ${
          hasGallery
            ? `
          <button class="image-gallery-arrow image-gallery-arrow--left" data-image-gallery-prev>&lsaquo;</button>
          <button class="image-gallery-arrow image-gallery-arrow--right" data-image-gallery-next>&rsaquo;</button>
          <div class="image-gallery-thumbs" data-gallery-items='${JSON.stringify(media)}'>
            ${media
              .map(
                (m, i) => `
              <div class="image-gallery-thumb${i === 0 ? " active" : ""}" data-gallery-index="${i}">
                ${isMov(m) ? `<video src="${m}" ${autoPlay ? "autoplay " : ""}muted loop playsinline></video>` : `<img src="${m}" alt="">`}
              </div>`,
              )
              .join("")}
          </div>`
            : ""
        }
      </div>
    </div>`;
}

function renderFullscreenOverlay(src) {
  if (!src) return "";
  const content = isMov(src)
    ? `<video src="${src}" controls playsinline></video>`
    : `<img src="${src}" alt="">`;
  return `
    <div class="fullscreen-overlay" data-fullscreen-overlay>
      ${content}
    </div>`;
}

function renderInquiryForm(c, p) {
  return `
    <div class="product-modal-overlay" data-inquiry-modal>
      <div class="product-modal product-form-modal">
        <button class="product-modal-close" data-close-inquiry>&times;</button>
        <h3>Richiedi informazioni</h3>
        <p class="product-form-subtitle">${esc(p.name)} \u2014 ${esc(c.name)}</p>
        <form class="product-form" data-inquiry-form data-customizer-id="${c.id}" data-product-id="${p.id}">
          <div class="product-form-row">
            <input type="text" name="nome" class="cfg-input" placeholder="Nome" required>
            <input type="email" name="email" class="cfg-input" placeholder="Email" required>
          </div>
          <input type="text" name="telefono" class="cfg-input" placeholder="Telefono (opzionale)">
          <textarea name="messaggio" class="cfg-textarea" placeholder="Cosa vuoi sapere? Es: disponibilit\u00e0, tempi, personalizzazioni..." rows="4" required></textarea>
          <button type="submit" class="cfg-btn cfg-btn-primary">Invia richiesta</button>
        </form>
      </div>
    </div>`;
}

function renderPurchaseForm(c, p) {
  return `
    <div class="product-modal-overlay" data-purchase-modal>
      <div class="product-modal product-form-modal">
        <button class="product-modal-close" data-close-purchase>&times;</button>
        <h3>Acquista</h3>
        <p class="product-form-subtitle">${esc(p.name)} \u2014 \u20ac${p.price}</p>
        <form class="product-form" data-purchase-form data-customizer-id="${c.id}" data-product-id="${p.id}">
          <div class="product-form-row">
            <input type="text" name="nome" class="cfg-input" placeholder="Nome e cognome" required>
            <input type="email" name="email" class="cfg-input" placeholder="Email" required>
          </div>
          <div class="product-form-row">
            <input type="text" name="telefono" class="cfg-input" placeholder="Telefono" required>
            <input type="text" name="citta" class="cfg-input" placeholder="Citt\u00e0">
          </div>
          <textarea name="messaggio" class="cfg-textarea" placeholder="Note sull'ordine (taglia, indirizzo di spedizione, richieste speciali...)" rows="4"></textarea>
          <button type="submit" class="cfg-btn cfg-btn-primary">Richiedi acquisto</button>
        </form>
        <p class="product-form-note">Il venditore ti contatter\u00e0 per confermare disponibilit\u00e0 e accordarsi sui dettagli.</p>
      </div>
    </div>`;
}

function renderPortfolio(c) {
  const portfolioItems = c.portfolio || [];
  const soldProducts = c.products
    ? c.products.filter((p) => getStatus(p) === "sold")
    : [];
  if (!portfolioItems.length && !soldProducts.length) return "";
  return `
    <div class="creator-section" data-section="portfolio">
      <div class="creator-section-title">Previous projects</div>
      <div class="creator-portfolio">
        ${portfolioItems
          .map(
            (p, i) => `
          <div class="creator-portfolio-item" data-portfolio-gallery="${i}">
            <div class="creator-portfolio-image">
              ${p.images && p.images.length ? `<img src="${p.images[0]}" alt="${esc(p.title)}" loading="lazy">` : "&#9632;"}
            </div>
            <div class="creator-portfolio-body">
              <h4>${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h4>
              <p>${esc(p.description)}</p>
              ${
                p.techniques && p.techniques.length
                  ? `
                <div class="creator-portfolio-techniques">
                  ${p.techniques.map((t) => `<span>${esc(t)}</span>`).join("")}
                </div>`
                  : ""
              }
            </div>
          </div>`,
          )
          .join("")}
        ${soldProducts
          .map(
            (p) => `
          <div class="creator-portfolio-item creator-portfolio-item--sold" data-portfolio-sold="${p.id}" data-customizer-id="${c.id}">
            <div class="creator-portfolio-image">
              ${p.image ? `<img src="${p.image}" alt="${esc(p.name)}" loading="lazy">` : "&#9632;"}
              <span class="creator-sold-badge">Venduto</span>
            </div>
            <div class="creator-portfolio-body">
              <h4>${esc(p.name)}</h4>
              <p>${esc(p.description)}</p>
              <span class="creator-sold-price">\u20ac${p.price}</span>
            </div>
            <div class="creator-product-admin" data-admin-controls="${p.id}">
              <select data-status-select="${p.id}" data-customizer-id="${c.id}">
                <option value="available">Disponibile</option>
                <option value="in_trattativa">In trattativa</option>
                <option value="sold" selected>Venduto</option>
              </select>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderProcess(c) {
  if (!c.process || !c.process.length) return "";
  return `
    <div class="creator-section" data-section="process">
      <div class="creator-section-title">How it works</div>
      <div class="creator-process">
        ${c.process
          .map(
            (p, i) => `
          <div class="creator-process-step">
            <div class="creator-process-num">${String(i + 1).padStart(2, "0")}</div>
            <div class="creator-process-content">
              <h4>${esc(p.title)}</h4>
              <p>${esc(p.description)}</p>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderReviews(c) {
  if (!c.reviews || !c.reviews.length) return "";
  return `
    <div class="creator-section" data-section="reviews">
      <div class="creator-section-title">Reviews</div>
      <div class="creator-reviews">
        ${c.reviews
          .map(
            (r) => `
          <div class="creator-review">
            <div class="creator-review-header">
              <div class="creator-review-author">
                <div class="creator-review-avatar">${r.name.charAt(0)}</div>
                <div>
                  <div class="creator-review-name">${esc(r.name)}</div>
                  ${r.date ? `<div class="creator-review-date">${esc(r.date)}</div>` : ""}
                </div>
              </div>
              <div class="creator-review-stars">${stars(r.rating)}</div>
            </div>
            <div class="creator-review-text">"${esc(r.text)}"</div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}

function renderSocial(c) {
  const links = c.links || {};
  const badges = [];
  if (links.portfolio)
    badges.push({
      href: links.portfolio,
      label: "Portfolio",
      icon: "fas fa-globe",
      cls: "tag-portfolio",
    });
  if (links.instagram)
    badges.push({
      href: links.instagram,
      label: "Instagram",
      icon: "fab fa-instagram",
      cls: "tag-ig",
    });
  if (links.tiktok)
    badges.push({
      href: links.tiktok,
      label: "TikTok",
      icon: "fab fa-tiktok",
      cls: "tag-tt",
    });
  if (links.youtube)
    badges.push({
      href: links.youtube,
      label: "YouTube",
      icon: "fab fa-youtube",
      cls: "tag-yt",
    });
  if (links.github)
    badges.push({
      href: links.github,
      label: "GitHub",
      icon: "fab fa-github",
      cls: "tag-gh",
    });
  if (links.linkedin)
    badges.push({
      href: links.linkedin,
      label: "LinkedIn",
      icon: "fab fa-linkedin-in",
      cls: "tag-li",
    });
  if (links.email)
    badges.push({
      href: "mailto:" + links.email,
      label: "Email",
      icon: "fas fa-envelope",
      cls: "tag-email",
    });
  if (!badges.length) return "";
  return `
    <div class="creator-section" data-section="social">
      <div class="creator-section-title">Connect</div>
      <div class="creator-connect-badges">
        ${badges.map((b) => `<a href="${esc(b.href)}" target="_blank" rel="noopener" class="creator-connect-badge ${b.cls}"><i class="${b.icon}"></i>${esc(b.label)}</a>`).join("")}
      </div>
    </div>`;
}

function renderBottomCta(c) {
  return `
    <div class="creator-section creator-section-cta">
      <div class="creator-cta-content">
        <h3>Have an idea? Create your custom piece</h3>
        <p>Turn your vision into reality. Start customizing with ${esc(c.name)}.</p>
        <button class="cfg-btn cfg-btn-primary" data-start-creator="${c.id}">Start customizing</button>
      </div>
    </div>`;
}

function renderProfileSidebar(c) {
  const links = c.links || {};
  return `
    <div class="creator-sidebar-card">
      <div class="creator-sidebar-avatar">${avatarImg(c, 56, "creator-sidebar-avatar")}</div>
      <div class="creator-sidebar-name">${esc(c.name)}</div>
      <div class="creator-sidebar-city">${esc(c.city)}${c.country ? `, ${esc(c.country)}` : ""}</div>
      <button class="cfg-btn cfg-btn-primary creator-sidebar-cta" data-start-creator="${c.id}">Start customizing</button>
      ${
        links.portfolio
          ? `
        <div class="creator-sidebar-info">
          <div class="creator-sidebar-info-item">
            <span class="creator-sidebar-info-label">Portfolio</span>
            <a href="${esc(links.portfolio)}" target="_blank" class="creator-sidebar-info-value">perassilorenzo.com</a>
          </div>
        </div>`
          : ""
      }
    </div>`;
}

function renderProfile(c) {
  return `
    <div class="page">
      <div class="container">
        <div class="creator-profile">
          ${renderHero(c)}
          <div class="creator-layout">
            <div class="creator-main-col">
              ${renderAbout(c)}
              ${renderSkills(c)}
              ${renderAvailableForCustomization(c)}
              ${renderProducts(c)}
              ${renderPortfolio(c)}
              ${renderReviews(c)}
              ${renderSocial(c)}
              ${renderBottomCta(c)}
            </div>
            <div class="creator-sidebar-col">
              ${renderProfileSidebar(c)}
              <a href="/customizers" class="creator-back-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                All customizers
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ---- List page ---- */

function renderList() {
  const all = getAllCustomizers();
  const opts = collectFilterOptions(all);
  const n = countActive(_listState.filters);
  _fromConfigure =
    new URLSearchParams(window.location.search).get("from") === "configure";
  return `
    <div class="page">
      <div class="container">
        <div class="section-header">
          <span class="label">Customly</span>
          <h2>Discover customizers</h2>
          <p>Find your customizer and start creating something unique.</p>
        </div>
        <div class="creator-list-search">
          <input class="creator-list-search-input" data-search-input type="text" placeholder="Cerca un customizer per nome, città, stile o competenza..." autocomplete="off">
        </div>
        <div class="creator-list-toolbar">
          <button class="creator-filter-toggle" data-toggle-filters>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
            Filters${n ? ` (${n})` : ""}
          </button>
          ${n ? `<button class="creator-clear-all" data-clear-filters>Clear all</button>` : ""}
        </div>
        ${renderActiveFilters(_listState.filters)}
        <div class="creator-grid-list" data-list>
          ${all
            .filter((c) => matchesFilter(c, _listState))
            .map(renderListItem)
            .join("")}
        </div>
        <div class="creator-list-empty" data-empty style="display:none">
          <h3>No customizer found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      </div>
    </div>
    ${renderFilterPanel(opts, _listState.filters)}
  `;
}

function collectFilterOptions(all) {
  const styles = new Set();
  const garments = new Set();
  const techniques = new Set();
  const locations = new Set();
  for (const c of all) {
    if (c.styles) c.styles.forEach((s) => styles.add(s));
    if (c.garments) c.garments.forEach((g) => garments.add(g));
    if (c.techniques) c.techniques.forEach((t) => techniques.add(t));
    if (c.city) locations.add(c.city);
    if (c.region) locations.add(c.region);
    if (c.country) locations.add(c.country);
  }
  return {
    styles: [...styles].sort(),
    garments: [...garments].sort(),
    techniques: [...techniques].sort(),
    locations: [...locations].sort(),
  };
}

function countActive(filters) {
  return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
}

function renderFilterPanel(opts, current) {
  const groups = [
    { key: "styles", label: "Style", options: opts.styles },
    { key: "locations", label: "Location", options: opts.locations },
    { key: "garments", label: "Garment", options: opts.garments },
    { key: "techniques", label: "Technique", options: opts.techniques },
  ];
  return `
    <div class="creator-filter-overlay" data-filter-overlay style="display:none">
      <div class="creator-filter-panel">
        <div class="creator-filter-panel-header">
          <h3>Filters</h3>
          <button class="creator-filter-panel-close" data-filter-close>&times;</button>
        </div>
        <div class="creator-filter-panel-body">
          ${groups
            .map(
              (g) => `
            <div class="creator-filter-group">
              <div class="creator-filter-group-label">${g.label}</div>
              <div class="creator-filter-checkboxes">
                ${g.options
                  .map(
                    (o) => `
                  <label class="creator-filter-checkbox${current[g.key].includes(o) ? " checked" : ""}">
                    <input type="checkbox" data-filter-opt="${g.key}" value="${esc(o)}" ${current[g.key].includes(o) ? "checked" : ""}>
                    <span class="creator-filter-checkbox-mark"></span>
                    <span>${esc(o)}</span>
                  </label>`,
                  )
                  .join("")}
              </div>
            </div>`,
            )
            .join("")}
        </div>
        <div class="creator-filter-panel-footer">
          <button class="cfg-btn cfg-btn-ghost" data-clear-all>Clear all</button>
          <button class="cfg-btn cfg-btn-primary" data-apply-filters>Apply</button>
        </div>
      </div>
    </div>`;
}

function renderActiveFilters(filters) {
  const chips = [];
  for (const [group, values] of Object.entries(filters)) {
    for (const v of values) {
      chips.push({ group, value: v });
    }
  }
  if (!chips.length) return "";
  return `
    <div class="creator-active-filters">
      ${chips
        .map(
          (ch) => `
        <span class="creator-active-chip">
          ${esc(ch.value)}
          <button class="creator-chip-remove" data-remove-filter="${ch.group}:${esc(ch.value)}">&times;</button>
        </span>`,
        )
        .join("")}
    </div>`;
}

function renderListItem(c) {
  const href = _fromConfigure
    ? `/configuratore?creator=${c.id}`
    : `/customizers/${c.id}`;
  return `
    <a href="${href}" class="creator-list-card" data-list-item="${c.id}">
      <div class="creator-list-avatar">${avatarImg(c, 52, "creator-list")}</div>
      <div class="creator-list-info">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <h3>${esc(c.name)}</h3>
          ${c.category ? `<span style="font-size:9px;padding:2px 7px;border:1px solid var(--accent);color:var(--accent);text-transform:uppercase;letter-spacing:.06em;font-weight:600">${esc(c.category)}</span>` : ""}
        </div>
        <div class="creator-list-card-city">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${esc(c.city)}${c.country ? `, ${esc(c.country)}` : ""}
        </div>
        <p>${esc(c.tagline)}</p>
        ${
          c.skills && c.skills.length
            ? `
          <div class="creator-list-card-tags">
            ${c.skills
              .slice(0, 3)
              .map((s) => `<span>${esc(s)}</span>`)
              .join("")}
          </div>`
            : ""
        }
      </div>
    </a>`;
}

function matchesFilter(c, state) {
  const f = state.filters;
  if (
    f.styles.length &&
    !f.styles.some((s) => c.styles && c.styles.includes(s))
  )
    return false;
  if (
    f.garments.length &&
    !f.garments.some((g) => c.garments && c.garments.includes(g))
  )
    return false;
  if (
    f.techniques.length &&
    !f.techniques.some((t) => c.techniques && c.techniques.includes(t))
  )
    return false;
  if (
    f.locations.length &&
    !f.locations.some((l) => c.city === l || c.region === l || c.country === l)
  )
    return false;
  if (!state.query) return true;
  const q = state.query.toLowerCase();
  return (
    c.name.toLowerCase().includes(q) ||
    c.tagline.toLowerCase().includes(q) ||
    (c.city && c.city.toLowerCase().includes(q)) ||
    (c.country && c.country.toLowerCase().includes(q)) ||
    (c.category && c.category.toLowerCase().includes(q)) ||
    (c.skills && c.skills.some((s) => s.toLowerCase().includes(q))) ||
    (c.styles && c.styles.some((s) => s.toLowerCase().includes(q))) ||
    (c.garments && c.garments.some((g) => g.toLowerCase().includes(q)))
  );
}

let _listState = {
  query: "",
  filters: { styles: [], garments: [], techniques: [], locations: [] },
};
let _filterOpts = null;
let _fromConfigure = false;
let bound = false;

function applyListFilter() {
  const all = getAllCustomizers();
  const list = document.querySelector("[data-list]");
  const empty = document.querySelector("[data-empty]");
  if (!list) return;
  const filtered = all.filter((c) => matchesFilter(c, _listState));
  list.innerHTML = filtered.map((c) => renderListItem(c)).join("");
  if (empty) empty.style.display = filtered.length ? "none" : "block";

  /* update toolbar + active chips */
  const toolbar = document.querySelector(".creator-list-toolbar");
  const activeEl = document.querySelector(".creator-active-filters");
  const n = countActive(_listState.filters);
  if (toolbar) {
    const toggle = toolbar.querySelector("[data-toggle-filters]");
    if (toggle) toggle.innerHTML = `Filters${n ? ` (${n})` : ""}`;
    const clear = toolbar.querySelector("[data-clear-filters]");
    if (n) {
      if (!clear)
        toolbar.insertAdjacentHTML(
          "beforeend",
          '<button class="creator-clear-all" data-clear-filters>Clear all</button>',
        );
    } else {
      if (clear) clear.remove();
    }
  }
  if (activeEl) {
    activeEl.outerHTML = renderActiveFilters(_listState.filters);
  } else if (n) {
    const grid = document.querySelector(".creator-grid-list");
    if (grid)
      grid.insertAdjacentHTML(
        "beforebegin",
        renderActiveFilters(_listState.filters),
      );
  }
}

/* ---- exports ---- */

export function renderCreator(ctx) {
  const id = ctx.id;
  if (!id) return renderList();
  const c = getCustomizer(id);
  if (!c) {
    return `
      <div class="page">
        <div class="container" style="text-align:center;padding:80px 0">
          <h2 style="font-family:var(--font-heading);font-size:28px;margin-bottom:12px">Customizer not found</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px">This professional isn't on the platform yet.</p>
            <a href="/customizers" class="cfg-btn cfg-btn-primary">Browse customizers</a>
        </div>
      </div>`;
  }
  return renderProfile(c);
}

export function initCreator() {
  if (bound) return;
  bound = true;

  /* Profile page: CTA buttons (delegated to support multiple buttons) */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-start-creator]");
    if (btn) {
      const id = btn.dataset.startCreator;
      if (id) navigate("/configuratore?creator=" + id);
    }
    const custBtn = e.target.closest("[data-customize-garment]");
    if (custBtn) {
      const parts = custBtn.dataset.customizeGarment.split(":");
      const id = parts[0];
      const gtype = parts[1];
      const bprice = parts[2];
      if (gtype)
        navigate(
          `/configuratore?creator=${id}&garment=${gtype}&basePrice=${bprice}`,
        );
      else navigate(`/configuratore?creator=${id}`);
    }

    /* Product card click -> open modal (only if available) */
    const prodCard = e.target.closest("[data-product-id]");
    if (
      prodCard &&
      !e.target.closest("[data-close-product-modal]") &&
      !e.target.closest("[data-open-inquiry]") &&
      !e.target.closest("[data-open-purchase]") &&
      !e.target.closest("[data-inquiry-modal]") &&
      !e.target.closest("[data-purchase-modal]") &&
      !e.target.closest("[data-thankyou-modal]")
    ) {
      const pid = prodCard.dataset.productId;
      const cid = prodCard.dataset.customizerId;
      const c = getCustomizer(cid);
      const p = c && c.products ? c.products.find((x) => x.id === pid) : null;
      if (c && p && getStatus(p) === "available") {
        const modal = renderProductModal(p, c);
        document.body.insertAdjacentHTML("beforeend", modal);
      }
    }

    /* Close product modal */
    if (e.target.closest("[data-close-product-modal]")) {
      const modal = document.querySelector("[data-product-modal]");
      if (modal) modal.remove();
      return;
    }
    if (
      e.target.closest("[data-product-modal]") &&
      !e.target.closest(".product-modal")
    ) {
      const modal = document.querySelector("[data-product-modal]");
      if (modal) modal.remove();
      return;
    }

    /* Regular portfolio item click -> open image gallery */
    const portfolioItem = e.target.closest("[data-portfolio-gallery]");
    if (
      portfolioItem &&
      !e.target.closest("[data-close-image-gallery]") &&
      !e.target.closest("[data-status-select]")
    ) {
      const idx = parseInt(portfolioItem.dataset.portfolioGallery);
      const cid = portfolioItem.closest(".creator-main-col")
        ? document.querySelector("[data-start-creator]")?.dataset.startCreator
        : null;
      const c = cid ? getCustomizer(cid) : null;
      const item = c && c.portfolio ? c.portfolio[idx] : null;
      const all = item && item.images && item.images.length ? item.images : [];
      const vids = all.filter((m) => isMov(m));
      const media = vids.length ? vids : all;
      if (media.length) {
        document.body.insertAdjacentHTML(
          "beforeend",
          renderImageGalleryModal(media, vids.length > 0),
        );
      }
    }

    /* Portfolio sold item click -> open video gallery (autoplay, no controls) */
    const portfolioSold = e.target.closest("[data-portfolio-sold]");
    if (
      portfolioSold &&
      !e.target.closest("[data-close-image-gallery]") &&
      !e.target.closest("[data-status-select]") &&
      !e.target.closest("[data-image-gallery-modal]")
    ) {
      const pid = portfolioSold.dataset.portfolioSold;
      const cid = portfolioSold.dataset.customizerId;
      const c = getCustomizer(cid);
      const p = c && c.products ? c.products.find((x) => x.id === pid) : null;
      if (c && p) {
        const all = p.image
          ? [p.image, ...(p.gallery || [])]
          : [...(p.gallery || [])];
        const vids = all.filter((m) => isMov(m));
        if (vids.length) {
          document.body.insertAdjacentHTML(
            "beforeend",
            renderImageGalleryModal(vids, true),
          );
        }
      }
    }

    /* Close image gallery */
    if (e.target.closest("[data-close-image-gallery]")) {
      const modal = document.querySelector("[data-image-gallery-modal]");
      if (modal) modal.remove();
      return;
    }
    if (
      e.target.closest("[data-image-gallery-modal]") &&
      !e.target.closest(".image-gallery-content")
    ) {
      const modal = document.querySelector("[data-image-gallery-modal]");
      if (modal) modal.remove();
      return;
    }

    /* Image gallery navigation */
    if (
      e.target.closest("[data-image-gallery-next]") ||
      e.target.closest("[data-image-gallery-prev]")
    ) {
      const modal = document.querySelector("[data-image-gallery-modal]");
      if (!modal) return;
      const gallery = modal.querySelector(".image-gallery-thumbs");
      const mainEl = modal.querySelector(".image-gallery-main");
      if (!gallery || !mainEl) return;
      const thumbs = gallery.querySelectorAll(".image-gallery-thumb");
      if (!thumbs.length) return;
      const active = gallery.querySelector(".image-gallery-thumb.active");
      let idx = active ? parseInt(active.dataset.galleryIndex) : 0;
      const items = JSON.parse(gallery.dataset.galleryItems);
      if (e.target.closest("[data-image-gallery-next]"))
        idx = (idx + 1) % items.length;
      else idx = (idx - 1 + items.length) % items.length;
      thumbs.forEach((t) => t.classList.remove("active"));
      thumbs[idx].classList.add("active");
      thumbs[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      const src = items[idx];
      const ap = modal.hasAttribute("data-autoplay");
      const va = ap
        ? "autoplay muted loop playsinline"
        : "controls playsinline";
      mainEl.innerHTML = isMov(src)
        ? `<video src="${src}" ${va}></video>`
        : `<img src="${src}" alt="">`;
      mainEl.dataset.mediaIndex = idx;
    }

    /* Image gallery thumb click */
    const iThumb = e.target.closest(
      "[data-image-gallery-modal] .image-gallery-thumb",
    );
    if (iThumb) {
      const modal = document.querySelector("[data-image-gallery-modal]");
      if (!modal) return;
      const gallery = modal.querySelector(".image-gallery-thumbs");
      const mainEl = modal.querySelector(".image-gallery-main");
      if (!gallery || !mainEl) return;
      const items = JSON.parse(gallery.dataset.galleryItems);
      const idx = parseInt(iThumb.dataset.galleryIndex);
      gallery
        .querySelectorAll(".image-gallery-thumb")
        .forEach((t) => t.classList.remove("active"));
      iThumb.classList.add("active");
      const src = items[idx];
      const ap = modal.hasAttribute("data-autoplay");
      const va = ap
        ? "autoplay muted loop playsinline"
        : "controls playsinline";
      mainEl.innerHTML = isMov(src)
        ? `<video src="${src}" ${va}></video>`
        : `<img src="${src}" alt="">`;
      mainEl.dataset.mediaIndex = idx;
    }

    /* Product modal main image click -> open gallery (videos autoplay, images fallback) */
    if (
      e.target.closest("[data-fullscreen-trigger]") &&
      !e.target.closest("[data-image-gallery-modal]")
    ) {
      const modal = document.querySelector("[data-product-modal]");
      if (!modal) return;
      const gallery = modal.querySelector(".product-modal-gallery");
      let items;
      if (gallery) {
        items = JSON.parse(gallery.dataset.galleryItems);
      } else {
        const mainImg = e.target.closest("[data-fullscreen-trigger]");
        const img = mainImg.querySelector("img");
        const vid = mainImg.querySelector("video");
        const src = img ? img.src : vid ? vid.src : null;
        if (src) items = [src];
      }
      if (items && items.length) {
        const vids = items.filter((m) => isMov(m));
        const media = vids.length ? vids : items;
        if (media.length) {
          document.body.insertAdjacentHTML(
            "beforeend",
            renderImageGalleryModal(media, vids.length > 0),
          );
        }
      }
    }

    /* Close fullscreen overlay */
    if (e.target.closest("[data-fullscreen-overlay]")) {
      const overlay = document.querySelector("[data-fullscreen-overlay]");
      if (overlay) overlay.remove();
      return;
    }

    /* Product modal gallery navigation */
    if (
      e.target.closest("[data-gallery-next]") ||
      e.target.closest("[data-gallery-prev]")
    ) {
      const modal = document.querySelector("[data-product-modal]");
      if (!modal) return;
      const gallery = modal.querySelector(".product-modal-gallery");
      const mainImg = modal.querySelector(".product-modal-main-image");
      if (!gallery) return;
      const thumbs = gallery.querySelectorAll(".product-modal-thumb");
      if (!thumbs.length) return;
      const active = gallery.querySelector(".product-modal-thumb.active");
      let idx = active ? parseInt(active.dataset.galleryIndex) : 0;
      const items = JSON.parse(gallery.dataset.galleryItems);
      if (e.target.closest("[data-gallery-next]"))
        idx = (idx + 1) % items.length;
      else idx = (idx - 1 + items.length) % items.length;
      thumbs.forEach((t) => t.classList.remove("active"));
      thumbs[idx].classList.add("active");
      thumbs[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      const src = items[idx];
      mainImg.innerHTML = isMov(src)
        ? `<video src="${src}" autoplay muted loop playsinline></video>`
        : `<img src="${src}" alt="">`;
      mainImg.dataset.mediaIndex = idx;
    }

    /* Product modal gallery thumb click */
    const gThumb = e.target.closest(
      "[data-product-modal] .product-modal-thumb",
    );
    if (gThumb) {
      const modal = document.querySelector("[data-product-modal]");
      if (!modal) return;
      const gallery = modal.querySelector(".product-modal-gallery");
      const mainImg = modal.querySelector(".product-modal-main-image");
      if (!gallery || !mainImg) return;
      const items = JSON.parse(gallery.dataset.galleryItems);
      const idx = parseInt(gThumb.dataset.galleryIndex);
      gallery
        .querySelectorAll(".product-modal-thumb")
        .forEach((t) => t.classList.remove("active"));
      gThumb.classList.add("active");
      const src = items[idx];
      mainImg.innerHTML = isMov(src)
        ? `<video src="${src}" autoplay muted loop playsinline></video>`
        : `<img src="${src}" alt="">`;
      mainImg.dataset.mediaIndex = idx;
    }

    /* Open inquiry form */
    const inqBtn = e.target.closest("[data-open-inquiry]");
    if (inqBtn) {
      const parts = inqBtn.dataset.openInquiry.split(":");
      const c = getCustomizer(parts[0]);
      const p =
        c && c.products ? c.products.find((x) => x.id === parts[1]) : null;
      if (c && p) {
        document.querySelector("[data-product-modal]")?.remove();
        document.body.insertAdjacentHTML("beforeend", renderInquiryForm(c, p));
      }
    }

    /* Close inquiry */
    if (e.target.closest("[data-close-inquiry]")) {
      document.querySelector("[data-inquiry-modal]")?.remove();
      return;
    }
    if (
      e.target.closest("[data-inquiry-modal]") &&
      !e.target.closest(".product-form-modal")
    ) {
      document.querySelector("[data-inquiry-modal]")?.remove();
      return;
    }

    /* Open purchase form */
    const purBtn = e.target.closest("[data-open-purchase]");
    if (purBtn) {
      const parts = purBtn.dataset.openPurchase.split(":");
      const c = getCustomizer(parts[0]);
      const p =
        c && c.products ? c.products.find((x) => x.id === parts[1]) : null;
      if (c && p) {
        document.querySelector("[data-product-modal]")?.remove();
        document.body.insertAdjacentHTML("beforeend", renderPurchaseForm(c, p));
      }
    }

    /* Close purchase */
    if (e.target.closest("[data-close-purchase]")) {
      document.querySelector("[data-purchase-modal]")?.remove();
      return;
    }
    if (
      e.target.closest("[data-purchase-modal]") &&
      !e.target.closest(".product-form-modal")
    ) {
      document.querySelector("[data-purchase-modal]")?.remove();
      return;
    }

    /* Close thank-you */
    if (e.target.closest("[data-close-thankyou]")) {
      document.querySelector("[data-thankyou-modal]")?.remove();
      return;
    }
    if (
      e.target.closest("[data-thankyou-modal]") &&
      !e.target.closest(".product-form-modal")
    ) {
      document.querySelector("[data-thankyou-modal]")?.remove();
      return;
    }
  });

  /* Keyboard navigation for galleries and modals */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const igModal = document.querySelector("[data-image-gallery-modal]");
      if (igModal) {
        const btn = igModal.querySelector(
          e.key === "ArrowRight"
            ? "[data-image-gallery-next]"
            : "[data-image-gallery-prev]",
        );
        if (btn) btn.click();
        return;
      }
      const pModal = document.querySelector("[data-product-modal]");
      if (pModal) {
        const btn = pModal.querySelector(
          e.key === "ArrowRight"
            ? "[data-gallery-next]"
            : "[data-gallery-prev]",
        );
        if (btn) btn.click();
        return;
      }
    }
    if (e.key === "Escape") {
      const igModal = document.querySelector("[data-image-gallery-modal]");
      if (igModal) {
        igModal.remove();
        return;
      }
      const fsOverlay = document.querySelector("[data-fullscreen-overlay]");
      if (fsOverlay) {
        fsOverlay.remove();
        return;
      }
      const pModal = document.querySelector("[data-product-modal]");
      if (pModal) {
        pModal.remove();
        return;
      }
      const iModal = document.querySelector("[data-inquiry-modal]");
      if (iModal) {
        iModal.remove();
        return;
      }
      const purModal = document.querySelector("[data-purchase-modal]");
      if (purModal) {
        purModal.remove();
        return;
      }
      const tyModal = document.querySelector("[data-thankyou-modal]");
      if (tyModal) {
        tyModal.remove();
        return;
      }
    }
  });

  /* Form submissions */
  document.addEventListener("submit", (e) => {
    if (e.target.closest("[data-inquiry-form]")) {
      e.preventDefault();
      const form = e.target.closest("[data-inquiry-form]");
      const data = new FormData(form);
      const obj = Object.fromEntries(data.entries());
      obj.type = "inquiry";
      obj.customizerId = form.dataset.customizerId;
      obj.productId = form.dataset.productId;

      form.closest("[data-inquiry-modal]")?.remove();
      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="product-modal-overlay" data-thankyou-modal>
          <div class="product-modal product-form-modal" style="text-align:center;padding:48px 24px">
            <h3>Grazie!</h3>
            <p style="color:var(--text-secondary);margin:12px 0 24px">La tua richiesta \u00e8 stata inviata. Il customizer ti contatter\u00e0 a breve.</p>
            <button class="cfg-btn cfg-btn-primary" data-close-thankyou>Chiudi</button>
          </div>
        </div>
      `,
      );
    }
    if (e.target.closest("[data-purchase-form]")) {
      e.preventDefault();
      const form = e.target.closest("[data-purchase-form]");
      const data = new FormData(form);
      const obj = Object.fromEntries(data.entries());
      obj.type = "purchase";
      obj.customizerId = form.dataset.customizerId;
      obj.productId = form.dataset.productId;

      /* Mark product as in trattativa */
      const c = getCustomizer(obj.customizerId);
      if (c && c.products) {
        const p = c.products.find((x) => x.id === obj.productId);
        if (p) {
          p.status = "in_trattativa";
          setStatus(p.id, "in_trattativa");
        }
      }
      form.closest("[data-purchase-modal]")?.remove();
      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="product-modal-overlay" data-thankyou-modal>
          <div class="product-modal product-form-modal" style="text-align:center;padding:48px 24px">
            <h3>Richiesta inviata!</h3>
            <p style="color:var(--text-secondary);margin:12px 0 24px">Il venditore ti contatter\u00e0 per confermare la disponibilit\u00e0 e accordarsi sui dettagli dell'ordine.</p>
            <button class="cfg-btn cfg-btn-primary" data-close-thankyou>Chiudi</button>
          </div>
        </div>
      `,
      );
      /* Update badge on page */
      const card = document.querySelector(
        `[data-product-id="${obj.productId}"]`,
      );
      if (card) {
        const badge = card.querySelector(".creator-product-status");
        if (badge) {
          badge.className =
            "creator-product-status creator-product-status--in-trattativa";
          badge.textContent = "In trattativa";
        }
      }
    }
  });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-scroll]");
    if (btn) {
      const section = btn.dataset.scroll;
      if (section) {
        const el = document.querySelector(`[data-section="${section}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });

  /* List page: search */
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      _listState.query = searchInput.value;
      applyListFilter();
    });
  }

  /* Precompute filter options */
  _filterOpts = collectFilterOptions(getAllCustomizers());

  /* List page: toggle filters button */
  document
    .querySelector("[data-toggle-filters]")
    ?.addEventListener("click", () => {
      rebuildFilterPanelContent();
      const overlay = document.querySelector("[data-filter-overlay]");
      if (overlay) overlay.style.display = "";
    });

  /* List page: filter panel events (delegated) */
  document.addEventListener("click", (e) => {
    const overlay = document.querySelector("[data-filter-overlay]");
    if (!overlay) return;
    const target = e.target;

    if (target.closest("[data-filter-close]")) {
      overlay.style.display = "none";
      return;
    }
    if (
      target.closest("[data-filter-overlay]") &&
      !target.closest(".creator-filter-panel")
    ) {
      overlay.style.display = "none";
      return;
    }
    if (target.closest("[data-clear-all]")) {
      const cbs = overlay.querySelectorAll("[data-filter-opt]");
      cbs.forEach((cb) => {
        cb.checked = false;
        cb.closest(".creator-filter-checkbox")?.classList.remove("checked");
      });
      _listState.filters = {
        styles: [],
        garments: [],
        techniques: [],
        locations: [],
      };
      overlay.style.display = "none";
      applyListFilter();
      return;
    }
    if (target.closest("[data-apply-filters]")) {
      const filters = {
        styles: [],
        garments: [],
        techniques: [],
        locations: [],
      };
      const cbs = overlay.querySelectorAll("[data-filter-opt]:checked");
      cbs.forEach((cb) => {
        const group = cb.dataset.filterOpt;
        if (filters[group]) filters[group].push(cb.value);
      });
      _listState.filters = filters;
      overlay.style.display = "none";
      applyListFilter();
      return;
    }
  });

  /* List page: remove single filter chip */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove-filter]");
    if (!btn) return;
    const val = btn.dataset.removeFilter;
    const colon = val.indexOf(":");
    const group = val.slice(0, colon);
    const value = val.slice(colon + 1);
    const arr = _listState.filters[group];
    if (arr) {
      _listState.filters[group] = arr.filter((v) => v !== value);
      applyListFilter();
    }
  });

  /* List page: clear all filters */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-clear-filters]");
    if (!btn) return;
    _listState.filters = {
      styles: [],
      garments: [],
      techniques: [],
      locations: [],
    };
    applyListFilter();
  });

  /* List page: checkbox toggle visual */
  document.addEventListener("change", (e) => {
    const cb = e.target.closest("[data-filter-opt]");
    if (cb) {
      cb.closest(".creator-filter-checkbox")?.classList.toggle(
        "checked",
        cb.checked,
      );
      return;
    }
    /* Admin: product status select */
    const sel = e.target.closest("[data-status-select]");
    if (sel) {
      const pid = sel.dataset.statusSelect;
      const cid = sel.dataset.customizerId;
      const newStatus = sel.value;
      const c = getCustomizer(cid);
      const oldProduct =
        c && c.products ? c.products.find((x) => x.id === pid) : null;
      const oldStatus = oldProduct ? getStatus(oldProduct) : null;
      setStatus(pid, newStatus);
      /* Update badge on page */
      const card = document.querySelector(`[data-product-id="${pid}"]`);
      if (card) {
        const badge = card.querySelector(".creator-product-status");
        if (badge) {
          badge.className = `creator-product-status creator-product-status--${newStatus}`;
          badge.textContent = statusLabel(newStatus);
        }
      }
      /* If set to sold, re-render to hide from shop + show in portfolio */
      if (newStatus === "sold" && c) {
        const shopSection = document.querySelector('[data-section="products"]');
        if (shopSection) shopSection.outerHTML = renderProducts(c);
        const portfolioSection = document.querySelector(
          '[data-section="portfolio"]',
        );
        if (portfolioSection) portfolioSection.outerHTML = renderPortfolio(c);
        else {
          const mainCol = document.querySelector(".creator-main-col");
          if (mainCol) {
            const cta = mainCol.querySelector('[data-section="social"]');
            if (cta) cta.insertAdjacentHTML("beforebegin", renderPortfolio(c));
            else mainCol.insertAdjacentHTML("beforeend", renderPortfolio(c));
          }
        }
      }
      /* If unsold (back to available/in_trattativa), re-render portfolio to remove from there */
      if (oldStatus === "sold" && newStatus !== "sold" && c) {
        const portfolioSection = document.querySelector(
          '[data-section="portfolio"]',
        );
        if (portfolioSection) portfolioSection.outerHTML = renderPortfolio(c);
        const shopSection = document.querySelector('[data-section="products"]');
        if (shopSection) shopSection.outerHTML = renderProducts(c);
      }
    }
  });
}

function rebuildFilterPanelContent() {
  const overlay = document.querySelector("[data-filter-overlay]");
  if (!overlay) {
    const container = document.querySelector(".container");
    if (!container) return;
    container.insertAdjacentHTML(
      "beforeend",
      renderFilterPanel(_filterOpts, _listState.filters),
    );
  } else {
    const body = overlay.querySelector(".creator-filter-panel-body");
    const footer = overlay.querySelector(".creator-filter-panel-footer");
    if (body) {
      const groups = [
        { key: "styles", label: "Style", options: _filterOpts.styles },
        { key: "locations", label: "Location", options: _filterOpts.locations },
        { key: "garments", label: "Garment", options: _filterOpts.garments },
        {
          key: "techniques",
          label: "Technique",
          options: _filterOpts.techniques,
        },
      ];
      body.innerHTML = groups
        .map(
          (g) => `
        <div class="creator-filter-group">
          <div class="creator-filter-group-label">${g.label}</div>
          <div class="creator-filter-checkboxes">
            ${g.options
              .map(
                (o) => `
              <label class="creator-filter-checkbox${_listState.filters[g.key].includes(o) ? " checked" : ""}">
                <input type="checkbox" data-filter-opt="${g.key}" value="${esc(o)}" ${_listState.filters[g.key].includes(o) ? "checked" : ""}>
                <span class="creator-filter-checkbox-mark"></span>
                <span>${esc(o)}</span>
              </label>`,
              )
              .join("")}
          </div>
        </div>`,
        )
        .join("");
    }
  }
}
