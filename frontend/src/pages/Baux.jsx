import { useState } from "react";

function Baux() {
  const [baux, setBaux] = useState([
    {
      idBail: 1,
      dateDebut: "2026-01-01",
      dateFin: "2026-12-31",
      montantLoyer: 2500,
      idBien: 1,
      idLocataire: 1,
    },
    {
      idBail: 2,
      dateDebut: "2026-02-01",
      dateFin: "2027-01-31",
      montantLoyer: 3000,
      idBien: 2,
      idLocataire: 2,
    },
  ]);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [montantLoyer, setMontantLoyer] = useState("");
  const [idBien, setIdBien] = useState("");
  const [idLocataire, setIdLocataire] = useState("");
  const [idModification, setIdModification] = useState(null);

  function ajouterBail() {
    if (!dateDebut || !dateFin || !montantLoyer || !idBien || !idLocataire) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (idModification === null) {
      const nouveauBail = {
        idBail: baux.length + 1,
        dateDebut: dateDebut,
        dateFin: dateFin,
        montantLoyer: Number(montantLoyer),
        idBien: Number(idBien),
        idLocataire: Number(idLocataire),
      };

      setBaux([...baux, nouveauBail]);
    } else {
      const nouveauxBaux = baux.map((bail) =>
        bail.idBail === idModification
          ? {
              ...bail,
              dateDebut: dateDebut,
              dateFin: dateFin,
              montantLoyer: Number(montantLoyer),
              idBien: Number(idBien),
              idLocataire: Number(idLocataire),
            }
          : bail,
      );

      setBaux(nouveauxBaux);
      setIdModification(null);
    }

    setDateDebut("");
    setDateFin("");
    setMontantLoyer("");
    setIdBien("");
    setIdLocataire("");
  }

  function modifierBail(bail) {
    setIdModification(bail.idBail);

    setDateDebut(bail.dateDebut);
    setDateFin(bail.dateFin);
    setMontantLoyer(bail.montantLoyer);
    setIdBien(bail.idBien);
    setIdLocataire(bail.idLocataire);
  }

  function supprimerBail(id) {
    const nouveauxBaux = baux.filter((bail) => bail.idBail !== id);

    setBaux(nouveauxBaux);
  }

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

