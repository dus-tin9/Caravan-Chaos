import { scoreLevel } from '../utils/scoring.js'

export default function Buttons({ setSiteState, setScores, people, camels }) {

  function handleEndLevel() {
    const unseated = people.filter(person => !person.seated)
    if (unseated.length > 0) return
    const results = scoreLevel(people, camels)
    setScores(results)
    setSiteState("LevelRecap")
  }

  function handleMainMenu() {
    setSiteState("MainMenu")
  }

  return (
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
