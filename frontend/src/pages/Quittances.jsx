function Quittances({ loyers, role, utilisateurConnecte }) {
  const loyersAffiches =
    role === "Locataire"
      ? loyers.filter((loyer) => loyer.locataire === utilisateurConnecte.nom)
      : loyers;

  const quittances = loyersAffiches.filter((loyer) => loyer.paye === true);

  const supprimerQuittance = (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette quittance ?",
    );

    if (confirmation) {
      alert(
        "Pour supprimer cette quittance, il faut supprimer le loyer correspondant.",
      );
    }
  };

  return (
    <div>
      <header className="page-head">
        <h1>Gestion des quittances</h1>
        <p>Une quittance est émise pour chaque loyer payé.</p>
      </header>

      <div className="table-wrap">
        <table className="table-quittances">
          <thead>
            <tr>
              <th>N° Quittance</th>
              <th>Locataire</th>
              <th>Bien</th>
              <th>Mois</th>
              <th className="num">Montant (DH)</th>
              {role === "Gestionnaire" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {quittances.map((quittance) => (
              <tr key={quittance.idLoyer}>
                <td>Q-{quittance.idLoyer}</td>
                <td>{quittance.locataire}</td>
                <td>{quittance.bien}</td>
                <td>{quittance.mois}</td>
                <td className="num">{quittance.montant}</td>
                {role === "Gestionnaire" && (
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => supprimerQuittance(quittance.idQuittance)}
                    >
                      Supprimer
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {quittances.length === 0 && (
        <p className="empty">Aucune quittance pour le moment.</p>
      )}
    </div>
  );
}

export default Quittances;
