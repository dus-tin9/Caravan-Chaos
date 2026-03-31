import { useEffect, useState } from "react";
import Bahnhof from './Bahnhof.jsx'
import Spielfeld from './Spielfeld.jsx'
import Infofeld from './Infofeld.jsx'
import Buttons from './Buttons.jsx'
import levelData from '../assets/Level/Level01.json'

// Liste von Leuten am Bahnhof aus Level01.json importieren
const initialPeople = levelData.people.map(person => ({
  id: person.id,
  name: person.name,
  needs: person.needs ?? []
}));

// Sitzgruppe als grid erzeugen
const createSeatGrid = (camelId, rows, cols) =>
  Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      id: `${camelId}-${rowIndex}-${colIndex}`,
      occupant: null,
    }))
  );

// Kamele aus Level-Daten erzeugen
const initialCamels = levelData.camels.map(camel => ({
  id: camel.id,
  grid: createSeatGrid(camel.id, camel.rows, camel.columns)
}));


export default function Level({setSiteState, setScores}) {

  // Initialisiere States für Personen am Bahnhof
  const [people, setPeople] = useState(initialPeople);
  // Kamele mit ihren Sitzgruppen
  const [camels, setCamels] = useState(initialCamels);
  // Ausgewählte Person
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Beim Laden der Komponente, versuche, Personen und Kamele aus localStorage zu laden
  useEffect(() => {
    const storedPeople = localStorage.getItem('people');
    const storedCamels = localStorage.getItem('camels');

    if (storedPeople && storedCamels) {
      setPeople(JSON.parse(storedPeople));
      setCamels(JSON.parse(storedCamels));
    }
  }, []);

  // jedes Mal, wenn sich die Personen oder die Kamele ändern, speichere sie im localStorage
  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
    localStorage.setItem('camels', JSON.stringify(camels));
  }, [people, camels]);



  return(
    <div className="Level">
      <Bahnhof
        setSelectedPerson={setSelectedPerson}
        people={people}
      />

      <Buttons
        setSiteState={setSiteState}
        setScores={setScores}
        people={people}
        camels={camels}
      />

      <Spielfeld
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        camels={camels}
        setCamels={setCamels}
        setPeople={setPeople}
      />

      <Infofeld
        selectedPerson={selectedPerson}
      />
    </div>
  );
}
