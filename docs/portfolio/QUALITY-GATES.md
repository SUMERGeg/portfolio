# Quality gates — portfolio

Use this as an acceptance matrix, not as a reason to over-engineer the project.

Current baseline: [design brief](portfolio-design-brief.md), [user reference](references/portfolio-home-reference.png), and [NOIR / SEZON / Lost&Found content](CONTENT-AND-CASES.md). Stage 6 local acceptance was completed on 2 October 2026: [results, limitations and the non-blocking transition note](ACCEPTANCE-REPORT.md). This matrix describes requirements; use the report for evidence of actual checks.

## 1. Product clarity

A new visitor should quickly understand:
- who is behind the site;
- that the service is websites for business;
- that design + development + structure are offered as one system;
- what work can be viewed;
- how to discuss a project.

The portfolio should feel like a strong one-person mini-studio, not a large agency and not a cheap template freelancer.

## 2. Visual direction

Pass when:
- the screen reads as dark Digital Grid;
- electric blue is an accent, not the whole identity;
- typography has strong hierarchy and readable body text;
- NOIR is clearly the flagship project;
- system details add structure without visual noise;
- section rhythm varies intentionally;
- the compact row of three image-led project previews matches the reference; cards do not resemble generic SaaS widgets;
- mobile composition retains the identity.
- the laptop contains the automotive NOIR project, not the reference's lamp website;
- sample projects and unverified numeric claims from the reference are absent.

Fail when:
- the layout resembles a dashboard/SaaS template;
- text overlaps;
- important copy is too dim/small;
- everything is inside identical rounded cards;
- decorative effects compete with content.

## 3. Responsive

Reference widths:
- 1440 desktop;
- 1024 tablet;
- 768 compact tablet / landscape;
- 390 mobile.

Required:
- no accidental horizontal scroll;
- no clipping/collisions;
- no fragile fixed heights around copy;
- navigation remains usable;
- interactive hit areas are appropriate for touch;
- project imagery remains meaningful;
- 768 may switch to mobile-like composition;
- 390 is a deliberate composition, not desktop scaled down.

## 4. Accessibility

Required fundamentals:
- semantic page landmarks;
- coherent heading order;
- links vs buttons used correctly;
- keyboard-operable interactive elements;
- visible focus;
- labeled form controls;
- informative images have meaningful alt text;
- contrast is reasonable;
- motion respects reduced-motion preferences;
- no essential information available only on hover.

## 5. Technical reliability

Before major completion:
- existing typecheck passes when configured;
- existing lint passes if it is part of the project's required checks;
- relevant tests pass;
- production build passes when practical;
- no new obvious console errors;
- no silent swallowed errors in user-facing flows;
- no accidental duplicate components/dead code from the change.

Do not add test tooling solely to satisfy this checklist unless the project actually needs it.

During iteration, run only checks relevant to the change. Documentation-only changes need link/file checks, not a frontend rebuild. The implemented application provides `npm run check` and `npm run build`; no separate lint or test-framework command is configured.

## 6. Performance

Prioritize high-impact items:
- appropriate hero/project image dimensions and formats;
- no giant source image shipped for a small card;
- avoid unnecessary client-side JavaScript;
- avoid expensive continuous effects;
- minimize layout shift;
- load fonts intentionally;
- keep initial route work proportional to a portfolio site.

Suggested field targets when measurable:
- LCP around or below 2.5s;
- CLS around or below 0.1;
- INP around or below 200ms.

Treat these as goals, not as fabricated pass results when no measurement exists.

## 7. Motion

Pass when:
- motion is expressive as requested by the user, with stable idle content and bounded effects;
- touch devices still work;
- reduced motion works;
- the hero can be impressive while idle content stays stable;
- no scroll-jacking;
- no animation delays access to text/actions.

## 8. Content integrity

Never invent:
- clients;
- testimonials;
- revenue/conversion metrics;
- awards;
- project dates/results not present in source material;
- contact information.

Concept work must be labeled honestly.

The public release requires confirmed contact links, actual project roles and usable local project images. A contact form must not report success without a working delivery mechanism. Demo-store checkout and disabled service functions must not be described as production features.

## 9. SEO basics

Apply according to framework/deployment:
- unique useful title/description;
- semantic headings;
- indexable content;
- social metadata where supported;
- canonical/robots/sitemap only when correctly configured.

## 10. Completion statement

A task is only “done” when the final response distinguishes:
- implemented;
- tested;
- visually verified;
- not verified / blocked.
