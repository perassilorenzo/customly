export const seller = {
  id: "admin",
  name: "Admin",
  tagline: "Il configuratore base — personalizza il tuo capo.",
  bio: "Configuratore ufficiale. Seleziona il capo che hai, scegli le modifiche e invia la richiesta. Tutte le personalizzazioni sono realizzate a mano.",
  style: "Personalizzazione artigianale su misura.",
  image: null,
  contacts: {
    instagram: null,
    email: null,
  },
  social: {},
  products: [
    {
      id: "admin-jeans",
      name: "Jeans",
      desc: "Jeans da personalizzare. Scegli modello base e modifiche.",
      basePrice: 0,
      type: "jeans",
      options: {
        modello: {
          label: "Modello base",
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
            { id: "baggy", label: "Baggy", price: 5, params: { leg: "baggy" } },
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
              label: "Accorcia",
              price: 5,
              params: { length: "short" },
            },
            {
              id: "allunga",
              label: "Allunga",
              price: 10,
              params: { length: "long" },
            },
          ],
        },
        dettagli: {
          label: "Modifiche",
          type: "multi",
          values: [
            { id: "orlo", label: "Orlo", price: 5, params: { rawHem: true } },
            {
              id: "flared",
              label: "Rendi più largo / Flared",
              price: 15,
              params: { leg: "flared" },
            },
            {
              id: "baggy",
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
    {
      id: "admin-maglia",
      name: "Maglia",
      desc: "Maglia da personalizzare. Scegli modello base e modifiche.",
      basePrice: 0,
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
              price: 3,
              params: { sleeves: "long" },
            },
            {
              id: "no",
              label: "Canotta",
              price: 2,
              params: { sleeves: "none" },
            },
          ],
        },
        fit: {
          label: "Vestibilità",
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
          ],
        },
        dettagli: {
          label: "Modifiche",
          type: "multi",
          values: [
            { id: "orlo", label: "Orlo", price: 5, params: { rawHem: true } },
            {
              id: "cropped",
              label: "Accorcia / Cropped",
              price: 8,
              params: { cropped: true },
            },
            {
              id: "allunga",
              label: "Allunga",
              price: 10,
              params: { length: "long" },
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
  ],
};
