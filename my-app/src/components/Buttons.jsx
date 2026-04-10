import { Home, RotateCcw, Flag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { routes } from '@/lib/routes'
import { scoreLevel } from '../utils/scoring.js'

export default function Buttons({ className, levelId, people, camels, setPeople, setCamels }) {
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

  function handleLevelSelect() {
    navigate(routes.levelSelect)
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
    <Card className={cn('border-border/60 bg-card/70 shadow-xl shadow-foreground/10 backdrop-blur-xl', className)}>
      <CardContent className="flex flex-wrap items-center justify-between gap-3 py-2">
        <p className="text-sm text-muted-foreground">
          {unseated > 0
            ? `${unseated} Person(en) noch nicht platziert`
            : 'Alle Personen sind platziert'}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant='default'
            className='h-11 rounded-xl'
            onClick={handleMainMenu}
          >
            <Home className='size-4' />
            Hauptmenü
          </Button>

          <Button
            variant='default'
            size='lg'
            className='h-12 rounded-xl'
            onClick={handleLevelSelect}
          >
            <Home className='size-4' />
            Zur Levelauswahl
          </Button>

          <Button
            variant='default'
            className='h-11 rounded-xl'
            onClick={handleReset}
          >
            <RotateCcw className='size-4' />
            Zurücksetzen
          </Button>

          <Button
            variant='emphasize'
            className='h-11 rounded-xl disabled:opacity-40'
            onClick={handleEndLevel}
            disabled={unseated > 0}
            title={unseated > 0 ? `Noch ${unseated} Person(en) ohne Platz` : ''}
          >
            <Flag className='size-4' />
            Level beenden
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
