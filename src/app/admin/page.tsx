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

export default function Admin() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    setData(load());
  }, []);

  if (!data) return null;

  function reload() {
    setData({ ...load() });
  }

  function update(field: "name" | "baseImage", val: string) {
    const d = load();
    d[field] = val;
    save(d);
    reload();
  }

  function addOption() {
    const d = load();
    d.options.push({ id: Date.now(), name: "New", price: 0, image: "" });
    save(d);
    reload();
  }

  function updateOption(id: number, field: keyof Option, val: string | number) {
    const d = load();
    const o = d.options.find((x) => x.id === id);
    if (o) {
      (o as any)[field] = val;
      save(d);
      reload();
    }
  }

  function deleteOption(id: number) {
    const d = load();
    d.options = d.options.filter((x) => x.id !== id);
    save(d);
    reload();
  }

  function clearOrders() {
    const d = load();
    d.orders = [];
    save(d);
    reload();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Product</h2>
        <div className="space-y-3 max-w-md">
          <div>
            <label className="block text-sm text-secondary mb-1">Name</label>
            <input
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-1">
              Base Image URL
            </label>
            <input
              value={data.baseImage}
              onChange={(e) => update("baseImage", e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">
            Options ({data.options.length})
          </h2>
          <button
            onClick={addOption}
            className="text-sm text-primary hover:underline"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3 max-w-xl">
          {data.options.map((o) => (
            <div
              key={o.id}
              className="border border-border rounded-xl p-3 bg-surface"
            >
              <div className="flex gap-2 mb-2">
                <input
                  value={o.name}
                  onChange={(e) => updateOption(o.id, "name", e.target.value)}
                  placeholder="Name"
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  value={o.price}
                  onChange={(e) =>
                    updateOption(o.id, "price", Number(e.target.value))
                  }
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="w-24 px-3 py-2 border border-border rounded-lg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => deleteOption(o.id)}
                  className="text-error text-lg px-2"
                >
                  &times;
                </button>
              </div>
              <input
                value={o.image}
                onChange={(e) => updateOption(o.id, "image", e.target.value)}
                placeholder="Image URL (optional)"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          ))}
          {data.options.length === 0 && (
            <p className="text-secondary text-sm">
              No options. Click &quot;+ Add&quot; to create one.
            </p>
          )}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">
            Orders ({data.orders.length})
          </h2>
          {data.orders.length > 0 && (
            <button
              onClick={clearOrders}
              className="text-sm text-error hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-2 max-w-xl">
          {data.orders.toReversed().map((o, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-3 bg-surface text-sm"
            >
              <span className="font-medium">{o.buyer}</span>
              <span className="text-secondary ml-2">
                — {new Date(o.date).toLocaleString()}
              </span>
              <span className="text-secondary ml-2">
                ({o.options.length} options)
              </span>
            </div>
          ))}
          {data.orders.length === 0 && (
            <p className="text-secondary text-sm">No orders yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
