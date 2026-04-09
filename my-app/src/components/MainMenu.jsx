import { Compass, Map, Settings, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { DEFAULT_LEVEL_ID, routes } from '@/lib/routes'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function MainMenu() {
    const navigate = useNavigate()
    const lastPlayedLevel = Number(localStorage.getItem('lastPlayedLevel')) || DEFAULT_LEVEL_ID

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
                <CardHeader className='space-y-3'>
                    <CardTitle className='text-4xl font-semibold tracking-tight text-foreground md:text-5xl'>
                        Caravan Chaos
                    </CardTitle>
                    <CardDescription className='max-w-md text-base text-muted-foreground'>
                        Finde den besten Platz in der Karawane und starte deine Reise durch das Durcheinander.
                    </CardDescription>
                </CardHeader>

                <CardContent className='grid gap-3 pb-6'>
                    <Button
                        size='lg'
                        className='h-12 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-foreground/20 backdrop-blur hover:bg-primary/85'
                        onClick={() => navigate(routes.levelById(lastPlayedLevel))}
                    >
                        <Compass className='size-4' />
                        Reise fortsetzen
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='h-12 rounded-xl border-border bg-background/70 text-foreground backdrop-blur hover:bg-card'
                        onClick={() => navigate(routes.levelSelect)}
                    >
                        <Map className='size-4' />
                        Levelauswahl
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='h-12 rounded-xl border-border bg-background/70 text-foreground backdrop-blur hover:bg-card'
                        onClick={() => navigate(routes.highscore)}
                    >
                        <Trophy className='size-4' />
                        Highscore
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='h-12 rounded-xl border-border bg-background/70 text-foreground backdrop-blur hover:bg-card'
                        onClick={() => navigate(routes.settings)}
                    >
                        <Settings className='size-4' />
                        Einstellungen
                    </Button>
                </CardContent>
            </Card>
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent' />
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] opacity-20 dark:opacity-10' />
        </main>
    );
}

export default MainMenu;
