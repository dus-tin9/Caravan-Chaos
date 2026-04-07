# Level Data Format

Each level is defined as a JSON file in this directory.

## Top-Level Structure

| Field    | Type   | Description                         |
|----------|--------|-------------------------------------|
| `id`     | number | Unique level identifier             |
| `name`   | string | Display name of the level           |
| `camels` | array  | The available camels (seating grids)|
| `people` | array  | The people to be seated             |

## Camels

Each camel defines a seating grid. Seats are addressed by row and column (1-indexed).
Row 1 is the top row, column 1 is the leftmost column. The grid is displayed exactly
as defined: rows go top-to-bottom, columns go left-to-right.

```json
{ "id": 1, "rows": 2, "columns": 5 }
```

| Field     | Type   | Description             |
|-----------|--------|-------------------------|
| `id`      | number | Unique camel identifier |
| `rows`    | number | Number of seat rows     |
| `columns` | number | Number of seat columns  |

Example — camel with `rows: 2, columns: 5` renders as:

```
r1c1  r1c2  r1c3  r1c4  r1c5
r2c1  r2c2  r2c3  r2c4  r2c5
```

## People

Each person must be assigned to exactly one seat. People without a `needs` array
have no placement constraints.

```json
{ "id": 1, "name": "Max" }
```

| Field   | Type   | Description                                             |
|---------|--------|---------------------------------------------------------|
| `id`    | number | Unique person identifier                                |
| `name`  | string | Display name                                            |
| `needs` | array  | Optional list of constraints (see [Needs.md](Needs.md)) |

## Neighbors

Two seats are considered neighbors if they are **orthogonally adjacent** (up, down,
left, right). Diagonal seats do NOT count as neighbors.

```
[ ][N][ ]
[N][X][N]
[ ][N][ ]
```

## Example

See `Level01.json` for a complete example featuring all constraint types.