import type { Camel, Caravan, Passenger, Seat, SeatType, CamelSize } from '../types/gameTypes';
                                                   // "../" um in das übegeordnete Verzeichnis zu springen

function createSeat(
    row: number,          // Vertikale Position (0 = oben, 1 = mitte, 2 = unten)
    position: number,     // Horizontale Position (0 = links, 1, 2... = rechts)
    seatsPerRow: number   // Wie viele Sitze in einer Reihe
):
    Seat {
        // Bei Seitenansicht: Fenster sind oben und unten
        let type: SeatType;
        if (row === 0 || row === seatsPerRow - 1) {
        type = 'window';     // Erste oder letzte Reihe = Fenster (oben/unten)
        } else {
        type = 'middle';     // Mittlere Reihen = Mitte
        }

        return {
        id: `seat-${row}-${position}`,
        row,
        position,           // Position in der Reihe (horizontal)
        type,
        passenger: null
        };
    }

export function createCamel(
    id: string,
    name: string,
    size: CamelSize = [3, 2]  // JETZT: [rows, seatsPerRow] = [vertikal, horizontal]
): 
    Camel {
        const [rows, seatsPerRow] = size;  // rows = vertikale Ebenen
        const seats: Seat[][] = [];

        // Für jede VERTIKALE Ebene (oben nach unten)...
        for (let row = 0; row < rows; row++) {
        const rowSeats: Seat[] = [];

        // ...für jeden HORIZONTALEN Sitz (links nach rechts)...
        for (let pos = 0; pos < seatsPerRow; pos++) {
            rowSeats.push(createSeat(row, pos, rows));  // ACHTUNG: rows statt seatsPerRow!
        }

        seats.push(rowSeats);
        }

        return { id, name, seats, size };
}

// Standard-Kamelgrößen für Seitenansicht:
export const STANDARD_CAMELS = {
    SMALL: () => createCamel('camel-small', 'Kleines Kamel', [2, 3]),   // 2 Ebenen hoch, 3 Sitze breit
    MEDIUM: () => createCamel('camel-medium', 'Mittleres Kamel', [3, 4]), // 3 Ebenen, 4 breit
    LARGE: () => createCamel('camel-large', 'Großes Kamel', [4, 5])     // 4 Ebenen, 5 breit
};


// Bahnsteig-Typen hinzufügen
export type PlatformSlot = {
  id: string;
  position: number;           // Position auf dem Bahnsteig
  passenger: Passenger | null; // Wer steht hier?
}

export type Platform = {
  id: string;
  slots: PlatformSlot[];
  capacity: number;
}

// Bahnsteig erstellen
export function createPlatform(
  id: string = 'platform-1',
  capacity: number = 12
): Platform {
  const slots: PlatformSlot[] = [];
  
  for (let i = 0; i < capacity; i++) {
    slots.push({
      id: `slot-${i}`,
      position: i,
      passenger: null
    });
  }
  
  return { id, slots, capacity };
}

// Komplette Test-Szene mit 2 Kamelen + Bahnsteig
export function createTestScene() {
  const camel1 = createCamel('camel-1', 'Sandy', [3, 4]);  // 3 Ebenen, 4 breit
  const camel2 = createCamel('camel-2', 'Humpy', [2, 3]);  // 2 Ebenen, 3 breit
  
  const caravan: Caravan = {
    id: 'caravan-1',
    camels: [camel1, camel2],
    status: 'waiting'
  };
  
  const platform = createPlatform('platform-1', 20); // Platz für 20 Passagiere
  
  return { caravan, platform };
}