
import { biens, locataires } from "../data/mockData";

export default function Dashboard({
  role,
  utilisateurConnecte,
  loyers = [],
}) {
  // Vérifier que loyers est bien un tableau
  const listeLoyers = Array.isArray(loyers) ? loyers : [];

  // Si c'est un locataire, afficher uniquement ses propres loyers
  const loyersAffiches =
    role === "Locataire"
      ? listeLoyers.filter(
          (l) => l.locataire === utilisateurConnecte?.nom
        )
      : listeLoyers;

  // Statistiques du gestionnaire
  const nbBiens = biens.length;
  const nbLocataires = locataires.length;

  const loyersImpayes = listeLoyers.filter((l) => !l.paye);

  const totalEncaisse = listeLoyers
    .filter((l) => l.paye)
    .reduce((somme, l) => somme + Number(l.montant || 0), 0);

  return (
    <div>
      <header className="page-head">
        <h1>Tableau de bord</h1>
        <p>
          {role === "Gestionnaire"
            ? "La situation de votre parc locatif."
            : "Bienvenue dans votre espace locataire."}
        </p>
      </header>

      {role === "Gestionnaire" ? (
        <>
          <section className="overview">
            <div className="hero-stat">
              <span>Total encaissé</span>
              <strong>
                {totalEncaisse.toLocaleString("fr-FR")}
                {" "}
                <small>MAD</small>
              </strong>
            </div>

            <ul className="mini-stats">
              <li>
                <strong>{nbBiens}</strong> biens
              </li>

              <li>
                <strong>{nbLocataires}</strong> locataires
              </li>

              <li className={loyersImpayes.length > 0 ? "alert" : ""}>
                <strong>{loyersImpayes.length}</strong>
                {loyersImpayes.length > 1
                  ? " loyers impayés"
                  : " loyer impayé"}
              </li>
            </ul>
          </section>

          <h2>Derniers loyers</h2>
        </>
      ) : (
        <h2>Mes loyers</h2>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {role === "Gestionnaire" && (
                <>
                  <th>Locataire</th>
                  <th>Bien</th>
                </>
              )}

              <th>Période</th>
              <th className="num">Montant</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            {loyersAffiches.map((l, i) => (
              <tr key={l.idLoyer ?? l.id ?? i}>
                {role === "Gestionnaire" && (
                  <>
                    <td>{l.locataire ?? "—"}</td>
                    <td>{l.bien ?? "—"}</td>
                  </>
                )}

                <td>{l.mois ?? "—"}</td>

                <td className="num">
                  {Number(l.montant || 0).toLocaleString("fr-FR")} MAD
                </td>

                <td>
                  <span className={"badge " + (l.paye ? "ok" : "warn")}>
                    {l.paye ? "Payé" : "Impayé"}
                  </span>
                </td>
              </tr>
            ))}

            {loyersAffiches.length === 0 && (
              <tr>
                <td colSpan={role === "Gestionnaire" ? 5 : 3}>
                  Aucun loyer à afficher.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
