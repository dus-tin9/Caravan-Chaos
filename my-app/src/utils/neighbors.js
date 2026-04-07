export function getNeighborOccupants(camelId, rowIndex, colIndex, grids) {
  const grid = grids.get(camelId)
  const occupants = []
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  for (const [dr, dc] of directions) {
    const r = rowIndex + dr
    const c = colIndex + dc
    if (r >= 0 && r < grid.length && c >= 0 && c < grid[r].length) {
      const occupant = grid[r][c].occupant
      if (occupant) occupants.push(occupant)
    }
  }
  return occupants
}
