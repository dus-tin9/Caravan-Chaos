# Scoring Engine Design

**Date:** 2026-03-31
**Status:** Approved

---

## Overview

When the player presses "End Level" (all people seated), the game computes a score of 0–100 for each person based on how well their needs are satisfied. The results are shown in a LevelRecap screen.

---

## Scoring Rules

- A person with **0 needs** always scores **100**.
- A person with **N needs** gets **100 / N points per satisfied need**.
- Most needs are **binary** (satisfied = full share, not satisfied = 0).
- `gesellig` is the only **partial** need: score = `(actualNeighbors / need.anzahl) × share`, capped at the full share.

### Neighbor Definition

Two seats are orthogonally adjacent (up, down, left, right within the same camel). Diagonal seats do not count. Seats on different camels are never neighbors.

### Need Scorers

| Need | Condition | Partial? |
|---|---|---|
| `schläfrig` | Person is at `rowIndex === 0` (back of camel) | No |
| `einsam` | Person has 0 orthogonal neighbors | No |
| `gesellig` | Person has ≥ `anzahl` neighbors | Yes — `min(actual / anzahl, 1)` |
| `bestie` | Named bestie is orthogonally adjacent | No |
| `hater` | Named person is on a different camel (or not placed) | No |
| `regular` | Person is at exact camel/row/col from need data | No |

Note: `row` and `column` in the JSON are 1-indexed. In code, `rowIndex = need.row - 1`, `colIndex = need.column - 1`.

---

## Architecture

### Scoring Engine (pure JS, no React)

**`src/utils/scoring.js`** — central dispatcher, exports `scoreLevel(people, camels)`

1. Builds a **context** from the camel grids:
   - `placements`: `Map<personName, {camelId, rowIndex, colIndex}>`
   - `grids`: `Map<camelId, grid>` (the 2D seat array)
2. For each person, calls `scorePerson(person, context)`
3. Returns array of `{id, name, score}`

**`src/utils/needScoring/`** — one file per need type

Each file exports a default function `(need, placement, context) => number` where the return value is a **satisfaction fraction (0 to 1)**. The dispatcher multiplies by `100 / person.needs.length`.

Files:
- `schläfrig.js`
- `einsam.js`
- `gesellig.js`
- `bestie.js`
- `hater.js`
- `regular.js`

The existing `windowSeat.js` stub is not part of the spec and can be removed.

---

## Data Flow

```
App.jsx
  └─ scores state (useState([]))
  └─ passes setScores + camels down to Level
        └─ Level passes setScores + camels to Buttons
              └─ on "End Level": scoreLevel(people, camels) → setScores → setSiteState("LevelRecap")
  └─ passes scores to LevelRecap
```

Changes required:
- `App.jsx`: add `scores` state, pass `setScores` to `Level`, pass `scores` to `LevelRecap`
- `Level.jsx`: accept and forward `setScores` to `Buttons`
- `Buttons.jsx`: accept `camels` + `setScores`, call `scoreLevel` on end level

---

## LevelRecap Component

**`src/components/LevelRecap.jsx`**

Props: `scores`, `setSiteState`

Displays:
- Heading
- List of each person: name + score (e.g. `Max — 100 / 100`)
- Average score across all people
- "Main Menu" button → `setSiteState("MainMenu")`

---

## Out of Scope

- Live/real-time scoring (score only shown at end)
- Per-need breakdown in the recap (just total score per person for now)
- Weighted needs (all needs contribute equally)
