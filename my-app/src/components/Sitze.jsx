import Sitz from './Sitz.jsx';

export default function Sitze({ camelId, seats, onSeatClick, onSeatPersonClick }) {
    const numCols = seats[0]?.length ?? 0;

    return (
        <div className="Sitze">
            {Array.from({ length: numCols }, (_, colIndex) => (
                <div key={colIndex} className="SitzeZeile">
                    {seats.map((row, rowIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={(e) => {
                                if (row[colIndex].occupant) {
                                    e.stopPropagation();
                                    onSeatPersonClick(row[colIndex].occupant);
                                } else {
                                    onSeatClick(camelId, rowIndex, colIndex);
                                }
                            }}
                        >
                            <Sitz occupant={row[colIndex].occupant} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
