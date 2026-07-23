const ID = "xgojbgje";
const ORDERS_KEY = "customly:orders";

function storeOrder(data) {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    orders.push({ ...data, _ts: Date.now(), _id: "ord-" + Date.now() });
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {}
}

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function deleteOrder(id) {
  try {
    const orders = getOrders().filter((o) => o._id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {}
}

export function clearOrders() {
  localStorage.removeItem(ORDERS_KEY);
}

export async function send(data) {
  storeOrder(data);
  if (!ID) {
    console.log("Formspree ID non configurato. Dati:", data);
    return true;
  }
  const r = await fetch("https://formspree.io/f/" + ID, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Errore invio (" + r.status + ")");
  return true;
}
