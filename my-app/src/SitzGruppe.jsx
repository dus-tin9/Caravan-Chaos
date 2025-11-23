import SitzReihe from './SitzReihe.jsx'

export default function SitzGruppe({Gruppe, ReihenLängen,}) {

  // Hier Zugriff auf Datenbank mit Personen implementieren
  const BesetztePl = [[0,2], [1,0],[2,4]]; 


  return (
    <div className={Gruppe}>
      <table>
        {ReihenLängen.map((x,i) => (<SitzReihe key= {i} ReihenNummer={i} 
                                     AnzPlätze={x} BesetztePl={BesetztePl} 
                                     Gruppe={Gruppe}/>))
        }
      </table>
    </div>
  );
}