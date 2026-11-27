import { biens, locataires } from "../data/mockData";
import { Link } from "react-router-dom";

export default function Dashboard({ role, utilisateurConnecte }) {
  console.log("Role actuel :", role);
  const nbBiens = biens.length;
  const nbLocataires = locataires.length;

  return (
    <div className="dashboard">
      

      {role === "Gestionnaire" ? (
        <>
          <section className="dashboard-welcome">
            <div>
              <h2>Bienvenue dans votre espace de gestion</h2>
              <p>
                Gérez facilement vos biens, vos locataires et vos contrats
                de location.
              </p>
            </div>
          </section>

          <section className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-icon">⌂</span>
              <h3>Total des biens</h3>
              <strong>{nbBiens}</strong>
              <p>Biens immobiliers</p>
            </div>

            <div className="stat-card">
              <span className="stat-icon">♟</span>
              <h3>Total des locataires</h3>
              <strong>{nbLocataires}</strong>
              <p>Locataires enregistrés</p>
            </div>
          </section>

          <section className="dashboard-quick">
            <h2>Accès rapide</h2>
            <div className="quick-links">
              <Link to="/biens" className="quick-card">
                <span className="quick-icon">⌂</span>
                <h3>Gestion des biens</h3>
                <p>Consulter et gérer vos biens</p>
              </Link>

              <Link to="/locataires" className="quick-card">
                <span className="quick-icon">♟</span>
                <h3>Gestion des locataires</h3>
                <p>Consulter vos locataires</p>
              </Link>

              <Link to="/baux" className="quick-card">
                <span className="quick-icon">▤</span>
                <h3>Gestion des baux</h3>
                <p>Gérer vos contrats de location</p>
              </Link>

              <Link to="/quittances" className="quick-card">
                <span className="quick-icon">▧</span>
                <h3>Quittances</h3>
                <p>Consulter les quittances</p>
              </Link>
            </div>
          </section>
        </>
      ) : (
        <section className="dashboard-welcome">
          <div>
            <h2>Bienvenue dans votre espace locataire</h2>
            <p>
              Retrouvez les informations concernant votre location depuis votre
              espace personnel.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
