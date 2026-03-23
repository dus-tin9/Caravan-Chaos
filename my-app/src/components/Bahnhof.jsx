export default function Bahnhof({setSelectedPerson, people}) {

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
    };

return(


    <div className="Bahnhof">
        <h2>Bahnhof</h2>
            <div className="Personenliste">
            {// Die Intitialen Personen af dem Bahnhof rendern; können ausgewählt werden
                people.map((person) => (
                    <div
                    key={person.id}
                    onClick={() => handleSelectPerson(person)}
                    className="Bahnperson"
                    >
                    {person.name}{/* Hier eine Display Karte statt einfach nur Namen implementieren (extra Component)  Bild, Name */}
                    </div>
            ))}
            </div>
    </div>

);
}