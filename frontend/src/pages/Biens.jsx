
import { useState, useEffect } from "react";
import {
  getBiens,
  ajouterBienAPI,
  modifierBienAPI,
  supprimerBienAPI,
} from "../services/api";

function Biens({ utilisateurConnecte }) {
  const [biens, setBiens] = useState([]);
  const [adresse, setAdresse] = useState("");
  const [type, setType] = useState("");
  const [idModification, setIdModification] = useState(null);

  useEffect(() => {
    getBiens(utilisateurConnecte.token)
      .then((data) => {
        setBiens(
          data.map((bien) => ({
            ...bien,
            idBien: bien.id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [utilisateurConnecte]);

  async function ajouterBien() {
    if (adresse === "" || type === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (idModification === null) {
      try {
        const nouveauBien = {
          adresse: adresse,
          type: type,
        };

        const data = await ajouterBienAPI(
          nouveauBien,
          utilisateurConnecte.token
        );

        setBiens([
          ...biens,
          {
            ...data,
            idBien: data.id,
          },
        ]);

        alert("Bien ajouté avec succès !");
      } catch (error) {
        console.log(error);
        alert("Erreur lors de l'ajout du bien !");
        return;
      }
    } else {
      try {
        const bienModifie = {
          adresse: adresse,
          type: type,
        };

        const data = await modifierBienAPI(
          idModification,
          bienModifie,
          utilisateurConnecte.token
        );

        const nouveauxBiens = biens.map((bien) => {
          if (bien.idBien === idModification) {
            return {
              ...data,
              idBien: data.id,
            };
          }

          return bien;
        });

        setBiens(nouveauxBiens);
        setIdModification(null);

        alert("Bien modifié avec succès !");
      } catch (error) {
        console.log(error);
        alert("Erreur lors de la modification du bien !");
        return;
      }
    }

    setAdresse("");
    setType("");
  }

  function modifierBien(bien) {
    setIdModification(bien.idBien);
    setAdresse(bien.adresse);
    setType(bien.type);
  }

  async function supprimerBien(id) {
    try {
      await supprimerBienAPI(id, utilisateurConnecte.token);

      const nouveauxBiens = biens.filter((bien) => {
        return bien.idBien !== id;
      });

      setBiens(nouveauxBiens);

      alert("Bien supprimé avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la suppression du bien !");
    }
  }

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des biens</h1>
        <p>Les logements de votre parc locatif.</p>
      </header>

      <h2>
        {idModification === null ? "Ajouter un bien" : "Modifier le bien"}
      </h2>

      <div
        className={
          "form-card" + (idModification !== null ? " editing" : "")
        }
      >
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
          <label htmlFor="type">Type de logement</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Choisir un type</option>
            <option value="Appartement">Appartement</option>
            <option value="Studio">Studio</option>
            <option value="Maison">Maison</option>
            <option value="Villa">Villa</option>
            <option value="Duplex">Duplex</option>
          </select>
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
              <button
                className="btn-secondary"
                onClick={() => modifierBien(bien)}
              >
                Modifier
              </button>

              <button
                className="btn-danger"
                onClick={() => supprimerBien(bien.idBien)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {biens.length === 0 && (
        <p className="empty">Aucun bien pour le moment.</p>
      )}
    </div>
  );
}

export default Biens;
