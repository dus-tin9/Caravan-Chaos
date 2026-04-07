import { ArrowLeft, Trophy } from 'lucide-react'
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

export default function HighscorePage() {
  const navigate = useNavigate()

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center px-4 py-10"
      style={{
        background:
          'radial-gradient(circle at top, var(--background) 0%, var(--card) 52%, var(--secondary) 100%)',
      }}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-44 w-44 rounded-full bg-accent/25 blur-2xl" />

      <Card className="relative z-10 w-full max-w-2xl border-border/60 bg-card/70 shadow-2xl shadow-foreground/10 backdrop-blur-xl">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-2 text-3xl font-semibold text-foreground md:text-4xl">
            <Trophy className="size-6" />
            Highscore
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Die besten Ergebnisse deiner bisherigen Reisen.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 pb-6">
          <div className="rounded-xl border border-border/70 bg-background/65 p-6 text-center text-muted-foreground">
            Noch keine Ergebnisse gespeichert.
          </div>

          <Button
            variant="secondary"
            className="h-11 gap-2 rounded-xl"
            onClick={() => navigate(routes.main)}
          >
            <ArrowLeft className="size-4" />
            Zurück zum Main Menu
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
