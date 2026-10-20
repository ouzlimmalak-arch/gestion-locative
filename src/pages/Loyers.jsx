import { loyers, locataires } from "../data/mockData";

export default function Loyers() {
  return (
    <div>
      <h1>Loyers</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Locataire</th>
            <th>Mois</th>
            <th>Montant (MAD)</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {loyers.map((loyer) => {
            const locataire = locataires.find((l) => l.id === loyer.locataireId);
            return (
              <tr key={loyer.id}>
                <td>{locataire.nom}</td>
                <td>{loyer.mois}</td>
                <td>{loyer.montant}</td>
                <td style={{ color: loyer.paye ? "green" : "red" }}>
                  {loyer.paye ? "Payé" : "Impayé"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
