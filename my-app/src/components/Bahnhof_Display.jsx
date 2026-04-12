import { getPersonImageUrl } from '@/lib/personImage'
import { cn } from '@/lib/utils'

export default function Bahnhof_Display({ person, isSelected = false }){

    const imageurl = getPersonImageUrl(person)
    const needs = person.needs ?? []

    return(
        <div
            className={cn(
                ' border bg-background/65 p-3 transition-all',
                isSelected
                    ? 'border-tertiary/70 shadow-md shadow-primary/20'
                    : 'border-border/70'
            )}
        >
            <div className="grid grid-cols-[72px_1fr] items-start gap-3">
                <div className="flex h-[72px] w-[72px] items-center justify-center g border border-border/70 bg-card/70">
                    <img
                        src={imageurl}
                        alt={person.name}
                        className="pixelated h-14 w-14 object-contain"
                    />
                </div>

                <div className="min-w-0 space-y-2">
                    <h4 className="truncate text-sm font-semibold text-foreground">{person.name}</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {needs.length > 0 ? (
                            needs.map((need, index) => (
                                <span
                                    key={index}
                                    className=" border border-border/60 bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                    {need.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-muted-foreground">Keine Needs</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );


}