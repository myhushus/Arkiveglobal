# ARKIVE GLOBAL

Bilingual Astro + TypeScript static website for https://arkiveglobal.com.

## Local development

Use Node.js 24 LTS (Node >=22.22 supported by this package; dependency engine requirements also apply).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
npm test
```

Tests use installed Chrome on macOS when available, otherwise Playwright Chromium (`npx playwright install chromium`). Tests start their own preview server on 127.0.0.1:4321. No external services, credentials, database or paid subscriptions are needed. Astro CLI telemetry is disabled in scripts.

## Pages

`/en/` and `/ko/` each contain Home, About, Technology, Licensing, Contact and Privacy. `/` retains a functional English home and all original fragment targets (`top`, `about`, `scope`, `licensing`, `contact`), with canonical `/en/`. This preserves the original source document's English default without browser-language redirects. `/404.html` offers both languages.

- `src/content/en.ts`, `ko.ts`: independently maintained, type-checked translations.
- `src/components`: shared page content, navigation-related UI, inline SVG diagrams and CTA.
- `src/layouts/Base.astro`: document, SEO, header, footer and minimal menu enhancement.
- `src/layouts/TechnologyDetail.astro`: future approved technology detail template.
- `src/content/technologies.ts`: typed publication registry; intentionally empty.
- `src/styles/global.css`: responsive design tokens and layouts.
- `scripts/verify.mjs`: validates generated HTML, links, metadata, sitemap and legacy anchors.
- `tests/site.spec.ts`: browser behavior, responsive reflow, axe accessibility and screenshots.

## Preserved source

The original root HTML/CSS/JS and `assets/` are left intact. Copies of the original text files are in `legacy/`; all original image files are also preserved. They are not used as the new Astro entry points. Only `dist/` is a deployment artifact; never upload the entire source checkout. `legacy/` is excluded from the built output.

## Content and privacy

No individual technologies, patent counts, clients or contract claims were invented. Email links do not submit messages. There is no fake form, analytics, third-party font request, cookie or language storage. The Privacy page describes verifiable website behavior; email provider, retention and operator-specific legal requirements still need operator confirmation before launch.

## Deployment

Production is **not** automatically deployed on push or merge by the new workflow. See `docs/DEPLOYMENT.md` for approval, GitHub Pages source transition and rollback. The existing GitHub Pages branch-based configuration is not changed by these local files. Do not merge, push to main, alter Pages settings or run production workflows without explicit approval.

Current domain is a custom root domain. `site` is `https://arkiveglobal.com`; no repository-name base prefix is needed. `CNAME` and `.nojekyll` are copied into `dist/`.
