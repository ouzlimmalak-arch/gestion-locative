const API_URL = "http://127.0.0.1:8000/api";
export const getBiens = async (token) => {
  const response = await fetch(`${API_URL}/biens`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des biens");
  }

  return await response.json();
};
export const login = async (email, motDePasse) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: motDePasse,
    }),
  });

  if (!response.ok) {
    throw new Error("Email ou mot de passe incorrect");
  }

  return await response.json();
};
export const register = async (nom, email, motDePasse, role) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nom,
      email: email,
      password: motDePasse,
      role: role,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'inscription");
  }

  return await response.json();
};
export const ajouterBienAPI = async (bien, token) => {
  const response = await fetch(`${API_URL}/biens`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      adresse: bien.adresse,
      type: bien.type,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du bien");
  }

  return await response.json();
};
export const modifierBienAPI = async (id, bien, token) => {
  const response = await fetch(`${API_URL}/biens/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      adresse: bien.adresse,
      type: bien.type,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification du bien");
  }

  return await response.json();
};
export const supprimerBienAPI = async (id, token) => {
  const response = await fetch(`${API_URL}/biens/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du bien");
  }
};
export const getLocataires = async (token) => {
  const response = await fetch(`${API_URL}/locataires`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des locataires");
  }

  return await response.json();
};
export const ajouterLocataireAPI = async (locataire, token) => {
  const response = await fetch(`${API_URL}/locataires`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(locataire),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du locataire");
  }

  return await response.json();
};
export const modifierLocataireAPI = async (id, locataire, token) => {
  const response = await fetch(`${API_URL}/locataires/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(locataire),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification du locataire");
  }

  return await response.json();
};
export const supprimerLocataireAPI = async (id, token) => {
  const response = await fetch(`${API_URL}/locataires/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du locataire");
  }
};
export const getBaux = async (token) => {
  const response = await fetch(`${API_URL}/baux`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des baux");
  }

  return await response.json();
};

export const ajouterBailAPI = async (bail, token) => {
  const response = await fetch(`${API_URL}/baux`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      dateDebut: bail.dateDebut,
      dateFin: bail.dateFin,
      montantLoyer: bail.montantLoyer,
      bien_id: bail.idBien,
      locataire_id: bail.idLocataire,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du bail");
  }

  return await response.json();
};

export const modifierBailAPI = async (id, bail, token) => {
  const response = await fetch(`${API_URL}/baux/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      dateDebut: bail.dateDebut,
      dateFin: bail.dateFin,
      montantLoyer: bail.montantLoyer,
      bien_id: bail.idBien,
      locataire_id: bail.idLocataire,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification du bail");
  }

  return await response.json();
};

export const supprimerBailAPI = async (id, token) => {
  const response = await fetch(`${API_URL}/baux/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du bail");
  }
};
export const getQuittances = async (token) => {
  const response = await fetch(`${API_URL}/quittances`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des quittances");
  }

  return await response.json();
};
export const ajouterQuittanceAPI = async (quittance, token) => {
  const response = await fetch(`${API_URL}/quittances`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      dateEmission: quittance.dateEmission,
      montant: quittance.montant,
      bail_id: quittance.bail_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la quittance");
  }

  return await response.json();
};
export const modifierQuittanceAPI = async (id, quittance, token) => {
  const response = await fetch(`${API_URL}/quittances/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      dateEmission: quittance.dateEmission,
      montant: quittance.montant,
      bail_id: quittance.bail_id,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la modification de la quittance");
  }

  return await response.json();
};
export const supprimerQuittanceAPI = async (id, token) => {
  const response = await fetch(`${API_URL}/quittances/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la quittance");
  }

  return await response.json();
};
