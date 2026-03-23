import Bahnhof_Display from "./Bahnhof_Display";

export default function Bahnhof({setSelectedPerson, people}) {

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
    };

return(


    <div className="Bahnhof">
        <h2>Bahnhof</h2>
            <div className="Personenliste"
                 style={{'--personenAnz': people.length}}>
            {// Die Intitialen Personen auf dem Bahnhof rendern; können ausgewählt werden
                people.map((person) => (
                    <div
                    key={person.id}
                    onClick={() => handleSelectPerson(person)}
                    >
                    <Bahnhof_Display person={person}/>
                    </div>
            ))}
            </div>
    </div>

);
}