// components/PassengerCard.tsx
import type { Passenger } from '../types/gameTypes';
import { useDragDrop } from '../contexts/DragDropContext';

export function PassengerCard({ passenger }: { passenger: Passenger }) {
  const { setDraggedPassenger } = useDragDrop();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('passengerId', passenger.id);
    setDraggedPassenger(passenger);
  };

  const handleDragEnd = () => {
    setDraggedPassenger(null);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        padding: '10px',
        margin: '5px',
        border: '2px solid #4A90E2',
        borderRadius: '8px',
        backgroundColor: '#E3F2FD',
        cursor: 'grab',
        minWidth: '100px',
        userSelect: 'none'
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{passenger.name}</div>
      <div style={{ fontSize: '0.8em', color: '#666', marginTop: '5px' }}>
        Bedürfnisse: {passenger.needs.map(n => n.type).join(', ')}
      </div>
    </div>
  );
}