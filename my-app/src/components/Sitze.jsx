import Sitz from './Sitz.jsx';

export default function Sitze({ seats, onSeatClick, onSeatPersonClick }) {
    return (
        <div className="Sitze">
            {seats.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((seat, colIndex) => (
                        <div
                            key={seat.id}
                            onClick={() => onSeatClick(rowIndex, colIndex)}
                        >
                            {seat.occupant ? (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSeatPersonClick(seat.occupant);
                                    }}
                                >
                                    <Sitz occupant={seat.occupant} />
                                </div>
                            ) : (
                                <Sitz occupant={null} />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
