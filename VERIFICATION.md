# Verification

Checked October 12, 2026.

Visual refresh verified October 12, 2026:

- All original HTML text fragments are preserved; `public/app.js`, including project data and case-study content, is unchanged.
- Desktop at 1440×1000 and mobile at 390×844 inspected. Decorative orbit overflow is clipped at the main content boundary.
- Data / AI / Software controls update technology nodes, supporting project links, and the highlighted original skill cards. Role links in the hero select the matching view.
- Academic gauges animate to the original 9.15/10, 93.2%, and 96.8% values when visible.
- Backend filtering, restoring all three projects, and opening/closing compiler case-study notes pass on mobile.
- The research field Add / Reset controls change 8 → 9 → 8 on desktop.
- No browser console errors during these interactions. Reduced-motion and print fallbacks are included; those modes were inspected in source rather than through browser emulation.
- `npm run check` includes the new visual interaction script and asset checks.

- `npm run check` passes JavaScript syntax, anchor targets, duplicate IDs, local asset presence, key resume details, PDF signature, and placeholder/private-reference checks.
- `npm run build` succeeds and writes the static site to `dist/`.
- Browser review at 1440×1000 and 390×844: desktop columns and mobile stacking inspected; no horizontal overflow observed.
- Research field: Add site changes the counter from 8 to 9; Reset restores 8.
- Backend filter shows the compiler; the Applied AI filter and All work controls were exercised.
- Compiler case-study dialog opens with its challenge, architecture, implementation, scope, and source/demo links; closing returns to the portfolio.
- Shortlist changes the counter and recruiter brief selection; a saved project persists across a page reload. Test selections were removed afterward.
- Command search for “research” returns the matching research section.
- No browser console errors were reported during the inspected interaction sequence.
- The original resume PDF was copied unchanged from the authenticated Drive download.

Limits: not deployed to Render or GitHub; no hosted deployment verification. External project demos were linked from the resume and are not guaranteed available. Print styling is included, but a physical print or exported PDF was not verified. Contact links open the visitor’s email/phone application; there is no server-side contact form. Clipboard support depends on the browser.
