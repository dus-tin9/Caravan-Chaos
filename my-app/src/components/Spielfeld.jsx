
import { TentTree } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Kamel from './Kamel.jsx'

export default function Spielfeld({
    className,
    selectedPerson,
    setSelectedPerson,
    seats,
    setSeats,
    setPeople,
}){

    // Person die bereits auf Sitz sitzt entfernen um sie neu zu platzieren
    const removePersonFromSeats = (grid, personId) => {
        return grid.map((row) =>
            row.map((seat) => {
                if (seat.occupant?.id === personId) {
                    return { ...seat, occupant: null };
                }
                return seat;
            })
        );
    };


    // Wenn auf einen Leeren Platz gedrückt wird
    const handleSeatClick = (rowIndex, colIndex) => {
        // Es muss eine Person ausgewählt sein
        if (!selectedPerson) return;
        
        // Ändere Plätze ab 
        setSeats((prevSeats) => {
            // Person von altem Platz entfernen
            let updated = removePersonFromSeats(prevSeats, selectedPerson.id);

            // Person auf neuen Platz setzen
            return updated.map((row, rIdx) =>
                row.map((seat, cIdx) => {
                    if (rIdx === rowIndex && cIdx === colIndex && !seat.occupant) {
                        return { ...seat, occupant: selectedPerson };
                    }
                return seat;
                })
            )
        });

        // Person als seated markieren
        setPeople((prevPeople) =>
            prevPeople.map((person) =>
                person.id === selectedPerson.id
                    ? { ...person, seated: true }
                    : person
            )
);
        
    }

    // Wenn auf besetzten Sitz gedrückt wird
    const handleSeatPersonClick = (person) => {
        setSelectedPerson(person);
    };

    return(
            <Card className={cn('border-border/70 bg-card/70 backdrop-blur md:h-full', className)}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <TentTree className="size-5" />
                        Kamel
                    </CardTitle>
                    <CardDescription>
                        {selectedPerson
                            ? `${selectedPerson.name} ist ausgewaehlt. Klicke auf einen freien Sitz.`
                            : 'Waehle zuerst eine Person am Bahnhof und klicke dann auf einen freien Sitz.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                    <Kamel
                            seats={seats}
                            onSeatClick={handleSeatClick}
                            onSeatPersonClick={handleSeatPersonClick}
                    />
                </CardContent>
            </Card>

    );
}