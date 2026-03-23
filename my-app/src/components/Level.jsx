import { useState } from "react";
import Bahnhof from './Bahnhof.jsx'
import Spielfeld from './Spielfeld.jsx'
import Infofeld from './Infofeld.jsx'

// Liste von Leuten am Bahnhof
const initialPeople = [
  { id: 1, name: "Person 1" },
  { id: 2, name: "Person 2" },
  { id: 3, name: "Person 3" },
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


export default function Level() {

  // Initialisiere States für Personen am Bahnhof
  const [people, setPeople] = useState(initialPeople);
  // Sitzgruppe in der Mitte
  const [seats, setSeats] = useState(createSeatGrid(4, 3));
  // und Ausgewählte Person
  const [selectedPerson, setSelectedPerson] = useState(null);


  return(    
    <div className="Level">
      <Bahnhof
        setSelectedPerson={setSelectedPerson}
        people={people}
        setPeople={setPeople}
      />

      <Spielfeld
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        seats={seats}
        setSeats={setSeats}
        setPeople={setPeople}
      />

      <Infofeld
        selectedPerson={selectedPerson}
      />
    </div>
  );

}