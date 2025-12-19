import Seat from './Seat.jsx'

export default function SeatRow({groupId, rowSeats, rowIndex, setGroups}){

  return(
    <div className={`SeatRow ${rowIndex}`}>
      {rowSeats.map((personId, seatIndex) => (
          <Seat
            key={`${groupId}-Row-${rowIndex}-Seat-${seatIndex}`}
            groupId={groupId}
            rowIndex={rowIndex}
            seatIndex={seatIndex}
            personId={personId}
            setGroups={setGroups}
          />
       ))} 
    </div>
  )
} 