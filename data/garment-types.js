export const garmentTypes = {
  jeans: {
    id: "jeans",
    name: "Jeans",
    desc: "Modifica il tuo jeans: trasformalo, personalizzalo, rendilo unico.",
    basePrice: 0,
    modifications: {
      modello: {
        label: "Trasformazione modello",
        type: "single",
        default: null,
        values: [
          {
            id: "skinny-to-baggy",
            label: "Skinny \u2192 Baggy",
            price: 25,
            params: { leg: "baggy" },
          },
          {
            id: "skinny-to-flare",
            label: "Skinny \u2192 Flare",
            price: 22,
            params: { leg: "flared" },
          },
          {
            id: "regular-to-wide",
            label: "Regular \u2192 Wide",
            price: 20,
            params: { leg: "wide" },
          },
          {
            id: "taper",
            label: "Taper (slimmato sotto)",
            price: 15,
            params: { leg: "taper" },
          },
        ],
      },
      lunghezza: {
        label: "Lunghezza",
        type: "single",
        default: null,
        values: [
          {
            id: "accorcia",
            label: "Accorcia orlo",
            price: 8,
            params: { length: "short" },
          },
          {
            id: "allunga",
            label: "Allunga (aggiunta tessuto)",
            price: 15,
            params: { length: "long" },
          },
        ],
      },
      dettagli: {
        label: "Dettagli & Lavorazioni",
        type: "multi",
        values: [
          {
            id: "raw-hem",
            label: "Raw hem (fondo grezzo)",
            price: 5,
            params: { rawHem: true },
          },
          {
            id: "patch",
            label: "Aggiunta patch",
            price: 10,
            params: { patch: true },
          },
          {
            id: "strappi",
            label: "Strappi / distressed",
            price: 8,
            params: { tears: true },
          },
          {
            id: "bleach",
            label: "Bleach",
            price: 15,
            params: { bleach: true },
          },
          {
            id: "ricami",
            label: "Ricami personalizzati",
            price: 20,
            params: { ricamo: true },
          },
        ],
      },
    },
  },
  maglia: {
    id: "maglia",
    name: "Maglia / T-shirt",
    desc: "Taglia, cuci, personalizza. Trasforma la tua maglia in un pezzo unico.",
    basePrice: 0,
    modifications: {
      modello: {
        label: "Modifiche modello",
        type: "single",
        default: null,
        values: [
          {
            id: "corte",
            label: "Taglio maniche corte",
            price: 8,
            params: { sleeves: "short" },
          },
          {
            id: "no",
            label: "Rimozione maniche",
            price: 10,
            params: { sleeves: "none" },
          },
          {
            id: "cropped",
            label: "Cropped",
            price: 12,
            params: { cropped: true },
          },
        ],
      },
      fit: {
        label: "Vestibilit\u00e0",
        type: "single",
        default: null,
        values: [
          {
            id: "oversize",
            label: "Rendi oversize",
            price: 15,
            params: { fit: "oversize" },
          },
          {
            id: "slim",
            label: "Rendi slim fit",
            price: 10,
            params: { fit: "slim" },
          },
        ],
      },
      dettagli: {
        label: "Dettagli & Lavorazioni",
        type: "multi",
        values: [
          {
            id: "raw-hem",
            label: "Raw hem (fondo grezzo)",
            price: 5,
            params: { rawHem: true },
          },
          {
            id: "stampe",
            label: "Stampe personalizzate",
            price: 15,
            params: { print: true },
          },
          {
            id: "patch",
            label: "Aggiunta patch",
            price: 10,
            params: { patch: true },
          },
          {
            id: "ricami",
            label: "Ricami personalizzati",
            price: 20,
            params: { ricamo: true },
          },
        ],
      },
    },
  },
  felpa: {
    id: "felpa",
    name: "Felpa / Hoodie",
    desc: "Dalla felpa basic al pezzo forte. Modifica, aggiungi, trasforma.",
    basePrice: 0,
    modifications: {
      modello: {
        label: "Modifiche modello",
        type: "single",
        default: null,
        values: [
          {
            id: "cropped",
            label: "Cropped",
            price: 14,
            params: { cropped: true },
          },
          {
            id: "zip",
            label: "Aggiungi cerniera",
            price: 18,
            params: { zip: true },
          },
          {
            id: "no-sleeves",
            label: "Rimozione maniche",
            price: 12,
            params: { sleeves: "none" },
          },
        ],
      },
      dettagli: {
        label: "Dettagli & Lavorazioni",
        type: "multi",
        values: [
          {
            id: "raw-hem",
            label: "Raw hem",
            price: 5,
            params: { rawHem: true },
          },
          {
            id: "stampe",
            label: "Stampe personalizzate",
            price: 18,
            params: { print: true },
          },
          {
            id: "patch",
            label: "Aggiunta patch",
            price: 12,
            params: { patch: true },
          },
          {
            id: "ricami",
            label: "Ricami personalizzati",
            price: 25,
            params: { ricamo: true },
          },
          {
            id: "bleach",
            label: "Bleach",
            price: 18,
            params: { bleach: true },
          },
        ],
      },
    },
  },
};

export function getGarmentType(id) {
  return garmentTypes[id] || null;
}
