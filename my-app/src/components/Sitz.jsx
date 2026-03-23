export default function Sitz({occupant}) {

    const imageurl = occupant
    ? `/src/assets/people/${occupant.name}.svg`
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
