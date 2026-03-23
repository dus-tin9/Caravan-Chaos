export default function Infofeld({selectedPerson}){


return(
<div className="Infofeld">
    <h2>Infofeld</h2>
    {selectedPerson ? (
            <div>
                <p><strong>Name:</strong> {selectedPerson.name}</p>
                <p><strong>Needs:</strong> 
                    <ul>
                    {selectedPerson.needs.map((need, index) => 
                    <li key={index}> {need}</li>
                    )}
                    </ul>
                </p>
            </div>
        ) : 
        ( <p>Keine Person ausgewählt</p>)
    }

</div>

)



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