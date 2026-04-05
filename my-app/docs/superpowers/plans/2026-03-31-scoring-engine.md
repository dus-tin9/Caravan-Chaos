# Scoring Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scoring engine that evaluates each person's needs at level-end and displays per-person scores in a LevelRecap screen.

**Architecture:** Pure JS scorers in `src/utils/needScoring/` (one file per need type, return 0–1 satisfaction fraction), wired together by `src/utils/scoring.js` which exports `scoreLevel(people, camels)`. Scores flow from `Buttons.jsx` → `App.jsx` state → `LevelRecap.jsx` on level end.

**Tech Stack:** React 18 (Vite), JavaScript (JSX), Vitest for tests

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Delete | `src/utils/needScoring/windowSeat.js` | Unused stub, not in spec |
| Create | `src/utils/neighbors.js` | `getNeighborOccupants(camelId, rowIndex, colIndex, grids)` |
| Create | `src/utils/needScoring/schläfrig.js` | Returns 1 if rowIndex === 0, else 0 |
| Create | `src/utils/needScoring/einsam.js` | Returns 1 if 0 neighbors, else 0 |
| Create | `src/utils/needScoring/gesellig.js` | Returns `min(actualNeighbors / anzahl, 1)` |
| Create | `src/utils/needScoring/bestie.js` | Returns 1 if bestie is adjacent, else 0 |
| Create | `src/utils/needScoring/hater.js` | Returns 1 if hated person is on different camel (or absent), else 0 |
| Create | `src/utils/needScoring/regular.js` | Returns 1 if on exact camel/row/col, else 0 |
| Create | `src/utils/scoring.js` | `buildContext(camels)`, `scoreLevel(people, camels)` |
| Create | `src/utils/scoring.test.js` | All scorer + scoreLevel tests |
| Create | `src/components/LevelRecap.jsx` | Shows per-person scores and average |
| Modify | `src/App.jsx` | Add `scores` state, pass `setScores` to Level, `scores` to LevelRecap |
| Modify | `src/components/Level.jsx` | Forward `setScores` and `camels` to Buttons |
| Modify | `src/components/Buttons.jsx` | Call `scoreLevel` on end-level, call `setScores` |

---

## Task 1: Delete the windowSeat stub

**Files:**
- Delete: `src/utils/needScoring/windowSeat.js`

- [ ] **Step 1: Delete the file**

```bash
rm src/utils/needScoring/windowSeat.js
```

- [ ] **Step 2: Verify it's gone**

```bash
ls src/utils/needScoring/
```
Expected: empty directory listing (no files yet).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused windowSeat stub"
```

---

## Task 2: Create the neighbors helper + test scaffold

**Files:**
- Create: `src/utils/neighbors.js`
- Create: `src/utils/scoring.test.js`

- [ ] **Step 1: Write the failing tests**

Create `src/utils/scoring.test.js`:

```js
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
    const result = getNeighborOccupants(1, 0, 0, grids)
    expect(result).toHaveLength(0)
  })

  it('does not count the seat itself', () => {
    const result = getNeighborOccupants(1, 1, 1, grids)
    expect(result.map(o => o.name)).not.toContain('Center')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './neighbors.js'"

- [ ] **Step 3: Implement neighbors.js**

Create `src/utils/neighbors.js`:

```js
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/neighbors.js src/utils/scoring.test.js
git commit -m "feat: add neighbors helper with tests"
```

---

## Task 3: schläfrig scorer

**Files:**
- Create: `src/utils/needScoring/schläfrig.js`
- Modify: `src/utils/scoring.test.js` (add tests)

- [ ] **Step 1: Add failing tests to scoring.test.js**

Add at the bottom of `src/utils/scoring.test.js`:

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './needScoring/schläfrig.js'"

- [ ] **Step 3: Implement schläfrig.js**

Create `src/utils/needScoring/schläfrig.js`:

```js
export default function scoreSchläfrig(need, placement, context) {
  if (!placement) return 0
  return placement.rowIndex === 0 ? 1 : 0
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/needScoring/schläfrig.js src/utils/scoring.test.js
git commit -m "feat: add schläfrig scorer"
```

---

## Task 4: einsam scorer

**Files:**
- Create: `src/utils/needScoring/einsam.js`
- Modify: `src/utils/scoring.test.js`

- [ ] **Step 1: Add failing tests to scoring.test.js**

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './needScoring/einsam.js'"

- [ ] **Step 3: Implement einsam.js**

Create `src/utils/needScoring/einsam.js`:

```js
import { getNeighborOccupants } from '../neighbors.js'

export default function scoreEinsam(need, placement, context) {
  if (!placement) return 0
  const neighbors = getNeighborOccupants(placement.camelId, placement.rowIndex, placement.colIndex, context.grids)
  return neighbors.length === 0 ? 1 : 0
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/needScoring/einsam.js src/utils/scoring.test.js
git commit -m "feat: add einsam scorer"
```

---

## Task 5: gesellig scorer

**Files:**
- Create: `src/utils/needScoring/gesellig.js`
- Modify: `src/utils/scoring.test.js`

- [ ] **Step 1: Add failing tests to scoring.test.js**

```js
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
    // 1 neighbor out of 2 required = 0.5
    expect(scoreGesellschaft({ anzahl: 2 }, placement, { grids: testGrids })).toBeCloseTo(0.5)
  })

  it('returns 0 when person is not placed', () => {
    expect(scoreGesellschaft({ anzahl: 2 }, undefined, {})).toBe(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './needScoring/gesellig.js'"

- [ ] **Step 3: Implement gesellig.js**

Create `src/utils/needScoring/gesellig.js`:

```js
import { getNeighborOccupants } from '../neighbors.js'

export default function scoreGesellschaft(need, placement, context) {
  if (!placement) return 0
  const neighbors = getNeighborOccupants(placement.camelId, placement.rowIndex, placement.colIndex, context.grids)
  return Math.min(neighbors.length / need.anzahl, 1)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/needScoring/gesellig.js src/utils/scoring.test.js
git commit -m "feat: add gesellig scorer with partial credit"
```

---

## Task 6: bestie scorer

**Files:**
- Create: `src/utils/needScoring/bestie.js`
- Modify: `src/utils/scoring.test.js`

- [ ] **Step 1: Add failing tests to scoring.test.js**

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './needScoring/bestie.js'"

- [ ] **Step 3: Implement bestie.js**

Create `src/utils/needScoring/bestie.js`:

```js
import { getNeighborOccupants } from '../neighbors.js'

export default function scoreBestie(need, placement, context) {
  if (!placement) return 0
  const bestiePlacement = context.placements.get(need.bestie)
  if (!bestiePlacement) return 0
  const neighbors = getNeighborOccupants(placement.camelId, placement.rowIndex, placement.colIndex, context.grids)
  return neighbors.some(o => o.name === need.bestie) ? 1 : 0
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/needScoring/bestie.js src/utils/scoring.test.js
git commit -m "feat: add bestie scorer"
```

---

## Task 7: hater scorer

**Files:**
- Create: `src/utils/needScoring/hater.js`
- Modify: `src/utils/scoring.test.js`

- [ ] **Step 1: Add failing tests to scoring.test.js**

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './needScoring/hater.js'"

- [ ] **Step 3: Implement hater.js**

Create `src/utils/needScoring/hater.js`:

```js
export default function scoreHater(need, placement, context) {
  if (!placement) return 0
  const hatedPlacement = context.placements.get(need.hated)
  if (!hatedPlacement) return 1
  return hatedPlacement.camelId !== placement.camelId ? 1 : 0
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/needScoring/hater.js src/utils/scoring.test.js
git commit -m "feat: add hater scorer"
```

---

## Task 8: regular scorer

**Files:**
- Create: `src/utils/needScoring/regular.js`
- Modify: `src/utils/scoring.test.js`

Note: `need.row` and `need.column` are **1-indexed** in the JSON. Convert with `need.row - 1` and `need.column - 1`.

- [ ] **Step 1: Add failing tests to scoring.test.js**

```js
import scoreRegular from './needScoring/regular.js'

describe('scoreRegular', () => {
  it('returns 1 when person is at the required camel/row/col', () => {
    // need.row=1, need.column=1 → rowIndex=0, colIndex=0
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './needScoring/regular.js'"

- [ ] **Step 3: Implement regular.js**

Create `src/utils/needScoring/regular.js`:

```js
export default function scoreRegular(need, placement, context) {
  if (!placement) return 0
  return (
    placement.camelId === need.camel &&
    placement.rowIndex === need.row - 1 &&
    placement.colIndex === need.column - 1
  ) ? 1 : 0
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/needScoring/regular.js src/utils/scoring.test.js
git commit -m "feat: add regular scorer"
```

---

## Task 9: scoring.js — buildContext and scoreLevel

**Files:**
- Create: `src/utils/scoring.js`
- Modify: `src/utils/scoring.test.js`

- [ ] **Step 1: Add failing tests to scoring.test.js**

```js
import { buildContext, scoreLevel } from './scoring.js'

describe('buildContext', () => {
  it('maps person names to their placement', () => {
    const camel = makeCamel(1, 2, 2, [
      { row: 0, col: 1, person: { id: 1, name: 'Max', needs: [] } },
    ])
    const context = buildContext([camel])
    expect(context.placements.get('Max')).toEqual({ camelId: 1, rowIndex: 0, colIndex: 1 })
  })

  it('stores the grid under the camel id', () => {
    const camel = makeCamel(1, 2, 2)
    const context = buildContext([camel])
    expect(context.grids.get(1)).toBe(camel.grid)
  })
})

describe('scoreLevel', () => {
  it('gives 100 to a person with no needs', () => {
    const camel = makeCamel(1, 2, 2, [
      { row: 0, col: 0, person: { id: 1, name: 'Max', needs: [] } },
    ])
    const people = [{ id: 1, name: 'Max', needs: [] }]
    const results = scoreLevel(people, [camel])
    expect(results.find(r => r.name === 'Max').score).toBe(100)
  })

  it('gives 100 when a single need is fully satisfied (schläfrig at row 0)', () => {
    const camel = makeCamel(1, 3, 2, [
      { row: 0, col: 0, person: { id: 2, name: 'Sleeper', needs: [{ name: 'schläfrig' }] } },
    ])
    const people = [{ id: 2, name: 'Sleeper', needs: [{ name: 'schläfrig' }] }]
    const results = scoreLevel(people, [camel])
    expect(results.find(r => r.name === 'Sleeper').score).toBe(100)
  })

  it('gives 0 when a single need is not satisfied (schläfrig not at row 0)', () => {
    const camel = makeCamel(1, 3, 2, [
      { row: 2, col: 0, person: { id: 3, name: 'Sleeper2', needs: [{ name: 'schläfrig' }] } },
    ])
    const people = [{ id: 3, name: 'Sleeper2', needs: [{ name: 'schläfrig' }] }]
    const results = scoreLevel(people, [camel])
    expect(results.find(r => r.name === 'Sleeper2').score).toBe(0)
  })

  it('splits 100 evenly across two needs', () => {
    // Person has schläfrig (satisfied) + einsam (not satisfied — has neighbor)
    const camel = makeCamel(1, 3, 2, [
      { row: 0, col: 0, person: { id: 4, name: 'Mixed', needs: [{ name: 'schläfrig' }, { name: 'einsam' }] } },
      { row: 0, col: 1, person: { id: 5, name: 'Other', needs: [] } },
    ])
    const people = [
      { id: 4, name: 'Mixed', needs: [{ name: 'schläfrig' }, { name: 'einsam' }] },
      { id: 5, name: 'Other', needs: [] },
    ]
    const results = scoreLevel(people, [camel])
    expect(results.find(r => r.name === 'Mixed').score).toBe(50)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test -- scoring.test.js
```
Expected: FAIL with "Cannot find module './scoring.js'"

- [ ] **Step 3: Implement scoring.js**

Create `src/utils/scoring.js`:

```js
import scoreSchläfrig  from './needScoring/schläfrig.js'
import scoreEinsam     from './needScoring/einsam.js'
import scoreGesellschaft from './needScoring/gesellig.js'
import scoreBestie     from './needScoring/bestie.js'
import scoreHater      from './needScoring/hater.js'
import scoreRegular    from './needScoring/regular.js'

const scorers = {
  schläfrig: scoreSchläfrig,
  einsam:    scoreEinsam,
  gesellig:  scoreGesellschaft,
  bestie:    scoreBestie,
  hater:     scoreHater,
  regular:   scoreRegular,
}

export function buildContext(camels) {
  const placements = new Map()
  const grids = new Map()
  for (const camel of camels) {
    grids.set(camel.id, camel.grid)
    for (let rowIndex = 0; rowIndex < camel.grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < camel.grid[rowIndex].length; colIndex++) {
        const occupant = camel.grid[rowIndex][colIndex].occupant
        if (occupant) {
          placements.set(occupant.name, { camelId: camel.id, rowIndex, colIndex })
        }
      }
    }
  }
  return { placements, grids }
}

function scorePerson(person, context) {
  if (person.needs.length === 0) return 100
  const share = 100 / person.needs.length
  return person.needs.reduce((total, need) => {
    const scorer = scorers[need.name]
    if (!scorer) return total
    const placement = context.placements.get(person.name)
    return total + scorer(need, placement, context) * share
  }, 0)
}

export function scoreLevel(people, camels) {
  const context = buildContext(camels)
  return people.map(person => ({
    id: person.id,
    name: person.name,
    score: Math.round(scorePerson(person, context)),
  }))
}
```

- [ ] **Step 4: Run all tests to verify they pass**

```bash
npm run test -- scoring.test.js
```
Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/scoring.js src/utils/scoring.test.js
git commit -m "feat: add scoreLevel dispatcher and integration tests"
```

---

## Task 10: Wire up data flow (App, Level, Buttons)

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Level.jsx`
- Modify: `src/components/Buttons.jsx`

- [ ] **Step 1: Update App.jsx**

Replace the contents of `src/App.jsx` with:

```jsx
import { useState } from 'react'
import Level from './components/Level'

export default function App() {
  const [SiteState, setSiteState] = useState("Level")
  const [scores, setScores] = useState([])

  function currentSiteState(State) {
    switch (State) {
      case "Level":
        return <Level setSiteState={setSiteState} setScores={setScores} />
      case "MainMenu":
        return <p>Main Menu (coming soon)</p>
      case "LevelRecap":
        return <LevelRecap setSiteState={setSiteState} scores={scores} />
      case "LevelAuswahl":
        return <p>Level Auswahl (coming soon)</p>
    }
  }

  return (
    <div>
      {currentSiteState(SiteState)}
    </div>
  )
}
```

Note: `LevelRecap` import will be added in Task 11.

- [ ] **Step 2: Update Level.jsx — accept and forward setScores + pass camels to Buttons**

In `src/components/Level.jsx`, change the function signature and the `<Buttons>` JSX:

```jsx
export default function Level({ setSiteState, setScores }) {
```

And update the `<Buttons>` section:

```jsx
<Buttons
  setSiteState={setSiteState}
  setScores={setScores}
  people={people}
  camels={camels}
/>
```

- [ ] **Step 3: Update Buttons.jsx — call scoreLevel on end level**

Replace the contents of `src/components/Buttons.jsx` with:

```jsx
import { scoreLevel } from '../utils/scoring.js'

export default function Buttons({ setSiteState, setScores, people, camels }) {

  function handleEndLevel() {
    const unseated = people.filter(person => !person.seated)
    if (unseated.length > 0) return
    const results = scoreLevel(people, camels)
    setScores(results)
    setSiteState("LevelRecap")
  }

  function handleMainMenu() {
    setSiteState("MainMenu")
  }

  return (
    <div className="Buttons">
      <button onClick={handleMainMenu}>
        Main Menu
      </button>
      <button onClick={handleEndLevel}>
        End Level
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Start dev server and verify the app still loads**

```bash
npm run dev
```
Expected: app loads, two camels visible, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/components/Level.jsx src/components/Buttons.jsx
git commit -m "feat: wire scoreLevel into end-level flow"
```

---

## Task 11: LevelRecap component

**Files:**
- Create: `src/components/LevelRecap.jsx`
- Modify: `src/App.jsx` (add import)

- [ ] **Step 1: Create LevelRecap.jsx**

Create `src/components/LevelRecap.jsx`:

```jsx
export default function LevelRecap({ scores, setSiteState }) {
  const average = scores.length > 0
    ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
    : 0

  return (
    <div className="LevelRecap">
      <h1>Level Complete!</h1>
      <ul>
        {scores.map(s => (
          <li key={s.id}>{s.name} — {s.score} / 100</li>
        ))}
      </ul>
      <p><strong>Average: {average} / 100</strong></p>
      <button onClick={() => setSiteState("MainMenu")}>
        Main Menu
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Add import to App.jsx**

At the top of `src/App.jsx`, add:

```jsx
import LevelRecap from './components/LevelRecap'
```

- [ ] **Step 3: Manually test the full flow**

```bash
npm run dev
```

1. Open the app
2. Place all 11 people onto seats across both camels
3. Press "End Level"
4. Verify the LevelRecap screen appears with a score for each person
5. Verify "Main Menu" button navigates away

- [ ] **Step 4: Commit**

```bash
git add src/components/LevelRecap.jsx src/App.jsx
git commit -m "feat: add LevelRecap screen with per-person scores"
```
