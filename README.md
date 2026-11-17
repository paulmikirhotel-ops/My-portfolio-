# Paul Miki Mensah: Portfolio

Personal portfolio of Paul Miki Mensah, a MERN stack developer in Liberia.
Live site: https://paul-mensah-dev-portfolio.onrender.com

## Stack

- React 19 + Vite 7
- Three.js for the 3D background (lazy-loaded after first paint)
- Plain CSS with a gold/blue theme switcher (choice is remembered in `localStorage`)
- Self-hosted fonts via `@fontsource` (Cormorant Garamond, Syne, DM Mono)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run lint     # ESLint
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  components/     one folder per section (Hero, About, Skills, Projects, Contact, Footer, ...)
  context/        theme provider and context
  hooks/          useTheme, useScrollReveal
  styles/         global.css: theme variables, base styles, buttons
public/           favicon, photo, robots.txt, sitemap.xml
```

## Editing content

- **Projects:** edit the `PROJECTS` array at the top of `src/components/Projects/Projects.jsx`.
  Set `status` to `'live'` or `'dev'`, and add `live` and/or `code` URLs. Cards
  with no link show "Coming soon".
- **Skills:** edit the `SKILLS` array in `src/components/Skills/Skills.jsx`.
- **SEO and social previews:** edit the `<head>` in `index.html`.

## Accessibility and performance notes

- The custom cursor is used only with a real mouse; touch devices and small
  screens get the normal cursor.
- Animations and the 3D scene respect `prefers-reduced-motion`.
- The 3D scene uses fewer particles on phones and pauses while the tab is hidden.

## Adding a CV

Place the PDF at `public/paul-mensah-cv.pdf`, then add a button that links to
`/paul-mensah-cv.pdf` in `Hero.jsx` and `About.jsx`. The "Download CV" buttons
were replaced with "Contact" buttons until the file exists.
