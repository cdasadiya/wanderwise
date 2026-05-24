# WanderWise Website Rules

- **Tech Stack**: Vanilla HTML5, CSS3, and JavaScript (ES6+). No build tools, bundlers, or CSS/JS frameworks.
- **Design & Layout**:
  - CSS custom variables for the color palette (`sky-blue`, `sunset-orange`, `sand-beige`, `ocean-teal`).
  - Magazine-style, responsive grid/flexbox layouts.
  - Smooth keyframe animations and transitions for interactions (e.g. card hover scale, compass rotation).
- **Web Audio Engine**:
  - Synthesize custom whoosh and ocean wave ambient loops using the HTML5 Web Audio API to prevent broken link issues.
  - Audio must start muted by default. Allow the user to toggle sound via a header button.
- **Dynamic Content**:
  - Destinations should be fetched dynamically from `/api/destinations` and rendered using template strings.
  - Category buttons filter destinations locally in memory without reloading the page.
- **Chat UX**:
  - Keep the chat widget floating in the bottom-right corner.
  - Render typed text in streaming fashion using standard requestAnimationFrame layout updates for instant scroll.
  - Support booking cards triggered by `[BOOKING: Destination]` tag.
- **SEO & Cache-Busting**:
  - Ensure semantic HTML (header, main, section, footer, h1).
  - Cache-bust assets using query parameters (e.g., `script.js?v=X`) on deployment.
