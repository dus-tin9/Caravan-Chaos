import Seat from './Seat.jsx'


export default function SeatGroup({groupId, seats, movePerson}) {

  return (
      <div className={ `SeatGroup ${groupId}`}>
        {seats.map((person, index) => ( 
          <Seat 
            key={`${groupId}-Seat-${index}`}
            groupId={groupId}
            seatIndex={index}
            person={person}
            movePerson={movePerson}
          />  
        ))}
      </div>
  );
}