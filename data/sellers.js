import { seller as demon } from "../sellers/demon-handmade/data.js";
import { seller as raw } from "../sellers/raw-spirit/data.js";

const registry = {
  "demon-handmade": demon,
  "raw-spirit": raw,
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
