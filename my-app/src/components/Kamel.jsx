import Sitze from './Sitze.jsx';

export default function Kamel({ seats, onSeatClick, onSeatPersonClick }) {
    return (
        <div className="Kamel">
            <h2>Kamel</h2>
            <Sitze 
                seats={seats} 
                onSeatClick={onSeatClick} 
                onSeatPersonClick={onSeatPersonClick} 
            />
        </div>
    );
}