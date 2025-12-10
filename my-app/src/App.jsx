import { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import SitzGruppe from './SitzGruppe.jsx'



export default function App() {

  // Initialisiere State mit Sitzverteilung die zum Start des Levels vorgesehen ist; null für unbesetzte Plätze
  const [Gruppen, setGruppen] = useState({  
    Kamel1: [ null,     null,     null,      null,     null,
              null,     null,     null,      null,     null, ],

    Kamel2: [ null,     null,     null,      null,     null,
              null,     null,     null,      null,     null, ],

    Bahnhof:[ null,    "Jan",     null,      null,  "Dustin",
              null,     null, "Jeremy","Mariella",      null, ],
  });

  // Initialisier State mit gerade gedraggter Person
  const [activePerson, setActivePerson] = useState(null);

  function handleDragStart(event) {
    setActivePerson(event.active.id);
  }

  function handleDragEnd(event) {
    setActivePerson(null);

    const { active, over } = event;

    // Falls nicht über einem Sitz ändere nichts
    if(!over) return;

    // Hole Platz und Gruppe über der die Person gedroppt wurde
    const [neueGruppenId, neuerPlatzIndexSTR] = over.id.split("-Sitz-");
    const neuerPlatzIndex = parseInt(neuerPlatzIndexSTR, 10);

    // falls alterPlatz in keiner Gruppe gefunden ändere nichts
    const alterPlatz = findeSitzVonPerson(active.id);
    if(!alterPlatz) return;

    const alteGruppenId = alterPlatz.GruppenId;
    const alterPlatzIndex = alterPlatz.index;

    // Falls auf alten Platz verschoben ändere nichts
    if (alteGruppenId === neueGruppenId && alterPlatzIndex === neuerPlatzIndex) return;

    // Erzeuge Kopie um neuen State der Gruppen zuzuweisen
    const neueGruppen = structuredClone(Gruppen);

    // alten Platz leeren
    neueGruppen[alteGruppenId][alterPlatzIndex] = null;

    // Person auf neuen Platz setzen
    neueGruppen[neueGruppenId][neuerPlatzIndex] = active.id;

    // aktualisiere State
    setGruppen(neueGruppen);
  }

  function findeSitzVonPerson(Person){
      for(const [GruppenId, Plätze] of Object.entries(Gruppen)){        // für jede Gruppe
        const index = Plätze.indexOf(Person);                           // Prüfe ob Person in Gruppe
        if (index !== -1){                                              // Wenn Person in Gruppe
          return { GruppenId, index };                                  // return Sitz Index 
        }
      }
      return null;                                                      // Falls Person in keinem Grid return NULL
  }

  return (
    
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>       {/* Drag and Drop Context setzen (In welchem Bereich können Sachen herumgezogen werden) */}
        <div className='Level'>
          <SitzGruppe GruppenId="Kamel1"   Plätze={Gruppen.Kamel1}/>
          <SitzGruppe GruppenId="Kamel2"   Plätze={Gruppen.Kamel2}/>
          <SitzGruppe GruppenId="Bahnhof"  Plätze={Gruppen.Bahnhof}/>
        </div>
  
        <DragOverlay>
          {activePerson ? <Person id={activePerson} /> : null}
        </DragOverlay>
    </DndContext>
  );
}
