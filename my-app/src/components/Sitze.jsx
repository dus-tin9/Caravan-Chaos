import Sitz from './Sitz.jsx';

export default function Sitze({ seats, onSeatClick, onSeatPersonClick }) {

    
    return (
        <div className="Sitze">
            {seats.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((seat, colIndex) => (
                        <div
                            key={seat.id}
                            onClick={(e) => {
                                if (seat.occupant) {
                                    e.stopPropagation();
                                    onSeatPersonClick(seat.occupant);
                                } else {
                                    onSeatClick(rowIndex, colIndex);
                                }
                            }}
                        >
                            <Sitz occupant={seat.occupant} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
