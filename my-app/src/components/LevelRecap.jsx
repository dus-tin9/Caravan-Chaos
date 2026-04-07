import { RotateCcw, Home, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'
import { saveHighscoreIfBetter, calcTotal } from '@/lib/highscore'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LevelRecap() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { levelId } = useParams()
  const scores = state?.scores ?? []
  const people = state?.people ?? []
  const camels = state?.camels ?? []

  const total = calcTotal(scores)
  const max = scores.length * 100

  const [isNewHighscore, setIsNewHighscore] = useState(false)

  useEffect(() => {
    if (scores.length === 0) return
    const { isNew } = saveHighscoreIfBetter(Number(levelId), scores, people, camels)
    setIsNewHighscore(isNew)
  }, [])

  return (
    <main
      className='relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10'
      style={{
        background:
          'radial-gradient(circle at top, var(--background) 0%, var(--card) 52%, var(--secondary) 100%)',
      }}
    >
      <div className='pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl' />
      <div className='pointer-events-none absolute bottom-8 left-8 h-44 w-44 rounded-full bg-accent/25 blur-2xl' />
      <div className='pointer-events-none absolute right-8 top-16 h-52 w-52 rounded-full bg-secondary/45 blur-3xl' />

      <Card className='relative z-10 w-full max-w-xl border-border/60 bg-card/70 shadow-2xl shadow-foreground/10 backdrop-blur-xl'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center gap-3'>
            <CardTitle className='text-4xl font-semibold tracking-tight text-foreground md:text-5xl'>
              Level Complete!
            </CardTitle>
            {isNewHighscore && (
              <span className='flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground'>
                <Trophy className='size-3.5' />
                Neuer Rekord!
              </span>
            )}
          </div>
          <p className='text-sm text-muted-foreground'>Gesamt: {total} / {max}</p>
        </CardHeader>

        <CardContent className='grid gap-4 pb-6'>
          <ul className='divide-y divide-border/50 rounded-xl border border-border/40 bg-background/40 px-4'>
            {scores.map(s => (
              <li key={s.id} className='flex items-center justify-between py-2 text-sm'>
                <span className='text-foreground'>{s.name}</span>
                <span className='font-semibold text-foreground'>{s.score} / 100</span>
              </li>
            ))}
          </ul>

          <Button
            size='lg'
            className='h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-foreground/20 backdrop-blur hover:bg-primary/85'
            onClick={() => navigate(routes.levelById(levelId))}
          >
            <RotateCcw className='size-4' />
            Spielstand wiederherstellen
          </Button>

          <Button
            variant='outline'
            size='lg'
            className='h-12 rounded-xl border-border bg-background/70 text-foreground backdrop-blur hover:bg-card'
            onClick={() => navigate(routes.main)}
          >
            <Home className='size-4' />
            Main Menu
          </Button>
        </CardContent>
      </Card>

      <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] opacity-20 dark:opacity-10' />
    </main>
  )
}
