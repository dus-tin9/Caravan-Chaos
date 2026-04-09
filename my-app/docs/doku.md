# Caravanen-Chaos – Schriftliche Ausarbeitung

> **Hinweis:** Dieses Dokument ist ein Skelett. Alle Stellen mit `[TODO]` müssen vor der Abgabe ausgefüllt werden.
> Zielumfang: 10–15 Seiten (ohne Titelseite, Literaturverzeichnis und Anhang).

---

## 1. Titelseite

**Titel der Arbeit:** Caravanen-Chaos – Entwicklung eines browserbasierten Rätselspiels mit React

**Autor(en):**
- [TODO: Vorname Nachname], Matrikelnummer: [TODO]
- [TODO: Vorname Nachname], Matrikelnummer: [TODO]
- [TODO: Vorname Nachname], Matrikelnummer: [TODO]

**Datum:** [TODO: z. B. April 2026]

**Fachbereich:** [TODO: z. B. Informatik / Medieninformatik]

**Dozent:** [TODO: Name des Dozenten]

**Lehrveranstaltung:** Software Design 1 / 2

---

## 2. Abstract / Zusammenfassung

*(optional, max. 0,5 Seiten)*

Die vorliegende Arbeit beschreibt Konzeption und Umsetzung des browserbasierten Rätselspiels Caravanen-Chaos, das im Rahmen der Lehrveranstaltung Software Design als praxisorientiertes Frontend-Projekt entwickelt wurde. Ziel war es, zentrale Konzepte moderner Webentwicklung mit React systematisch anzuwenden und dabei ein in sich geschlossenes, interaktives Anwendungsszenario zu realisieren. Das Spiel basiert auf einem datengetriebenen Ansatz: Level werden aus JSON-Dateien geladen, Personen mit individuellen Bedürfnissen auf Sitzplätze mehrerer Kamele verteilt und anschließend regelbasiert ausgewertet.

Methodisch wurde eine komponentenorientierte Architektur mit klarer Trennung von Darstellung, Zustandsverwaltung und Domänenlogik umgesetzt. Die Bewertungslogik ist modular aufgebaut und bildet sechs Bedürfnis-Typen ab, die zu einer Gesamtbewertung pro Level aggregiert werden. Zusätzlich wurden Routing, Levelauswahl, Ergebnisansicht sowie persistente Speicherung von Spielständen und Highscores über localStorage implementiert. Zur Absicherung der Kernlogik wurden automatisierte Unit-Tests eingesetzt, die zum Abgabezeitpunkt vollständig erfolgreich durchliefen.

Die Ergebnisse zeigen, dass ein funktionsfähiger und erweiterbarer Spielprototyp realisiert werden konnte, der den vollständigen Kernablauf von der Platzierung bis zur Auswertung abdeckt. Damit wurden die Lernziele in den Bereichen React-Komponentenmodell, clientseitiges Routing, testbare Logikstrukturen und zustandsbezogene Persistenz erreicht. Gleichzeitig liefert das Projekt eine belastbare Grundlage für weiterführende Ausbauschritte, insbesondere im Bereich Interaktion, Visualisierung und Funktionsumfang.

---

## 3. Einleitung

### 3.1 Hintergrund und Motivation

[TODO: Kontext beschreiben – warum wurde dieses Projekt gewählt? Was war der Lernauftrag? Kurz auf die Entscheidung eingehen, ein Spiel als Lernprojekt zu entwickeln.]

Ziel dieser Arbeit war die Entwicklung einer interaktiven Webanwendung als Lernprojekt im Bereich modernes Frontend-Engineering. Die Wahl fiel auf ein Rätselspiel, da dieses eine Vielzahl typischer React-Konzepte vereint: Zustandsverwaltung, komponentenbasierte Architektur, Routing und das Trennen von Anwendungslogik und Darstellung.

### 3.2 Aufgabenstellung und Anforderungen

| Nr. | Anforderung | Status |
|-----|-------------|--------|
| 1 | Hauptmenü mit Navigation zu Levels, Einstellungen und Scoreboard | [TODO: Teilweise / Vollständig] |
| 2 | Levelansicht: Personen aus einer Liste per Klick auf Sitzplätze platzieren | Umgesetzt |
| 3 | Mehrere Kamele pro Level mit unterschiedlichen Sitzlayouts (aus JSON-Daten) | Umgesetzt |
| 4 | Sechs Bedürfnis-Typen (schläfrig, einsam, gesellig, bestie, hater, regular) | Umgesetzt |
| 5 | Bewertungssystem: 0–100 Punkte pro Person abhängig von erfüllten Bedürfnissen | Umgesetzt |
| 6 | Level-Abschlussscreen mit Einzelbewertungen und Durchschnitt | Umgesetzt |
| 7 | Spielstand-Persistenz über Browser-Sessions hinweg (localStorage) | Umgesetzt |
| 8 | Level-Roadmap / Levelauswahl | [TODO: Umgesetzt / Nicht umgesetzt] |
| 9 | Scoreboard zur Übersicht aller gespielten Level | [TODO: Umgesetzt / Nicht umgesetzt] |
| 10 | Einstellungen | [TODO: Umgesetzt / Nicht umgesetzt] |

### 3.3 Zielsetzung

[TODO: 2–3 Sätze – was sollte am Ende funktionieren, was war der Lernerfolg?]

---

## 4. Stand der Forschung

*(Kurzer Überblick über verwendete Technologien und Konzepte mit Literaturangaben)*

### 4.1 React

React ist eine von Meta entwickelte JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen auf Basis wiederverwendbarer Komponenten [TODO: Quelle, z. B. React-Dokumentation]. Die Anwendung verwendet React 19 mit funktionalen Komponenten und Hooks (`useState`, `useEffect`).

### 4.2 Vite

Vite ist ein modernes Build-Tool und Entwicklungsserver für Webprojekte, das auf ES-Modulen und nativem Browser-Support basiert [TODO: Quelle]. Es ermöglicht schnelle Hot-Module-Replacement-Zyklen während der Entwicklung.

### 4.3 React Router DOM

React Router DOM v7 ermöglicht client-seitiges Routing in Single-Page Applications [TODO: Quelle]. In dieser Anwendung wird es genutzt, um zwischen Hauptmenü, Levels und dem Abschlussscreen zu navigieren, ohne die Seite neu zu laden.

### 4.4 Tailwind CSS

Tailwind CSS ist ein utility-first CSS-Framework, das Styling direkt im Markup über vordefinierte Klassen ermöglicht [TODO: Quelle]. In der Version 4 wird es direkt als Vite-Plugin eingebunden, ohne separate Konfigurationsdatei.

### 4.5 shadcn/ui

shadcn/ui ist eine Komponentenbibliothek, die zugängliche, anpassbare UI-Komponenten auf Basis von Radix UI und Tailwind CSS bereitstellt [TODO: Quelle]. Verwendet für Button und Card im Hauptmenü.

### 4.6 Vitest

Vitest ist ein auf Vite aufbauendes Unit-Test-Framework, das die gleiche Konfiguration wie das Build-System nutzt [TODO: Quelle]. Es wurde für die Unit-Tests der Spiellogik eingesetzt.

[TODO: Falls weitere Technologien oder Konzepte relevant sind, hier ergänzen.]

---

## 5. Methodik

### 5.1 Vorgehensweise

Die Entwicklung erfolgte inkrementell. Zunächst wurde die Grundstruktur des Spiels aufgebaut (Komponenten, Zustandsverwaltung, Sitzplatzierung), bevor schrittweise die Spiellogik, das Routing und das Bewertungssystem ergänzt wurden.

[TODO: Eigene Beschreibung ergänzen – wie wurde im Team gearbeitet? Welche Tools für Versionskontrolle (Git/GitHub)? Wie wurden Aufgaben aufgeteilt?]

### 5.2 Komponentenarchitektur

Die Anwendung ist in React-Komponenten unterteilt, die jeweils einen klar abgegrenzten Aufgabenbereich haben. Die Spiellogik (Bewertungsberechnung, Nachbarschaftslogik) ist vollständig von den React-Komponenten getrennt und liegt als reine JavaScript-Funktionen in `src/utils/`.

```
App
├── MainMenu
└── Level (via React Router)
    ├── Bahnhof          – Personenliste mit auswählbaren Karten
    ├── Spielfeld
    │   └── Kamel(e)     – Ein Kamel pro Eintrag in den Leveldaten
    │       └── Sitze    – Sitzplatzgitter
    ├── Buttons          – „End Level" / „Main Menu"
    └── Infofeld         – Zeigt Bedürfnisse der ausgewählten Person
```

### 5.3 Datengetriebenes Leveldesign

Level werden als JSON-Dateien definiert. Jedes Level beschreibt Kamele (mit Zeilen- und Spaltenanzahl) und Personen (mit optionalen Bedürfnissen). Dieses Format ermöglicht es, neue Level ohne Code-Änderungen zu erstellen.

```json
{
  "id": 1,
  "name": "Reise nach Jerusalem",
  "camels": [{ "id": 1, "rows": 2, "columns": 5 }],
  "people": [
    { "id": 5, "name": "Sleeper", "needs": [{ "name": "schläfrig" }] }
  ]
}
```

### 5.4 Bewertungssystem

Das Bewertungssystem ist als modulare Funktion `scoreLevel(people, camels)` implementiert. Für jede Person wird ein Wert zwischen 0 und 100 berechnet:

- Personen ohne Bedürfnisse erhalten stets 100 Punkte.
- Die 100 Punkte werden gleichmäßig auf alle Bedürfnisse aufgeteilt.
- Jedes Bedürfnis gibt entweder 0 oder den vollen Anteil – außer `gesellig`, das anteilige Punkte gibt: `min(tatsächliche Nachbarn / benötigte Nachbarn, 1)`.

Jeder der sechs Bedürfnis-Typen ist in einer eigenen Datei in `src/utils/needScoring/` implementiert. Die zentrale Funktion in `scoring.js` delegiert per Lookup-Objekt an den passenden Scorer.

### 5.5 Routing mit React Router

Die Navigation zwischen Screens erfolgt über URL-basiertes Routing. Scores werden beim Levelabschluss über den Router-State weitergereicht (`navigate(url, { state: { scores } })`), sodass kein globaler Zustand benötigt wird.

| Route | Ziel |
|-------|------|
| `/main` | Hauptmenü |
| `/level/:levelId` | Levelansicht |
| `/level/:levelId/recap` | Abschlussscreen |

### 5.6 Besondere Herausforderungen

[TODO: Eigene Erfahrungen eintragen – mögliche Punkte:]
- [TODO: War die Zustandsverwaltung über mehrere Komponenten hinweg (Props-Drilling) eine Herausforderung?]
- [TODO: Gab es Probleme beim Zusammenführen von Branches – z. B. beim Merge von Tailwind/Router?]
- [TODO: Was war anfangs schwer zu verstehen an React (re-renders, Hooks, etc.)?]
- [TODO: Weitere Highlights oder unerwartete Lösungsansätze?]

---

## 6. Ergebnisse

### 6.1 Funktionsumfang des fertigen Spiels



### 6.2 Screenshots

[TODO: Screenshots des Spiels einfügen:]
- Hauptmenü
- Levelansicht (Personenliste und Kamele)
- Level-Abschlussscreen mit Bewertung

### 6.3 Testergebnisse

Die Spiellogik ist durch 28 Unit-Tests abgedeckt (Vitest). Alle Tests laufen fehlerfrei durch.

| Testgruppe | Anzahl Tests | Ergebnis |
|---|---|---|
| `getNeighborOccupants` | 3 | Bestanden |
| `scoreSchläfrig` | 3 | Bestanden |
| `scoreEinsam` | 3 | Bestanden |
| `scoreGesellschaft` | 3 | Bestanden |
| `scoreBestie` | 3 | Bestanden |
| `scoreHater` | 3 | Bestanden |
| `scoreRegular` | 4 | Bestanden |
| `buildContext` | 2 | Bestanden |
| `scoreLevel` | 4 | Bestanden |
| **Gesamt** | **28** | **Alle bestanden** |

[TODO: Falls weitere Tests hinzukommen, Tabelle aktualisieren.]

---

## 7. Diskussion

### 7.1 Interpretation der Ergebnisse

[TODO: Reflektion – Was funktioniert gut? Entspricht das Spielgefühl den Erwartungen? Sind die Scores nachvollziehbar und fair? Macht das Spiel Spaß?]

### 7.2 Einschränkungen

- **Nur ein Level vollständig implementiert:** Die Levelauswahl und das dynamische Laden von Level-Dateien anhand der URL-ID sind noch nicht umgesetzt. Es wird immer `Level01.json` geladen.
- **Kein Scoreboard:** Die Anforderung, erzielte Punkte über mehrere Level hinweg anzuzeigen, ist nicht umgesetzt.
- **Keine Einstellungen:** Der Einstellungs-Screen ist ein Platzhalter.
- **Keine Drag-and-Drop-Interaktion:** Personen werden per Klick platziert. Die Bibliothek `react-dnd` ist installiert, aber nicht eingebunden.
- [TODO: Weitere Einschränkungen ergänzen – z. B. fehlende mobile Unterstützung, keine Animationen, rein textbasierte Darstellung der Kamele.]

### 7.3 Kritische Reflexion

[TODO: Rückblickend – was würde man anders machen? Z. B. früher mit Routing und Tests beginnen, State-Management anders aufsetzen, mehr Level erstellen, Pair-Programming statt paralleler Branches?]

---

## 8. Schlussfolgerung

### 8.1 Zusammenfassung der Ergebnisse

- **Spielbarer Prototyp:** Ein vollständiges Level mit Platzierung, Bewertung und Abschlussscreen ist spielbar.
- **Modulares Bewertungssystem:** Die Scoring-Architektur erlaubt das einfache Hinzufügen neuer Bedürfnis-Typen ohne Änderungen an bestehenden Dateien.
- **Datengetriebene Level:** Neue Level können durch eine JSON-Datei angelegt werden, ohne Code anzufassen.
- **Solide Testabdeckung:** Alle Spiellogik-Funktionen sind durch Unit-Tests abgesichert.
- **Lernziel React erreicht:** [TODO: Eigene Einschätzung – was wurde über React, Routing, Komponenten, State etc. gelernt?]

### 8.2 Mögliche Weiterentwicklungen

- Vollständige Levelauswahl mit einer visuellen Roadmap
- Persistentes Scoreboard über `localStorage`
- Drag-and-Drop-Platzierung mit `react-dnd`
- Visuelle Darstellung der Kamele (statt einfacher Grids)
- Animationen beim Platzieren und auf dem Abschlussscreen
- Mobile-freundliches Layout
- [TODO: Weitere Ideen des Teams ergänzen]

---

## 9. Literaturverzeichnis

*(Zitationsstil: [TODO: APA / IEEE / MLA – mit Dozent abstimmen])*

[TODO: Alle verwendeten Quellen nach gewähltem Zitationsstil eintragen. Beispiele:]

- [TODO] React-Team. *React Dokumentation*. Meta Open Source. https://react.dev
- [TODO] Vite-Team. *Vite Dokumentation*. https://vitejs.dev
- [TODO] Remix-Team. *React Router v7 Dokumentation*. https://reactrouter.com
- [TODO] Tailwind Labs. *Tailwind CSS Dokumentation*. https://tailwindcss.com
- [TODO] shadcn. *shadcn/ui Dokumentation*. https://ui.shadcn.com
- [TODO] Vitest-Team. *Vitest Dokumentation*. https://vitest.dev
- [TODO: Weitere Quellen ergänzen – Bücher, Fachartikel, Lehrveranstaltungsunterlagen]

---

## 10. Anhang

### A. Bedürfnis-Typen Übersicht

| Bedürfnis | Beschreibung | Punkte-Logik |
|---|---|---|
| `schläfrig` | Person muss in Reihe 0 sitzen (Rückseite des Kamels) | Binär |
| `einsam` | Person darf keine orthogonalen Nachbarn haben | Binär |
| `gesellig` | Person braucht mindestens N orthogonale Nachbarn | Anteilig: `min(ist/soll, 1)` |
| `bestie` | Genannte Person muss direkt benachbart sein | Binär |
| `hater` | Genannte Person darf nicht auf demselben Kamel sein | Binär |
| `regular` | Person muss auf einem festen Platz sitzen | Binär |

### B. Codebeispiele

[TODO: Ggf. besonders interessante Code-Ausschnitte einfügen, z. B. die `scoreLevel`-Funktion oder einen einzelnen Scorer als Beispiel für die modulare Architektur.]

### C. Weitere Materialien

[TODO: Umfangreiche Datentabellen, vollständiges Level-JSON oder andere ergänzende Informationen hier einfügen, falls sie den Haupttext unnötig verlängern würden.]
