import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"



export default function Person({ id }){

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        width: 70,
        height: 70,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: CSS.Transform.toString(transform),
        transition,
        userSelect: "none",
    };

    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            { id }
        </div>
    );
}