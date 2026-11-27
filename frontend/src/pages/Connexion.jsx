
import React, { useState } from "react";
import Logo from "../components/Logo";
import { login, register } from "../services/api";
import loginBg from "../images/login-bg.png";

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

  

  // Modifier les champs de connexion
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Modifier les champs d'inscription
  const handleInscriptionChange = (e) => {
    setInscription({
      ...inscription,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnexion = async (e) => {
  e.preventDefault();

  try {
    const data = await login(form.email, form.motDePasse);

    onConnexion(data.user.role, {
      ...data.user,
      token: data.token,
    });
  } catch (error) {
    alert("Email ou mot de passe incorrect !");
  }
};

  
  const handleInscription = async (e) => {
  e.preventDefault();

  if (inscription.motDePasse !== inscription.confirmation) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    await register(
      inscription.nom,
      inscription.email,
      inscription.motDePasse,
      inscription.role
    );

    setForm({
      email: inscription.email,
      motDePasse: "",
    });

    setMode("connexion");

    alert("Inscription réussie ! Vous pouvez vous connecter.");
  } catch (error) {
    alert("Erreur lors de l'inscription. Vérifiez vos informations.");
  }
 };

  return (
    <div className="auth">

      {/* Partie gauche */}
      <aside
  className="auth-brand"
  style={{ backgroundImage: `url(${loginBg})` }}
>
        <div className="brand-content">
          <span className="brand-label">
            VOTRE ESPACE IMMOBILIER
          </span>

          <h1>
            Gérez vos locations
            <br />
            en toute simplicité.
          </h1>

          <p className="brand-description">
            Une plateforme simple et pratique pour organiser
            vos biens, vos locataires et vos locations au même endroit.
          </p>

          <div className="brand-features">
            <div className="brand-feature">
              <span className="feature-icon">⌂</span>
              <span>Gestion des biens immobiliers</span>
            </div>

            <div className="brand-feature">
              <span className="feature-icon">✓</span>
              <span>Suivi des loyers et des paiements</span>
            </div>

            <div className="brand-feature">
              <span className="feature-icon">▤</span>
              <span>Organisation des quittances</span>
            </div>
          </div>
        </div>

        <div className="brand-decoration">
          <span>GESTION LOCATIVE</span>
          <span>Un espace, une gestion simplifiée.</span>
        </div>
      </aside>

      {/* Partie droite */}
      <main className="auth-panel">
        <div className="auth-form">

          {/* Logo */}
          <div className="auth-logo">
            <Logo />
          </div>

          {/* Choix connexion ou inscription */}
          <div className="tabs">
            <button
              type="button"
              className={mode === "connexion" ? "on" : ""}
              onClick={() => setMode("connexion")}
            >
              Se connecter
            </button>

            <button
              type="button"
              className={mode === "inscription" ? "on" : ""}
              onClick={() => setMode("inscription")}
            >
              S'inscrire
            </button>
          </div>

          {/* Formulaire de connexion */}
          {mode === "connexion" ? (
            <form onSubmit={handleConnexion}>
              <h2>Connexion</h2>

              <p className="hint">
                Accédez à votre espace.
              </p>

              <div className="field">
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="motDePasse">Mot de passe :</label>
                <input
                  id="motDePasse"
                  type="password"
                  name="motDePasse"
                  value={form.motDePasse}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>

              <button type="submit" className="submit">
                Se connecter
              </button>
            </form>
          ) : (

            /* Formulaire d'inscription */
            <form onSubmit={handleInscription}>
              <h2>Créer un compte</h2>

              <p className="hint">
                Quelques informations suffisent.
              </p>

              <div className="field">
                <label htmlFor="nom">Nom complet :</label>
                <input
                  id="nom"
                  type="text"
                  name="nom"
                  value={inscription.nom}
                  onChange={handleInscriptionChange}
                  placeholder="Entrez votre nom"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="role">Type de compte :</label>
                <select
                  id="role"
                  name="role"
                  value={inscription.role}
                  onChange={handleInscriptionChange}
                >
                  <option value="Locataire">Locataire</option>
                  <option value="Gestionnaire">Gestionnaire</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="emailInscription">Email :</label>
                <input
                  id="emailInscription"
                  type="email"
                  name="email"
                  value={inscription.email}
                  onChange={handleInscriptionChange}
                  placeholder="Entrez votre email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="motDePasseInscription">
                  Mot de passe :
                </label>
                <input
                  id="motDePasseInscription"
                  type="password"
                  name="motDePasse"
                  value={inscription.motDePasse}
                  onChange={handleInscriptionChange}
                  placeholder="Créer un mot de passe"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="confirmation">
                  Confirmer le mot de passe :
                </label>
                <input
                  id="confirmation"
                  type="password"
                  name="confirmation"
                  value={inscription.confirmation}
                  onChange={handleInscriptionChange}
                  placeholder="Confirmer le mot de passe"
                  required
                />
              </div>

              <button type="submit" className="submit">
                S'inscrire
              </button>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}

export default Connexion;
