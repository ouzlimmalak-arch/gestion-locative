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
      <h1>Gestion des biens</h1>
      <input
        type="text"
        placeholder="Adresse du bien"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
      />

      <input
        type="text"
        placeholder="Type du bien"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <button onClick={ajouterBien}>Ajouter</button>
      <ul className="liste-biens">
        {biens.map((bien) => (
          <li key={bien.idBien} className="bien-item">
            <span>
              {bien.adresse} - {bien.type}
            </span>

            <button onClick={() => modifierBien(bien)}>Modifier</button>

            <button onClick={() => supprimerBien(bien.idBien)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Biens;
