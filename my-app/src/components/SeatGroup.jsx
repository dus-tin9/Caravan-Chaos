import SeatRow from './SeatRow.jsx'


export default function SeatGroup({groupId, seats, setGroups}) {

  return (
      <div className={ `SeatGroup ${groupId}`}>
        {seats.map((row, index) => ( 
          <SeatRow 
            key={`${groupId}-Row-${index}`}
            groupId={groupId}
            rowSeats={row}
            rowIndex={index}
            setGroups={setGroups}
          />  
        ))}
      </div>
  );
}