import { cn } from '@/lib/utils'
import Sitze from './Sitze.jsx';

export default function Kamel({ className, seats, onSeatClick, onSeatPersonClick }) {
    return (
        <div className={cn('rounded-xl border border-border/70 bg-background/60 p-4', className)}>
            <Sitze 
                seats={seats} 
                onSeatClick={onSeatClick} 
                onSeatPersonClick={onSeatPersonClick} 
            />
        </div>
    );
}