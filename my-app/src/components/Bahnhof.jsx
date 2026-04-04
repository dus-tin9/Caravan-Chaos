import { Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Bahnhof_Display from "./Bahnhof_Display";

export default function Bahnhof({ className, setSelectedPerson, people }) {
    const waitingPeople = people.filter((person) => !person.seated)

    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
    };

return(
    <Card className={cn('border-border/70 bg-card/70 backdrop-blur md:h-full', className)}>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="size-5" />
                Bahnhof
            </CardTitle>
            <CardDescription>
                Waehle eine wartende Person ({waitingPeople.length}) und setze sie auf einen freien Sitz.
            </CardDescription>
        </CardHeader>

        <CardContent className="grid max-h-[70vh] gap-3 overflow-y-auto pb-4 md:max-h-none">
            {waitingPeople.length === 0 ? (
                <p className="rounded-lg border border-border/70 bg-background/60 p-3 text-sm text-muted-foreground">
                    Alle Personen sitzen bereits.
                </p>
            ) : (
                waitingPeople.map((person) => (
                    <Button
                        key={person.id}
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-xl p-0 hover:bg-background/60"
                        onClick={() => handleSelectPerson(person)}
                    >
                        <Bahnhof_Display person={person} />
                    </Button>
                ))
            )}
        </CardContent>
    </Card>

);
}