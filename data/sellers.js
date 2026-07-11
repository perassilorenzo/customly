import { seller as v1 } from "../sellers/venditore1/data.js";
import { seller as v2 } from "../sellers/venditore2/data.js";
import { seller as adm } from "../sellers/admin/data.js";
import { seller as per } from "../sellers/perassi/data.js";

const registry = {
  venditore1: v1,
  venditore2: v2,
  admin: adm,
  perassi: per,
};

export function getSeller(id) {
  return registry[id] || null;
}

export function searchSellers(q) {
  const t = q.toLowerCase().trim();
  if (!t) return Object.values(registry);
  return Object.values(registry).filter(
    (s) =>
      s.name.toLowerCase().includes(t) ||
      s.id.includes(t) ||
      s.tagline.toLowerCase().includes(t),
  );
}

export function getAllSellers() {
  return Object.values(registry);
}
