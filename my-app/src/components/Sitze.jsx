import Sitz from './Sitz.jsx';

export default function Sitze({ camelId, seats, onSeatClick, onSeatPersonClick }) {
    const numCols = seats[0]?.length ?? 0;

    return (
        <div className="Sitze">
            {Array.from({ length: numCols }, (_, colIndex) => (
                <div key={colIndex} className="SitzeZeile">
                    {seats.map((row, rowIndex) => {
                        const seat = row[colIndex];
                        return (
                            <div
                                key={seat.id}
                                onClick={(e) => {
                                    if (seat.occupant) {
                                        e.stopPropagation();
                                        onSeatPersonClick(seat.occupant);
                                    } else {
                                        onSeatClick(camelId, rowIndex, colIndex);
                                    }
                                }}
                            >
                                <Sitz occupant={seat.occupant} />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
