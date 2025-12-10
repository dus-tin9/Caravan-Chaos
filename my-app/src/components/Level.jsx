import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SeatGroup from './SeatGroup.jsx'


export default function Level() {

  // Initialisiere State mit Sitzverteilung die zum Start des Levels vorgesehen ist; null für unbesetzte Plätze
  const [groups, setGroups] = useState({  
    Camel1: [ null,     null,     null,      null,     null,
              null,     null,     null,      null,     null, ],

    Camel2: [ null,     null,     null,      null,     null,
              null,     null,     null,      null,     null, ],

    Station:[ null,    "Jan",     null,      null,  "Dustin",
              null,     null, "Jeremy","Mariella",      null, ],
  });

  // Person bewegen
  function movePerson(personId, targetGridId, targetSeatIndex) {
    const newGroups = [...groups];

    // Sitz der Person suchen und leeren
    Object.entries(newGroups).forEach( ([gridId, seats]) => { 
      seats.forEach( ( seat, seatIndex) => {
        if(seat === personId) {
          newGroups[gridId][seatIndex] = null;
          }
        }
      )
    });

    // Person an neuem Sitz eintragen
    newGroups[targetGridId][targetSeatIndex] = personId;

    // State mit neuer Sitzordnung aktualisieren
    setGroups(newGroups);
  }
    
    return(    
    <div className='Level'>
        <DndProvider backend={HTML5Backend}>
          {Object.entries(groups).map(([groupId, seats]) => (      
            <SeatGroup
                key={groupId} 
                groupId={groupId} 
                seats={seats} 
                movePerson={movePerson}
            />
          ))}
        </DndProvider>
    </div>
  );

}