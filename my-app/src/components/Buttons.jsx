import { Flag, House } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

export default function Buttons({ className, levelId, people }) {
    const navigate = useNavigate()
    const unseatedCount = people.filter((person) => !person.seated).length
    const canEndLevel = unseatedCount === 0

    function handleEndLevel(){
        if (!canEndLevel) return;
        else navigate(routes.levelById(levelId + 1));
    }

    function handleMainMenu(){
        navigate(routes.main)
    }

    return(
    <Card className={cn('border-border/70 bg-card/70 backdrop-blur', className)}>
        <CardContent className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
                variant="secondary"
                size="lg"
                className="h-11 rounded-xl"
                onClick={handleMainMenu}
            >
                <House className="size-4" />
                Main Menu
            </Button>

            <div className="flex items-center gap-3">
                {!canEndLevel && (
                    <p className="text-xs text-muted-foreground">
                        Noch {unseatedCount} unplatzierte Person(en)
                    </p>
                )}

                <Button
                    size="lg"
                    className="h-11 rounded-xl"
                    disabled={!canEndLevel}
                    onClick={handleEndLevel}
                >
                    <Flag className="size-4" />
                    End Level
                </Button>
            </div>
        </CardContent>
    </Card>
    )

}