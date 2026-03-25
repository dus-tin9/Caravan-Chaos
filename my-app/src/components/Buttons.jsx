export default function Buttons({ setSiteState, people, setPeople, seats, setSeats}){

    // Wenn alle Personen geseated dann spring zu level recap seite
    function handleEndLevel(){
        let unseated = people.filter( (person) => {return(!person.seated)});
        if (unseated.length > 0) return;
        else setSiteState("LevelRecap");
    }

    function handleMainMenu(){
        setSiteState("MainMenu");
    }
    
    return(
    <div className="Buttons">
        <button onClick={handleMainMenu}>
            Main Menu
        </button>
        <button onClick={handleEndLevel}>
            End Level
        </button>
    </div>
    )

}