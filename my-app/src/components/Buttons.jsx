import { useNavigate } from 'react-router-dom'

import { routes } from '@/lib/routes'

export default function Buttons({ levelId, people }) {
    const navigate = useNavigate()

    function handleEndLevel(){
        let unseated = people.filter( (person) => {return(!person.seated)});
        if (unseated.length > 0) return;
        else navigate(routes.levelById(levelId + 1));
    }

    function handleMainMenu(){
        navigate(routes.main)
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