# Copilot Instructions for ROSO Esports

## Project Overview
ROSO Esports is a static website for an esports organization. The site is built with plain HTML, CSS, and vanilla JavaScript — no build tools, frameworks, or package managers are used.

## Tech Stack
- **HTML5** — All pages are static `.html` files in the project root
- **CSS** — `style.css` is the main stylesheet
- **JavaScript** — `app.js` contains all interactive features (wrapped in an IIFE)
- **Git LFS** — Used for video files (`.mp4`, `.webm`, `.mov`, `.avi`)

## Project Structure
- `index.html` — Home page
- `about.html`, `teams.html`, `news.html`, `partners.html`, `contact.html` — Section pages
- `team-valorant.html`, `team-overwatch.html`, `team-rocketleague.html`, `team-tbd.html` — Individual team pages
- `style.css` — All styles
- `app.js` — All JavaScript functionality
- `assets/` — Images and icons (e.g., `assets/team-icons/`)
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow

## Development Guidelines
- This is a static site with no build step. Changes to HTML, CSS, or JS files take effect immediately.
- There is no test suite or linter configured — validate changes by reviewing the HTML structure and ensuring files referenced in `index.html` exist.
- The deploy workflow checks that `index.html`, `style.css`, and `app.js` exist and that `index.html` has proper HTML structure and references both `style.css` and `app.js`.
- Keep all pages consistent in navigation and footer structure.
