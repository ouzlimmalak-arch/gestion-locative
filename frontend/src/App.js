import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Biens from "./pages/Biens";
import Locataires from "./pages/Locataires";
import Loyers from "./pages/Loyers";
import Quittances from "./pages/Quittances";
import Baux from "./pages/Baux";
import Connexion from "./pages/Connexion";
import Logo from "./components/Logo";

function App() {
  const [connecte, setConnecte] = useState(false);
  const [role, setRole] = useState("");
  const [utilisateurConnecte, setUtilisateurConnecte] = useState(null);

  const [loyers, setLoyers] = useState([
    {
      idLoyer: 1,
      locataire: "Youssef Amrani",
      bien: "Agadir, Talborjt",
      mois: "Octobre 2026",
      montant: 3500,
      paye: true,
    },
    {
      idLoyer: 2,
      locataire: "Salma Benali",
      bien: "Agadir, Hay Mohammadi",
      mois: "Octobre 2026",
      montant: 2200,
      paye: false,
    },
    {
      idLoyer: 3,
      locataire: "Karim Oujdi",
      bien: "Agadir, Founty",
      mois: "Octobre 2026",
      montant: 6000,
      paye: true,
    },
  ]);

  const deconnecter = () => {
    setConnecte(false);
  };

  return (
    <BrowserRouter>
      {connecte && (
        <nav className="main-nav">
          <div className="nav-brand">
            <Logo compact />
          </div>

          <div className="nav-links">
            <NavLink to="/" end>
              Accueil
            </NavLink>

            {role === "Gestionnaire" && (
              <>
                <NavLink to="/biens">Biens</NavLink>
                <NavLink to="/locataires">Locataires</NavLink>
                <NavLink to="/baux">Baux</NavLink>
              </>
            )}

            <NavLink to="/loyers">Loyers</NavLink>
            <NavLink to="/quittances">Quittances</NavLink>
          </div>

          <button className="btn-deconnexion" onClick={deconnecter}>
            Déconnexion
          </button>
        </nav>
      )}

      <div className={connecte ? "page" : undefined}>
        <Routes>
          <Route
            path="/connexion"
            element={
              connecte ? (
                <Navigate to="/" replace />
              ) : (
                <Connexion
                  onConnexion={(roleUtilisateur, utilisateur) => {
                    setRole(roleUtilisateur);
                    setUtilisateurConnecte(utilisateur);
                    setConnecte(true);
                  }}
                />
              )
            }
          />

          <Route
            path="/"
            element={
              connecte ? <Dashboard /> : <Navigate to="/connexion" replace />
            }
          />

          <Route
            path="/biens"
            element={
              connecte && role === "Gestionnaire" ? (
                <Biens />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/locataires"
            element={
              connecte && role === "Gestionnaire" ? (
                <Locataires />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/baux"
            element={
              connecte && role === "Gestionnaire" ? (
                <Baux />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/loyers"
            element={
              connecte ? (
                <Loyers
                  loyers={loyers}
                  setLoyers={setLoyers}
                  role={role}
                  utilisateurConnecte={utilisateurConnecte}
                />
              ) : (
                <Navigate to="/connexion" replace />
              )
            }
          />

          <Route
            path="/quittances"
            element={
              connecte ? (
                <Quittances
                  loyers={loyers}
                  role={role}
                  utilisateurConnecte={utilisateurConnecte}
                />
              ) : (
                <Navigate to="/connexion" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
