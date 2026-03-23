export default function Infofeld({ selectedPerson }){

    return(
        <div className="Infofeld">
            <h2>Infofeld</h2>
            {
                selectedPerson ? (
                    <div>
                        <p><strong>Name:</strong> {selectedPerson.name}</p>
                        <p>Status: Ausgewählt</p>
                    </div>
                ) : ( 
                    <p>Keine Person ausgewählt</p>
                )
            }
        </div>
    )
}