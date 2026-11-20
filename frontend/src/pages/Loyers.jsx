import { useState } from "react";

function Loyers({ loyers, setLoyers, role, utilisateurConnecte }) {
  const loyersAffiches =
    role === "Locataire"
      ? loyers.filter((loyer) => loyer.locataire === utilisateurConnecte.nom)
      : loyers;
  const [locataire, setLocataire] = useState("");
  const [mois, setMois] = useState("");
  const [montant, setMontant] = useState("");
  const [paye, setPaye] = useState(false);
  const [idModification, setIdModification] = useState(null);

  function ajouterLoyer() {
    if (!locataire.trim() || !mois.trim() || !montant) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (Number(montant) <= 0) {
      alert("Le montant doit être supérieur à zéro");
      return;
    }

    if (idModification === null) {
      const nouveauLoyer = {
        idLoyer: loyers.length + 1,
        locataire: locataire,
        mois: mois,
        montant: Number(montant),
        paye: paye,
      };

      setLoyers([...loyers, nouveauLoyer]);
    } else {
      const nouveauxLoyers = loyers.map((loyer) =>
        loyer.idLoyer === idModification
          ? {
              ...loyer,
              locataire: locataire,
              mois: mois,
              montant: Number(montant),
              paye: paye,
            }
          : loyer,
      );

      setLoyers(nouveauxLoyers);
      setIdModification(null);
    }

    setLocataire("");
    setMois("");
    setMontant("");
    setPaye(false);
  }

  function modifierLoyer(loyer) {
    setIdModification(loyer.idLoyer);

    setLocataire(loyer.locataire);
    setMois(loyer.mois);
    setMontant(loyer.montant);
    setPaye(loyer.paye);
  }

  function supprimerLoyer(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce loyer ?",
    );

    if (confirmation) {
      const nouveauxLoyers = loyers.filter((loyer) => loyer.idLoyer !== id);

      setLoyers(nouveauxLoyers);
    }
  }

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des loyers</h1>
        <p>
          {role === "Gestionnaire"
            ? "Suivez les paiements de tous vos locataires."
            : "Retrouvez l'historique de vos loyers."}
        </p>
      </header>

      {role === "Gestionnaire" && (
        <>
          <h2>
            {idModification === null ? "Ajouter un loyer" : "Modifier le loyer"}
          </h2>

          <div
            className={
              "form-card formulaire-loyer" +
              (idModification !== null ? " editing" : "")
            }
          >
            <div className="field">
              <label htmlFor="locataire">Locataire</label>
              <input
                id="locataire"
                type="text"
                placeholder="Nom du locataire"
                value={locataire}
                onChange={(e) => setLocataire(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="mois">Mois</label>
              <input
                id="mois"
                type="text"
                placeholder="Mois (ex: Novembre 2026)"
                value={mois}
                onChange={(e) => setMois(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="montant">Montant (DH)</label>
              <input
                id="montant"
                type="number"
                placeholder="Montant (DH)"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="paye">Statut</label>
              <select
                id="paye"
                value={paye}
                onChange={(e) => setPaye(e.target.value === "true")}
              >
                <option value="false">Impayé</option>
                <option value="true">Payé</option>
              </select>
            </div>

            <button onClick={ajouterLoyer}>
              {idModification === null
                ? "Ajouter le loyer"
                : "Enregistrer les modifications"}
            </button>
          </div>
        </>
      )}

      <div className="table-wrap">
        <table className="table-loyers">
          <thead>
            <tr>
              <th>Locataire</th>
              <th>Mois</th>
              <th className="num">Montant</th>
              <th>Statut</th>
              {role === "Gestionnaire" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {loyersAffiches.map((loyer) => (
              <tr key={loyer.idLoyer}>
                <td>{loyer.locataire}</td>
                <td>{loyer.mois}</td>
                <td className="num">{loyer.montant} DH</td>

                <td>
                  <span className={"badge " + (loyer.paye ? "ok" : "warn")}>
                    {loyer.paye ? "Payé" : "Impayé"}
                  </span>
                </td>

                {role === "Gestionnaire" && (
                  <td>
                    <div className="item-actions actions-loyer">
                      <button
                        className="btn-secondary btn-modifier-loyer"
                        onClick={() => modifierLoyer(loyer)}
                      >
                        Modifier
                      </button>

                      <button
                        className="btn-danger btn-supprimer-loyer"
                        onClick={() => supprimerLoyer(loyer.idLoyer)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loyersAffiches.length === 0 && (
        <p className="empty">Aucun loyer à afficher.</p>
      )}
    </div>
  );
}

export default Loyers;
