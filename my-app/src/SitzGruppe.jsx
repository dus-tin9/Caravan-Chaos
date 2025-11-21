import SitzReihe from './SitzReihe.jsx'

export default function SitzGruppe({ReihenLängen}) {

  return (
    <div className={Gruppenname}>
      <table>
        {ReihenLängen.map((x,i) => 
        (<SitzReihe ReihenNummer= {i} AnzPlätze={x}/>))
        }
      </table>
    </div>
  );

}