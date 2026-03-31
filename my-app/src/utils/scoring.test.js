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

import scoreSchläfrig from './needScoring/schläfrig.js'

describe('scoreSchläfrig', () => {
  it('returns 1 when person is in row 0 (back of camel)', () => {
    const placement = { camelId: 1, rowIndex: 0, colIndex: 2 }
    expect(scoreSchläfrig({}, placement, {})).toBe(1)
  })

  it('returns 0 when person is not in row 0', () => {
    const placement = { camelId: 1, rowIndex: 2, colIndex: 0 }
    expect(scoreSchläfrig({}, placement, {})).toBe(0)
  })

  it('returns 0 when person is not placed', () => {
    expect(scoreSchläfrig({}, undefined, {})).toBe(0)
  })
})

import scoreEinsam from './needScoring/einsam.js'

describe('scoreEinsam', () => {
  it('returns 1 when person has no neighbors', () => {
    const loner = makeCamel(2, 2, 2, [
      { row: 0, col: 0, person: { id: 10, name: 'Loner', needs: [] } },
    ])
    const testGrids = new Map([[2, loner.grid]])
    const placement = { camelId: 2, rowIndex: 0, colIndex: 0 }
    expect(scoreEinsam({}, placement, { grids: testGrids })).toBe(1)
  })

  it('returns 0 when person has at least one neighbor', () => {
    const crowded = makeCamel(3, 2, 2, [
      { row: 0, col: 0, person: { id: 11, name: 'A', needs: [] } },
      { row: 0, col: 1, person: { id: 12, name: 'B', needs: [] } },
    ])
    const testGrids = new Map([[3, crowded.grid]])
    const placement = { camelId: 3, rowIndex: 0, colIndex: 0 }
    expect(scoreEinsam({}, placement, { grids: testGrids })).toBe(0)
  })

  it('returns 0 when person is not placed', () => {
    expect(scoreEinsam({}, undefined, {})).toBe(0)
  })
})

import scoreGesellschaft from './needScoring/gesellig.js'

describe('scoreGesellschaft', () => {
  it('returns 1 when neighbor count meets requirement', () => {
    const social = makeCamel(4, 2, 3, [
      { row: 0, col: 1, person: { id: 20, name: 'Social', needs: [] } },
      { row: 0, col: 0, person: { id: 21, name: 'N1', needs: [] } },
      { row: 0, col: 2, person: { id: 22, name: 'N2', needs: [] } },
    ])
    const testGrids = new Map([[4, social.grid]])
    const placement = { camelId: 4, rowIndex: 0, colIndex: 1 }
    expect(scoreGesellschaft({ anzahl: 2 }, placement, { grids: testGrids })).toBe(1)
  })

  it('returns partial score when neighbor count is below requirement', () => {
    const partial = makeCamel(5, 2, 3, [
      { row: 0, col: 1, person: { id: 23, name: 'Social2', needs: [] } },
      { row: 0, col: 0, person: { id: 24, name: 'N1', needs: [] } },
    ])
    const testGrids = new Map([[5, partial.grid]])
    const placement = { camelId: 5, rowIndex: 0, colIndex: 1 }
    expect(scoreGesellschaft({ anzahl: 2 }, placement, { grids: testGrids })).toBeCloseTo(0.5)
  })

  it('returns 0 when person is not placed', () => {
    expect(scoreGesellschaft({ anzahl: 2 }, undefined, {})).toBe(0)
  })
})

import scoreBestie from './needScoring/bestie.js'

describe('scoreBestie', () => {
  it('returns 1 when bestie is orthogonally adjacent', () => {
    const b = makeCamel(6, 2, 2, [
      { row: 0, col: 0, person: { id: 30, name: 'B1', needs: [] } },
      { row: 0, col: 1, person: { id: 31, name: 'B2', needs: [] } },
    ])
    const testGrids = new Map([[6, b.grid]])
    const placements = new Map([
      ['B1', { camelId: 6, rowIndex: 0, colIndex: 0 }],
      ['B2', { camelId: 6, rowIndex: 0, colIndex: 1 }],
    ])
    const placement = { camelId: 6, rowIndex: 0, colIndex: 0 }
    expect(scoreBestie({ bestie: 'B2' }, placement, { placements, grids: testGrids })).toBe(1)
  })

  it('returns 0 when bestie is not adjacent', () => {
    const b = makeCamel(7, 2, 2, [
      { row: 0, col: 0, person: { id: 32, name: 'C1', needs: [] } },
      { row: 1, col: 1, person: { id: 33, name: 'C2', needs: [] } },
    ])
    const testGrids = new Map([[7, b.grid]])
    const placements = new Map([
      ['C1', { camelId: 7, rowIndex: 0, colIndex: 0 }],
      ['C2', { camelId: 7, rowIndex: 1, colIndex: 1 }],
    ])
    const placement = { camelId: 7, rowIndex: 0, colIndex: 0 }
    expect(scoreBestie({ bestie: 'C2' }, placement, { placements, grids: testGrids })).toBe(0)
  })

  it('returns 0 when bestie is not placed', () => {
    const testGrids = new Map([[8, makeCamel(8, 2, 2).grid]])
    const placements = new Map([['D1', { camelId: 8, rowIndex: 0, colIndex: 0 }]])
    const placement = { camelId: 8, rowIndex: 0, colIndex: 0 }
    expect(scoreBestie({ bestie: 'D2' }, placement, { placements, grids: testGrids })).toBe(0)
  })
})

import scoreHater from './needScoring/hater.js'

describe('scoreHater', () => {
  it('returns 1 when hated person is on a different camel', () => {
    const placements = new Map([
      ['Jan',    { camelId: 1, rowIndex: 0, colIndex: 0 }],
      ['Jeremy', { camelId: 2, rowIndex: 0, colIndex: 0 }],
    ])
    const placement = { camelId: 1, rowIndex: 0, colIndex: 0 }
    expect(scoreHater({ hated: 'Jeremy' }, placement, { placements })).toBe(1)
  })

  it('returns 0 when hated person is on the same camel', () => {
    const placements = new Map([
      ['Jan',    { camelId: 1, rowIndex: 0, colIndex: 0 }],
      ['Jeremy', { camelId: 1, rowIndex: 1, colIndex: 0 }],
    ])
    const placement = { camelId: 1, rowIndex: 0, colIndex: 0 }
    expect(scoreHater({ hated: 'Jeremy' }, placement, { placements })).toBe(0)
  })

  it('returns 1 when hated person is not placed at all', () => {
    const placements = new Map([
      ['Jan', { camelId: 1, rowIndex: 0, colIndex: 0 }],
    ])
    const placement = { camelId: 1, rowIndex: 0, colIndex: 0 }
    expect(scoreHater({ hated: 'Jeremy' }, placement, { placements })).toBe(1)
  })
})

import scoreRegular from './needScoring/regular.js'

describe('scoreRegular', () => {
  it('returns 1 when person is at the required camel/row/col', () => {
    const need = { camel: 1, row: 1, column: 1 }
    const placement = { camelId: 1, rowIndex: 0, colIndex: 0 }
    expect(scoreRegular(need, placement, {})).toBe(1)
  })

  it('returns 0 when person is on the wrong camel', () => {
    const need = { camel: 1, row: 1, column: 1 }
    const placement = { camelId: 2, rowIndex: 0, colIndex: 0 }
    expect(scoreRegular(need, placement, {})).toBe(0)
  })

  it('returns 0 when person is on the right camel but wrong seat', () => {
    const need = { camel: 1, row: 1, column: 1 }
    const placement = { camelId: 1, rowIndex: 1, colIndex: 0 }
    expect(scoreRegular(need, placement, {})).toBe(0)
  })

  it('returns 0 when person is not placed', () => {
    expect(scoreRegular({ camel: 1, row: 1, column: 1 }, undefined, {})).toBe(0)
  })
})
