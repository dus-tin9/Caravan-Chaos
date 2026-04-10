import { ArrowLeft, Map } from 'lucide-react'
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

const levelModules = import.meta.glob('../assets/Level/Level*.json', { eager: true })

const levels = Object.values(levelModules)
  .map(m => m.default ?? m)
  .sort((a, b) => a.id - b.id)

export default function LevelSelect() {
  const navigate = useNavigate()

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center px-4 py-10"
      style={{
        background:
          'radial-gradient(circle at top, var(--background) 0%, var(--card) 52%, var(--secondary) 100%)',
      }}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2  bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 left-8 h-44 w-44  bg-accent/25 blur-2xl" />

      <Card className="relative z-10 w-full max-w-2xl border-border/60 bg-card/70 shadow-2xl shadow-foreground/10 backdrop-blur-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-2 text-3xl font-semibold text-foreground md:text-4xl">
            <Map className="size-6" />
            Levelauswahl
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Wähle deine nächste Reise.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-3 pb-6">
          {levels.map(level => (
            <Button
              key={level.id}
              variant="default"
              size="lg"
              className="h-14 justify-between "
              onClick={() => navigate(routes.levelById(level.id))}
            >
              <span className="font-medium">{level.name}</span>
              <span className="text-xs text-muted-foreground">
                Level {level.id} · {level.people.length} Personen · {level.camels.length} Kamel{level.camels.length !== 1 ? 'e' : ''}
              </span>
            </Button>
          ))}

          <Button
            variant="default"
            className="mt-2 h-11 gap-2 "
            onClick={() => navigate(routes.main)}
          >
            <ArrowLeft className="size-4" />
            Hauptmenü
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
