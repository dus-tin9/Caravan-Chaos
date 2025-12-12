// App.tsx - Mit Cleanup fürs Drag
import { useState, useRef, useEffect } from 'react';
import { createCamel } from './gameLogic/camelFactory';

function App() {
  // Ein Kamel
  const [camel] = useState(() => createCamel('camel-1', 'Sandy', [3, 4]));
  
  // Passagiere
  const passengers = [
    { id: 'p1', name: 'Ali', emoji: '👨' },
    { id: 'p2', name: 'Fatima', emoji: '👩' },
    { id: 'p3', name: 'Omar', emoji: '🧔' },
    { id: 'p4', name: 'Layla', emoji: '👧' },
  ];
  
  // Zustand: { passengerId: seatId oder 'platform' }
  const [positions, setPositions] = useState<Record<string, string>>({
    'p1': 'platform',
    'p2': 'platform', 
    'p3': 'platform',
    'p4': 'platform'
  });
  
  // Drag & Drop
  const [dragging, setDragging] = useState<{id: string, emoji: string} | null>(null);
  const [isOverPlatform, setIsOverPlatform] = useState(false);
  
  // Globales Drag-End Handling
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      setDragging(null);
      setIsOverPlatform(false);
    };
    
    const handleGlobalDrop = (e: DragEvent) => {
      // Verhindere Default-Verhalten (z.B. Datei öffnen)
      e.preventDefault();
      handleGlobalDragEnd();
    };
    
    // Wichtig: Auf document Ebene hören
    document.addEventListener('dragend', handleGlobalDragEnd);
    document.addEventListener('drop', handleGlobalDrop);
    
    return () => {
      document.removeEventListener('dragend', handleGlobalDragEnd);
      document.removeEventListener('drop', handleGlobalDrop);
    };
  }, []);
  
  const handleDragStart = (e: React.DragEvent, passengerId: string, emoji: string) => {
    e.dataTransfer.setData('passengerId', passengerId);
    e.dataTransfer.effectAllowed = 'move';
    setDragging({ id: passengerId, emoji });
  };
  
  const handleDragEnd = () => {
    // Wird jetzt vom globalen Event Handler gemacht
  };
  
  const handleDropOnSeat = (e: React.DragEvent, seatId: string) => {
    e.preventDefault();
    const passengerId = e.dataTransfer.getData('passengerId');
    if (passengerId) {
      setPositions(prev => ({ ...prev, [passengerId]: seatId }));
    }
    setDragging(null);
    setIsOverPlatform(false);
  };
  
  const handleDropOnPlatform = (e: React.DragEvent) => {
    e.preventDefault();
    const passengerId = e.dataTransfer.getData('passengerId');
    if (passengerId) {
      setPositions(prev => ({ ...prev, [passengerId]: 'platform' }));
    }
    setDragging(null);
    setIsOverPlatform(false);
  };

  // Mouse Position tracking für das fliegende Emoji
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      style={{ 
        padding: '20px', 
        textAlign: 'center', 
        minHeight: '100vh', 
        position: 'relative',
        // WICHTIG: Globales Drop Handling auf dem Container
        onDragOver: (e) => e.preventDefault(),
        onDrop: (e) => {
          e.preventDefault();
          setDragging(null);
          setIsOverPlatform(false);
        }
      }}
    >
      <h1>🐪 Kamel-Karawane</h1>
      
      {/* Fliegendes Emoji beim Ziehen - NUR wenn wirklich gezogen wird */}
      {dragging && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x,
            top: mousePos.y,
            fontSize: '40px',
            opacity: '0.8',
            pointerEvents: 'none',
            zIndex: 1000,
            filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.6))',
            transform: 'translate(-50%, -50%)',
            transition: 'none' // Keine Animation, folgt direkt dem Cursor
          }}
          key={dragging.id + Date.now()} // Force re-mount bei neuem Drag
        >
          {dragging.emoji}
        </div>
      )}
      
      {/* Bahnsteig als Drop Zone */}
      <div 
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          setIsOverPlatform(true);
        }}
        onDragLeave={() => setIsOverPlatform(false)}
        onDrop={handleDropOnPlatform}
        style={{ 
          marginBottom: '30px',
          padding: '20px',
          border: `3px ${isOverPlatform ? 'solid green' : 'dashed gray'}`,
          borderRadius: '10px',
          minHeight: '120px',
          backgroundColor: isOverPlatform ? 'rgba(144, 238, 144, 0.3)' : 'transparent',
          transition: 'all 0.2s'
        }}
      >
        <h3>🚉 Bahnsteig {isOverPlatform && '(hier ablegen!)'}</h3>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {passengers
            .filter(p => positions[p.id] === 'platform')
            .map(p => (
              <div
                key={p.id}
                draggable
                onDragStart={(e) => handleDragStart(e, p.id, p.emoji)}
                onDragEnd={handleDragEnd}
                style={{
                  fontSize: '2.5em',
                  cursor: 'grab',
                  padding: '15px',
                  border: '2px solid #4A90E2',
                  borderRadius: '50%',
                  backgroundColor: '#E3F2FD',
                  transition: 'transform 0.1s',
                  userSelect: 'none'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                  e.currentTarget.style.cursor = 'grabbing';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.cursor = 'grab';
                }}
                title={`${p.name} (ziehen zum Platzieren)`}
              >
                {p.emoji}
              </div>
            ))}
        </div>
      </div>
      
      {/* Kamel */}
      <div style={{ marginBottom: '30px' }}>
        <h3>🐫 {camel.name}</h3>
        <div style={{ 
          display: 'inline-block', 
          padding: '20px', 
          border: '2px solid brown', 
          borderRadius: '10px',
          backgroundColor: '#FFF8DC'
        }}>
          {camel.seats.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              {row.map(seat => {
                const passengerId = Object.keys(positions)
                  .find(id => positions[id] === seat.id);
                const passenger = passengerId ? passengers.find(p => p.id === passengerId) : null;
                const [isOverSeat, setIsOverSeat] = useState(false);
                
                return (
                  <div
                    key={seat.id}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      setIsOverSeat(true);
                    }}
                    onDragLeave={() => setIsOverSeat(false)}
                    onDrop={(e) => handleDropOnSeat(e, seat.id)}
                    style={{
                      width: '60px',
                      height: '60px',
                      border: `3px solid ${
                        isOverSeat ? 'green' : 
                        passenger ? '#4A90E2' : '#8B4513'
                      }`,
                      backgroundColor: passenger ? '#4A90E2' : 
                        (seat.type === 'window' ? '#FFE4B5' : '#F5DEB3'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2em',
                      cursor: passenger ? 'grab' : 'default',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      transform: isOverSeat ? 'scale(1.05)' : 'scale(1)'
                    }}
                    title={
                      passenger 
                        ? `${passenger.name} (ziehen zurück auf Bahnsteig)`
                        : `${seat.type} Platz (hier ablegen)`
                    }
                  >
                    {passenger ? (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, passenger.id, passenger.emoji)}
                        onDragEnd={handleDragEnd}
                        style={{ 
                          cursor: 'grab',
                          userSelect: 'none'
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.cursor = 'grabbing';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.cursor = 'grab';
                        }}
                      >
                        {passenger.emoji}
                      </div>
                    ) : (
                      seat.type === 'window' ? '🪟' : '🪑'
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Debug-Info (kann später entfernt werden) */}
      {dragging && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 1001
        }}>
          Ziehe: {dragging.emoji}
        </div>
      )}
      
      {/* Info */}
      <div style={{ 
        fontSize: '0.9em', 
        color: '#666',
        backgroundColor: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        display: 'inline-block',
        marginTop: '20px'
      }}>
        <p>👆 Passagiere greifen und auf Sitze ziehen</p>
        <p>👆 Von Sitzen zurück auf Bahnsteig ziehen</p>
        <p>📍 Belegt: {
          Object.values(positions).filter(pos => pos !== 'platform').length
        }/{camel.size[0] * camel.size[1]} Sitzen</p>
        <p style={{ fontSize: '0.8em', color: '#999', marginTop: '5px' }}>
          Tipp: Immer auf einer Drop-Zone loslassen!
        </p>
      </div>
    </div>
  );
}

export default App;