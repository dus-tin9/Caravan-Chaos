import { useDrop } from "react-dnd"
import Person from "./Person.jsx"

export default function Sitz({ groupId, seatIndex, person, movePerson }) {

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item) =>{
      movePerson(item.id, groupId, seatIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })); 

    return(
        <div ref={drop} className={`Seat ${ person ? "taken" : isOver ? "hovered" : "free" }`}>
          {person && <Person id={person}/>}
        </div>
    );
}