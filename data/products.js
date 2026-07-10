import { shade } from "./color.js";

const COLORS = {
  "#c13535": "Rosso",
  "#1a1410": "Nero",
  "#2d5a3d": "Verde",
  "#8b7355": "Cuoio",
  "#f5f0eb": "Crema",
  "#4a6fa5": "Denim",
  "#d4a017": "Oro",
};

const DEFAULTS = {
  sleeves: "short",
  cropped: false,
  fit: "regular",
  rawHem: false,
  print: false,
  patch: false,
  ricamo: false,
  leg: "regular",
  length: "normal",
  tears: false,
  bleach: false,
  zip: false,
  color: "#c13535",
};

export function buildConfig(productId, selections, color, options) {
  const cfg = { ...DEFAULTS, color };
  if (!options) return cfg;
  for (const [group, val] of Object.entries(selections)) {
    const grp = options[group];
    if (!grp) continue;
    if (grp.type === "single") {
      const v = grp.values.find((x) => x.id === val);
      if (v && v.params) Object.assign(cfg, v.params);
    } else if (grp.type === "multi" && Array.isArray(val)) {
      for (const vid of val) {
        const v = grp.values.find((x) => x.id === vid);
        if (v && v.params) Object.assign(cfg, v.params);
      }
    }
  }
  return cfg;
}

export function renderSVG(productId, selections, color, options, cfg) {
  if (!cfg) cfg = buildConfig(productId, selections, color, options);
  if (productId === "pantaloni" || productId === "jeans")
    return renderPants(cfg);
  if (productId === "felpa") return renderHoodie(cfg);
  return renderShirt(cfg);
}

export function getColorLabel(hex) {
  return COLORS[hex] || hex;
}

// ---- SHIRT ----
function renderShirt(c) {
  const w = c.fit === "oversize" ? 20 : c.fit === "slim" ? -12 : 0;
  const ch = c.cropped ? 50 : 0;
  const bH = 200 - ch;
  let bx = 60 - w / 2,
    by = 45,
    bw = 80 + w;

  let svg = `<svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  svg += bodyPath(bx, by, bw, bH, c, 10);
  svg += neckline(bx, by, bw, c);
  svg += sleevesPath(bx, by, bw, c.sleeves, c);
  if (c.cropped)
    svg += `<path d="M${bx + 12},${by + bH + 8} Q${bx + bw / 2},${by + bH + 18} ${bx + bw - 12},${by + bH + 8}" stroke="${shade(c.color, -20)}" stroke-width="1.5" fill="none"/>`;
  if (c.rawHem) svg += rawHemPath(bx + 10, by + bH - 5, bw - 20, c);
  if (c.print) svg += printEl(bx, by, bw, c);
  if (c.patch) svg += patchEl(bx + 18, by + 80, c);
  if (c.ricamo) svg += ricamoEl(bx, by, bw, c);
  addStitchOverlay(svg, bx, by, bw, bH);
  svg += `</svg>`;
  return svg;
}

// ---- PANTS ----
function renderPants(c) {
  let lw = 36,
    lx1 = 52,
    lx2 = 108;
  if (c.leg === "skinny") {
    lw = 24;
    lx1 = 58;
    lx2 = 116;
  } else if (c.leg === "baggy") {
    lw = 56;
    lx1 = 42;
    lx2 = 98;
  } else if (c.leg === "flared") {
    lw = 20;
    lx1 = 44;
    lx2 = 100;
  } else if (c.leg === "wide") {
    lw = 50;
    lx1 = 45;
    lx2 = 105;
  } else if (c.leg === "taper") {
    lw = 28;
    lx1 = 55;
    lx2 = 110;
  }

  let lh = 135;
  if (c.length === "short") lh = 100;
  else if (c.length === "long") lh = 165;
  let ly = 80;
  const waistY = 50,
    waistW = 80,
    waistX = 60;

  let svg = `<svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  const d = shade(c.color, -20);

  svg += `<rect x="${waistX}" y="${waistY}" width="${waistW}" height="18" rx="4" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  svg += waistDetails(waistX, waistY, waistW, c);

  const llx1 = c.leg === "flared" ? lx1 + 6 : lx1;
  const llx2 = c.leg === "flared" ? lx1 - 6 : lx1;
  svg += `<path d="M${llx1 + 4},${waistY + 18} L${llx2 + 4},${waistY + 18} L${lx2 - lw / 2},${ly + lh} L${lx2 - lw / 2 - 4},${ly + lh + 6} L${lx1 + lw / 2 + 4},${ly + lh + 6} L${lx1 + lw / 2},${ly + lh} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  svg += `<path d="M${llx1 + waistW - 4},${waistY + 18} L${llx2 + waistW - 4},${waistY + 18} L${lx2 + lw / 2},${ly + lh} L${lx2 + lw / 2 + 4},${ly + lh + 6} L${lx1 - lw / 2 + 4},${ly + lh + 6} L${lx1 - lw / 2},${ly + lh} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  svg += `<path d="M${lx1 + 4},${waistY + 18} Q${lx1 + lw},${ly + 10} ${lx1 + waistW - 4},${waistY + 18}" fill="none" stroke="${d}" stroke-width="1.5"/>`;

  if (c.rawHem) {
    for (const side of [lx1 + lw / 2, lx1 + waistW - lw / 2]) {
      let r = `M${side - 8},${ly + lh + 6}`;
      for (let i = 0; i < 5; i++) {
        const rr = side - 8 + (i * 16) / 4;
        r += ` L${rr},${ly + lh + 10 + (i % 2 === 0 ? 3 : -3)}`;
      }
      svg += `<path d="${r}" stroke="${d}" stroke-width="1.2" fill="none"/>`;
    }
  }

  if (c.tears) {
    for (const tx of [lx1 + 14, lx1 + waistW - 12]) {
      svg += `<path d="M${tx},${ly + 40} L${tx + 6},${ly + 55} L${tx - 2},${ly + 65}" stroke="${d}" stroke-width="1.2" fill="none"/>`;
      svg += `<rect x="${tx - 1}" y="${ly + 43}" width="2" height="18" fill="#fff" opacity="0.3"/>`;
    }
  }

  if (c.patch) {
    svg += `<rect x="${lx1 + waistW - 20}" y="${ly + 28}" width="18" height="18" rx="2" fill="${d}" opacity="0.25"/>`;
    svg += `<line x1="${lx1 + waistW - 17}" y1="${ly + 32}" x2="${lx1 + waistW - 5}" y2="${ly + 32}" stroke="${c.color}" stroke-width="1.5"/>`;
    svg += `<line x1="${lx1 + waistW - 15}" y1="${ly + 37}" x2="${lx1 + waistW - 7}" y2="${ly + 37}" stroke="${c.color}" stroke-width="1.5"/>`;
    svg += `<rect x="${lx1 + 8}" y="${ly + 72}" width="15" height="15" rx="2" fill="${d}" opacity="0.25"/>`;
    svg += `<line x1="${lx1 + 11}" y1="${ly + 76}" x2="${lx1 + 20}" y2="${ly + 76}" stroke="${c.color}" stroke-width="1.2"/>`;
  }

  if (c.bleach) {
    svg += `<ellipse cx="${lx1 + 28}" cy="${ly + 50}" rx="14" ry="28" fill="#fff" opacity="0.15"/>`;
    svg += `<ellipse cx="${lx1 + waistW - 22}" cy="${ly + 80}" rx="12" ry="20" fill="#fff" opacity="0.12"/>`;
    svg += `<ellipse cx="${lx1 + 38}" cy="${ly + 110}" rx="8" ry="12" fill="#fff" opacity="0.08"/>`;
  }

  if (c.ricamo) {
    svg += `<text x="${waistX + waistW / 2}" y="${waistY + 33}" text-anchor="middle" fill="${d}" font-size="5" font-style="italic" opacity="0.7">✤ ricamo</text>`;
  }

  svg += `</svg>`;
  return svg;
}

// ---- HOODIE ----
function renderHoodie(c) {
  const w = c.fit === "oversize" ? 24 : c.fit === "slim" ? -8 : 0;
  const ch = c.cropped ? 55 : 0;
  const bH = 200 - ch;
  let bx = 56 - w / 2,
    by = 50,
    bw = 88 + w;

  let svg = `<svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  const d = shade(c.color, -25);

  svg += `<path d="M${bx + 8},${by + 5} L${bx + bw - 8},${by + 5} L${bx + bw - 4},${by + 30} Q${bx + bw + 2},${by + 40} ${bx + bw - 8},${by + 48} L${bx + bw - 12},${by + bH - 5} Q${bx + bw},${by + bH + 10} ${bx + bw / 2 + 5},${by + bH + 10} Q${bx - 2},${by + bH + 10} ${bx + 12},${by + bH - 5} L${bx + 8},${by + 48} Q${bx - 2},${by + 40} ${bx + 4},${by + 30} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;

  const hx = bx + bw / 2;
  svg += `<path d="M${bx + 16},${by + 5} Q${hx},${by - 22} ${bx + bw - 16},${by + 5}" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  svg += `<path d="M${hx - 18},${by - 5} Q${hx},${by - 16} ${hx + 18},${by - 5}" fill="none" stroke="${d}" stroke-width="1.2"/>`;

  svg += `<rect x="${hx - 14}" y="${by + 15}" width="28" height="84" rx="3" fill="none" stroke="${d}" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>`;

  if (c.zip) {
    svg += `<line x1="${hx}" y1="${by + 5}" x2="${hx}" y2="${by + bH - 5}" stroke="${d}" stroke-width="1.2"/>`;
    svg += `<rect x="${hx - 1}" y="${by + 18}" width="2" height="8" rx="1" fill="${d}"/>`;
    svg += `<rect x="${hx - 1}" y="${by + 80}" width="2" height="8" rx="1" fill="${d}"/>`;
  }

  svg += sleevesPath(bx, by + 2, bw, c.sleeves || "short", c);

  const px = c.cropped ? by + bH + 12 : by + bH - 5;
  svg += `<path d="M${bx + 14},${px} Q${hx},${px + 14} ${bx + bw - 14},${px}" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  const dx = shade(c.color, -15);
  svg += `<rect x="${hx - 12}" y="${by + bH - 14}" width="24" height="14" rx="3" fill="${dx}" stroke="${d}" stroke-width="1"/>`;
  svg += `<line x1="${hx - 8}" y1="${by + bH - 8}" x2="${hx + 8}" y2="${by + bH - 8}" stroke="${d}" stroke-width="1.2"/>`;
  svg += `<line x1="${hx - 6}" y1="${by + bH - 4}" x2="${hx + 6}" y2="${by + bH - 4}" stroke="${d}" stroke-width="1.2"/>`;

  if (c.cropped)
    svg += `<path d="M${bx + 14},${by + bH + 10} Q${hx},${by + bH + 20} ${bx + bw - 14},${by + bH + 10}" stroke="${d}" stroke-width="1.5" fill="none"/>`;
  if (c.rawHem) svg += rawHemPath(bx + 12, by + bH - 3, bw - 24, c);
  if (c.print) svg += printEl(bx, by, bw, c);
  if (c.patch) svg += patchEl(bx + 20, by + 85, c);
  if (c.ricamo) svg += ricamoEl(bx, by, bw, c);
  if (c.bleach) {
    svg += `<ellipse cx="${hx}" cy="${by + 50}" rx="20" ry="30" fill="#fff" opacity="0.1"/>`;
    svg += `<ellipse cx="${hx - 15}" cy="${by + 90}" rx="12" ry="18" fill="#fff" opacity="0.08"/>`;
  }

  svg += `</svg>`;
  return svg;
}

// ---- SVG helpers ----
function bodyPath(bx, by, bw, bH, c, inset) {
  const d = shade(c.color, -20);
  const i = inset || 10;
  return `<path d="M${bx + i},${by} L${bx + bw - i},${by} L${bx + bw - i + 5},${by + 30} Q${bx + bw + 2},${by + 38} ${bx + bw - 8},${by + 48} L${bx + bw - 12},${by + bH - 5} Q${bx + bw},${by + bH + 10} ${bx + bw / 2 + 5},${by + bH + 10} Q${bx - 2},${by + bH + 10} ${bx + 12},${by + bH - 5} L${bx + 8},${by + 48} Q${bx - 2},${by + 38} ${bx + i - 5},${by + 30} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
}

function neckline(bx, by, bw, c) {
  return `<path d="M${bx + 12},${by + 2} Q${bx + bw / 2},${by - 6} ${bx + bw - 12},${by + 2}" stroke="${shade(c.color, -20)}" stroke-width="1.5" fill="none"/>`;
}

function sleevesPath(bx, by, bw, type, c) {
  const d = shade(c.color, -20);
  let res = "";
  if (type === "short" || type === "corte") {
    res += `<path d="M${bx + 5},${by + 30} Q${bx - 18},${by + 28} ${bx - 22},${by + 58} L${bx + 8},${by + 56} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
    res += `<path d="M${bx + bw - 5},${by + 30} Q${bx + bw + 18},${by + 28} ${bx + bw + 22},${by + 58} L${bx + bw - 8},${by + 56} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  } else if (type === "long" || type === "lunghe") {
    res += `<path d="M${bx + 5},${by + 30} Q${bx - 14},${by + 35} ${bx - 16},${by + 90} L${bx + 8},${by + 88} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
    res += `<path d="M${bx + bw - 5},${by + 30} Q${bx + bw + 14},${by + 35} ${bx + bw + 16},${by + 90} L${bx + bw - 8},${by + 88} Z" fill="${c.color}" stroke="${d}" stroke-width="1.5"/>`;
  }
  return res;
}

function rawHemPath(sx, sy, sw, c) {
  let r = `M${sx},${sy}`;
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const rr = sx + (i * sw) / steps;
    r += ` L${rr},${sy + (i % 2 === 0 ? 3 : -3)}`;
  }
  return `<path d="${r}" stroke="${shade(c.color, -20)}" stroke-width="1.5" fill="none"/>`;
}

function printEl(bx, by, bw, c) {
  const l = shade(c.color, 20);
  const hx = bx + bw / 2;
  return `<rect x="${hx - 16}" y="${by + 60}" width="32" height="42" rx="4" fill="${l}" opacity="0.6"/>
  <text x="${hx}" y="${by + 84}" text-anchor="middle" fill="${shade(c.color, -40)}" font-size="8" font-weight="700" font-family="sans-serif">LOGO</text>`;
}

function patchEl(px, py, c) {
  const d = shade(c.color, -20);
  return `<rect x="${px}" y="${py}" width="20" height="20" rx="3" fill="${d}" opacity="0.25"/>
  <rect x="${px + 1}" y="${py + 1}" width="18" height="18" rx="2" fill="none" stroke="${d}" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
  <line x1="${px + 4}" y1="${py + 7}" x2="${px + 16}" y2="${py + 7}" stroke="${c.color}" stroke-width="1.5"/>
  <line x1="${px + 4}" y1="${py + 12}" x2="${px + 12}" y2="${py + 12}" stroke="${c.color}" stroke-width="1.5"/>`;
}

function ricamoEl(bx, by, bw, c) {
  const d = shade(c.color, -20);
  const hx = bx + bw / 2;
  return `<text x="${hx}" y="${by + 54}" text-anchor="middle" fill="${d}" font-size="6" font-style="italic" font-family="serif" opacity="0.7">✤ nome</text>`;
}

function waistDetails(wx, wy, ww, c) {
  const d = shade(c.color, -20);
  return `<line x1="${wx + 12}" y1="${wy + 6}" x2="${wx + 20}" y2="${wy + 6}" stroke="${d}" stroke-width="1.2"/>
  <line x1="${wx + ww - 20}" y1="${wy + 6}" x2="${wx + ww - 12}" y2="${wy + 6}" stroke="${d}" stroke-width="1.2"/>
  <line x1="${wx + 4}" y1="${wy + 12}" x2="${wx + 10}" y2="${wy + 12}" stroke="${d}" stroke-width="1.2"/>
  <line x1="${wx + ww - 10}" y1="${wy + 12}" x2="${wx + ww - 4}" y2="${wy + 12}" stroke="${d}" stroke-width="1.2"/>`;
}

function addStitchOverlay(svg, bx, by, bw, bH) {}
