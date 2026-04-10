import Sitz from './Sitz.jsx';
import { Button } from '@/components/ui/button'

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
                        <Button
                            type="button"
                            variant="person"
                            key={seat.id}
                            className="h-20 w-full rounded-xl p-1 text-left"
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
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    );
}
