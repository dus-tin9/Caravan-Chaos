
import Kamel from './Kamel.jsx'
import { Layers } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Spielfeld({ className, selectedPerson, setSelectedPerson, camels, setCamels, setPeople }){

    // Person die bereits auf einem Sitz sitzt über alle Kamele hinweg entfernen
    const removePersonFromCamels = (prevCamels, personId) => {
        return prevCamels.map(camel => ({
            ...camel,
            grid: camel.grid.map(row =>
                row.map(seat =>
                    seat.occupant?.id === personId ? { ...seat, occupant: null } : seat
                )
            )
        }));
    };

    // Wenn auf einen leeren Platz gedrückt wird
    const handleSeatClick = (camelId, rowIndex, colIndex) => {
        // Es muss eine Person ausgewählt sein
        if (!selectedPerson) return;

        setCamels(prevCamels => {
            // Person von altem Platz entfernen
            let updated = removePersonFromCamels(prevCamels, selectedPerson.id);

            // Person auf neuen Platz setzen
            return updated.map(camel => {
                if (camel.id !== camelId) return camel;
                return {
                    ...camel,
                    grid: camel.grid.map((row, rIdx) =>
                        row.map((seat, cIdx) => {
                            if (rIdx === rowIndex && cIdx === colIndex && !seat.occupant) {
                                return { ...seat, occupant: selectedPerson };
                            }
                            return seat;
                        })
                    )
                };
            });
        });

        // Person als seated markieren
        setPeople(prevPeople =>
            prevPeople.map(person =>
                person.id === selectedPerson.id ? { ...person, seated: true } : person
            )
        );
    };

    // Wenn auf besetzten Sitz gedrückt wird
    const handleSeatPersonClick = (person) => {
        setSelectedPerson(person);
    };

        return(
            <Card className={cn('border-border/60 bg-card/70 shadow-xl shadow-foreground/10 backdrop-blur-xl', className)}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                        <Layers className="size-5" />
                        Spielfeld
                    </CardTitle>
                </CardHeader>

                <CardContent className="max-h-[64vh] overflow-y-auto pb-6">
                    <div className="grid gap-4 rounded-xl border border-border/70 bg-background/55 p-3">
                        {camels.map(camel => (
                            <Kamel
                                key={camel.id}
                                camelId={camel.id}
                                seats={camel.grid}
                                onSeatClick={handleSeatClick}
                                onSeatPersonClick={handleSeatPersonClick}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
}
