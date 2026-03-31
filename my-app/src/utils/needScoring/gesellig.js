import { getNeighborOccupants } from '../neighbors.js'

export default function scoreGesellschaft(need, placement, context) {
  if (!placement) return 0
  const neighbors = getNeighborOccupants(placement.camelId, placement.rowIndex, placement.colIndex, context.grids)
  return Math.min(neighbors.length / need.anzahl, 1)
}
