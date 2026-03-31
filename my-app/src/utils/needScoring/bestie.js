import { getNeighborOccupants } from '../neighbors.js'

export default function scoreBestie(need, placement, context) {
  if (!placement) return 0
  const bestiePlacement = context.placements.get(need.bestie)
  if (!bestiePlacement) return 0
  const neighbors = getNeighborOccupants(placement.camelId, placement.rowIndex, placement.colIndex, context.grids)
  return neighbors.some(o => o.name === need.bestie) ? 1 : 0
}
