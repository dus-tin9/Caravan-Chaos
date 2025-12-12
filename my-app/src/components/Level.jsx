import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SeatGroup from './SeatGroup.jsx'


export default function Level() {

  // Initialisiere State mit Sitzverteilung die zum Start des Levels vorgesehen ist; null für unbesetzte Plätze
  const [groups, setGroups] = useState({
    Station:[ null,      "J",     null,      null,      "D",
              null,     null,      "G",       "M",      null,],

    Camel1: [ null,     null,     null,      null,     null,
              null,     null,     null,      null,     null, ],

    Camel2: [ null,     null,     null,      null,     null,
              null,     null,     null,      null,     null, ],
  });

    return(    
    <div className='Level'>
        <DndProvider backend={HTML5Backend}>
          {Object.entries(groups).map(([groupId, seats]) => (      
            <SeatGroup
                key={groupId} 
                groupId={groupId} 
                seats={seats} 
                setGroups={setGroups}
            />
          ))}
        </DndProvider>
    </div>
  );

}