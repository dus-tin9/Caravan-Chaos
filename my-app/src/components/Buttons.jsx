import { useNavigate } from 'react-router-dom'

import { routes } from '@/lib/routes'
import { scoreLevel } from '../utils/scoring.js'

export default function Buttons({ levelId, people, camels }) {
  const navigate = useNavigate()

  function handleEndLevel() {
    const unseated = people.filter(person => !person.seated)
    if (unseated.length > 0) return
    const scores = scoreLevel(people, camels)
    navigate(routes.levelRecap(levelId), { state: { scores } })
  }

  function handleMainMenu() {
    navigate(routes.main)
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
