import Seat from './Seat.jsx'


export default function SeatGroup({groupId, seats, activePersonSeat, setActivePersonSeat, setGroups}) {

  return (
      <div className={ `SeatGroup ${groupId}`}>
        {seats.map((person, index) => ( 
          <Seat 
            key={`${groupId}-Seat-${index}`}
            groupId={groupId}
            seatIndex={index}
            person={person}
            activePersonSeat={activePersonSeat}
            setActivePersonSeat={setActivePersonSeat}
            setGroups={setGroups}
          />  
        ))}
      </div>
  );
}