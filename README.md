# Gaurav Ghosh — Portfolio

A responsive dark portfolio built with HTML, CSS, browser JavaScript, and a dependency-free Node build script. Core profile content and fallback project links are available without JavaScript; JavaScript adds project case studies, filters, a local recruiter shortlist, print/copy briefs, command navigation, and an interactive Voronoi field.

## Preview locally

Requires Node.js 20 or later. From this folder:

```sh
npm run check
npm start
```

Open http://127.0.0.1:5173. Stop with Ctrl+C.

## Deploy to Render

1. Put the contents of this folder in a GitHub repository (with `package.json` and `render.yaml` at the repository root).
2. In Render, choose **New → Static Site** and connect that repository.
3. Set **Build Command** to `npm run build`.
4. Set **Publish Directory** to `dist`.
5. Create the static site. Render provides the final HTTPS URL.

Alternatively, use **New → Blueprint** with this repository; `render.yaml` defines the static site. Do not deploy this as a Node Web Service: it is a static portfolio. No API keys, database, or paid backend are required by this code.

Official deployment references: https://render.com/docs/static-sites and https://render.com/docs/blueprint-spec

## Customize

- `public/index.html`: contact information, skills, research, education, achievements, metadata, recruiter overview.
- `public/app.js`: project content, case-study scope, verified links, illustrations, and interactions.
- `public/styles.css`: colors, typography, responsive layout, reduced-motion preference, and print brief layout.
- `public/visuals.css` and `public/visuals.js`: layered 3D presentation, pointer tilt, animated academic charts, and the interactive Data / AI / Software toolkit map. Academic chart values come from the existing resume content; the map shows technology connections rather than proficiency scores. Reduced-motion preferences disable animation and tilt.
- `public/resume.pdf`: the original unmodified resume. Replace this when the resume changes.

Google Fonts are optional external resources; system fonts provide a fallback. All illustration assets and portfolio interactions run locally in the visitor’s browser. No analytics or tracking scripts are included. The shortlist is stored only in that browser and is not synchronized across devices. Copying a hiring brief requires browser clipboard support; print/save PDF is the fallback. The website opens an email client for contact; it does not claim to submit a server-side form.

The original resume includes the phone number, as requested. Project demo links were taken from the resume and are external services; availability may change. The compiler demo uses the HTTP address listed in the source document. The conceptual illustrations are labeled and do not represent screenshots or live project execution.

## Content accuracy

See `CONTENT-SOURCES.md` for the source audit. Metrics are resume-reported values, not live statistics. Ongoing positions reflect the source resume; recheck them before future updates. No unverified testimonials, job availability, production deployment claims, research speedups, or proficiency percentages were added.

## Build

```sh
npm run check
npm run build
```

Upload `dist/` to any static host. The Node server is only a local preview helper. The Render build copies `public/` into `dist/`. No dependency install is required.
