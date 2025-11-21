import SitzReihe from './SitzReihe.jsx'

export default function SitzGruppe({Gruppenname, ReihenLängen}) {

  return (
    <div className={GruppenName}>
      <table>
        {ReihenLängen.map((x,i) => 
        (<SitzReihe ReihenNummer= {i} AnzPlätze={x}/>))
        }
      </table>
    </div>
  );

}