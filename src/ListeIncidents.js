import { useState, useEffect } from 'react';

function ListeIncidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/incidents")
      .then(r => r.json())
      .then(data => setIncidents(data))
      .catch(err => console.error(err));
  }, []);

  if (incidents.length === 0) {
    return <p style={{color: "#7f8c8d", marginTop: "12px"}}>Aucun incident signalé.</p>;
  }

  return (
    <ul style={{listStyle: "none", padding: 0, marginTop: "12px"}}>
      {incidents.map(inc => (
        <li key={inc.id} style={{
          background: "#f9f9f9",
          borderLeft: "4px solid #0a6e31",
          padding: "10px 14px",
          marginBottom: "8px",
          borderRadius: "6px"
        }}>
          <strong>Ligne {inc.ligne}</strong> — {inc.description}
          <span style={{color: "#7f8c8d", fontSize: "0.85rem", marginLeft: "8px"}}>
            ({inc.lieu})
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ListeIncidents;