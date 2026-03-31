# Caravanen-Chaos

## Project Overview
A browser-based puzzle game built with React. Players solve tile-based challenges across multiple levels.
There shall be a Main menu to: Continue (the latest played level in the last state),  Levels (a Roadmap to all the diffrent Levels), settings, Scoreboard (to view the obtained scores in all played levels)
Inside a Level, the Player will be provided a List of people with diffrent needs and camel(s) of diffrent sizes where the Player can place all the people with the goal to satisfy all the peoples needs. 
by Ending the Level (with a Button) the Player will be shown a score and a overview of the satisfactory score of each person. 
Every person in the Game shall have a max score of 100 dependent by how well their needs are met

## Tech Stack
- React 18 (Vite)
- JavaScript (JSX)
- CSS for styling

## Commands
- `npm run dev`   — Start dev server (port 5173)
- `npm run build` — Production build
- `npm run test`  — Run Vitest unit tests
- `npm run lint`  — ESLint check

## Project Structure
src/
    assets/         # Static data and media
        Level/      # Level definitions (JSON files)
        needs/      # Need-type definitions (JSON files)
        people/     # SVG files for people
    components/     # React UI components
    utils/          # Core game logic (pure JS functions, no React)
    
## Code Style
- Separate game logic from React components (utils/ is pure JS)
- Use ES modules (import/export), never require()

## Important Notes
- Level data format is documented in src/assets/level/LevelStructure.md
- need data format is documented in src/assets/needs/Needs.md
- Never commit .env files
