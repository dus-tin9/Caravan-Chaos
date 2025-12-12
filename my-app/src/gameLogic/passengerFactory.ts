// gameLogic/passengerFactory.ts
import type { Passenger, Need, NeedType } from '../types/gameTypes';

// Einfache Passagier-Namen
const PASSENGER_NAMES = [
  'Ali', 'Fatima', 'Omar', 'Layla', 'Yusuf', 'Zara',
  'Khalid', 'Noura', 'Samir', 'Leila', 'Hassan', 'Aisha'
];

// Einfache Bedürfnisse
const NEED_TYPES: NeedType[] = ['window', 'quiet', 'company', 'talk'];

export function createPassenger(id: string): Passenger {
  const needs: Need[] = [];
  const numNeeds = Math.floor(Math.random() * 2) + 1; // 1-2 Bedürfnisse
  
  for (let i = 0; i < numNeeds; i++) {
    const needType = NEED_TYPES[Math.floor(Math.random() * NEED_TYPES.length)];
    needs.push({
      type: needType,
      description: getNeedDescription(needType),
      points: Math.floor(Math.random() * 10) + 5 // 5-15 Punkte
    });
  }
  
  return {
    id,
    name: PASSENGER_NAMES[Math.floor(Math.random() * PASSENGER_NAMES.length)],
    needs,
    satisfaction: 0,
    type: 'passenger'
  };
}

function getNeedDescription(needType: NeedType): string {
  switch (needType) {
    case 'window': return 'Muss am Fenster sitzen';
    case 'quiet': return 'Braucht ruhige Nachbarn';
    case 'company': return 'Will Gesellschaft';
    case 'talk': return 'Will reden';
    default: return 'Unbekanntes Bedürfnis';
  }
}

// Test-Passagiere für Bahnsteig
export function createTestPassengers(count: number = 8): Passenger[] {
  const passengers: Passenger[] = [];
  for (let i = 0; i < count; i++) {
    passengers.push(createPassenger(`passenger-${i}`));
  }
  return passengers;
}