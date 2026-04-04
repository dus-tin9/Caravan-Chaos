import { Info } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Infofeld({ className, selectedPerson }) {

    return (
        <Card className={cn('border-border/70 bg-card/70 backdrop-blur md:h-full', className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="size-5" />
                    Infofeld
                </CardTitle>
                <CardDescription>
                    Zeigt Details zur aktuell ausgewaehlten Person.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {selectedPerson ? (
                    <div className="rounded-xl border border-border/70 bg-background/65 p-4">
                        <p className="text-sm">
                            <strong>Name:</strong> {selectedPerson.name}
                        </p>
                        <p className="mt-3 text-sm font-semibold text-foreground">Needs:</p>
                        {selectedPerson.needs.length > 0 ? (
                            <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">
                                {selectedPerson.needs.map((need, index) => (
                                    <li key={index}>{need}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-1 text-sm text-muted-foreground">Keine Beduerfnisse eingetragen</p>
                        )}
                    </div>
                ) : (
                    <p className="rounded-xl border border-dashed border-border/70 bg-background/60 p-4 text-sm text-muted-foreground">
                        Keine Person ausgewaehlt.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}