export default function Infofeld({selectedPerson}){

    return(
        <div className="Infofeld">
            <h2>Infofeld</h2>
            {selectedPerson ? (
                <div>
                    <p><strong>Name:</strong> {selectedPerson.name}</p>
                    <p><strong>Needs:</strong></p>
                    <ul>
                        {selectedPerson.needs.map((need, index) =>
                            <li key={index}>{need.name}</li>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Keine Person ausgewählt</p>
            )}
        </div>
    );
}
