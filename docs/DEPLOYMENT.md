# Deployment and recovery runbook

## Baseline and scope

- Repository: https://github.com/myhushus/Arkiveglobal
- Preserved production main: `91a68d2bcaa9e42aace2a28a5176858a720e3f08`.
- Development branch: `codex/arkive-bilingual-rebuild`.
- Latest observed production run: https://github.com/myhushus/Arkiveglobal/actions/runs/30683777963 (dynamic Pages build and deployment, successful).
- Current live root matches the preserved original; HTTPS returns 200 and HTTP redirects to HTTPS with 301.
- No main merge, remote push, Pages setting change, DNS change or production deployment has been performed by this work.

## Accepted email limitation

The owner confirmed on 2026-10-18 that `licensing@arkiveglobal.com` is not operated for now. Keep its address and mailto links. Email inactivity is **not a release blocker or a rollback trigger**. Do not create accounts, add services, change MX/SPF/DKIM/DMARC, or run send/receive/reply tests. Link checks prove only the destination, not receipt. Contact and Privacy disclose the limitation; no form or successful-receipt UI exists.

## Before separately approved publication

1. Approve the exact final development commit and public content. Confirm any mandatory corporate notices using real entity/jurisdiction information; do not invent missing facts or inactive email processing procedures.
2. Record Settings → Pages source, custom domain `arkiveglobal.com`, Enforce HTTPS and environment/Actions permissions. Settings access was not verified; the connector could not retrieve the Pages endpoint. Remote main reported no branch protection. Review approval controls with the owner.
3. Record the current production SHA again. If it differs from the pinned baseline, stop and prepare a rollback artifact for the actual current release before publishing. Preserve DNS and domain settings; no DNS changes are planned.
4. Prepare and retain an independent original-site artifact and manifest. Run these local commands from the repository:

```sh
npm ci
npm run check
npm run build
npm test
node scripts/prepare-rollback.mjs
git status --short
```

The rollback helper writes `.artifacts/rollback/` and `.artifacts/rollback-manifest.json`, verifies all 11 original files byte for byte, adds `.nojekyll`, and rejects unexpected files. It changes no Git refs. All build/test outputs are ignored by Git.

## Publish only after explicit push, merge and production approval

The following are **future execution instructions**, not actions performed in this task.

1. Push the reviewed development branch only after approval, open/review its comparison to main, and merge the exact approved changes. Do not force-push. Recheck remote main first; reconcile later changes rather than overwriting them.
2. Before the approved merge, switch the existing branch-based Pages publisher to GitHub Actions within the launch window; otherwise main updates can trigger the old publisher. Preserve Custom domain and Enforce HTTPS. A CNAME file alone does not configure an Actions site's domain.
3. With the workflow present on main, launch the manual workflow using GitHub UI, or the following command if GitHub CLI is installed and authenticated:

```sh
gh workflow run deploy.yml --repo myhushus/Arkiveglobal --ref main -f confirmation='DEPLOY ARKIVE GLOBAL'
gh run list --repo myhushus/Arkiveglobal --workflow deploy.yml --limit 1
```

4. Inspect the selected run and its exact head SHA; wait for both build and deploy success. Configure a `github-pages` environment reviewer where available. Both workflows are manual-only, require main and an exact confirmation phrase, and share the `pages` concurrency group. Use only one release/rollback run at a time; do not queue overlapping runs.
5. On the real domain, verify `/`, `/index.html`, the five root anchors, all 12 language pages, images, unknown-path 404, sitemap/robots, canonical/hreflang and HTTPS. Verify email href values only; do not test mailbox delivery. Submit the sitemap in the existing Search Console property if available and monitor errors.

## URL compatibility

- `/`: real English compatibility home, canonical `/en/`; no JavaScript or meta-refresh redirect.
- `/#top`, `/#about`, `/#scope`, `/#licensing`, `/#contact`: actual targets retained; fixed-header visibility tested.
- `/ko/` and `/en/`: six canonical pages each, reciprocal alternate-language links and corresponding-page language switch.
- Sitemap contains canonical language pages only. Unknown paths return 404. `/index.html` remains a root alias.
- `dist/CNAME` is `arkiveglobal.com`; `.nojekyll` is present. Deploy only `dist/`, never the full checkout.

## Rollback after explicit approval

Use rollback for a new regression in page delivery or navigation. Known email inactivity does not qualify. If a release is currently building, cancel/wait for that specific release before running rollback so an older queued build cannot overwrite the restored site. Verify the rollback run completes last.

With rollback.yml present on main and the original baseline still appropriate:

```sh
gh workflow run rollback.yml --repo myhushus/Arkiveglobal --ref main -f confirmation='ROLLBACK ARKIVE GLOBAL'
gh run list --repo myhushus/Arkiveglobal --workflow rollback.yml --limit 1
```

The workflow reads the pinned original commit, uploads its verified artifact and deploys through the same Pages environment. It does not reset main or change DNS. Verify the root, original images, original anchors and HTTPS afterward. **Exact-baseline rollback removes the new /ko/ and /en/ pages (404)**; accept this recovery tradeoff before release. A different recovery artifact retaining new URLs requires separate review.

Keep the original artifact outside GitHub Actions too. If Actions is unavailable, an authorized operator can prepare a recovery branch from the correct baseline and review a return to branch publishing; do not force-reset main or overwrite unrelated work.

## Verification limits

Local build/browser checks, rollback byte integrity and a local new→old→new HTTP rehearsal passed. GitHub Actions permissions/execution, new production language routes, CDN timing and actual production rollback remain untested until separately approved execution. The current site's HTTPS response is verified; Settings checkboxes are not. GitHub Pages cannot apply arbitrary HTTP response security headers from this source tree.
