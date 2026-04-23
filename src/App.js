import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Statistique1, Statistique2, Statistique3 } from './Statistique';

function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <main className="contenu">
        <p>Bienvenue ! Cette application vous aide a trouver votre ligne de bus a Dakar.</p>
      </main>

       <div className="stat-container">
       <Statistique1 />
       <Statistique2 />
       <Statistique3 />
      </div>
      </div>
  );
}

export default App;