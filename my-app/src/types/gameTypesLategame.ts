// types/gameTypes.ts
export interface Need {
  id: string;
  name: string;           // "Fensterliebhaber"
  description: string;    // "Muss am Fenster sitzen"
  
  // Funktion die prüft, ob Bedürfnis erfüllt ist
  // Du kannst später komplexe Logik hinzufügen
  isFulfilled: (context: NeedCheckContext) => boolean;
  
  basePoints: number;     // Grundpunkte
  multiplier?: number;    // Bei besonderer Erfüllung
}

// Kontext-Objekt für die Prüfung
export type NeedCheckContext = {
  passenger: Passenger;
  seat: Seat;
  neighbors: Passenger[];
  caravan: Caravan;
  // Alles was man zur Prüfung braucht
};

// Beispiel-Implementierung:
const windowNeed: Need = {
  id: 'window-1',
  name: 'Fensterplatz',
  description: 'Muss am Fenster sitzen',
  basePoints: 10,
  isFulfilled: (context) => {
    return context.seat.type === 'window';
  }
};