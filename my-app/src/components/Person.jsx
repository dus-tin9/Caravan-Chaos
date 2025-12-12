import { useDrag } from "react-dnd";


export default function Person({ id }){
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PERSON",
    item: {id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }));

  return(
    <div ref={drag} className={`Person ${isDragging ? "moving" : "seated"}`}>
      { id }
    </div>
  );
}