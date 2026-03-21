
import Sitz from './Sitz.jsx'

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
        <h2>Kamel</h2>
            <div className="Sitze">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className={`Row-${rowIndex}`}>

                        {row.map((seat, colIndex) => (
                            <div
                            key={seat.id}
                            onClick={() => handleSeatClick(rowIndex, colIndex)}
                            className={`Row-${rowIndex}-Seat-${colIndex}`}
                            >

                                {seat.occupant ? (
                                    <div
                                        onClick={ (e) => {
                                         // handleSeatClick abbrechen und ersetzen falls Person auf 
                                            e.stopPropagation();
                                            handleSeatPersonClick(seat.occupant);
                                        }}
                                    >
                                    <Sitz
                                        occupant={seat.occupant}
                                    />
                                    </div>
                                    ):  <Sitz
                                            occupant={null}
                                        />
                                }

                            </div>
                        ))}
                
                    </div>
                ))}
            </div>
      </div>

    );
}