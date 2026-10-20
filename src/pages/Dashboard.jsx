import { biens, locataires, loyers } from "../data/mockData";

export default function Dashboard() {
  const nbBiens = biens.length;
  const nbLocataires = locataires.length;
  const loyersImpayes = loyers.filter((l) => !l.paye);
  const totalEncaisse = loyers
    .filter((l) => l.paye)
    .reduce((somme, l) => somme + l.montant, 0);

  return (
    <div>
      <h1>Tableau de bord</h1>
      <ul>
        <li>Nombre de biens : {nbBiens}</li>
        <li>Nombre de locataires : {nbLocataires}</li>
        <li>Loyers impayés : {loyersImpayes.length}</li>
        <li>Total encaissé : {totalEncaisse} MAD</li>
      </ul>
    </div>
  );
}