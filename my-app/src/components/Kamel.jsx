import Sitze from './Sitze.jsx';

export default function Kamel({ camelId, seats, onSeatClick, onSeatPersonClick }) {
    return (
        <div className="Kamel">
            <h2>Kamel {camelId}</h2>
            <Sitze
                camelId={camelId}
                seats={seats}
                onSeatClick={onSeatClick}
                onSeatPersonClick={onSeatPersonClick}
            />
        </div>
    );
}
