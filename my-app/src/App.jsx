
import SitzGruppe from './SitzGruppe.jsx'

export default function App() {


  return (
    <>
    <SitzGruppe className="Kamel"   ReihenLängen={[5,5,5,5]}/>
    <SitzGruppe className="Bahnhof" ReihenLängen={[4,5,6]}/>
    </>
  );
}
