function Quittances({ loyers, role, utilisateurConnecte }) {
  const loyersAffiches =
    role === "Locataire"
      ? loyers.filter(
          (loyer) => loyer.locataire === utilisateurConnecte.nom
        )
      : loyers;

  const quittances = loyersAffiches.filter(
    (loyer) => loyer.paye === true
  );
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
      <h1>Gestion des quittances</h1>
      <table className="table-quittances">
        <thead>
          <tr>
            <th>N° Quittance</th>
            <th>Locataire</th>
            <th>Bien</th>
            <th>Mois</th>
            <th>Montant (DH)</th>
            {role === "Gestionnaire" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {quittances.map((quittance) => (
            <tr key={quittance.idQuittance}>
              <td>Q-{quittance.idLoyer}</td>
              <td>{quittance.locataire}</td>
              <td>{quittance.bien}</td>
              <td>{quittance.mois}</td>
              <td>{quittance.montant}</td>
              {role === "Gestionnaire" && (
  <td>
    <button
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
  );
}

export default Quittances;
