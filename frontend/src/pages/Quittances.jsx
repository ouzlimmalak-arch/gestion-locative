
import { useState } from "react";
import { ajouterQuittanceAPI, supprimerQuittanceAPI } from "../services/api";

function Quittances({ quittances, setQuittances, role, utilisateurConnecte }) {
  const [formVisible, setFormVisible] = useState(false);
  const [quittanceSelectionnee, setQuittanceSelectionnee] = useState(null);

  const [nouvelleQuittance, setNouvelleQuittance] = useState({
    dateEmission: "",
    montant: "",
    bail_id: "",
  });

  const handleChange = (e) => {
    setNouvelleQuittance({
      ...nouvelleQuittance,
      [e.target.name]: e.target.value,
    });
  };

  const handleAjouterQuittance = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = await ajouterQuittanceAPI(nouvelleQuittance, token);

      setQuittances([...quittances, data]);

      setNouvelleQuittance({
        dateEmission: "",
        montant: "",
        bail_id: "",
      });

      setFormVisible(false);

      alert("Quittance ajoutée avec succès !");
    } catch (error) {
      alert("Erreur lors de l'ajout de la quittance.");
    }
  };

  const supprimerQuittance = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette quittance ?",
    );

    if (confirmation) {
      try {
        const token = localStorage.getItem("token");

        await supprimerQuittanceAPI(id, token);

        setQuittances(
          quittances.filter((quittance) => quittance.id !== id),
        );

        if (quittanceSelectionnee?.id === id) {
          setQuittanceSelectionnee(null);
        }

        alert("Quittance supprimée avec succès !");
      } catch (error) {
        alert("Erreur lors de la suppression de la quittance.");
      }
    }
  };

  const moisQuittance = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  };

  const loyer = Number(quittanceSelectionnee?.bail?.montantLoyer || 0);
  const charges = 0;
  const total = loyer + charges;

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des quittances</h1>
        <p>Une quittance est émise pour chaque loyer payé.</p>
      </header>

      {role === "Gestionnaire" && (
        <>
          <button
            className="btn-primary"
            onClick={() => setFormVisible(!formVisible)}
          >
            + Ajouter une quittance
          </button>

          {formVisible && (
            <form onSubmit={handleAjouterQuittance} className="form-ajout">
              <div className="field">
                <label>Date d'émission :</label>
                <input
                  type="date"
                  name="dateEmission"
                  value={nouvelleQuittance.dateEmission}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Montant (DH) :</label>
                <input
                  type="number"
                  name="montant"
                  value={nouvelleQuittance.montant}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>ID du bail :</label>
                <input
                  type="number"
                  name="bail_id"
                  value={nouvelleQuittance.bail_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Enregistrer
              </button>
            </form>
          )}
        </>
      )}

      {/* Détails de la quittance sélectionnée */}
      {quittanceSelectionnee && (
        <div className="details-quittance">
          <h2>Détails de la quittance</h2>

          <p>
            <strong>Mois :</strong>{" "}
            {moisQuittance(quittanceSelectionnee.dateEmission)}
          </p>

          <p>
            <strong>Locataire :</strong>{" "}
            {quittanceSelectionnee.bail?.locataire?.nom}{" "}
            {quittanceSelectionnee.bail?.locataire?.prenom}
          </p>

          <p>
            <strong>Bien :</strong>{" "}
            {quittanceSelectionnee.bail?.bien?.type} —{" "}
            {quittanceSelectionnee.bail?.bien?.adresse}
          </p>

          <p>
            <strong>Loyer :</strong> {loyer.toLocaleString("fr-FR")} DH
          </p>

          <p>
            <strong>Charges :</strong> {charges.toLocaleString("fr-FR")} DH
          </p>

          <h3>
            Total payé : {total.toLocaleString("fr-FR")} DH
          </h3>
        </div>
      )}

      {/* Liste des quittances */}
      <div className="table-wrap">
        <table className="table-quittances">
          <thead>
            <tr>
              <th>N° Quittance</th>
              <th>Locataire</th>
              <th>Bien</th>
              <th>Mois</th>
              <th className="num">Montant (DH)</th>
              {role === "Gestionnaire" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {quittances.map((quittance) => (
              <tr
                key={quittance.id}
                onClick={() => setQuittanceSelectionnee(quittance)}
                className={
                  quittanceSelectionnee?.id === quittance.id
                    ? "quittance-active"
                    : ""
                }
              >
                <td>Q-{quittance.id}</td>

                <td>
                  {quittance.bail?.locataire?.nom}{" "}
                  {quittance.bail?.locataire?.prenom}
                </td>

                <td>
                  {quittance.bail?.bien?.type} —{" "}
                  {quittance.bail?.bien?.adresse}
                </td>

                <td>{moisQuittance(quittance.dateEmission)}</td>

                <td className="num">
                  {Number(quittance.montant).toLocaleString("fr-FR")}
                </td>

                {role === "Gestionnaire" && (
                  <td>
                    <button
                      className="btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        supprimerQuittance(quittance.id);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {quittances.length === 0 && (
        <p className="empty">Aucune quittance pour le moment.</p>
      )}
    </div>
  );
}

export default Quittances;
