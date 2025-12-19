import { useDrag } from "react-dnd";


export default function Person({ id, groupId, rowIndex, seatIndex }){

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PERSON",
    item: { id, fromGroupId: groupId, fromRowIndex:rowIndex, fromSeatIndex: seatIndex },
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