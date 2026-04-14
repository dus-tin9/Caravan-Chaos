# Caravan-Chaos

Browserbasiertes Raetselspiel zur Platzierung von Personen auf Kamel-Sitzplätzen mit regelbasierter Auswertung.

## Projektkontext

- Universität: Technische Hochschule Ostwestfalen Lippe
- Modul: Software Design
- Team: M, J, J, D
- Dozent: Prof. Dr. Ing. Rainer Rasche
- Abgabe/Präsentation: 13.04.2026
- Projektstatus: MVP

## Kurzbeschreibung

In Caravan-Chaos werden Personen mit individuellen Bedürfnissen auf mehrere Kamele mit unterschiedlichen Sitzrastern verteilt. Nach dem Platzieren aller Personen wird das Level bewertet. Das Spiel speichert Spielstaende und Highscores lokal im Browser.

## Kernfunktionen

- Hauptmenü mit Navigation zu Levelauswahl, Highscore und Einstellungen
- Datengetriebenes Levelsystem auf JSON-Basis
- Interaktive Platzierung per Klick (Bahnhof -> Sitz)
- Modulares Scoring pro Person (0 bis 100 Punkte)
- Level-Recap mit Einzelpunkten und Gesamtwert
- Highscore je Level inkl. Laden eines gespeicherten Spielstands
- Light/Dark-Umschaltung
- localStorage-Persistenz fuer Spielstand, Theme und Highscores

## Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- shadcn-Style UI-Bausteine (projektintern in src/components/ui)
- Base UI + class-variance-authority
- Vitest
- ESLint

## Voraussetzungen

- Node.js: v24.11.0
- npm: 11.6.1

## Schnellstart

```bash
npm install
npm run dev
```

Danach im Browser die von Vite ausgegebene URL öffnen.

## Verfügbare Scripts

```bash
npm run dev      # Entwicklungsserver
npm run build    # Produktionsbuild
npm run preview  # Build lokal previewen
npm run test     # Unit-Tests (Vitest)
npm run lint     # ESLint
```

## Routing

- /main
- /levels
- /level/:levelId
- /level/:levelId/recap
- /highscore
- /settings

## Spiel- und Scoringlogik (Kurzfassung)

- Jede Person erhält am Ende einen Score zwischen 0 und 100.
- Personen ohne Bedürfnisse erhalten 100 Punkte.
- Bei mehreren Bedürfnissen wird der 100er-Wert anteilig aufgeteilt.
- Aktuell verwendete Need-Typen (Daten/Logik):
	- schläfrig
	- einsam
	- gesellig
	- Bestie
	- Hater
	- Stammkunde

## Persistenz (localStorage)

- people_<levelId>
- camels_<levelId>
- highscore_<levelId>
- lastPlayedLevel
- caravan-theme

## Projektstruktur (vereinfacht)

```text
my-app/
	src/
		assets/
			Level/
			needs/
			people/
		components/
			ui/
		lib/
		styling/
		utils/
```

## Qualitätssicherung

- Unit-Tests mit Vitest für Scoring-, Routing- und Highscore-Logik
- Statische Analyse mit ESLint