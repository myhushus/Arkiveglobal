# Implementation and verification — 2026-10-18 (Asia/Seoul)

## Delivered

- Astro 7.4 + TypeScript static build; existing GitHub Pages custom domain retained in config.
- Six complete pages in each language: Home, About, Technology, Licensing, Contact, Privacy.
- Root compatibility home and bilingual 404: 14 HTML files total.
- Shared header/footer, responsive design tokens, inline SVG diagrams, original brand mark, optimized WebP derivative.
- Independent typed English/Korean content, build-time translation shape/array/nonempty checks.
- Empty publication-controlled technology registry and common detail layout. No invented technology records or performance claims.
- Subject-specific email links. No backend, fake submission, paid service, database, CMS, tracking or external font requests.
- Canonical, reciprocal hreflang, x-default, OG images, Organization/Breadcrumb JSON-LD, sitemap.xml, robots.txt.
- GitHub Pages verification and explicitly manual production workflows, with release/recovery documentation. Not run remotely.

## Checks performed

| Check | Result |
| --- | --- |
| Astro/TypeScript | No errors or warnings; final check output recorded in task |
| Static generation | 14 HTML files generated |
| Internal href/src and fragments | 369 local links/assets checked, no broken references |
| Sitemap | 12 canonical language URLs matched to generated pages |
| Metadata | Unique localized titles, description, canonical, hreflang, OG and parseable JSON-LD verified |
| Legacy compatibility | Original five anchor targets present on root; no JS required |
| Playwright | 9 tests passed using local Chrome on macOS |
| Responsive | All 12 language pages at 320, 375, 390, 640, 768, 900, 1024, 1440px; no horizontal overflow |
| Enlarged text/landscape | All 12 pages at 740×360 with root font size 200%; no horizontal overflow |
| Keyboard | Skip-to-main focus, menu Enter/Escape/focus return, FAQ Enter verified in both languages |
| Reduced motion | Smooth scrolling disabled when requested |
| JavaScript disabled | Language navigation, mobile menu and FAQ remain usable |
| axe-core | No violations of tested WCAG 2.0/2.1/2.2 A/AA rules on all desktop pages and mobile contact pages |
| Network | No third-party requests observed in page/screenshot traversal |
| Original source preservation | git diff against 91a68d2 for original index.html, styles.css, script.js, assets/ and CNAME is empty |
| Dependency installation | npm audit reported 0 vulnerabilities at installation time |

## Local performance (single mobile Lighthouse run per language)

| Metric | English home | Korean home |
| --- | --- | --- |
| Performance score | 99 | 100 |
| Accessibility score | 100 | 100 |
| Best practices score | 100 | 100 |
| SEO score | 100 | 100 |
| FCP | 0.8s | 0.8s |
| LCP | 0.9s | 0.9s |
| Total Blocking Time | 0ms | 0ms |
| CLS | 0 | 0 |
| Speed Index | 3.2s | 0.8s |
| Reported transfer total | 16KiB | 17KiB |

These are simulated mobile measurements against localhost, not production field data or an INP measurement. Scores can vary. Small remaining audit opportunities concern render-blocking CSS and image delivery, not failed functionality. CSS output is approximately 18.3KB raw / 4.8KB gzip. The visible brand mark derivative is 5,372 bytes versus the preserved 227,911-byte original.

## Visual review

Saved full-page desktop/mobile captures for all 12 core pages, plus home viewport captures. Inspected English/Korean home, mobile contact, desktop licensing and technology designs. Screenshots and Lighthouse HTML/JSON are in `.artifacts/` (excluded from Git and production output); copies accompany the delivery package.

## Limits and release prerequisites

- No deployment, remote branch push, main merge, DNS change or real email submission performed.
- Browser tests use Chromium/Chrome. Actual iOS Safari, Android devices, foldable hinges and native OS font settings were not separately tested. Width-based reflow is tested; physical device certification is not claimed.
- Automated accessibility passes and accessible-tree inspection are not a complete WCAG conformance audit. Full VoiceOver/NVDA user-flow review remains advisable.
- Mailbox delivery, email provider/retention and operator-specific legal disclosures need operator confirmation before publishing.
- No individual technology details are public because no approved records were supplied. The template is implemented/type-checked but not verified with real approved technical content.
- GitHub Actions, live HTTP status/headers/TLS, Search Console and real-user Core Web Vitals remain release-stage verification items.
- Privacy is a website behavior notice, not a claim of comprehensive jurisdictional legal compliance.

See DEPLOYMENT.md for the approval gate, Pages source transition and rollback steps.
