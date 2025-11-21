import SitzGruppe from './SitzGruppe.jsx'

export default function App() {


  return (
    <> 
    <SitzGruppe Gruppe="Kamel"   ReihenLängen={[5,5,5,5]}/>  
    <SitzGruppe Gruppe="Bahnhof" ReihenLängen={[4,5,6]}/>
    </>
  );
}
