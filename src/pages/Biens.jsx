import { biens } from "../data/mockData";

export default function Biens() {
  return (
    <div>
      <h1>Biens</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Adresse</th>
            <th>Type</th>
            <th>Loyer (MAD)</th>
          </tr>
        </thead>
        <tbody>
          {biens.map((bien) => (
            <tr key={bien.id}>
              <td>{bien.adresse}</td>
              <td>{bien.type}</td>
              <td>{bien.loyer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}