import { useDrop } from "react-dnd"
import Person from "./Person.jsx"

export default function Seat({ groupId, seatIndex, person, setGroups }) {

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item) =>{
      setGroups((prevGroups) => {
        const newGroups = structuredClone(prevGroups);

        newGroups[item.fromGroupId][item.fromSeatIndex] = null;
        newGroups[groupId][seatIndex] = item.id;

        return newGroups;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })); 

    return(
        <div ref={drop} className={`Seat ${ person ? "taken" : isOver ? "hovered" : "free" }`}>
          {person && <Person 
                      id={person} 
                      groupId={groupId} 
                      seatIndex={seatIndex}
                      />
          }
        </div>
    );
}