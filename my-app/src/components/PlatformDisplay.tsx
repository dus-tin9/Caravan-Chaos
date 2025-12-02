// components/PlatformDisplay.tsx
import type { Platform } from '../gameLogic/camelFactory';

export function PlatformDisplay({ platform }: { platform: Platform }) {
  return (
    <div style={{
      border: '3px solid gray',
      borderRadius: '10px',
      padding: '20px',
      background: 'linear-gradient(to bottom, #8B7355, #A0522D)',
      marginTop: '30px'
    }}>
      <h3 style={{ marginTop: 0, color: 'white' }}>🚉 Bahnsteig</h3>
      <p style={{ color: '#EEE' }}>
        Kapazität: {platform.slots.filter(s => s.passenger).length}/{platform.capacity}
      </p>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {platform.slots.map(slot => (
          <div
            key={slot.id}
            style={{
              width: '60px',
              height: '60px',
              border: '2px dashed' + (slot.passenger ? 'green' : '#8B4513'),
              borderRadius: '8px',
              backgroundColor: slot.passenger ? '#32CD32' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
            title={`Platz ${slot.position + 1}`}
          >
            {slot.passenger ? '👤' : '○'}
          </div>
        ))}
      </div>
    </div>
  );
}