import { useDrop } from "react-dnd"
import Person from "./Person.jsx"

export default function Seat({ groupId, rowIndex, seatIndex, personId, setGroups }) {

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item) =>{
      setGroups((prevGroups) => {
        const newGroups = structuredClone(prevGroups);

        newGroups[item.fromGroupId][item.fromRowIndex][item.fromSeatIndex] = null;
        newGroups[groupId][rowIndex][seatIndex] = item.id;

        return newGroups;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })); 

    return(
        <div ref={drop} className={`Seat ${ personId ? "taken" : isOver ? "hovered" : "free" }`}>
          {personId && <Person 
                        id={personId} 
                        groupId={groupId}
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        />
          }
        </div>
    );
}