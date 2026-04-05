import { getNeighborOccupants } from '../neighbors.js'

export default function scoreEinsam(need, placement, context) {
  if (!placement) return 0
  const neighbors = getNeighborOccupants(placement.camelId, placement.rowIndex, placement.colIndex, context.grids)
  return neighbors.length === 0 ? 1 : 0
}
