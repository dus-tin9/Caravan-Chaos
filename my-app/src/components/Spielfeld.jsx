
import Kamel from './Kamel.jsx'

export default function Spielfeld({selectedPerson, setSelectedPerson, seats, setSeats, setPeople}){

    // Person die bereits auf Sitz sitzt entfernen um sie neu zu platzieren
    const removePersonFromSeats = (grid, personId) => {
        return grid.map((row) =>
            row.map((seat) => {
                if (seat.occupant?.id === personId) {
                    return { ...seat, occupant: null };
                }
                return seat;
            })
        );
    };


    // Wenn auf einen Leeren Platz gedrückt wird
    const handleSeatClick = (rowIndex, colIndex) => {
        // Es muss eine Person ausgewählt sein
        if (!selectedPerson) return;
        
        // Ändere Plätze ab 
        setSeats((prevSeats) => {
            // Person von altem Platz entfernen
            let updated = removePersonFromSeats(prevSeats, selectedPerson.id);

            // Person auf neuen Platz setzen
            return updated.map((row, rIdx) =>
                row.map((seat, cIdx) => {
                    if (rIdx === rowIndex && cIdx === colIndex && !seat.occupant) {
                        return { ...seat, occupant: selectedPerson };
                    }
                return seat;
                })
            )
        });

        // Person aus Bahnhofliste entfernen
        setPeople((prevPeople) =>
            prevPeople.filter((person) => person.id !== selectedPerson.id)
        );
        
    }

    // Wenn auf besetzten Sitz gedrückt wird
    const handleSeatPersonClick = (person) => {
        setSelectedPerson(person);
    };

    return(
      <div className="Spielfeld">
        <Kamel 
            seats={seats} 
            onSeatClick={handleSeatClick} 
            onSeatPersonClick={handleSeatPersonClick} 
        />
      </div>

    );
}