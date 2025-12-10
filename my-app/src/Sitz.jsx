import { useDroppable } from "@dnd-kit/core"
import Person from "./Person.jsx"

export default function Sitz({ PlatzId, PersonId }) {

    const { setNodeRef, isOver } = useDroppable( { id: PlatzId } );

    return(
        <div className={`Sitz ${PersonId !== null ? "besetzt" : "frei"}`} ref={setNodeRef}>
          {PersonId ? <Person id={PersonId} /> : null}
        </div>
    );
}