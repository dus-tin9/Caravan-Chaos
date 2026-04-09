import { getPersonImageUrl } from '@/lib/personImage'
import { cn } from '@/lib/utils'

export default function Sitz({occupant}) {

    const imageurl = occupant
        ? getPersonImageUrl(occupant)
        : `/src/assets/people/placeholder.svg`
    
    return(
        <div
            className={cn(
                'flex h-20 w-full items-center justify-center rounded-lg border bg-background/80 transition',
                occupant
                    ? 'border-primary/70 shadow-sm shadow-primary/20'
                    : 'border-border/70'
            )}
        >
            <img  
                src={imageurl}
                alt={occupant ? occupant.name : 'Freier Sitz'}
                className="pixelated h-12 w-12 object-contain"
            />
        </div>

    )
}
