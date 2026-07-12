const STORAGE_KEY = "customly:product-status";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function save(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getStatus(product) {
  const overrides = load();
  return overrides[product.id] || product.status;
}

export function setStatus(productId, status) {
  const overrides = load();
  overrides[productId] = status;
  save(overrides);
}

export function resetStatus(productId) {
  const overrides = load();
  delete overrides[productId];
  save(overrides);
}

export function statusLabel(status) {
  const labels = {
    available: "Disponibile",
    in_trattativa: "In trattativa",
    sold: "Venduto",
  };
  return labels[status] || status;
}
