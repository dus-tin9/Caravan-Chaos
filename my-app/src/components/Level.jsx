import { useState } from "react";
import { PrimeReactProvider } from 'primereact/api';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Bahnhof from './Bahnhof.jsx'
import Spielfeld from './Spielfeld.jsx'
import Infofeld from './Infofeld.jsx'
import Buttons from './Buttons.jsx'

// Liste von Leuten am Bahnhof
const initialPeople = [
  { id: 1, name: "Person 1", seated: false, needs: [ "sleepy", "window"]},
  { id: 2, name: "Person 2", seated: false, needs: [ "talkative" ] },
  { id: 3, name: "Person 3", seated: false, needs: [] },
  { id: 4, name: "Person 4", seated: false, needs: [ "stinky" ] },
  { id: 5, name: "Person 5", seated: false, needs: [ "sleepy", "stinky" ] },
  { id: 6, name: "Person 6", seated: false, needs: [ "talkative",  "window" ] },
  ];

// Sitzgruppe als grid erzeugen
const createSeatGrid = (rows, cols) =>
    Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => ({

            // Sitz besteht aus ID und Person auf Sitz
            id: `${rowIndex}-${colIndex}`,
            occupant: null,

        }))
    );


export default function Level({setSiteState}) {

  // Initialisiere States für Personen am Bahnhof
  const [people, setPeople] = useState(initialPeople);
  // Sitzgruppe in der Mitte
  const [seats, setSeats] = useState(createSeatGrid(4, 3));
  // und Ausgewählte Person
  const [selectedPerson, setSelectedPerson] = useState(null);


  return(    
      <div className="Level">
        <PrimeReactProvider>
            <Splitter className="Splitter">
                <SplitterPanel size={25} minSize={7}>
                    <Bahnhof
                    setSelectedPerson={setSelectedPerson}
                    people={people}
                    />
                </SplitterPanel>

                <SplitterPanel size={75} minSize={70} className="Mittelteil">
                    <Buttons
                    setSiteState={setSiteState}
                    people={people}
                    setPeople={setPeople}
                    seats={seats}
                    setSeats={setSeats}
                    />

                    <Spielfeld
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                    seats={seats}
                    setSeats={setSeats}
                    setPeople={setPeople}
                    />
                </SplitterPanel>
            </Splitter>

            <Infofeld
            selectedPerson={selectedPerson}
            />

        </PrimeReactProvider>
    </div>
  );

}