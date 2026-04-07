import Sitz from './Sitz.jsx';

export default function Sitze({ camelId, seats, onSeatClick, onSeatPersonClick }) {
    return (
        <div className="Sitze">
            <div className="SitzeZeile">
                <div className="SitzeLabel" />
                {seats[0]?.map((_, colIndex) => (
                    <div key={colIndex} className="SitzeLabel">c{colIndex + 1}</div>
                ))}
            </div>
            {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="SitzeZeile">
                    <div className="SitzeLabel">r{rowIndex + 1}</div>
                    {row.map((seat, colIndex) => (
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
                    ))}
                </div>
            ))}
        </div>
    );
}
