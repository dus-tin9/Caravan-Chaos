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
- Projektueberblick: Idee, Demo, Technik, Learnings.

---

## Folie 2 - Projektverstaendnis (Idee)

**Leitidee:**
- Personen strategisch platzieren.
- Individuelle Beduerfnisse beachten.
- Ziel: hoher Level-Score.

**Projektziel:**
- React praxisnah anwenden.
- Spielmechanik + UI verknuepfen.
- Routing, State, Datenlogik kombinieren.

**Sprechtext (optional):**
- Einfaches Setting, klare Regeln, gute React-Eignung.

---

## Folie 3 - Motivation

**Warum dieses Projekt?**
- React im realen Projekt lernen.
- Klare UI-Interaktionen trainieren.
- Teamarbeit in Modulen erproben.

**Team-Motivation (bitte ergaenzen):**
- [PLATZHALTER: Persoenliche Motivation aus dem Team]
- [PLATZHALTER: Was euch am Spielkonzept gereizt hat]

---

## Folie 4 - Demo & Funktionalitaet

**Demo-Ablauf (Live oder Video):**
1. Main Menu starten.
2. Level laden.
3. Person auswaehlen.
4. Sitzplatz belegen.
5. Recap anzeigen.

**Kernfunktionen:**
- Leveldaten aus JSON.
- Variable Kamel-Sitzraster.
- 6 Beduerfnis-Typen.
- Modulares Scoring.
- Recap: Einzelscore + Gesamtscore.
- localStorage-Persistenz.

**Demo-Details (bitte ergaenzen):**
- [PLATZHALTER: Live-Demo oder voraufgezeichnetes Video?]
- [PLATZHALTER: Wer praesentiert die Demo?]

---

## Folie 5 - Architektur-Ueberblick

**Technischer Stack:**
- React 19 + Vite
- React Router DOM
- Tailwind CSS + UI-Komponenten
- Vitest (Unit-Tests)

**Architektur (vereinfacht):**
- Router steuert Seitenfluss.
- Level verwaltet Spielzustand.
- Utils kapseln Spiellogik.

**Sprechtext (optional):**
- UI und Logik klar getrennt.

---

## Folie 6 - React-Konzepte: State Management

**Zentrale States im Level:**
- people: Personen + Sitzstatus.
- camels: Sitzraster + Belegung.
- selectedPerson: aktive Auswahl.

**Warum so aufgeteilt?**
- Schnelle UI-Reaktion.
- Klare Zustandsverantwortung.
- Direkte Scoring-Auswertung.

---

## Folie 7 - React-Konzepte: Lifting State Up

**Wo wurde State angehoben?**
- Level als zentrale Datenquelle.
- Bahnhof, Spielfeld, Buttons, Infofeld per Props.

**Nutzen:**
- Einheitlicher Datenstand.
- Konsistente Updates.
- Einfacheres Debugging.

**Reflexionspunkt fuer Praesentation:**
- [PLATZHALTER: Was hat bei Props-Drilling gut/schlecht funktioniert?]

---

## Folie 8 - React-Konzepte: Effects (`useEffect`)

**Einsatz im Projekt:**
- people/camels nach localStorage.
- lastPlayedLevel speichern.
- Recap/Theme seiteneffektbasiert aktualisieren.

**Warum wichtig?**
- Rendering von Seiteneffekten trennen.
- Zustand nach Reload behalten.

**Sprechtext (optional):**
- Persistenz und Lifecycle sauber loesen.

---

## Folie 9 - Styling und UI-Struktur

**Styling-Ansatz:**
- Tailwind Utility-First.
- Wiederverwendbare UI-Bausteine.
- Panel-Layout: Bahnhof, Spielfeld, Info, Aktionen.

**Design-Entscheidungen:**
- Hohe Lesbarkeit.
- Klare Klickflaechen.
- Fokus auf Spielbarkeit.

**Abgleich mit Aufgabenstellung:**
- Kein Material UI.
- Alternative: Tailwind + Komponentenstruktur.

---

## Folie 10 - Reflexion: Herausforderungen

**Technische Herausforderungen:**
- Zustand ueber mehrere Komponenten.
- Trennung von UI und Logik.
- Datenfluss Level -> Recap.

**Organisatorische Herausforderungen:**
- [PLATZHALTER: Aufgabenverteilung im Team]
- [PLATZHALTER: Branching/Merge-Erfahrungen]

---

## Folie 11 - Lessons Learned

**Was gut funktioniert hat:**
- Modulares Scoring pro Beduerfnis.
- Datengetriebene Level.
- Tests fuer Kernlogik.

**Was weniger gut funktioniert hat:**
- [PLATZHALTER: z. B. zu spaeter Start von Feature X]
- [PLATZHALTER: z. B. zu viel Props-Drilling an Stelle Y]

**Team-Learning:**
- [PLATZHALTER: Wichtigstes React-Learning]
- [PLATZHALTER: Wichtigstes Teamprozess-Learning]

---

## Folie 12 - Ausblick (mit mehr Zeit)

**Moegliche Verbesserungen:**
- Mehr Level + bessere Progression.
- Highscore-System ausbauen.
- Optionales Drag-and-Drop.
- Mehr visuelles Feedback.

**Priorisierung (bitte ergaenzen):**
1. [PLATZHALTER: Top-Prioritaet]
2. [PLATZHALTER: Zweite Prioritaet]
3. [PLATZHALTER: Dritte Prioritaet]

---

## Folie 13 - Abschluss

**Takeaway in einem Satz:**
- React-Konzepte in einem spielbaren Produkt.

**Q&A:**
- Fragen?

**Optionales Schluss-Statement:**
- [PLATZHALTER: Persoenlicher Abschlusssatz]
