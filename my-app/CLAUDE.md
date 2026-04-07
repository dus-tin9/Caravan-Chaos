# Caravanen-Chaos

## Project Overview
A browser-based puzzle game built with React. Players seat people with different needs onto camels and try to satisfy everyone's constraints.

Main menu screens: Continue (last played level), Level Auswahl, Highscore, Einstellungen.
Inside a level: drag people from the Bahnhof onto camel seats. Press "End Level" once everyone is seated to see scores. "Reset" returns all people to the Bahnhof.

## Tech Stack
- React 19 (Vite)
- JavaScript (JSX)
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no config file needed)
- shadcn/ui components (in `src/components/ui/`)
- React Router DOM v7 (routing)
- PrimeReact (Splitter, ScrollPanel)
- CSS for non-Tailwind styling (`src/styling/index.css`)

## Commands
- `npm run dev`   — Start dev server (port 5173)
- `npm run build` — Production build
- `npm run test`  — Run Vitest unit tests
- `npm run lint`  — ESLint check

## Project Structure
src/
    assets/
        Level/      # Level JSON files (Level01.json … Level04.json)
        needs/      # Need-type definitions (JSON + Needs.md)
        people/     # SVG images — one per need type + standard.svg fallback
    components/     # React UI components
        ui/         # shadcn/ui primitives (Button, Card, …)
        Level.jsx           # Level container — loads data dynamically by levelId
        Spielfeld.jsx       # Scrollable camel grid
        Bahnhof.jsx         # Scrollable person list (unseated people)
        Sitze.jsx           # Seat grid for one camel (rows top→bottom, cols left→right)
        Sitz.jsx            # Single seat (shows person image or empty)
        Kamel.jsx           # One camel card with label + Sitze
        Buttons.jsx         # Main Menu / Reset / End Level bar
        Infofeld.jsx        # Selected-person info panel
        Bahnhof_Display.jsx # Person card in the Bahnhof list
        MainMenu.jsx        # Main menu
        LevelSelect.jsx     # Level picker (auto-discovers all Level*.json)
        Highscore.jsx       # Highscore placeholder page
        Settings.jsx        # Settings page
        LevelRecap.jsx      # Post-level score overview
    lib/
        routes.js       # All route constants — use these for every navigate() call
        utils.js        # cn() helper (clsx + tailwind-merge)
        personImage.js  # Maps first need → SVG filename; getPersonImageUrl(person)
    utils/
        needScoring/    # One scorer per need type, returns fraction 0–1
        scoring.js      # scoreLevel(people, camels) → [{id, name, score}]

## Routing
All routes are defined in `src/lib/routes.js`. Always import from there — never hardcode paths.

| Route constant       | Path                      |
|----------------------|---------------------------|
| `routes.main`        | `/main`                   |
| `routes.levelSelect` | `/levels`                 |
| `routes.highscore`   | `/highscore`              |
| `routes.settings`    | `/settings`               |
| `routes.levelById(n)`| `/level/:n`               |
| `routes.levelRecap(n)`| `/level/:n/recap`        |

- Navigate with `useNavigate()` from react-router-dom, never with state variables.
- Import alias `@/` maps to `src/`.

## Level Loading
- `Level.jsx` discovers all levels via `import.meta.glob('../assets/Level/Level*.json', { eager: true })`.
- File names must follow the pattern `LevelNN.json` (zero-padded, e.g. `Level01.json`).
- Adding a new JSON file is enough — no code changes required; it appears automatically in LevelSelect.
- Each level's state is saved to localStorage with level-specific keys (`people_1`, `camels_1`, …).
- The last played level is stored in localStorage under `lastPlayedLevel`.

## Person Images
- Defined in `src/lib/personImage.js` — `getPersonImageUrl(person)`.
- Image is chosen by the person's **first need** (`person.needs[0]?.name`).
- People with no needs use `standard.svg`.
- Mapping: `schläfrig→sleeper`, `einsam→loner`, `gesellig→gesellig`, `bestie→bestie`, `hater→hater`, `regular→regular`.
- Use `getPersonImageUrl` in every component that shows a person image — never build the path manually.

## Seat Grid Layout
- `seats[rowIndex][colIndex]` — row 0 is the top row, column 0 is the leftmost column.
- Rendered in `Sitze.jsx`: rows go top→bottom (screen rows), columns go left→right (screen columns).
- Row/column labels (r1, r2 … / c1, c2 …) are shown inside the grid.

## Scoring Rules
- Each person scores 0–100. A person with 0 needs always scores 100.
- Score = sum of (100 / numberOfNeeds) per satisfied need.
- `gesellig` gives partial credit: `min(actualNeighbors / anzahl, 1) × share`.
- All other needs are binary (fully met or 0).
- Neighbors = orthogonal only (up/down/left/right, same camel only).
- Scoring is calculated once when "End Level" is pressed, not live.
- Grid coordinates: row 1 = top row, column 1 = leftmost column (1-indexed in JSON, 0-indexed internally).

## Important Notes
- Level data format: `src/assets/Level/LevelStructure.md`
- Need data format: `src/assets/needs/Needs.md`
- Never commit .env files
