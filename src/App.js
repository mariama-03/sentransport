import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import StatReseau from './StatReseau';

function App() {
  const lignes = [
  { id: 1, numero: "1",  depart: "Parcelles Assainies", arrivee: "Plateau",     arrets: 14, couleur: "#e74c3c" },
  { id: 2, numero: "7",  depart: "Guediawaye",          arrivee: "Place Obe",   arrets: 18, couleur: "#8e44ad" },
  { id: 3, numero: "15", depart: "Pikine",              arrivee: "Medina",      arrets: 12, couleur: "#2980b9" },
  { id: 4, numero: "23", depart: "Ouakam",              arrivee: "Grand Dakar", arrets: 10, couleur: "#e67e22" },
  { id: 5, numero: "8",  depart: "Almadies",            arrivee: "Colobane",    arrets: 16, couleur: "#27ae60" },
  { id: 6, numero: "12", depart: "Yoff",                arrivee: "Sandaga",     arrets: 11, couleur: "#eef73f" },
  { id: 7, numero: "27",  depart: "Rufisque",           arrivee: "Plateau",     arrets: 22, couleur: "#87fde5" },
  { id: 8, numero: "36",  depart: "Thiaroye",           arrivee: "Medina",      arrets: 17, couleur: "#efb893" },
  { id: 9, numero: "44",  depart: "Keur Massar",        arrivee: "Plateau",     arrets: 25, couleur: "#7f8c8d" },
  { id:10, numero: "50",  depart: "Mbao",               arrivee: "Colobane",    arrets: 20, couleur: "#01e5b7" },
];

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <StatReseau lignes={lignes} />
        <ListeLignes lignes={lignes} />
      </main>
      <Footer />
    </div>
  );
}

export default App;