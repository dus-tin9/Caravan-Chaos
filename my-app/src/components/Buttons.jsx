import { Home, RotateCcw, Flag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'
import { scoreLevel } from '../utils/scoring.js'

export default function Buttons({ levelId, people, camels, setPeople, setCamels }) {
  const navigate = useNavigate()

  function handleEndLevel() {
    const unseated = people.filter(person => !person.seated)
    if (unseated.length > 0) return
    const scores = scoreLevel(people, camels)
    navigate(routes.levelRecap(levelId), { state: { scores, people, camels } })
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

  const unseated = people.filter(p => !p.seated).length

  return (
    <div className="Buttons">
      <Button
        variant='outline'
        className='rounded-xl border-border bg-background/70 text-foreground backdrop-blur hover:bg-card'
        onClick={handleMainMenu}
      >
        <Home className='size-4' />
        Main Menu
      </Button>

      <Button
        variant='outline'
        className='rounded-xl border-border bg-background/70 text-foreground backdrop-blur hover:bg-card'
        onClick={handleReset}
      >
        <RotateCcw className='size-4' />
        Reset
      </Button>

      <Button
        className='rounded-xl bg-primary text-primary-foreground shadow-lg shadow-foreground/20 backdrop-blur hover:bg-primary/85 disabled:opacity-40'
        onClick={handleEndLevel}
        disabled={unseated > 0}
        title={unseated > 0 ? `Noch ${unseated} Person(en) ohne Platz` : ''}
      >
        <Flag className='size-4' />
        End Level
      </Button>
    </div>
  )
}
