import { useNavigate } from 'react-router-dom'

import { routes } from '@/lib/routes'
import { scoreLevel } from '../utils/scoring.js'

export default function Buttons({ levelId, people, camels, setPeople, setCamels }) {
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

  function handleReset() {
    setPeople(prev => prev.map(p => ({ ...p, seated: false })))
    setCamels(prev => prev.map(camel => ({
      ...camel,
      grid: camel.grid.map(row => row.map(seat => ({ ...seat, occupant: null })))
    })))
  }

  return (
    <div className="Buttons">
      <button onClick={handleMainMenu}>Main Menu</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleEndLevel}>End Level</button>
    </div>
  )
}
