import { useState, useEffect } from 'react';

function Previsions() {
  const [previsions, setPrevisions] = useState([]);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_OWM_KEY;
    if (!API_KEY) { setErreur("Cle API manquante"); return; }

    const url =
      'https://api.openweathermap.org/data/2.5/forecast'
      + '?q=Dakar&appid=' + API_KEY
      + '&units=metric&lang=fr&cnt=24';

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error("Erreur : " + r.status);
        return r.json();
      })
      .then(data => {
        const parJour = {};
        data.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0];
          if (!parJour[date]) {
            parJour[date] = {
              date,
              temp: Math.round(item.main.temp),
              description: item.weather[0].description,
              icone: item.weather[0].icon,
            };
          }
        });
        setPrevisions(Object.values(parJour).slice(0, 3));
      })
      .catch(err => setErreur(err.message));
  }, []);

  if (erreur) return null;
  if (previsions.length === 0) return null;

  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{color: "#2c3e50", margin: "0 0 12px 0", fontSize: "1rem"}}>
        Prévisions 3 prochains jours
      </h3>
      <div style={{display: "flex", gap: "12px", flexWrap: "wrap"}}>
        {previsions.map(p => (
          <div key={p.date} style={{
            textAlign: "center",
            background: "#f8f9fa",
            borderRadius: "8px",
            padding: "8px 16px",
            minWidth: "80px"
          }}>
            <div style={{fontSize: "0.8rem", color: "#7f8c8d"}}>
              {new Date(p.date).toLocaleDateString('fr-FR', {weekday: 'short', day: 'numeric', month: 'short'})}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${p.icone}@2x.png`}
              alt={p.description}
              style={{width: "40px", height: "40px"}}
            />
            <div style={{fontWeight: "bold", color: "#2c3e50"}}>{p.temp}°C</div>
            <div style={{fontSize: "0.75rem", color: "#7f8c8d", textTransform: "capitalize"}}>
              {p.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Previsions;