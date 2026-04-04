import { Card, CardContent } from '@/components/ui/card'

export default function Bahnhof_Display({person}){

    const imageurl = `/src/assets/people/${person.name}.svg`

    return(
        <Card size="sm" className="w-full border-border/70 bg-background/60 py-0">
            <CardContent className="grid grid-cols-[72px_1fr] gap-3 p-3 text-left">
                <img
                    src={imageurl}
                    alt={person.name}
                    className="h-[72px] w-[72px] rounded-lg border border-border/60 bg-card/70 object-contain"
                    height={72}
                    width={72}
                />

                <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-foreground">{person.name}</h4>
                    {person.needs.length > 0 ? (
                        <ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground">
                            {person.needs.map((need, index) => (
                                <li key={index}>{need}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-1 text-xs text-muted-foreground">Keine besonderen Beduerfnisse</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );


}