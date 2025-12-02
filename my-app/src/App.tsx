// App.tsx - Komplette Szene
import { useState } from 'react';
import { createTestScene } from './gameLogic/camelFactory';
import { PlatformDisplay } from './components/PlatformDisplay';

function App() {
  const [scene] = useState(createTestScene());
  const { caravan, platform } = scene;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🐪 Kamel-Karawane Simulator</h1>
      
      {/* Karawane Info */}
      <div style={{ 
        backgroundColor: '#F5F5DC', 
        padding: '15px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2>Karawane ({caravan.camels.length} Kamele)</h2>
        <p>Status: <strong>{caravan.status}</strong></p>
        <p>Gesamtsitze: {
          caravan.camels.reduce((total, camel) => 
            total + (camel.size[0] * camel.size[1]), 0
          )
        }</p>
      </div>
      
      {/* Kamele nebeneinander */}
      <div style={{ 
        display: 'flex', 
        gap: '40px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {caravan.camels.map(camel => (
          <div 
            key={camel.id}
            style={{
              border: '3px solid #8B4513',
              borderRadius: '15px',
              padding: '20px',
              backgroundColor: '#DEB887',
              minWidth: '300px'
            }}
          >
            <h3 style={{ marginTop: 0 }}>🐫 {camel.name}</h3>
            <p>Größe: {camel.size[0]}×{camel.size[1]} Sitze</p>
            
            {/* Kamel Visualisierung */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              marginTop: '15px'
            }}>
              {camel.seats.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', gap: '6px' }}>
                  {row.map(seat => (
                    <div
                      key={seat.id}
                      style={{
                        width: '45px',
                        height: '45px',
                        border: '2px solid #8B4513',
                        backgroundColor: 
                          seat.type === 'window' ? '#FFE4B5' : '#F5DEB3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.9em',
                        borderRadius: '4px'
                      }}
                      title={`${seat.type === 'window' ? 'Fenster' : 'Mitte'} 
(Ebene ${seat.row + 1}, Sitz ${seat.position + 1})`}
                    >
                      {seat.type === 'window' ? '🪟' : '🪑'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div style={{ 
              marginTop: '10px', 
              fontSize: '0.8em', 
              color: '#5D4037',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Leer: {
                camel.seats.flat().filter(s => !s.passenger).length
              }</span>
              <span>Belegt: {
                camel.seats.flat().filter(s => s.passenger).length
              }</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bahnsteig */}
      <PlatformDisplay platform={platform} />
      
      {/* Statistik */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#FFF8DC',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '0.9em'
      }}>
        <div>
          <strong>Gesamtstatistik:</strong><br />
          Kamele: {caravan.camels.length}<br />
          Sitze: {
            caravan.camels.reduce((total, camel) => 
              total + (camel.size[0] * camel.size[1]), 0
            )
          }<br />
          Bahnsteigplätze: {platform.capacity}
        </div>
        <div>
          <strong>Belegung:</strong><br />
          Kamele: 0/{/* später belegte Sitze */}<br />
          Bahnsteig: 0/{platform.capacity}<br />
          Frei: {/* später berechnen */}
        </div>
        <div>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Passagiere generieren
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;