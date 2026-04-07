import { PrimeReactProvider } from 'primereact/api';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useEffect, useState } from "react";
import Bahnhof from './Bahnhof.jsx'
import Spielfeld from './Spielfeld.jsx'
import Infofeld from './Infofeld.jsx'
import Buttons from './Buttons.jsx'

const levelModules = import.meta.glob('../assets/Level/Level*.json', { eager: true });

function getLevelData(levelId) {
  const key = `../assets/Level/Level${String(levelId).padStart(2, '0')}.json`;
  const mod = levelModules[key];
  return mod ? (mod.default ?? mod) : null;
}

const createSeatGrid = (camelId, rows, cols) =>
  Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      id: `${camelId}-${rowIndex}-${colIndex}`,
      occupant: null,
    }))
  );

function buildInitialState(levelData) {
  const people = levelData.people.map(person => ({
    id: person.id,
    name: person.name,
    needs: person.needs ?? [],
    seated: false,
  }));
  const camels = levelData.camels.map(camel => ({
    id: camel.id,
    grid: createSeatGrid(camel.id, camel.rows, camel.columns),
  }));
  return { people, camels };
}

export default function Level({ levelId }) {
  const levelData = getLevelData(levelId);

  if (!levelData) {
    return <div className="Level" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Level {levelId} nicht gefunden.</div>;
  }

  const { people: initialPeople, camels: initialCamels } = buildInitialState(levelData);

  const peopleKey = `people_${levelId}`;
  const camelsKey = `camels_${levelId}`;

  // Initialisiere States für Personen am Bahnhof
  const [people, setPeople] = useState(() => {
    const stored = localStorage.getItem(peopleKey);
    return stored ? JSON.parse(stored) : initialPeople;
  });
  // Kamele mit ihren Sitzgruppen
  const [camels, setCamels] = useState(() => {
    const stored = localStorage.getItem(camelsKey);
    return stored ? JSON.parse(stored) : initialCamels;
  });
  // Ausgewählte Person
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Letztes gespieltes Level merken
  useEffect(() => {
    localStorage.setItem('lastPlayedLevel', levelId);
  }, [levelId]);

  // jedes Mal, wenn sich die Personen oder die Kamele ändern, speichere sie im localStorage
  useEffect(() => {
    localStorage.setItem(peopleKey, JSON.stringify(people));
    localStorage.setItem(camelsKey, JSON.stringify(camels));
  }, [people, camels]);

  return(
      <div
        className="Level"
        style={{
          background:
            'radial-gradient(circle at top, var(--background) 0%, var(--card) 52%, var(--secondary) 100%)',
        }}
      >
        {/* Dekorative Blur-Kreise */}
        <div className='pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl' />
        <div className='pointer-events-none absolute bottom-8 left-8 h-44 w-44 rounded-full bg-accent/25 blur-2xl' />
        <div className='pointer-events-none absolute right-8 top-16 h-52 w-52 rounded-full bg-secondary/45 blur-3xl' />
        {/* Overlays */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] opacity-20 dark:opacity-10' />

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
                        levelId={levelId}
                        people={people}
                        camels={camels}
                        setPeople={setPeople}
                        setCamels={setCamels}
                    />

                    <Spielfeld
                        selectedPerson={selectedPerson}
                        setSelectedPerson={setSelectedPerson}
                        camels={camels}
                        setCamels={setCamels}
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
