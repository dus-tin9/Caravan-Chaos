import { useState } from "react";
import Bahnhof from './Bahnhof.jsx'
import Spielfeld from './Spielfeld.jsx'
import Infofeld from './Infofeld.jsx'
import Buttons from './Buttons.jsx'

// Liste von Leuten am Bahnhof
const initialPeople = [
  { id: 1, name: "Person 1", seated: false , needs: [ "sleepy", "window"]},
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


export default function Level({ levelId }) {

  // Initialisiere States für Personen am Bahnhof
  const [people, setPeople] = useState(initialPeople);
  // Sitzgruppe in der Mitte
  const [seats, setSeats] = useState(createSeatGrid(4, 3));
  // und Ausgewählte Person
  const [selectedPerson, setSelectedPerson] = useState(null);


  return(    
    <main
      className="relative min-h-screen w-full overflow-hidden px-4 py-4 md:px-6 md:py-6"
      style={{
        background:
          'radial-gradient(circle at top, var(--background) 0%, var(--card) 45%, var(--secondary) 100%)',
      }}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 left-8 h-44 w-44 rounded-full bg-accent/20 blur-2xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-4 md:grid-cols-[minmax(260px,1fr)_minmax(560px,2fr)_minmax(260px,1fr)] md:grid-rows-[auto_1fr]">
        <Bahnhof
          className="md:col-start-1 md:row-span-2"
          setSelectedPerson={setSelectedPerson}
          people={people}
        />

        <Buttons
          className="md:col-start-2 md:row-start-1"
          levelId={levelId}
          people={people}
        />

        <Spielfeld
          className="md:col-start-2 md:row-start-2"
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          seats={seats}
          setSeats={setSeats}
          setPeople={setPeople}
        />

        <Infofeld
          className="md:col-start-3 md:row-span-2"
          selectedPerson={selectedPerson}
        />
      </div>
    </main>
  );

}