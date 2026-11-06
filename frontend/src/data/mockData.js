export const biens = [
  {
    id: 1,
    adresse: "12 Rue Hassan II, Agadir",
    type: "Appartement",
    loyer: 3500,
  },
  { id: 2, adresse: "5 Avenue des FAR, Agadir", type: "Studio", loyer: 2200 },
  { id: 3, adresse: "27 Rue Al Massira, Inezgane", type: "Villa", loyer: 6000 },
];

export const locataires = [
  { id: 1, nom: "Youssef Amrani", telephone: "0612345678", bienId: 1 },
  { id: 2, nom: "Salma Benali", telephone: "0623456789", bienId: 2 },
  { id: 3, nom: "Karim Oujdi", telephone: "0634567890", bienId: 3 },
];

export const loyers = [
  { id: 1, locataireId: 1, mois: "Octobre 2026", montant: 3500, paye: true },
  { id: 2, locataireId: 2, mois: "Octobre 2026", montant: 2200, paye: false },
  { id: 3, locataireId: 3, mois: "Octobre 2026", montant: 6000, paye: true },
];
