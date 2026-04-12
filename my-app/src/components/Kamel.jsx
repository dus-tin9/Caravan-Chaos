import Sitze from './Sitze.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Kamel({ camelId, seats, onSeatClick, onSeatPersonClick , selectedPerson}) {
    return (
        <Card className="border-border/60 bg-background/70 shadow-md shadow-foreground/10">
            <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-foreground">Kamel {camelId}</CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
            <Sitze
                camelId={camelId}
                seats={seats}
                onSeatClick={onSeatClick}
                onSeatPersonClick={onSeatPersonClick}
                selectedPerson={selectedPerson}
            />
            </CardContent>
        </Card>
    );
}
