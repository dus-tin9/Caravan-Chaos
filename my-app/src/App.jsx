<link rel="stylesheet" href="App.css"/>
import SitzGruppe from './SitzGruppe.jsx'

export default function App() {


  return (
    <>
    <SitzGruppe GruppenName="Kamel"   ReihenLängen={[5,5,5,5]}/>
    <SitzGruppe GruppenName="Bahnhof" ReihenLängen={[4,5,6]}/>
    </>
  );
}
