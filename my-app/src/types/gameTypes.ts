
// -- Bedürfnisse --
export type NeedType = 
  | 'window'      // Muss am Fenster sitzen
  | 'aisle'       // Muss am Gang sitzen  
  | 'quiet'       // Braucht ruhige Nachbarn
  | 'company'     // Will nicht alleine sitzen
  | 'talk'        // Will reden
  // einfach hinzufügen:
  | 'shade'       // Braucht Schatten
  | 'cushion';    // Will Kissen

export type Need = {
  type: NeedType;
  description: string;  // "Muss am Fenster sitzen"
  points: number;       // Wie viele Punkte bei Erfüllung
}

// -- Personen --
export type Passenger = {
  id: string;
  name: string;
  needs: Need[]; // passenger können verschieden viele needs haben
  // mood: 'happy' | 'neutral' | 'unhappy';    // Personen könnten jeweils 3 verschiedene pixelarts bekommen um zu indizieren wie gut das gelaufen ist
  satisfaction: number; // Summe aller Bedürfnisse
  // Für Drag & Drop
  type: 'passenger';
}

  // Für DnD Context
export type DraggableItem = Passenger | null;
export type DropZone = {
  type: 'seat' | 'platform';
  id: string;
}

// -- Sitze --
export type SeatType = 
    |'window' 
    | 'middle';
    // | 'aisle' 

export type Seat = {
  id: string;
  row: number;          // 0, 1, 2...
  position: number;     // 0=links, 1=mitte, 2=rechts
  type: SeatType;       // Fenster/Gang/Mitte
  passenger: Passenger | null;  // Wer sitzt hier?
}

// -- Ein Kamel --
export type CamelSize = [rows: number, seatsPerRow: number];

export type Camel = {
  id: string;
  name: string;         // "Sandy", "Humpy"...
  seats: Seat[][];      // 2D-Array: [Reihe][Position]
  size: CamelSize;
}

// -- Die ganze Karawane --
export type CaravanStatus = 
  | 'waiting'      // Passagiere werden platziert
  | 'traveling'    // Unterwegs (Animation)
  | 'scoring'      // Punkte werden berechnet
  | 'arrived';     // Angekommen (Ergebnis anzeigen)

export type Caravan = {
  id: string;
  camels: Camel[];     // Array von Kamelen
  status: CaravanStatus;
}


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