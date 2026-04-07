import Bahnhof_Display from "./Bahnhof_Display";
import { ScrollPanel } from 'primereact/scrollpanel';     

export default function Bahnhof({setSelectedPerson, people}) {

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
    };

return(


    <div className="Bahnhof">
        <h2>Bahnhof</h2>
        <ScrollPanel className="ScrollBarBahnhof" >
            <div    className="Personenliste"
                    style={{'--personenAnz': people.filter((person) => !person.seated).length}}>

            {// Die Unseated Personen auf dem Bahnhof rendern; können ausgewählt werden
                people.filter((person) => (!person.seated)).map((person) => (
                    <div
                    key={person.id}
                    onClick={() => handleSelectPerson(person)}
                    >
                    <Bahnhof_Display person={person}/>
                    </div>
            ))}
            </div>
        </ScrollPanel>
    </div>

);
}