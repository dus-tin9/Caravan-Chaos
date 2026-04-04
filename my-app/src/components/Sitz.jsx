import { cn } from '@/lib/utils'

export default function Sitz({occupant}) {

    const imageurl = occupant
    ? `/src/assets/people/${occupant.name}.svg`
    : `/src/assets/people/placeholder.svg`
    
    return(
        <div
            className={cn(
                'flex h-20 w-full items-center justify-center rounded-lg border transition',
                occupant
                    ? 'border-primary/70 bg-secondary/55 shadow-sm shadow-primary/20'
                    : 'border-border/70 border-dashed bg-background/70'
            )}
        >
            <img  
                src={imageurl}
                alt={occupant ? occupant.name : 'Freier Sitz'}
                className="h-14 w-14 object-contain"
                height={56}
                width={56}
            />
        </div>

    )
}
