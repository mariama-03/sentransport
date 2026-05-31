import { useState, useEffect } from 'react';
import StatReseau from './StatReseau';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import Footer from './Footer';
import ListeLignes from './ListeLignes';
import DetailLigne from './DetailLigne';
import Carte from './Carte';
import Meteo from './Meteo';
import SignalerIncident from './SignalerIncident';
import ListeIncidents from './ListeIncidents';
import Previsions from './Previsions';

function App() {

const [compteur, setcompteur] = useState(0); 
const [recherche, setRecherche] = useState("");
const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
const [chargement, setChargement] = useState(true);
const [erreur,     setErreur]     = useState(null);
const [lignes, setLignes] = useState([]);

function chargerLignes() {
  setChargement(true);
  setErreur(null);
  fetch("http://localhost:5000/lignes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur serveur : " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      setLignes(data);
      setChargement(false);
    })
    .catch((error) => {
      setErreur(error.message);
      setChargement(false);
    });
}


useEffect(() => {
  chargerLignes();
}, []);
// useEffect(() => {
//   fetch("http://localhost:5000/lignes")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Erreur serveur : " + response.status);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       setLignes(data);
//       setChargement(false);
//     })
//     .catch((error) => {
//       setErreur(error.message);
//       setChargement(false);
//     });
// }, []);

 // Filtrer les lignes selon le texte tape
  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

function handleClickLigne(ligne) {
  if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
    setLigneSelectionnee(null);
  } else {
    fetch("http://localhost:5000/lignes/" + ligne.id)
      .then((response) => response.json())
      .then((data) => {
        setLigneSelectionnee(data);
      });
  }
}

if (chargement) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <p className="message-chargement">Chargement des lignes...</p>
      </main>
    </div>
  );
}

if (erreur) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <div className="message-erreur">
          <p>Impossible de charger les lignes.</p>
          <p className="erreur-detail">{erreur}</p>
          <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
        </div>
      </main>
    </div>
  );
}
  return (
    <div className="App">
      <Header />
      <p style={{textAlign: "center"}}>Vous avez effectué {compteur} recherche(s)</p>
      <main className="contenu">
        <Meteo />
        <Previsions /> 
        <button className="bouton-recharger" onClick={chargerLignes}>Recharger</button>
        <Recherche
          valeur={recherche}
          //prendre en compte le nombre de recherche
          //onChange={setRecherche}
          onChange={valeur => {
          setRecherche(valeur);
          setcompteur(compteur + 1);
        }}

        />
        <p className="resultat-recherche">
          {/* Afficher aucune ligne trouvée */}
          {lignesFiltrees.length === 0 ? 'Aucune' : lignesFiltrees.length} ligne
          {lignesFiltrees.length > 1 ? 's' : ''} trouvée
          {lignesFiltrees.length > 1 ? 's' : ''}
        </p>

        {lignesFiltrees.map(ligne => (
          <div key={ligne.id}>
          <LigneBus
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={ligneSelectionnee
              && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
           />
         {ligneSelectionnee && ligneSelectionnee.id === ligne.id && (
             <DetailLigne ligne={ligneSelectionnee} /> )}
        </div> 
        ))}
        {/* {ligneSelectionnee
          && <DetailLigne ligne={ligneSelectionnee} />} */}  
       <Carte /> 
       <SignalerIncident />  
       <ListeIncidents />
       </main>
      <Footer />
    </div>
  );
}
export default App;

