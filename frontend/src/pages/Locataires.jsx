import { useState, useEffect } from "react";
import {
  getLocataires,
  ajouterLocataireAPI,
  modifierLocataireAPI,
  supprimerLocataireAPI,
} from "../services/api";

function Locataires({ utilisateurConnecte }) {
  const [locataires, setLocataires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [idModification, setIdModification] = useState(null);
  useEffect(() => {
  getLocataires(utilisateurConnecte.token)
    .then((data) => {
      setLocataires(
        data.map((locataire) => ({
          ...locataire,
          idLocataire: locataire.id,
        }))
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setChargement(false);
    });
}, [utilisateurConnecte]);
async function ajouterLocataire() {
  if (idModification === null) {
    const nouveauLocataire = {
  nom: nom,
  prenom: prenom,
  telephone: telephone,
};

    try {
      const data = await ajouterLocataireAPI(
        nouveauLocataire,
        utilisateurConnecte.token
      );

      setLocataires([
        ...locataires,
        {
          ...data,
          idLocataire: data.id,
        },
      ]);

      alert("Locataire ajouté avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout du locataire !");
    }
  } else {
const locataireModifie = {
  nom: nom,
  prenom: prenom,
  telephone: telephone,
};
  try {
    const data = await modifierLocataireAPI(
      idModification,
      locataireModifie,
      utilisateurConnecte.token
    );

    const nouveauxLocataires = locataires.map((locataire) => {
      if (locataire.idLocataire === idModification) {
        return {
          ...data,
          idLocataire: data.id,
        };
      }
      return locataire;
    });

    setLocataires(nouveauxLocataires);
    setIdModification(null);

    alert("Locataire modifié avec succès !");
  } catch (error) {
    console.log(error);
    alert("Erreur lors de la modification du locataire !");
  }
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

async function supprimerLocataire(id) {
  try {
    await supprimerLocataireAPI(id, utilisateurConnecte.token);

    const nouveauxLocataires = locataires.filter((locataire) => {
      return locataire.idLocataire !== id;
    });

    setLocataires(nouveauxLocataires);

    alert("Locataire supprimé avec succès !");
  } catch (error) {
    console.log(error);
    alert("Erreur lors de la suppression du locataire !");
  }
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
  {chargement ? (
    <li>Chargement des locataires...</li>
  ) : (
    locataires.map((locataire) => (
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
    ))
  )}
</ul>
      {locataires.length === 0 && (
        <p className="empty">Aucun locataire pour le moment.</p>
      )}
    </div>
  );
}

export default Locataires;