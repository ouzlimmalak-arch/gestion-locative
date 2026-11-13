
import React, { useState } from "react";

function Connexion({ onConnexion }) {
  const [mode, setMode] = useState("connexion");

  const [form, setForm] = useState({
    email: "",
    motDePasse: "",
  });

  const [inscription, setInscription] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    confirmation: "",
    role: "Locataire",
  });

  const [utilisateurInscrit, setUtilisateurInscrit] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleInscriptionChange = (e) => {
    setInscription({
      ...inscription,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnexion = (e) => {
    e.preventDefault();

if (
  form.email === "gestionnaire@gmail.com" &&
  form.motDePasse === "1234"
) {
  onConnexion("Gestionnaire");
} else if (
  utilisateurInscrit &&
  form.email === utilisateurInscrit.email &&
  form.motDePasse === utilisateurInscrit.motDePasse
) {
  onConnexion(utilisateurInscrit.role, utilisateurInscrit);
} else {
  alert("Email ou mot de passe incorrect !");
}
  };

  const handleInscription = (e) => {
    e.preventDefault();

    if (inscription.motDePasse !== inscription.confirmation) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    setUtilisateurInscrit({
      nom: inscription.nom,
      email: inscription.email,
      motDePasse: inscription.motDePasse,
       role: inscription.role,
    });

    setForm({
      email: inscription.email,
      motDePasse: "",
    });

    setMode("connexion");
    alert("Inscription réussie ! Vous pouvez vous connecter.");
  };

  return (
    <div className="page-connexion">
      <h2>Gestion locative</h2>

      <div>
        <button onClick={() => setMode("connexion")}>
          Se connecter
        </button>

        <button onClick={() => setMode("inscription")}>
          S'inscrire
        </button>
      </div>

      {mode === "connexion" ? (
        <form onSubmit={handleConnexion}>
          <h3>Connexion</h3>

          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            name="motDePasse"
            value={form.motDePasse}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe"
            required
          />

          <button type="submit">Se connecter</button>
        </form>
      ) : (
        <form onSubmit={handleInscription}>
          <h3>Créer un compte</h3>

          <label>Nom complet :</label>
          <input
            type="text"
            name="nom"
            value={inscription.nom}
            onChange={handleInscriptionChange}
            placeholder="Entrez votre nom"
            required
          />
          <label>Type de compte :</label>
           <select
            name="role"
            value={inscription.role}
            onChange={handleInscriptionChange}
           >
           <option value="Locataire">Locataire</option>
           <option value="Gestionnaire">Gestionnaire</option>
          </select>

          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={inscription.email}
            onChange={handleInscriptionChange}
            placeholder="Entrez votre email"
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            name="motDePasse"
            value={inscription.motDePasse}
            onChange={handleInscriptionChange}
            placeholder="Créer un mot de passe"
            required
          />

          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            name="confirmation"
            value={inscription.confirmation}
            onChange={handleInscriptionChange}
            placeholder="Confirmer le mot de passe"
            required
          />

          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
}

export default Connexion;
