import { useState } from "react";

function Locataires() {
  const [locataires, setLocataires] = useState([
    {
      idLocataire: 1,
      nom: "Alami",
      prenom: "Alaa",
      telephone: "0612023456",
    },
    {
      idLocataire: 2,
      nom: "Bennani",
      prenom: "Youssef",
      telephone: "0623876543",
    },
    {
      idLocataire: 3,
      nom: "Idrissi",
      prenom: "Amine",
      telephone: "0698765432",
    },
  ]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [idModification, setIdModification] = useState(null);

  function ajouterLocataire() {
    if (idModification === null) {
      const nouveauLocataire = {
        idLocataire: locataires.length + 1,
        nom: nom,
        prenom: prenom,
        telephone: telephone,
      };

      setLocataires([...locataires, nouveauLocataire]);
    } else {
      const nouveauxLocataires = locataires.map((locataire) => {
        if (locataire.idLocataire === idModification) {
          return {
            ...locataire,
            nom: nom,
            prenom: prenom,
            telephone: telephone,
          };
        }

        return locataire;
      });

      setLocataires(nouveauxLocataires);
      setIdModification(null);
    }

    setNom("");
    setPrenom("");
    setTelephone("");
  }

  function modifierLocataire(locataire) {
    setIdModification(locataire.idLocataire);

    setNom(locataire.nom);
    setPrenom(locataire.prenom);
    setTelephone(locataire.telephone);
  }

  function supprimerLocataire(id) {
    const nouveauxLocataires = locataires.filter((locataire) => {
      return locataire.idLocataire !== id;
    });

    setLocataires(nouveauxLocataires);
  }

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des locataires</h1>
        <p>Les personnes qui occupent vos biens.</p>
      </header>

      <h2>
        {idModification === null ? "Ajouter un locataire" : "Modifier le locataire"}
      </h2>
      <div className={"form-card" + (idModification !== null ? " editing" : "")}>
        <div className="field">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="telephone">Téléphone</label>
          <input
            id="telephone"
            type="text"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <button onClick={ajouterLocataire}>
          {idModification === null ? "Ajouter" : "Enregistrer"}
        </button>
      </div>

      <ul className="item-list liste-locataires">
        {locataires.map((locataire) => (
          <li key={locataire.idLocataire} className="item locataire-item">
            <div className="item-main">
              <strong>
                {locataire.nom} {locataire.prenom}
              </strong>
              <span>{locataire.telephone}</span>
            </div>

            <div className="item-actions">
              <button
                className="btn-secondary"
                onClick={() => modifierLocataire(locataire)}
              >
                Modifier
              </button>

              <button
                className="btn-danger"
                onClick={() => supprimerLocataire(locataire.idLocataire)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {locataires.length === 0 && (
        <p className="empty">Aucun locataire pour le moment.</p>
      )}
    </div>
  );
}

export default Locataires;