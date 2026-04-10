import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { routes } from '@/lib/routes'
import { getAllHighscores, restoreHighscoreState } from '@/lib/highscore'

export default function HighscorePage() {
  const navigate = useNavigate()
  const highscores = getAllHighscores()

  function handleRestore(hs) {
    restoreHighscoreState(hs)
    navigate(routes.levelById(hs.levelId))
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10"
      style={{
        background:
          'radial-gradient(circle at top, var(--background) 0%, var(--card) 52%, var(--secondary) 100%)',
      }}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2  bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-44 w-44  bg-accent/25 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] opacity-20 dark:opacity-10" />

      <Button
        variant="default"
        className="fixed left-4 top-4 z-50 h-10 gap-2 "
        onClick={() => navigate(routes.main)}
      >
        <ArrowLeft className="size-4" />
        Hauptmenü
      </Button>

      <Card variant="page" className="relative z-10 w-full max-w-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-2 text-3xl font-semibold text-foreground md:text-4xl">
            <Trophy className="size-6" />
            Highscore
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Die besten Ergebnisse deiner bisherigen Reisen.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 pb-6">
          {highscores.length === 0 ? (
            <div className=" border border-border/70 bg-background/65 p-6 text-center text-muted-foreground">
              Noch keine Ergebnisse gespeichert.
            </div>
          ) : (
            highscores.map(hs => (
              <div
                key={hs.levelId}
                className=" border border-border/50 bg-background/40 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold text-foreground">Level {hs.levelId}</span>
                  <span className="text-lg font-bold text-foreground">{hs.total} / {hs.max}</span>
                </div>

                <ul className="mb-3 divide-y divide-border/40">
                  {hs.scores.map(s => (
                    <li key={s.id} className="flex items-center justify-between py-1 text-sm">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="font-medium text-foreground">{s.score} / 100</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="default"
                  size="sm"
                  className="w-full g"
                  onClick={() => handleRestore(hs)}
                >
                  <RotateCcw className="size-3.5" />
                  Spielstand Laden
                </Button>
              </div>
            ))
          )}

        </CardContent>
      </Card>
    </main>
  )
}
