export const seller = {
  id: "raw-spirit",
  name: "Raw Spirit",
  tagline: "Essenziale. Crudo. Vero.",
  bio: "Raw Spirit \u00e8 minimalismo sporco. Non inseguiamo trend, creiamo capi che respirano. Ogni pezzo \u00e8 pensato per durare, per invecchiare bene, per raccontare chi lo indossa. Lavoriamo solo materiali naturali, tinture vegetali, finiture grezze. Meno \u00e8 pi\u00f9, ma con carattere.",
  style:
    "Minimalismo sporco, colori naturali, tessuti grezzi, finiture artigianali. Ispirato al Giappone, al workwear e alla terra.",
  image: "sellers/raw-spirit/images/pfp.jpg",
  contacts: {
    instagram: "https://instagram.com/rawspirit",
    email: "raw.spirit@example.com",
  },
  social: {
    instagram: "https://instagram.com/rawspirit",
  },
  products: [
    {
      id: "raw-maglia",
      name: "Maglia Grezza",
      desc: "Maglia in cotone grezzo, personalizzabile con dettagli essenziali.",
      basePrice: 25,
      type: "maglia",
      options: {
        modello: {
          label: "Modello base",
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
              price: 5,
              params: { sleeves: "long" },
            },
            {
              id: "no",
              label: "Senza maniche",
              price: 0,
              params: { sleeves: "none" },
            },
          ],
        },
        fit: {
          label: "Vestibilit\u00e0",
          type: "single",
          default: "regular",
          values: [
            {
              id: "regular",
              label: "Regular",
              price: 0,
              params: { fit: "regular" },
            },
            {
              id: "oversize",
              label: "Oversize",
              price: 6,
              params: { fit: "oversize" },
            },
          ],
        },
        dettagli: {
          label: "Dettagli",
          type: "multi",
          values: [
            {
              id: "cropped",
              label: "Cropped",
              price: 10,
              params: { cropped: true },
            },
            {
              id: "raw-hem",
              label: "Raw hem",
              price: 5,
              params: { rawHem: true },
            },
            {
              id: "ricami",
              label: "Ricami a mano",
              price: 25,
              params: { ricamo: true },
            },
          ],
        },
      },
    },
    {
      id: "raw-jeans",
      name: "Jeans Terra",
      desc: "Jeans in denim grezzo, tinture naturali. Scegli modello e finiture.",
      basePrice: 40,
      type: "jeans",
      options: {
        modello: {
          label: "Modello base",
          type: "single",
          default: "regular",
          values: [
            {
              id: "regular",
              label: "Regular",
              price: 0,
              params: { leg: "regular" },
            },
            { id: "wide", label: "Wide", price: 5, params: { leg: "wide" } },
            { id: "baggy", label: "Baggy", price: 7, params: { leg: "baggy" } },
          ],
        },
        lunghezza: {
          label: "Lunghezza",
          type: "single",
          default: "normale",
          values: [
            {
              id: "normale",
              label: "Normale",
              price: 0,
              params: { length: "normal" },
            },
            {
              id: "accorcia",
              label: "Accorciati",
              price: 2,
              params: { length: "short" },
            },
          ],
        },
        dettagli: {
          label: "Dettagli",
          type: "multi",
          values: [
            {
              id: "raw-hem",
              label: "Raw hem",
              price: 5,
              params: { rawHem: true },
            },
            {
              id: "patch",
              label: "Patch in tessuto naturale",
              price: 12,
              params: { patch: true },
            },
            {
              id: "ricami",
              label: "Ricami a mano",
              price: 25,
              params: { ricamo: true },
            },
          ],
        },
      },
    },
  ],
};
