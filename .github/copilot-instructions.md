# Copilot Instructions for 5IV8_DelenaCaballeroJoseRoberto_PWP

## Project Overview
This is a static web portfolio for the subject "Programación Web y Pruebas". It consists of HTML, CSS, and image assets, organized by practice and functionality. There is no backend or build system; all files are served statically.

## Directory Structure
- `index.html`: Main portfolio landing page, links to individual practices.
- `01Curriculo/`: Curriculum practice. Contains `curriculo.html`, its own CSS, and images.
- `03 Loggin/`: Login page example. Contains `inicio.html`, its own CSS, and images.
- `css/`: Shared styles for the main page.

## Key Patterns & Conventions
- Each practice is in its own folder, with separate HTML and CSS files. Images are kept in a local `img` or `image` subfolder.
- CSS is linked relatively from HTML files (e.g., `<link rel="stylesheet" href="./css/style.css">`).
- No JavaScript or dynamic content is present.
- Styling follows Material Design principles: use of color palettes, typography, iconography, and rounded corners.
- Navigation is implemented with anchor tags and fixed-position nav bars.
- All pages use Spanish for content and comments.

## Developer Workflow
- **No build step required.**
- **No tests or automation.**
- To preview changes, open HTML files directly in a browser.
- Images must be placed in the correct subfolder for each practice.
- When adding a new practice, create a new folder, add HTML/CSS/image assets, and link from `index.html`.

## Examples
- See `01Curriculo/curriculo.html` for curriculum structure and navigation bar implementation.
- See `03 Loggin/inicio.html` for login form layout and social button styling.
- See `01Curriculo/css/style.css` and `03 Loggin/css/stylelogin.css` for custom style conventions.

## External Dependencies
- No external libraries or frameworks are used.
- All assets are local.

## Special Notes
- Follow Material Design guidelines for new styles.
- Keep all content and comments in Spanish.
- Do not add JavaScript unless explicitly requested.

---
For questions or unclear conventions, review existing HTML/CSS files for examples or ask for clarification.
