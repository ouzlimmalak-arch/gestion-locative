import { useState } from "react";

function Biens() {
  const [biens, setBiens] = useState([
    {
      idBien: 1,
      adresse: "Agadir, Talborjt",
      type: "Appartement",
    },
    {
      idBien: 2,
      adresse: "Agadir, Hay Mohammadi",
      type: "Maison",
    },
    {
      idBien: 3,
      adresse: "Agadir, Founty",
      type: "Studio",
    },
  ]);
  const [adresse, setAdresse] = useState("");
  const [type, setType] = useState("");
  const [idModification, setIdModification] = useState(null);

  function ajouterBien() {
    if (adresse === "" || type === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (idModification === null) {
      const nouveauBien = {
        idBien: biens.length + 1,
        adresse: adresse,
        type: type,
      };

      setBiens([...biens, nouveauBien]);
    } else {
      const nouveauxBiens = biens.map((bien) => {
        if (bien.idBien === idModification) {
          return {
            ...bien,
            adresse: adresse,
            type: type,
          };
        }

        return bien;
      });

      setBiens(nouveauxBiens);
      setIdModification(null);
    }

    setAdresse("");
    setType("");
  }

  function modifierBien(bien) {
    setIdModification(bien.idBien);
    setAdresse(bien.adresse);
    setType(bien.type);
  }

  function supprimerBien(id) {
    const nouveauxBiens = biens.filter((bien) => {
      return bien.idBien !== id;
    });

    setBiens(nouveauxBiens);
  }

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des biens</h1>
        <p>Les logements de votre parc locatif.</p>
      </header>

      <h2>{idModification === null ? "Ajouter un bien" : "Modifier le bien"}</h2>
      <div className={"form-card" + (idModification !== null ? " editing" : "")}>
        <div className="field">
          <label htmlFor="adresse">Adresse</label>
          <input
            id="adresse"
            type="text"
            placeholder="Adresse du bien"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="type">Type</label>
          <input
            id="type"
            type="text"
            placeholder="Type du bien"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <button onClick={ajouterBien}>
          {idModification === null ? "Ajouter" : "Enregistrer"}
        </button>
      </div>

      <ul className="item-list liste-biens">
        {biens.map((bien) => (
          <li key={bien.idBien} className="item bien-item">
            <div className="item-main">
              <strong>{bien.adresse}</strong>
              <span>{bien.type}</span>
            </div>

            <div className="item-actions">
              <button className="btn-secondary" onClick={() => modifierBien(bien)}>
                Modifier
              </button>

              <button className="btn-danger" onClick={() => supprimerBien(bien.idBien)}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {biens.length === 0 && <p className="empty">Aucun bien pour le moment.</p>}
    </div>
  );
}

export default Biens;
