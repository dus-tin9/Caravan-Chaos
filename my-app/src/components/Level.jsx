import { useEffect, useState } from "react";
import { AlertTriangle } from 'lucide-react'
import Bahnhof from './Bahnhof.jsx'
import Spielfeld from './Spielfeld.jsx'
import Infofeld from './Infofeld.jsx'
import Buttons from './Buttons.jsx'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
  const { people: initialPeople, camels: initialCamels } = buildInitialState(
    levelData ?? { people: [], camels: [] }
  );

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
    if (!levelData) return
    localStorage.setItem('lastPlayedLevel', levelId);
  }, [levelId, levelData]);

  // jedes Mal, wenn sich die Personen oder die Kamele ändern, speichere sie im localStorage
  useEffect(() => {
    if (!levelData) return
    localStorage.setItem(peopleKey, JSON.stringify(people));
    localStorage.setItem(camelsKey, JSON.stringify(camels));
  }, [people, camels, peopleKey, camelsKey, levelData]);

  if (!levelData) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <Card className="w-full max-w-xl border-border/60 bg-card/70 shadow-xl shadow-foreground/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="size-5" />
              Level {levelId} nicht gefunden
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Bitte waehle ein vorhandenes Level aus der Levelauswahl.
          </CardContent>
        </Card>
      </main>
    )
  }

  return(
    <main
      className="relative min-h-screen w-full overflow-hidden px-4 py-4 md:px-6 md:py-6"
      style={{
        background:
          'radial-gradient(circle at top, var(--background) 0%, var(--card) 52%, var(--secondary) 100%)',
      }}
    >
      <div className='pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2  bg-primary/20 blur-3xl' />
      <div className='pointer-events-none absolute bottom-8 left-8 h-44 w-44  bg-accent/25 blur-2xl' />
      <div className='pointer-events-none absolute right-8 top-16 h-52 w-52  bg-secondary/45 blur-3xl' />
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] opacity-20 dark:opacity-10' />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-4 md:grid-cols-[minmax(260px,1fr)_minmax(620px,2.2fr)_minmax(260px,1fr)] md:grid-rows-[auto_1fr]">
        <Bahnhof
          className="md:col-start-1 md:row-span-2"
          setSelectedPerson={setSelectedPerson}
          selectedPerson={selectedPerson}
          people={people}
        />

        <Buttons
          className="md:col-start-2 md:row-start-1"
          levelId={levelId}
          people={people}
          camels={camels}
          setPeople={setPeople}
          setCamels={setCamels}
        />

        <Spielfeld
          className="md:col-start-2 md:row-start-2"
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          camels={camels}
          setCamels={setCamels}
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
