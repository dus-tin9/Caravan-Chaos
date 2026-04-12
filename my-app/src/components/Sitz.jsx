import { getPersonImageUrl } from '@/lib/personImage'
import { cn } from '@/lib/utils'

export default function Sitz({occupant, selectedPerson}) {

    const imageurl = occupant
        ? getPersonImageUrl(occupant)
        : `/src/assets/people/placeholder.svg`
    
    function checkSelected(Sitzer){
        if(!selectedPerson) return 0
        if(Sitzer.id === selectedPerson.id) return 1
        return 0
    }

    return(
        <div
            className={cn(
                'flex h-20 w-full items-center justify-center g border bg-background/80 transition',
                occupant
                    ? checkSelected(occupant) 
                        ? 'border-tertiary/70 shadow-sm shadow-primary/20'
                        : 'border-primary/70 shadow-sm shadow-primary/20'
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
