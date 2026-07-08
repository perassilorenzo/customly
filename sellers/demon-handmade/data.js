export const seller = {
  id: "demon-handmade",
  name: "Demon Handmade",
  tagline: "Stracci che diventano arte.",
  bio: "Demon Handmade nasce dalla strada, dalla voglia di trasformare capi dimenticati in pezzi unici. Ogni taglio, ogni cucitura, ogni strappo ha una storia. Non produciamo in serie, modifichiamo a mano. Jeans tagliati, ricostruiti, dipinti. Maglie strappate e ricucite. Niente \u00e8 uguale, niente \u00e8 perfetto, tutto \u00e8 autentico.",
  style:
    "Streetwear grezzo, look vissuto, acid wash, patchwork, dettagli fatti a mano. Ispirato al punk, al grunge e alla cultura underground.",
  image: null,
  contacts: {
    instagram: "https://instagram.com/demonhandmade",
    email: "demon.handmade@example.com",
  },
  social: {
    instagram: "https://instagram.com/demonhandmade",
    tiktok: "https://tiktok.com/@demonhandmade",
  },
  products: [
    {
      id: "demon-jeans",
      name: "Jeans Demonici",
      desc: "Jeans base personalizzabile. Scegli modello, taglio e lavorazioni.",
      basePrice: 35,
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
            {
              id: "skinny",
              label: "Skinny",
              price: 0,
              params: { leg: "skinny" },
            },
            { id: "baggy", label: "Baggy", price: 6, params: { leg: "baggy" } },
            { id: "wide", label: "Wide", price: 4, params: { leg: "wide" } },
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
            {
              id: "allunga",
              label: "Allungati",
              price: 3,
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
              label: "Raw hem",
              price: 5,
              params: { rawHem: true },
            },
            {
              id: "patch",
              label: "Patch personalizzate",
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
              label: "Bleach / acid wash",
              price: 15,
              params: { bleach: true },
            },
            {
              id: "ricami",
              label: "Ricami custom",
              price: 22,
              params: { ricamo: true },
            },
          ],
        },
      },
    },
    {
      id: "demon-maglia",
      name: "Maglia Devil",
      desc: "Maglia pronta per essere stravolta. Tagli, stampe, patch, ricami.",
      basePrice: 20,
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
              price: 4,
              params: { sleeves: "long" },
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
              price: 5,
              params: { fit: "oversize" },
            },
            {
              id: "slim",
              label: "Slim fit",
              price: 3,
              params: { fit: "slim" },
            },
          ],
        },
        dettagli: {
          label: "Dettagli & Lavorazioni",
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
              id: "stampe",
              label: "Stampe serigrafiche",
              price: 15,
              params: { print: true },
            },
            {
              id: "patch",
              label: "Patch personalizzate",
              price: 10,
              params: { patch: true },
            },
            {
              id: "ricami",
              label: "Ricami custom",
              price: 20,
              params: { ricamo: true },
            },
          ],
        },
      },
    },
    {
      id: "demon-felpa",
      name: "Felpa Hell",
      desc: "Felpa pesante, personalizzabile al massimo. Il tuo pezzo forte.",
      basePrice: 40,
      type: "felpa",
      options: {
        modello: {
          label: "Modifiche",
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
              label: "Stampe serigrafiche",
              price: 18,
              params: { print: true },
            },
            {
              id: "patch",
              label: "Patch personalizzate",
              price: 12,
              params: { patch: true },
            },
            {
              id: "ricami",
              label: "Ricami custom",
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
  ],
};
