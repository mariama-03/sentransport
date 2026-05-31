import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Carte.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

let iconeUtilisateur = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function calculerDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function BoutonCentrer({ position }) {
  const map = useMap();
  if (!position) return null;
  return (
    <button className="bouton-centrer" onClick={() => map.setView(position, 13)}>
      Centrer sur ma position
    </button>
  );
}

function Carte() {
  const [arrets, setArrets] = useState([]);
  const [positionUtilisateur, setPositionUtilisateur] = useState(null);
  const [arretProche, setArretProche] = useState(null);
  const [arretsProches, setArretsProches] = useState([]);

  const DAKAR = [14.6928, -17.4467];

  useEffect(() => {
    fetch("http://localhost:5000/arrets")
      .then(r => r.json())
      .then(data => setArrets(data))
      .catch(err => console.error("Erreur arrets:", err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setPositionUtilisateur([pos.coords.latitude, pos.coords.longitude]);
        },
        () => console.log("Geolocation refusee"),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (positionUtilisateur && arrets.length > 0) {
      let proches = [];
      let listeArrets = [...arrets];
      for (let i = 0; i < 3; i++) {
        let proche = null;
        let dMin = Infinity;
        listeArrets.forEach(a => {
          const d = calculerDistance(
            positionUtilisateur[0],
            positionUtilisateur[1], a.lat, a.lon);
          if (d < dMin) { dMin = d; proche = {...a, distance: d}; }
        });
        proches.push(proche);
        listeArrets = listeArrets.filter(a => a.id !== proche.id);
      }
      setArretsProches(proches);
      setArretProche(proches[0]);
    }
  }, [positionUtilisateur, arrets]);

  return (
    <div className="carte-container">
      <h2 className="carte-titre">Carte des arrets</h2>
      {arretProche && (
        <>
          <p className="arret-proche">
            Arret le plus proche : <strong>{arretProche.nom}</strong>
            {" "}({arretProche.distance.toFixed(1)} km)
          </p>
          <ul className="liste-proches">
            {arretsProches.map((p, i) => (
              <li key={i}>
                {i + 1}. <strong>{p.nom}</strong> — {p.distance.toFixed(1)} km
              </li>
            ))}
          </ul>
        </>
      )}
      <MapContainer center={DAKAR} zoom={13} className="carte">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <BoutonCentrer position={positionUtilisateur} />
        {arrets.map(a => (
          <Marker key={a.id} position={[a.lat, a.lon]}>
            <Popup>
              <strong>{a.nom}</strong><br />
              Lignes : {a.lignes.join(", ")}
            </Popup>
          </Marker>
        ))}
        {positionUtilisateur && (
          <Marker position={positionUtilisateur} icon={iconeUtilisateur}>
            <Popup>Vous etes ici</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Carte;