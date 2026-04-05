# Person Needs / Constraints

A person can have zero or more needs defined in their `needs` array. All needs must
be satisfied for a placement to be considered valid.

For neighbor rules, see the neighbor definition in [README.md](README.md).

---

## `schläfrig` (Sleepy)

Person must be seated in the **first row** (`row 1`, `rowIndex 0`) which is the back of the camel.

```json
{ "name": "schläfrig" }
```

---

## `einsam` (Lonely)

Person must have **no** orthogonal neighbors.

```json
{ "name": "einsam" }
```

---

## `gesellig` (Social)

Person must have **at least** `anzahl` orthogonal neighbors.

```json
{ "name": "gesellig", "anzahl": 2 }
```

| Field    | Type   | Description                     |
|----------|--------|---------------------------------|
| `anzahl` | number | Minimum required neighbor count |

---

## `bestie`

Person must be seated **directly adjacent** (orthogonal) to their bestie.

```json
{ "name": "bestie", "bestie": "Bestie2" }
```

| Field    | Type   | Description                   |
|----------|--------|-------------------------------|
| `bestie` | string | Name of the required neighbor |

> Note: Bestie relationships should always be defined symmetrically on both people.

---

## `hater`

Person must **not** be on the same camel as the hated person.

```json
{ "name": "hater", "hated": "Jeremy" }
```

| Field   | Type   | Description               |
|---------|--------|---------------------------|
| `hated` | string | Name of the avoided person |

---

## `regular`

Person must be placed at a **specific fixed seat**.

```json
{ "name": "regular", "camel": 1, "row": 1, "column": 1 }
```

| Field    | Type   | Description                 |
|----------|--------|-----------------------------|
| `camel`  | number | ID of the required camel    |
| `row`    | number | Required row (1-indexed)    |
| `column` | number | Required column (1-indexed) |