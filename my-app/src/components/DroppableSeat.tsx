// components/DroppableSeat.tsx
import { useState } from 'react';
import type { Seat } from '../types/gameTypes';
import { useDragDrop } from '../contexts/DragDropContext';

interface DroppableSeatProps {
  seat: Seat;
  onDrop: (passengerId: string) => void;
}

export function DroppableSeat({ seat, onDrop }: DroppableSeatProps) {
  const [isOver, setIsOver] = useState(false);
  const { handleDropOnSeat } = useDragDrop();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const passengerId = e.dataTransfer.getData('passengerId');
    if (passengerId) {
      onDrop(passengerId);
      handleDropOnSeat(seat.id, { id: passengerId, name: 'Unbekannt' } as any); // Später korrekt
    }
  };

  return (
    <div
      draggable={!!seat.passenger}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: '45px',
        height: '45px',
        border: `2px solid ${isOver ? '#4CAF50' : '#8B4513'}`,
        backgroundColor: 
          seat.passenger ? '#4A90E2' :
          isOver ? '#C8E6C9' :
          seat.type === 'window' ? '#FFE4B5' : '#F5DEB3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '0.9em',
        borderRadius: '4px',
        transition: 'all 0.2s',
        cursor: seat.passenger ? 'grab' : 'default'
      }}
      title={seat.passenger 
        ? `${seat.passenger.name} (klicken zum entfernen)`
        : `${seat.type === 'window' ? 'Fenster' : 'Mitte'} (hier ablegen)`
      }
    >
      {seat.passenger ? '👤' : seat.type === 'window' ? '🪟' : '🪑'}
    </div>
  );
}