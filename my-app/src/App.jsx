import SitzGruppe from './SitzGruppe.jsx'

export default function App() {


  return (
    <div className='Seite'>
    <div className='Container'> 
    <SitzGruppe Gruppe="Kamel1"   ReihenLängen={[5,5,5,5]}/>
    <SitzGruppe Gruppe="Kamel2"   ReihenLängen={[8,8]}/>
    <SitzGruppe Gruppe="Bahnhof" ReihenLängen={[4,5,6]}/>
    </div>
    <div className='Titel'>
      <p>
        Caravanen
        Chaos
      </p>
    </div>
    </div>
  );
}
