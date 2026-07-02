"use client";

import { useState, useEffect } from "react";

type Option = { id: number; name: string; price: number; image: string };
type Data = {
  name: string;
  baseImage: string;
  options: Option[];
  orders: { buyer: string; options: number[]; date: string }[];
};

function load(): Data {
  if (typeof window === "undefined")
    return {
      name: "T-Shirt",
      baseImage: "/images/base-tshirt.svg",
      options: [],
      orders: [],
    };
  const raw = localStorage.getItem("shop");
  return raw
    ? JSON.parse(raw)
    : {
        name: "T-Shirt",
        baseImage: "/images/base-tshirt.svg",
        options: [],
        orders: [],
      };
}

function save(d: Data) {
  localStorage.setItem("shop", JSON.stringify(d));
}

export default function Store() {
  const [data, setData] = useState<Data | null>(null);
  const [sel, setSel] = useState<number[]>([]);
  const [buyer, setBuyer] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setData(load());
  }, []);

  if (!data) return null;

  const total = sel.reduce((s, id) => {
    const o = data.options.find((x) => x.id === id);
    return s + (o ? o.price : 0);
  }, 0);

  const img =
    sel.length > 0
      ? data.options.find((x) => x.id === sel[sel.length - 1])?.image ||
        data.baseImage
      : data.baseImage;

  function toggle(id: number) {
    setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  function submit() {
    if (!buyer.trim()) {
      setErr("Enter your name");
      return;
    }
    const d = load();
    d.orders.push({
      buyer: buyer.trim(),
      options: sel,
      date: new Date().toISOString(),
    });
    save(d);
    console.log("New order:", d.orders[d.orders.length - 1]);
    setDone(true);
  }

  if (done) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">&#10003;</div>
        <h2 className="text-2xl font-bold mb-2">Order sent!</h2>
        <p className="text-secondary mb-6">We&apos;ll get back to you soon.</p>
        <button
          onClick={() => {
            setDone(false);
            setSel([]);
            setBuyer("");
          }}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover"
        >
          New Order
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <p className="text-secondary text-sm mb-6">Choose your options</p>

        <div className="space-y-2 mb-6">
          {data.options.map((o) => (
            <button
              key={o.id}
              onClick={() => toggle(o.id)}
              className={`w-full text-left border rounded-xl p-4 transition-all ${
                sel.includes(o.id)
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "border-border bg-surface hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{o.name}</span>
                <span className="text-primary font-semibold">
                  +&euro;{o.price.toFixed(2)}
                </span>
              </div>
            </button>
          ))}
          {data.options.length === 0 && (
            <p className="text-secondary text-sm">No options yet.</p>
          )}
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 mb-6 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">&euro;{total.toFixed(2)}</span>
        </div>

        {err && (
          <div className="bg-error/10 text-error text-sm p-3 rounded-lg mb-4">
            {err}
          </div>
        )}

        <input
          value={buyer}
          onChange={(e) => setBuyer(e.target.value)}
          placeholder="Your name"
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          onClick={submit}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-hover"
        >
          Send Order
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-surface border border-border rounded-xl p-8 w-full max-w-md aspect-square flex items-center justify-center">
          {img ? (
            <img
              src={img}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <p className="text-secondary">No image</p>
          )}
        </div>
      </div>
    </div>
  );
}
