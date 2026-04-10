import {
  ArrowLeft,
  CircleHelp,
  Languages,
  Moon,
  Settings2,
  Sun,
  Volume2,
} from 'lucide-react'
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
import { useTheme } from '@/lib/theme.jsx'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { isDark, toggleTheme, theme } = useTheme()

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

      <Card variant="page" className="relative z-10 w-full max-w-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-2 text-3xl font-semibold text-foreground md:text-4xl">
            <Settings2 className="size-6" />
            Einstellungen
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Passe Darstellung und Spieloptionen für deine Karawane an.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 pb-6">
          <Card variant="inset" size="sm" className="gap-3 p-4">
            <p className="mb-3 text-sm font-medium text-foreground">Darstellung</p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">
               {theme === 'dark' ? 'Dark' : 'Light'} Mode 
              </span>
              <Button
                variant="toggle"
                size="icon"
                className="size-11 "
                onClick={toggleTheme}
              >
                {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
            </div>
          </Card>

          <div className="grid gap-3 md:grid-cols-3">
            <Button
              variant="default"
              className="h-11 justify-start gap-2 "
              onClick={() => alert('Sound-Optionen folgen bald.')}
            >
              <Volume2 className="size-4" />
              Sound
            </Button>

            <Button
              variant="default"
              className="h-11 justify-start gap-2 "
              onClick={() => alert('Gameplay-Hilfen folgen bald.')}
            >
              <CircleHelp className="size-4" />
              Gameplay-Hilfen
            </Button>

            <Button
              variant="default"
              className="h-11 justify-start gap-2 "
              onClick={() => alert('Spracheinstellungen folgen bald.')}
            >
              <Languages className="size-4" />
              Sprache
            </Button>
          </div>

          <div>
            <Button
              variant="default"
              className="h-11 gap-2 "
              onClick={() => navigate(routes.main)}
            >
              <ArrowLeft className="size-4" />
              Hauptmenü
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
