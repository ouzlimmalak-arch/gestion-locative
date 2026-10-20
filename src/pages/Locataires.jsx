import { locataires, biens } from "../data/mockData";

export default function Locataires() {
  return (
    <div>
      <h1>Locataires</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Bien loué</th>
          </tr>
        </thead>
        <tbody>
          {locataires.map((l) => {
            const bien = biens.find((b) => b.id === l.bienId);
            return (
              <tr key={l.id}>
                <td>{l.nom}</td>
                <td>{l.telephone}</td>
                <td>{bien.adresse}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
