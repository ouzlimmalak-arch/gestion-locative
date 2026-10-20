import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Biens from "./pages/Biens";
import Locataires from "./pages/Locataires";
import Loyers from "./pages/Loyers";
import Quittances from "./pages/Quittances";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/biens">Biens</Link> |{" "}
        <Link to="/locataires">Locataires</Link> |{" "}
        <Link to="/loyers">Loyers</Link> |{" "}
        <Link to="/quittances">Quittances</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/biens" element={<Biens />} />
        <Route path="/locataires" element={<Locataires />} />
        <Route path="/loyers" element={<Loyers />} />
        <Route path="/quittances" element={<Quittances />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
