import { getPersonImageUrl } from '@/lib/personImage'
import { CircleHelp } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

function formatNeed(need) {
  switch (need.name) {
    case 'schläfrig': return 'Schläfrig – will in der letzten Reihe sitzen'
    case 'einsam':    return 'Einsam – will keine direkten Nachbarn'
    case 'gesellig':  return `Gesellig – fühlt sich nur mit mindestens ${need.anzahl} Nachbar(n) wohl`
    case 'bestie':    return `Bestie von ${need.bestie}`
    case 'hater':     return `Hasst ${need.hated} – will auf einem anderen Kamel als ${need.hated} sitzen`
    case 'regular':   return `Stammplatz – Kamel ${need.camel}, Reihe ${need.row}, Spalte ${need.column}`
    default:          return  need.name
  }
}

export default function Infofeld({ className, selectedPerson }) {
  if (!selectedPerson) {
    return (
      <Card className={cn('border-border/60 bg-card/70 shadow-xl shadow-foreground/10 backdrop-blur-xl', className)}>
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <CircleHelp className="size-5" />
            Infofeld
          </CardTitle>
          <CardDescription>Details zur aktuell ausgewählten Person</CardDescription>
        </CardHeader>
        <CardContent>
          <p className=" border border-border/70 bg-background/65 p-3 text-sm text-muted-foreground">
            Keine Person ausgewählt
          </p>
        </CardContent>
      </Card>
    )
  }

  const imageUrl = getPersonImageUrl(selectedPerson)

  return (
    <Card className={cn('border-border/60 bg-card/70 shadow-xl shadow-foreground/10 backdrop-blur-xl', className)}>
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <CircleHelp className="size-5" />
          Infofeld
        </CardTitle>
        <CardDescription>Details zur aktuell ausgewählten Person</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pb-6">
        <div className=" border border-border/70 bg-background/65 p-3">
          <div className="mb-2 flex items-center justify-center g border border-border/60 bg-card/70 p-2">
            <img
              src={imageUrl}
              alt={selectedPerson.name}
              className="pixelated h-24 w-24 object-contain"
            />
          </div>
          <p className="text-sm font-semibold text-foreground">{selectedPerson.name}</p>
        </div>

        <div className=" border border-border/70 bg-background/65 p-3">
          {selectedPerson.needs.length > 0 ? (
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {selectedPerson.needs.map((need, index) => (
                <li key={index}>{formatNeed(need)}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Keine Bedürfnisse</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
