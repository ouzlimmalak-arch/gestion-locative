import { useState } from "react";

function Loyers({ loyers, setLoyers, role, utilisateurConnecte }) {
  const loyersAffiches =
  role === "Locataire"
    ? loyers.filter(
        (loyer) => loyer.locataire === utilisateurConnecte.nom
      )
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
    <h1>Gestion des loyers</h1>

    {role === "Gestionnaire" && (
      <>
        <h2>Ajouter un loyer</h2>

        <div className="formulaire-loyer">
          <input
            type="text"
            placeholder="Nom du locataire"
            value={locataire}
            onChange={(e) => setLocataire(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mois (ex: Novembre 2026)"
            value={mois}
            onChange={(e) => setMois(e.target.value)}
          />

          <input
            type="number"
            placeholder="Montant (DH)"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />

          <select
            value={paye}
            onChange={(e) => setPaye(e.target.value === "true")}
          >
            <option value="false">Impayé</option>
            <option value="true">Payé</option>
          </select>

          <button onClick={ajouterLoyer}>
            {idModification === null
              ? "Ajouter le loyer"
              : "Enregistrer les modifications"}
          </button>
        </div>
      </>
    )}

    <table className="table-loyers">
      <thead>
        <tr>
          <th>Locataire</th>
          <th>Mois</th>
          <th>Montant (MAD)</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {loyersAffiches.map((loyer) => (
          <tr key={loyer.idLoyer}>
            <td>{loyer.locataire}</td>
            <td>{loyer.mois}</td>
            <td>{loyer.montant} DH</td>

            <td className={loyer.paye ? "statut-paye" : "statut-impaye"}>
              {loyer.paye ? "Payé" : "Impayé"}
            </td>

            <td className="actions-loyer">
  {role === "Gestionnaire" && (
    <>
      <button
        className="btn-modifier-loyer"
        onClick={() => modifierLoyer(loyer)}
      >
        Modifier
      </button>

      <button
        className="btn-supprimer-loyer"
        onClick={() => supprimerLoyer(loyer.idLoyer)}
      >
        Supprimer
      </button>
    </>
  )}
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default Loyers;
