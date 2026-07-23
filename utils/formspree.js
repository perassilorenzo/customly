const ID = "xgojbgje";

export async function send(data) {
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
