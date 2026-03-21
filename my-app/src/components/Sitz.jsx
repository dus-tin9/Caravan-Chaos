export default function Sitz({occupant}) {

    return(
        <div className={`Sitz ${occupant ? "besetzt" : "frei" }`}>
            {occupant ? occupant.name : "Frei" }
        </div>

    )
}
