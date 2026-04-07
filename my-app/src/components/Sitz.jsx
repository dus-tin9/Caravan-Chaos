import { getPersonImageUrl } from '@/lib/personImage'

export default function Sitz({occupant}) {

    const imageurl = occupant
        ? getPersonImageUrl(occupant)
        : `/src/assets/people/placeholder.svg`
    
    return(
        <div className={`Sitz ${occupant ? "besetzt" : "frei" }`}>
            <img  
                src={imageurl}
                height={60}
                width={60}/>
        </div>

    )
}
