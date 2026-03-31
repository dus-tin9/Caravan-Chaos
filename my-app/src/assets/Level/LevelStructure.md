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

Each camel defines a seating grid. Seats are addressed by row and column (1-indexed),
where row 1 is the back (the camel walks to the right, so the first row is furthest from the front).

```json
{ "id": 1, "rows": 2, "columns": 5 }
```

| Field     | Type   | Description             |
|-----------|--------|-------------------------|
| `id`      | number | Unique camel identifier |
| `rows`    | number | Number of seat rows     |
| `columns` | number | Number of seat columns  |

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
| `needs` | array  | Optional list of constraints (see [NEEDS.md](NEEDS.md)) |

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