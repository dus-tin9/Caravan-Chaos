export default function Bahnhof({setSelectedPerson, people, setpeople}) {

    const handleSelectPerson = (person) => {
      setSelectedPerson(person);
    };

return(


      <div className="Bahnhof">
        <h2>Bahnhof</h2>
        {// Die Intitialen Personen af dem Bahnhof rendern; können ausgewählt werden
         people.map((person) => (
          <div
            key={person.id}
            onClick={() => handleSelectPerson(person)}
            >
            {person.name}{/* Hier eine Display Karte statt einfach nur Namen implementieren (extra Component)  Bild, Name */}
          </div>
        ))}
      </div>

);
}