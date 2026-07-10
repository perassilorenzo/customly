export const garmentTypes = {
  jeans: {
    id: "jeans",
    name: "Jeans",
    desc: "Seleziona il tipo di jeans che hai e scegli le modifiche.",
    modifications: {
      modello: {
        label: "Che tipo di jeans hai?",
        type: "single",
        default: "regular",
        values: [
          {
            id: "skinny",
            label: "Skinny",
            price: 0,
            params: { leg: "skinny" },
          },
          {
            id: "regular",
            label: "Regular",
            price: 0,
            params: { leg: "regular" },
          },
          { id: "baggy", label: "Baggy", price: 0, params: { leg: "baggy" } },
        ],
      },
      modifiche: {
        label: "Modifiche",
        type: "multi",
        values: [
          {
            id: "allunga",
            label: "Allunga",
            price: 10,
            params: { length: "long" },
          },
          { id: "orlo", label: "Orlo", price: 5, params: { rawHem: true } },
          {
            id: "flared",
            label: "Rendi pi\u00f9 largo / Flared",
            price: 15,
            params: { leg: "flared" },
          },
          {
            id: "rendi-baggy",
            label: "Rendi baggy",
            price: 12,
            params: { leg: "baggy" },
          },
        ],
      },
      tessuto: {
        label: "Tessuto aggiunto",
        type: "single",
        default: null,
        values: [
          {
            id: "jeans",
            label: "Jeans",
            price: 8,
            params: { fabricAdd: "jeans" },
          },
          {
            id: "tuta",
            label: "Tuta",
            price: 10,
            params: { fabricAdd: "tuta" },
          },
          {
            id: "camo",
            label: "Camo",
            price: 12,
            params: { fabricAdd: "camo" },
          },
        ],
      },
    },
  },
  maglia: {
    id: "maglia",
    name: "Maglia / T-shirt",
    desc: "Seleziona il tipo di maglia che hai e scegli le modifiche.",
    modifications: {
      modello: {
        label: "Che tipo di maglia hai?",
        type: "single",
        default: "corte",
        values: [
          {
            id: "corte",
            label: "Maniche corte",
            price: 0,
            params: { sleeves: "short" },
          },
          {
            id: "lunghe",
            label: "Maniche lunghe",
            price: 0,
            params: { sleeves: "long" },
          },
          { id: "no", label: "Canotta", price: 0, params: { sleeves: "none" } },
        ],
      },
      modifiche: {
        label: "Modifiche",
        type: "multi",
        values: [
          {
            id: "allunga",
            label: "Allunga",
            price: 10,
            params: { length: "long" },
          },
          { id: "orlo", label: "Orlo", price: 5, params: { rawHem: true } },
          {
            id: "oversize",
            label: "Rendi pi\u00f9 largo / Oversize",
            price: 12,
            params: { fit: "oversize" },
          },
          {
            id: "cropped",
            label: "Cropped / Accorcia",
            price: 8,
            params: { cropped: true },
          },
        ],
      },
      tessuto: {
        label: "Tessuto aggiunto",
        type: "single",
        default: null,
        values: [
          {
            id: "jeans",
            label: "Jeans",
            price: 8,
            params: { fabricAdd: "jeans" },
          },
          {
            id: "tuta",
            label: "Tuta",
            price: 10,
            params: { fabricAdd: "tuta" },
          },
          {
            id: "camo",
            label: "Camo",
            price: 12,
            params: { fabricAdd: "camo" },
          },
        ],
      },
    },
  },
};

export function getGarmentType(id) {
  return garmentTypes[id] || null;
}
