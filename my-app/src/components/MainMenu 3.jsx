import { Compass, Settings } from 'lucide-react'
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

    return (
        <main className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#f5e6c8_0%,_#e8d3a3_50%,_#d9bc88_100%)] px-4 py-10'>
            <div className='pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/25 blur-3xl' />
            <div className='pointer-events-none absolute bottom-8 left-8 h-44 w-44 rounded-full bg-[#d9bc88]/45 blur-2xl' />
            <div className='pointer-events-none absolute right-8 top-16 h-52 w-52 rounded-full bg-[#e8d3a3]/50 blur-3xl' />

            <Card className='relative z-10 w-full max-w-xl border-[#ffffff]/45 bg-[#ffffff]/28 shadow-2xl shadow-[#2b2b2b]/15 backdrop-blur-xl'>
                <CardHeader className='space-y-3'>
                    <CardTitle className='text-4xl font-semibold tracking-tight text-[#2b2b2b] md:text-5xl'>
                        Caravan Chaos
                    </CardTitle>
                    <CardDescription className='max-w-md text-base text-[#8a8a8a]'>
                        Finde den besten Platz in der Karawane und starte deine Reise durch das Durcheinander.
                    </CardDescription>
                </CardHeader>

                <CardContent className='grid gap-3 pb-6'>
                    <Button
                        size='lg'
                        className='h-12 rounded-xl bg-[#d9bc88] text-[#2b2b2b] shadow-lg shadow-[#2b2b2b]/20 backdrop-blur hover:bg-[#e8d3a3]'
                        onClick={() => navigate(routes.levelById(DEFAULT_LEVEL_ID))}
                    >
                        <Compass className='size-4' />
                        Start Journey
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='h-12 rounded-xl border-[#d9bc88] bg-[#f5e6c8]/70 text-[#2b2b2b] backdrop-blur hover:bg-[#e8d3a3]/90'
                        onClick={() => alert('Set your preferences')}
                    >
                        <Settings className='size-4' />
                        Settings
                    </Button>
                </CardContent>
            </Card>
            <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.12)_35%,transparent_70%)]' />
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px] opacity-20' />
        </main>
    );
}

export default MainMenu;
