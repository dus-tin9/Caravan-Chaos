export default function Buttons({ setSiteState, people, setPeople, seats, setSeats}){

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