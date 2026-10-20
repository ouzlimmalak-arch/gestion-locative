import { loyers, locataires, biens } from "../data/mockData";

export default function Quittances() {
  const loyersPayes = loyers.filter((loyer) => loyer.paye);

  return (
    <div>
      <h1>Quittances</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>N°</th>
            <th>Locataire</th>
            <th>Bien</th>
            <th>Mois</th>
            <th>Montant (MAD)</th>
          </tr>
        </thead>
        <tbody>
          {loyersPayes.map((loyer) => {
            const locataire = locataires.find((l) => l.id === loyer.locataireId);
            const bien = biens.find((b) => b.id === locataire.bienId);
            return (
              <tr key={loyer.id}>
                <td>Q-{loyer.id}</td>
                <td>{locataire.nom}</td>
                <td>{bien.adresse}</td>
                <td>{loyer.mois}</td>
                <td>{loyer.montant}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
