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
  function ajouterLocataire(locataire) {
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
      <h1>Gestion des locataires</h1>
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />

      <input
        type="text"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />

      <button onClick={ajouterLocataire}>Ajouter</button>
      <ul className="liste-locataires">
        {locataires.map((locataire) => (
          <li key={locataire.idLocataire} className="locataire-item">
            <span>
              {locataire.nom} {locataire.prenom} - {locataire.telephone}
            </span>

            <button onClick={() => modifierLocataire(locataire)}>
              Modifier
            </button>

            <button onClick={() => supprimerLocataire(locataire.idLocataire)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locataires;
