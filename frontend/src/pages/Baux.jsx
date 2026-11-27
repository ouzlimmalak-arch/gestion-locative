import { useState, useEffect } from "react";
import {
  getBaux,
  ajouterBailAPI,
  modifierBailAPI,
  supprimerBailAPI,
} from "../services/api";

function Baux({ utilisateurConnecte }) {
  const [baux, setBaux] = useState([]);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [montantLoyer, setMontantLoyer] = useState("");
  const [idBien, setIdBien] = useState("");
  const [idLocataire, setIdLocataire] = useState("");
  const [idModification, setIdModification] = useState(null);
  useEffect(() => {
  const chargerBaux = async () => {
    try {
      const data = await getBaux(utilisateurConnecte.token);
      setBaux(
  data.map((bail) => ({
    ...bail,
    idBail: bail.id,
    idBien: bail.bien_id,
    idLocataire: bail.locataire_id,
  }))
);
    } catch (error) {
      alert("Erreur lors du chargement des baux");
    }
  };

  chargerBaux();
}, [utilisateurConnecte]);

  const ajouterBail = async () => {
  try {
    const nouveauBail = {
      dateDebut,
      dateFin,
      montantLoyer,
      idBien,
      idLocataire,
    };

    if (idModification !== null) {
      const bailModifie = await modifierBailAPI(
        idModification,
        nouveauBail,
        utilisateurConnecte.token
      );

      setBaux(
        baux.map((bail) =>
          bail.idBail === idModification
            ? {
                ...bailModifie,
                idBail: bailModifie.id,
                idBien: bailModifie.bien_id,
                idLocataire: bailModifie.locataire_id,
              }
            : bail
        )
      );
    } else {
      const bailAjoute = await ajouterBailAPI(
        nouveauBail,
        utilisateurConnecte.token
      );

      setBaux([
        ...baux,
        {
          ...bailAjoute,
          idBail: bailAjoute.id,
          idBien: bailAjoute.bien_id,
          idLocataire: bailAjoute.locataire_id,
        },
      ]);
    }

    setDateDebut("");
    setDateFin("");
    setMontantLoyer("");
    setIdBien("");
    setIdLocataire("");
    setIdModification(null);
  } catch (error) {
    alert("Erreur lors de l'enregistrement du bail");
  }
};

  function modifierBail(bail) {
    setIdModification(bail.idBail);

    setDateDebut(bail.dateDebut);
    setDateFin(bail.dateFin);
    setMontantLoyer(bail.montantLoyer);
    setIdBien(bail.idBien);
    setIdLocataire(bail.idLocataire);
  }

  const supprimerBail = async (id) => {
  try {
    await supprimerBailAPI(id, utilisateurConnecte.token);

    setBaux(baux.filter((bail) => bail.idBail !== id));
  } catch (error) {
    alert("Erreur lors de la suppression du bail");
  }
};

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des baux</h1>
        <p>Les contrats qui lient un bien à un locataire.</p>
      </header>

      <h2>{idModification === null ? "Ajouter un bail" : "Modifier le bail"}</h2>
      <div
        className={
          "form-card formulaire-bail" + (idModification !== null ? " editing" : "")
        }
      >
        <div className="field">
          <label htmlFor="dateDebut">Date de début</label>
          <input
            id="dateDebut"
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="dateFin">Date de fin</label>
          <input
            id="dateFin"
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="montantLoyer">Loyer (DH)</label>
          <input
            id="montantLoyer"
            type="number"
            placeholder="Montant du loyer (DH)"
            value={montantLoyer}
            onChange={(e) => setMontantLoyer(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="idBien">N° du bien</label>
          <input
            id="idBien"
            type="number"
            placeholder="ID du bien"
            value={idBien}
            onChange={(e) => setIdBien(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="idLocataire">N° du locataire</label>
          <input
            id="idLocataire"
            type="number"
            placeholder="ID du locataire"
            value={idLocataire}
            onChange={(e) => setIdLocataire(e.target.value)}
          />
        </div>

        <button onClick={ajouterBail}>
          {idModification === null
            ? "Ajouter le bail"
            : "Enregistrer les modifications"}
        </button>
      </div>

      <ul className="item-list">
        {baux.map((bail) => (
          <li key={bail.idBail} className="item">
            <div className="item-main">
              <strong>Bail N° {bail.idBail}</strong>
              <span>
                Du {bail.dateDebut} au {bail.dateFin}
              </span>
              <span>
                Bien n° {bail.idBien}, locataire n° {bail.idLocataire}
              </span>
            </div>

            <span className="item-amount">{bail.montantLoyer} DH</span>

            <div className="item-actions actions-bail">
              <button className="btn-secondary" onClick={() => modifierBail(bail)}>
                Modifier
              </button>

              <button
                className="btn-danger"
                onClick={() => supprimerBail(bail.idBail)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {baux.length === 0 && <p className="empty">Aucun bail pour le moment.</p>}
    </div>
  );
}

export default Baux;

