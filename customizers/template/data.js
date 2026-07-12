export const customizer = {
  id: "template",
  name: "Template Profile",
  tagline: "Il tuo profilo customizer — personalizza ogni dettaglio.",
  bio: "Questo è un profilo di esempio che mostra come sarà il tuo spazio su Customly. Ogni customizer può inserire la propria biografia, i propri lavori, i servizi offerti e molto altro. Personalizza tutto per far conoscere il tuo stile.\n\nIl profilo è pensato per raccontare chi sei, cosa fai e come lavori. Puoi parlare della tua storia, del tuo approccio creativo e della tua filosofia. Mostra i tuoi lavori migliori, i servizi che offri e lascia che i clienti ti scoprano.",
  image: null,
  cover: null,
  city: "La tua città",
  region: "",
  country: "Italia",
  category: "Customizer",
  styles: ["Personalizzazione", "Artigianato digitale", "Custom fashion"],
  garments: ["Jeans", "T-Shirt", "Hoodie", "Tote Bag"],
  techniques: ["Cucito", "Ricamo", "Upcycling", "Design"],
  skills: [
    "Personalizzazione",
    "Cucito",
    "Design",
    "Upcycling",
    "Moda sostenibile",
  ],
  services: [
    {
      name: "Personalizzazione capi",
      description:
        "Modifica e personalizzazione completa di capi esistenti. Ogni capo viene trasformato in un pezzo unico.",
      price: "Da €30",
    },
    {
      name: "Ricami custom",
      description:
        "Ricami personalizzati su qualsiasi capo. Nomi, loghi, disegni, tutto ciò che puoi immaginare.",
      price: "Da €15",
    },
    {
      name: "Restyling completo",
      description:
        "Trasformazione totale del capo. Tagli, ricostruzioni, aggiunte e modifiche strutturali.",
      price: "Da €60",
    },
  ],
  availableForCustomization: [
    {
      item: "Jeans",
      technique: "Tagli, inserti, ricami e modifiche su misura",
      image: null,
      garmentType: "jeans",
      basePrice: 30,
    },
    {
      item: "T-Shirt",
      technique: "Stampe, tagli, nodi e ricami artigianali",
      image: null,
      garmentType: "tshirt",
      basePrice: 15,
    },
    {
      item: "Hoodie",
      technique: "Cappucci modificati, ricami e applicazioni",
      image: null,
      garmentType: "tshirt",
      basePrice: 25,
    },
  ],
  products: [
    {
      id: "prod-1",
      name: "Custom Denim Jacket",
      image: null,
      gallery: [],
      description:
        "Giacca denim completamente personalizzata con toppe, ricami e modifiche uniche.",
      price: 120,
      status: "available",
    },
    {
      id: "prod-2",
      name: "Tote Bag Ricamata",
      image: null,
      gallery: [],
      description:
        "Tote bag ricamata a mano con design personalizzato a tua scelta.",
      price: 45,
      status: "available",
    },
    {
      id: "prod-3",
      name: "Custom Hoodie",
      image: null,
      gallery: [],
      description:
        "Felpa personalizzata con modifiche uniche e dettagli fatti a mano.",
      price: 90,
      status: "available",
    },
  ],
  portfolio: [
    {
      title: "Progetto Esempio 1",
      description:
        "Un esempio di personalizzazione completa. Mostra qui i tuoi lavori migliori per dare ai clienti un'idea del tuo stile.",
      images: [],
      techniques: ["Cucito", "Ricamo"],
    },
    {
      title: "Progetto Esempio 2",
      description:
        "Un altro progetto che racconta la tua versatilità e la tua capacità di trasformare qualsiasi capo.",
      images: [],
      techniques: ["Upcycling", "Design"],
    },
    {
      title: "Progetto Esempio 3",
      description:
        "Un progetto che mostra la tua tecnica più caratteristica e ciò che ti rende unico.",
      images: [],
      techniques: ["Personalizzazione"],
    },
  ],
  process: [
    {
      title: "Idea",
      description:
        "Raccontami la tua visione. Parliamo di cosa vuoi ottenere, che stile hai in mente e su quale capo lavorare.",
    },
    {
      title: "Progetto",
      description:
        "Definiamo insieme i dettagli: modifiche, tessuti, colori, tecniche. Creiamo un progetto chiaro e condiviso.",
    },
    {
      title: "Personalizzazione",
      description:
        "Metto mano al capo. Ogni taglio, cucitura e dettaglio viene realizzato a mano con attenzione artigianale.",
    },
    {
      title: "Revisione",
      description:
        "Ti mostro il risultato prima della consegna. Eventuali aggiustamenti vengono fatti in questa fase.",
    },
    {
      title: "Consegna",
      description:
        "Il capo è pronto. Spedizione o consegna a mano. Il tuo pezzo unico è finalmente tuo.",
    },
  ],
  reviews: [
    {
      name: "Cliente esempio",
      rating: 5,
      text: "Risultato incredibile, ha trasformato un vecchio capo in un pezzo unico. Professionale, creativo e super disponibile.",
      date: "2025-12-01",
    },
    {
      name: "Another Client",
      rating: 5,
      text: "Great work and attention to detail. Highly recommended for anyone looking for unique custom pieces.",
      date: "2025-11-15",
    },
  ],
  links: {
    instagram: null,
    email: null,
  },
  availableForCommissions: true,
};
