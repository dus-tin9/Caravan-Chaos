import Sitz from './Sitz.jsx';

export default function Sitze({ camelId, seats, onSeatClick, onSeatPersonClick }) {
    const columns = (seats[0]?.length ?? 0) + 1

    return (
        <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.max(columns, 1)}, minmax(0, 1fr))` }}
        >
            <div className="flex h-10 items-center justify-center text-xs font-semibold text-muted-foreground" />
            {seats[0]?.map((_, colIndex) => (
                <div
                    key={`header-${colIndex}`}
                    className="flex h-10 items-center justify-center text-xs font-semibold text-muted-foreground"
                >
                    c{colIndex + 1}
                </div>
            ))}

            {seats.map((row, rowIndex) => (
                <div key={`row-group-${rowIndex}`} className="contents">
                    <div
                        className="flex h-20 items-center justify-center text-xs font-semibold text-muted-foreground"
                    >
                        r{rowIndex + 1}
                    </div>
                    {row.map((seat, colIndex) => (
                        <button
                            type="button"
                            key={seat.id}
                            className="rounded-xl border border-border/60 bg-card/65 p-1 text-left transition hover:bg-card focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
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
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}
