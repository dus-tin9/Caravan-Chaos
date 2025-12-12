// contexts/DragDropContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Passenger } from '../types/gameTypes';

interface DragDropContextType {
  draggedPassenger: Passenger | null;
  setDraggedPassenger: (passenger: Passenger | null) => void;
  handleDropOnSeat: (seatId: string, passenger: Passenger) => void;
  handleDropOnPlatform: (slotId: string, passenger: Passenger) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [draggedPassenger, setDraggedPassenger] = useState<Passenger | null>(null);

  const handleDropOnSeat = (seatId: string, passenger: Passenger) => {
    console.log(`Passagier ${passenger.name} auf Sitz ${seatId} fallen gelassen`);
  };

  const handleDropOnPlatform = (slotId: string, passenger: Passenger) => {
    console.log(`Passagier ${passenger.name} auf Bahnsteigplatz ${slotId} fallen gelassen`);
  };

  return (
    <DragDropContext.Provider value={{
      draggedPassenger,
      setDraggedPassenger,
      handleDropOnSeat,
      handleDropOnPlatform
    }}>
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop muss innerhalb von DragDropProvider verwendet werden');
  }
  return context;
}