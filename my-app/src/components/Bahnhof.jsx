import { TrainFront } from 'lucide-react'

import Bahnhof_Display from './Bahnhof_Display'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Bahnhof({ className, setSelectedPerson, selectedPerson, people }) {
    const waitingPeople = people.filter(person => !person.seated)

    return(
        <Card className={cn('border-border/60 bg-card/70 shadow-xl shadow-foreground/10 backdrop-blur-xl', className)}>
            <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
                    <TrainFront className="size-5" />
                    Bahnhof
                </CardTitle>
                <CardDescription>
                    {waitingPeople.length} wartende {waitingPeople.length === 1 ? 'Person' : 'Personen'}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="max-h-[64vh] space-y-3 overflow-y-auto pr-1">
                    {waitingPeople.length > 0 ? (
                        waitingPeople.map(person => (
                            <button
                                type="button"
                                key={person.id}
                                className="block w-full rounded-xl text-left focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                                onClick={() => setSelectedPerson(person)}
                            >
                                <Bahnhof_Display
                                    person={person}
                                    isSelected={selectedPerson?.id === person.id}
                                />
                            </button>
                        ))
                    ) : (
                        <p className="rounded-xl border border-border/70 bg-background/65 p-3 text-sm text-muted-foreground">
                            Alle Personen sitzen bereits.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}