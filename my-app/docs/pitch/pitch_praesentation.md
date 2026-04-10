# Caravanen-Chaos - Pitch (PowerPoint-Struktur)

Diese Datei dient als direkte Vorlage fuer die PowerPoint-Praesentation.
Pro Folie: Titel, Stichpunkte, optionaler Sprechtext.

---

## Folie 1 - Titel

**Titel:** Caravanen-Chaos  
**Untertitel:** Entwicklung eines browserbasierten Raetselspiels mit React

**Stichpunkte:**
- Team: [PLATZHALTER: Namen eintragen]
- Modul: Software Design [PLATZHALTER: 1/2]
- Datum: [PLATZHALTER: Datum der Praesentation]

**Sprechtext (optional):**
- Wir zeigen heute unser Projekt Caravanen-Chaos: Idee, Demo, Technik und Learnings.

---

## Folie 2 - Projektverstaendnis (Idee)

**Leitidee:**
- Spieler platzieren Personen mit individuellen Beduerfnissen auf Sitzplaetzen in Kamelen.
- Ziel: moeglichst hohe Gesamtbewertung durch clevere Sitzordnung.

**Projektziel:**
- Lernprojekt fuer moderne Frontend-Entwicklung mit React.
- Kombination aus Spielmechanik, Routing, Zustand und Datenlogik in einer realen App.

**Sprechtext (optional):**
- Das Spiel verbindet ein leicht verstaendliches Setting mit einer regelbasierten Logik, die technisch gut in React umsetzbar ist.

---

## Folie 3 - Motivation

**Warum dieses Projekt?**
- React-Konzepte praxisnah lernen statt nur isolierte Uebungen zu loesen.
- Ein Spiel erzwingt klare UI-Interaktionen und nachvollziehbare Zustandsaenderungen.
- Gute Grundlage fuer Teamarbeit: Komponenten, Logik und Daten koennen parallel entwickelt werden.

**Team-Motivation (bitte ergaenzen):**
- [PLATZHALTER: Persoenliche Motivation aus dem Team]
- [PLATZHALTER: Was euch am Spielkonzept gereizt hat]

---

## Folie 4 - Demo & Funktionalitaet

**Demo-Ablauf (Live oder Video):**
1. Start im Main Menu.
2. Level oeffnen und Person aus Bahnhof auswaehlen.
3. Person auf Sitzplatz im Kamel setzen.
4. Level abschliessen und Score-Recap zeigen.

**Kernfunktionen:**
- Datengetriebene Level aus JSON-Dateien.
- Mehrere Kamele mit variablen Sitzrastern.
- Sechs Beduerfnis-Typen mit modularer Scoring-Logik.
- Recap-Ansicht mit Einzelwerten und Gesamtscore.
- Persistenz ueber localStorage (z. B. letzter Spielstand/Level).

**Demo-Details (bitte ergaenzen):**
- [PLATZHALTER: Live-Demo oder voraufgezeichnetes Video?]
- [PLATZHALTER: Wer praesentiert die Demo?]

---

## Folie 5 - Architektur-Ueberblick

**Technischer Stack:**
- React 19 + Vite
- React Router DOM (Routing)
- Tailwind CSS + UI-Komponentenstruktur (u. a. shadcn-basierte Components)
- Vitest fuer Unit-Tests der Spiellogik

**Architektur (vereinfacht):**
- App-Router steuert Seiten (Main Menu, Level, Recap, Einstellungen, Highscore).
- Level-Komponente verwaltet aktiven Spielzustand.
- Reine Spiellogik liegt in separaten Utility-Dateien (`src/utils/`).

**Sprechtext (optional):**
- Wir haben Darstellung und Bewertungslogik bewusst getrennt, damit Features testbar und austauschbar bleiben.

---

## Folie 6 - React-Konzepte: State Management

**Zentrale States im Level:**
- `people`: Personenliste inkl. Sitz-/Statusinformationen.
- `camels`: Sitzplatzstruktur und Belegung.
- `selectedPerson`: aktuell ausgewaehlte Person fuer Platzierung.

**Warum so aufgeteilt?**
- UI reagiert sofort auf Interaktionen.
- Zustand ist lokal dort, wo er hauptsaechlich gebraucht wird.
- Logik fuer Bewertung kann mit aktuellem State direkt aufgerufen werden.

---

## Folie 7 - React-Konzepte: Lifting State Up

**Wo wurde State angehoben?**
- Die `Level`-Komponente haelt den gemeinsamen Zustand.
- Child-Komponenten (`Bahnhof`, `Spielfeld`, `Buttons`, `Infofeld`) erhalten Daten/Setter per Props.

**Nutzen:**
- Einheitliche Datenquelle fuer alle Teilbereiche.
- Konsistente Updates bei Platzierung, Reset und Level-Ende.

**Reflexionspunkt fuer Praesentation:**
- [PLATZHALTER: Was hat bei Props-Drilling gut/schlecht funktioniert?]

---

## Folie 8 - React-Konzepte: Effects (`useEffect`)

**Einsatz im Projekt:**
- Persistenz von `people` und `camels` in localStorage bei Aenderungen.
- Speichern des zuletzt gespielten Levels.
- Weitere Effects in Recap/Theme fuer Datenfluss bzw. UI-Verhalten.

**Warum wichtig?**
- Trennung von Rendering und Seiteneffekten.
- Zustand bleibt auch nach Reloads erhalten.

**Sprechtext (optional):**
- Ohne `useEffect` waeren Persistenz und bestimmte Navigations-/Lifecycle-Aktionen deutlich schwerer sauber zu organisieren.

---

## Folie 9 - Styling und UI-Struktur

**Styling-Ansatz:**
- Utility-First mit Tailwind CSS.
- Wiederverwendbare UI-Bausteine in `src/components/ui/`.
- Layout mit klaren Panels (Bahnhof, Spielfeld, Info, Aktionen).

**Design-Entscheidungen:**
- Gute Lesbarkeit und klare Interaktionsflaechen.
- Fokus auf Spielbarkeit statt dekorativer Ueberladung.

**Abgleich mit Aufgabenstellung:**
- Material UI wurde nicht verwendet.
- Gewaehlte Alternative: Tailwind + komponentenbasierte UI-Struktur.

---

## Folie 10 - Reflexion: Herausforderungen

**Technische Herausforderungen:**
- Konsistente Zustandssynchronisation zwischen mehreren Komponenten.
- Saubere Trennung von Spiellogik und UI.
- Routing- und Datenfluss zwischen Level und Recap.

**Organisatorische Herausforderungen:**
- [PLATZHALTER: Aufgabenverteilung im Team]
- [PLATZHALTER: Branching/Merge-Erfahrungen]

---

## Folie 11 - Lessons Learned

**Was gut funktioniert hat:**
- Modulare Scoring-Architektur pro Beduerfnis-Typ.
- Datengetriebene Levels erleichtern Erweiterungen.
- Unit-Tests fuer Kernlogik geben Sicherheit bei Aenderungen.

**Was weniger gut funktioniert hat:**
- [PLATZHALTER: z. B. zu spaeter Start von Feature X]
- [PLATZHALTER: z. B. zu viel Props-Drilling an Stelle Y]

**Team-Learning:**
- [PLATZHALTER: Wichtigstes React-Learning]
- [PLATZHALTER: Wichtigstes Teamprozess-Learning]

---

## Folie 12 - Ausblick (mit mehr Zeit)

**Moegliche Verbesserungen:**
- Mehr Level und feinere Schwierigkeitskurve.
- Ausbau von Highscore/Progression.
- Optional Drag-and-Drop fuer Platzierung.
- Mehr visuelles Feedback (Animationen, Onboarding, UX-Polish).

**Priorisierung (bitte ergaenzen):**
1. [PLATZHALTER: Top-Prioritaet]
2. [PLATZHALTER: Zweite Prioritaet]
3. [PLATZHALTER: Dritte Prioritaet]

---

## Folie 13 - Abschluss

**Takeaway in einem Satz:**
- Caravanen-Chaos zeigt, wie React-Konzepte (State, Lifting, Effects, Routing) in einem spielbaren Produkt zusammenwirken.

**Q&A:**
- Fragen?

**Optionales Schluss-Statement:**
- [PLATZHALTER: Persoenlicher Abschlusssatz]
