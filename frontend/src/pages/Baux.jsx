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
      <h1>Gestion des baux</h1>
      <h2>Ajouter un bail</h2>

      <div className="formulaire-bail">
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />

        <input
          type="date"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Montant du loyer (DH)"
          value={montantLoyer}
          onChange={(e) => setMontantLoyer(e.target.value)}
        />

        <input
          type="number"
          placeholder="ID du bien"
          value={idBien}
          onChange={(e) => setIdBien(e.target.value)}
        />

        <input
          type="number"
          placeholder="ID du locataire"
          value={idLocataire}
          onChange={(e) => setIdLocataire(e.target.value)}
        />

        <button onClick={ajouterBail}>
          {idModification === null
            ? "Ajouter le bail"
            : "Enregistrer les modifications"}
        </button>
      </div>
      <ul>
        {baux.map((bail) => (
          <li key={bail.idBail}>
            Bail N° {bail.idBail} - Début : {bail.dateDebut} - Fin :{" "}
            {bail.dateFin} - Loyer : {bail.montantLoyer} DH
            <div className="actions-bail">
              <button
                className="btn-modifier"
                onClick={() => modifierBail(bail)}
              >
                Modifier
              </button>

              <button
                className="btn-supprimer"
                onClick={() => supprimerBail(bail.idBail)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Baux;
