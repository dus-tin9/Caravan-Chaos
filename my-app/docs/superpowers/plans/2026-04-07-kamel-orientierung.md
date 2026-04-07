# Kamel-Orientierung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das Spielfeld rendert Kamele so, dass das Kamel nach rechts schaut — "hinten" (row 0) ist links, "linke Seite" (col 0) ist oben.

**Architecture:** Nur die Darstellung wird geändert. Das `seats`-Array (`seats[rowIndex][colIndex]`) bleibt unverändert — row 0 = hinten, col 0 = linke Seite. In `Sitze.jsx` wird die Render-Schleife transponiert: äußere Schleife über `colIndex` (ergibt Screen-Zeilen = oben→unten), innere Schleife über `rowIndex` (ergibt Screen-Spalten = links→rechts = hinten→vorne). Die Handler-Aufrufe `onSeatClick(camelId, rowIndex, colIndex)` bleiben korrekt. Scoring-Logik wird nicht berührt.

**Tech Stack:** React 19, JSX, CSS (index.css)

---

## Warum nur diese zwei Dateien?

| Datei | Was sich ändert | Was bleibt gleich |
|-------|-----------------|-------------------|
| `src/components/Sitze.jsx` | Schleifenreihenfolge transponieren | Handler-Argumente (rowIndex, colIndex) bleiben korrekt |
| `src/styling/index.css` | `.Sitze` von `display: grid` auf `flex-direction: column` | Alle anderen Klassen unberührt |

Scoring (`scoring.js`, `regular.js`, `neighbors.js`), Level-Daten (`Level01.json`) und alle anderen Komponenten bleiben **unverändert** — nur die visuelle Transposition ändert sich.

---

## Visuelles Ziel

Kamel 1 (rows=2, columns=5) — aktuell vs. gewünscht:

**Aktuell (falsch):** rows laufen von oben nach unten, columns von links nach rechts
```
[r0,c0][r0,c1][r0,c2][r0,c3][r0,c4]   ← row 0 (hinten) = oberste Zeile
[r1,c0][r1,c1][r1,c2][r1,c3][r1,c4]   ← row 1 (vorne)
```

**Gewünscht:** rows laufen von links nach rechts (hinten→vorne), columns von oben nach unten (links→rechts des Kamels)
```
[r0,c0][r1,c0]   ← col 0 (linke Seite) = oberste Screen-Zeile
[r0,c1][r1,c1]
[r0,c2][r1,c2]
[r0,c3][r1,c3]
[r0,c4][r1,c4]   ← col 4 (rechte Seite) = unterste Screen-Zeile
←back   front→
```

---

## Task 1: Sitze.jsx transponieren

**Files:**
- Modify: `src/components/Sitze.jsx`

- [ ] **Schritt 1: Aktuelle Schleife verstehen**

Aktuell in `Sitze.jsx` (Zeilen 7–24):
```jsx
{seats.map((row, rowIndex) => (
    <div key={rowIndex}>
        {row.map((seat, colIndex) => (
            <div key={seat.id} onClick={...}>
                <Sitz occupant={seat.occupant} />
            </div>
        ))}
    </div>
))}
```
Äußere Schleife = rowIndex (wird Screen-Zeile = falsch).  
Innere Schleife = colIndex (wird Screen-Spalte = falsch).

- [ ] **Schritt 2: Sitze.jsx mit transponierter Schleife ersetzen**

Ersetze den gesamten `return`-Block in `src/components/Sitze.jsx`:

```jsx
import Sitz from './Sitz.jsx';

export default function Sitze({ camelId, seats, onSeatClick, onSeatPersonClick }) {
    const numCols = seats[0]?.length ?? 0;

    return (
        <div className="Sitze">
            {Array.from({ length: numCols }, (_, colIndex) => (
                <div key={colIndex} className="SitzeZeile">
                    {seats.map((row, rowIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={(e) => {
                                if (row[colIndex].occupant) {
                                    e.stopPropagation();
                                    onSeatPersonClick(row[colIndex].occupant);
                                } else {
                                    onSeatClick(camelId, rowIndex, colIndex);
                                }
                            }}
                        >
                            <Sitz occupant={row[colIndex].occupant} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
```

**Warum `onSeatClick(camelId, rowIndex, colIndex)` korrekt bleibt:**  
`rowIndex` kommt aus `seats.map` = echter Daten-rowIndex.  
`colIndex` kommt aus dem `Array.from`-Loop = echter Daten-colIndex.  
Beides korrekt — keine Änderung an der Spiellogik nötig.

- [ ] **Schritt 3: Seite im Browser prüfen**

`npm run dev` starten, Level öffnen. Kamel 1 (rows=2, cols=5) sollte jetzt als 5 Screen-Zeilen × 2 Screen-Spalten erscheinen.

---

## Task 2: CSS für transponiertes Layout anpassen

**Files:**
- Modify: `src/styling/index.css`

- [ ] **Schritt 1: Aktuelle `.Sitze`-Regel verstehen**

Aktuell (Zeilen 192–202 in index.css):
```css
.Level .Sitze{
  width: 40vw;
  height: 60vh;
  align-self: center;
  justify-self: center;
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-around;
  align-content: space-around;
}
```
Problem: `grid-template-columns: auto auto auto auto` legt die äußeren Divs (Screen-Zeilen) in 4 Spalten nebeneinander — falsch für das transponierte Layout.

- [ ] **Schritt 2: `.Sitze` und `.SitzeZeile` in index.css anpassen**

Ersetze den Block `.Level .Sitze{ ... }` mit:
```css
.Level .Sitze{
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.SitzeZeile {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
```

- [ ] **Schritt 3: Visuell prüfen**

Im Browser: Kamele sollen als korrekte Raster erscheinen.  
Kamel 1 (rows=2, cols=5): 5 Zeilen × 2 Spalten.  
Kamel 2 (rows=3, cols=4): 4 Zeilen × 3 Spalten.  
Personen auf Sitzen sollen an den richtigen Positionen sitzen bleiben.

- [ ] **Schritt 4: Commit**

```bash
git add my-app/src/components/Sitze.jsx my-app/src/styling/index.css
git commit -m "fix: Kamel-Orientierung — rows links→rechts (hinten→vorne), cols oben→unten"
```

---

## Selbst-Review Checkliste

- [x] **Spec abgedeckt:** Kamel schaut rechts, hinten = links (row 0 = links), linke Seite = oben (col 0 = oben) ✓
- [x] **Keine Platzhalter** ✓
- [x] **Scoring unberührt:** `onSeatClick(camelId, rowIndex, colIndex)` übergibt weiterhin korrekte Array-Indizes ✓
- [x] **`regular`-Need unberührt:** Scorer vergleicht `placement.rowIndex === need.row - 1` und `placement.colIndex === need.column - 1` — Daten unverändert ✓
- [x] **`neighbors.js` unberührt:** Arbeitet auf Array-Indizes, nicht auf Screen-Koordinaten ✓
