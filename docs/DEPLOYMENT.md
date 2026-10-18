# Deployment and recovery runbook

## Current baseline

- Repository: https://github.com/myhushus/Arkiveglobal
- Baseline: `91a68d2bcaa9e42aace2a28a5176858a720e3f08` (2026-08-01).
- Existing successful workflow: https://github.com/myhushus/Arkiveglobal/actions/runs/30683777963
- Observed pipeline: dynamic Pages Jekyll build, upload and deploy.
- CNAME: arkiveglobal.com. DNS provider and current Pages settings were not changed.
- Development: local `codex/arkive-bilingual-rebuild`, no push, merge or deployment performed.

## Release gate

1. Obtain explicit approval for publishing and the exact reviewed commit.
2. Operator confirms the current public business description and new explanatory wording; privacy owner confirms email provider, retention and applicable mandatory disclosures. Do not invent missing legal company details.
3. Verify licensing@arkiveglobal.com receives messages with an operator-authorized email test. UI link checks do not prove mailbox delivery.
4. Record current DNS, custom domain, HTTPS settings and GitHub Pages source before changing anything. Preserve Search Console baseline if available.
5. Retain the previous production artifact or generate a rollback artifact from the baseline commit, containing index.html, styles.css, script.js, assets/ and CNAME. Preserve its checksum and keep it outside the new dist artifact.
6. Run `npm ci`, `npm run check`, `npm run build`, `npm test`. Inspect screenshots and review approved content. Local preview is not a security or legal certification.
7. After explicit approval, push/review the development branch. Before any approved main merge, coordinate the existing Pages publishing source: the old branch-based publisher can react to main changes. Switch to GitHub Actions only within the approved launch window, preserving custom domain and HTTPS settings.
8. Merge the approved commit into main. Run `Approved production deployment` manually on main with exact input `DEPLOY ARKIVE GLOBAL`. Configure an environment reviewer for `github-pages` when available. No push-trigger deployment is defined.
9. Verify artifact serves CNAME, .nojekyll, all 12 language URLs, root legacy anchors, sitemap, robots, 404 and images. Verify HTTP status, TLS, mail links, canonical and hreflang on the real domain.
10. Submit sitemap in existing Search Console property and monitor errors and search changes. No DNS or MX change is required for the proposed same-host rebuild.

## URL strategy

- `/`: substantive compatibility home, canonical to `/en/`; no JS or meta-refresh redirect.
- Original `/#top`, `/#about`, `/#scope`, `/#licensing`, `/#contact` remain actual DOM targets. Fragments cannot be individually redirected by the server.
- `/en/` and `/ko/` are canonical language pages. Every core page has reciprocal alternate-language links and x-default to its English equivalent.
- Sitemap includes canonical language URLs only, not duplicate root or 404.
- Unknown paths receive 404. Do not route every unknown URL to home.
- Existing `/index.html` should continue serving the root document; verify on GitHub Pages after release.

## Rollback

If core navigation, email access or page delivery fails, restore the previously approved Pages artifact through an authorized release; keep the same domain. If returning to the old branch publisher, restore the baseline content in a recovery branch and review before changing main/source settings. Do not force-reset main or overwrite unrelated work. Record rollback SHA and verify root anchors, DNS/TLS and mailbox access. An immediate rollback can make new language URLs disappear; decide whether to retain compatibility files based on the actual incident and crawl state.

GitHub Actions execution, DNS/TLS behavior and production headers remain unverified until the approved deployment. This project has no mechanism to set arbitrary HTTP security headers on GitHub Pages; hosting controls must be reviewed separately. No server-side secrets exist in this build.
