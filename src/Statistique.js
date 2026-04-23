import './Statistique.css';

function Statistique1(){
    return(
        <div className="stat">
            <span className="stat-nombre">15</span>
            <span className="stat-libelle">lignes</span>
        </div>
    );
}
function Statistique2(){
    return(
        <div className="stat">
            <span className="stat-nombre">200</span>
            <span className="stat-libelle">arrêts</span>
        </div>
    );
}
function Statistique3(){
    return(
        <div className="stat">
            <span className="stat-nombre">300</span>
            <span className="stat-libelle">bus actifs</span>
        </div>
    );
}
export { Statistique1, Statistique2, Statistique3 };