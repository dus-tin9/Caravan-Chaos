import Sitz from './Sitz.jsx';

export default function Sitze({ seats, onSeatClick, onSeatPersonClick }) {
    const columns = seats[0]?.length ?? 1

    return (
        <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            {seats.map((row, rowIndex) => (
                row.map((seat, colIndex) => (
                    <button
                        type="button"
                        key={seat.id}
                        className="rounded-xl border border-border/60 bg-card/65 p-1 text-left transition hover:bg-card focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                        onClick={() => {
                            if (seat.occupant) {
                                onSeatPersonClick(seat.occupant);
                            } else {
                                onSeatClick(rowIndex, colIndex);
                            }
                        }}
                    >
                        <Sitz occupant={seat.occupant} />
                    </button>
                ))
            ))}
        </div>
    );
}
