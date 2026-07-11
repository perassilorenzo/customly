import { getSeller, getAllSellers } from "../data/sellers.js";
import { navigate } from "../utils/router.js";

function renderProfile(seller) {
  return `
<div class="page">
  <div class="container">
    <div class="creator-profile">
      <div class="creator-profile-header">
        <div class="creator-avatar">
          ${seller.image ? `<img src="${seller.image}" alt="${seller.name}">` : `<div class="creator-avatar-placeholder">${seller.name.charAt(0)}</div>`}
        </div>
        <div class="creator-profile-info">
          <span class="creator-badge">Customizer</span>
          <h1 class="creator-name">${seller.name}</h1>
          <p class="creator-tagline">${seller.tagline}</p>
        </div>
      </div>

      <div class="creator-grid">
        <div class="creator-main">
          <div class="creator-section">
            <h3>About</h3>
            <p>${seller.bio}</p>
          </div>

          <div class="creator-section">
            <h3>Specialized in</h3>
            <div class="creator-tags">
              ${seller.style
                .split(",")
                .map((s) => `<span class="tag">${s.trim()}</span>`)
                .join("")}
            </div>
          </div>

          ${
            seller.examples && seller.examples.length
              ? `
          <div class="creator-section">
            <h3>Example works</h3>
            <ul class="creator-examples">
              ${seller.examples.map((e) => `<li>${e}</li>`).join("")}
            </ul>
          </div>`
              : ""
          }
        </div>

        <div class="creator-sidebar-card">
          <div class="creator-sidebar-inner">
            ${
              seller.contacts.instagram
                ? `
            <div class="creator-contact-row">
              <span class="creator-contact-label">Instagram</span>
              <a href="${seller.social.instagram || "#"}" target="_blank" class="creator-contact-value">${seller.contacts.instagram}</a>
            </div>`
                : ""
            }
            <div class="creator-cta">
              <button class="cfg-btn cfg-btn-primary" data-start-creator="${seller.id}" style="width:100%;justify-content:center">
                Start customizing →
              </button>
              <p class="creator-cta-desc">Configure your garment with ${seller.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="creator-back">
      <a href="#/configuratore?creator=${seller.id}" class="cfg-btn cfg-btn-ghost">← Go to configurator</a>
    </div>
  </div>
</div>`;
}

function renderList() {
  const all = getAllSellers().filter((s) => s.type === "creator");
  return `
<div class="page">
  <div class="container">
    <div class="section-header">
      <span class="label">Customly</span>
      <h2>Discover customizers</h2>
      <p>Find your customizer and start creating something unique.</p>
    </div>
    <div class="creator-grid-list">
      ${all
        .map(
          (s) => `
        <a href="#/creator/${s.id}" class="creator-list-card">
          <div class="creator-list-avatar">
            ${s.image ? `<img src="${s.image}" alt="${s.name}">` : `<div class="creator-list-placeholder">${s.name.charAt(0)}</div>`}
          </div>
          <div class="creator-list-info">
            <h3>${s.name}</h3>
            <p>${s.tagline}</p>
            <div class="creator-list-tags">
              ${s.style
                .split(",")
                .slice(0, 2)
                .map((t) => `<span>${t.trim()}</span>`)
                .join("")}
            </div>
          </div>
        </a>
      `,
        )
        .join("")}
    </div>
  </div>
</div>`;
}

export function renderCreator(ctx) {
  const id = ctx.id;
  if (!id) return renderList();
  const seller = getSeller(id);
  if (!seller) {
    return `
<div class="page">
  <div class="container" style="text-align:center;padding:80px 0">
    <h2 style="font-family:var(--font-heading);font-size:28px;margin-bottom:12px">Customizer not found</h2>
    <p style="color:var(--text-secondary);margin-bottom:24px">This professional isn't on the platform yet.</p>
    <a href="#/creator" class="cfg-btn cfg-btn-primary">Browse customizers</a>
  </div>
</div>`;
  }
  return renderProfile(seller);
}

export function initCreator() {
  document
    .querySelector("[data-start-creator]")
    ?.addEventListener("click", (e) => {
      const id = e.target.dataset.startCreator;
      navigate("/configuratore?creator=" + id);
    });
}
