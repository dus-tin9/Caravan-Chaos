import { describe, it, expect } from 'vitest'
import { getNeighborOccupants } from './neighbors.js'

// --- Test helper ---
// Builds a minimal camel object matching the shape used in the app:
// { id: number, grid: [[{id, occupant}]] }
// placements is an array of { row, col, person } where person = { id, name, needs }
function makeCamel(id, rows, cols, placements = []) {
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      id: `${id}-${r}-${c}`,
      occupant: null,
    }))
  )
  for (const { row, col, person } of placements) {
    grid[row][col].occupant = person
  }
  return { id, grid }
}

const grids = new Map()
const camel = makeCamel(1, 3, 3, [
  { row: 1, col: 1, person: { id: 1, name: 'Center', needs: [] } },
  { row: 0, col: 1, person: { id: 2, name: 'Above',  needs: [] } },
  { row: 2, col: 2, person: { id: 3, name: 'Corner', needs: [] } },
])
grids.set(1, camel.grid)

describe('getNeighborOccupants', () => {
  it('returns orthogonal neighbors only', () => {
    const result = getNeighborOccupants(1, 1, 1, grids)
    expect(result.map(o => o.name)).toContain('Above')
    expect(result).toHaveLength(1) // only Above is adjacent; Corner is diagonal
  })

  it('returns empty array when no neighbors', () => {
    // (2,0) has no occupied neighbors: Corner is at (2,2), not adjacent
    const result = getNeighborOccupants(1, 2, 0, grids)
    expect(result).toHaveLength(0)
  })

  it('does not count the seat itself', () => {
    const result = getNeighborOccupants(1, 1, 1, grids)
    expect(result.map(o => o.name)).not.toContain('Center')
  })
})
