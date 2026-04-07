
import Kamel from './Kamel.jsx'
import { ScrollPanel } from 'primereact/scrollpanel';

export default function Spielfeld({selectedPerson, setSelectedPerson, camels, setCamels, setPeople}){

    // Person die bereits auf einem Sitz sitzt über alle Kamele hinweg entfernen
    const removePersonFromCamels = (prevCamels, personId) => {
        return prevCamels.map(camel => ({
            ...camel,
            grid: camel.grid.map(row =>
                row.map(seat =>
                    seat.occupant?.id === personId ? { ...seat, occupant: null } : seat
                )
            )
        }));
    };

    // Wenn auf einen leeren Platz gedrückt wird
    const handleSeatClick = (camelId, rowIndex, colIndex) => {
        // Es muss eine Person ausgewählt sein
        if (!selectedPerson) return;

        setCamels(prevCamels => {
            // Person von altem Platz entfernen
            let updated = removePersonFromCamels(prevCamels, selectedPerson.id);

            // Person auf neuen Platz setzen
            return updated.map(camel => {
                if (camel.id !== camelId) return camel;
                return {
                    ...camel,
                    grid: camel.grid.map((row, rIdx) =>
                        row.map((seat, cIdx) => {
                            if (rIdx === rowIndex && cIdx === colIndex && !seat.occupant) {
                                return { ...seat, occupant: selectedPerson };
                            }
                            return seat;
                        })
                    )
                };
            });
        });

        // Person als seated markieren
        setPeople(prevPeople =>
            prevPeople.map(person =>
                person.id === selectedPerson.id ? { ...person, seated: true } : person
            )
        );
    };

    // Wenn auf besetzten Sitz gedrückt wird
    const handleSeatPersonClick = (person) => {
        setSelectedPerson(person);
    };

    return(
      <ScrollPanel className="ScrollBarSpielfeld">
        <div className="Spielfeld">
          {camels.map(camel => (
              <Kamel
                  key={camel.id}
                  camelId={camel.id}
                  seats={camel.grid}
                  onSeatClick={handleSeatClick}
                  onSeatPersonClick={handleSeatPersonClick}
              />
          ))}
        </div>
      </ScrollPanel>
    );
}
