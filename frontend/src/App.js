import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getQuittances } from "./services/api";

import Dashboard from "./pages/Dashboard";
import Biens from "./pages/Biens";
import Locataires from "./pages/Locataires";
import Quittances from "./pages/Quittances";
import Baux from "./pages/Baux";
import Connexion from "./pages/Connexion";
import Logo from "./components/Logo";

function App() {
  const [connecte, setConnecte] = useState(false);
  const [role, setRole] = useState("");
  const [utilisateurConnecte, setUtilisateurConnecte] = useState(null);
  const [quittances, setQuittances] = useState([]);
  useEffect(() => {
    if (connecte) {
      const token = localStorage.getItem("token");

      getQuittances(token)
        .then((data) => {
          setQuittances(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [connecte]);

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
                    localStorage.setItem("token", utilisateur.token);
                    setConnecte(true);
                  }}
                />
              )
            }
          />

          <Route
            path="/"
            element={
              connecte ? (
                <Dashboard
                  role={role}
                  utilisateurConnecte={utilisateurConnecte}
                />
              ) : (
                <Navigate to="/connexion" replace />
              )
            }
          />

          <Route
            path="/biens"
            element={
              connecte && role === "Gestionnaire" ? (
                <Biens utilisateurConnecte={utilisateurConnecte} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/locataires"
            element={
              connecte && role === "Gestionnaire" ? (
                <Locataires utilisateurConnecte={utilisateurConnecte} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/baux"
            element={
              connecte && role === "Gestionnaire" ? (
                <Baux utilisateurConnecte={utilisateurConnecte} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/quittances"
            element={
              connecte ? (
                <Quittances
                  role={role}
                  utilisateurConnecte={utilisateurConnecte}
                  quittances={quittances}
                  setQuittances={setQuittances}
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
