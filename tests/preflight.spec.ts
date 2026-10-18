import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths = [
  '',
  'about/',
  'technology/',
  'licensing/',
  'contact/',
  'privacy/',
];
test('preflight: mobile AA and all email destinations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const lang of ['ko', 'en'])
    for (const path of paths) {
      await page.goto(`/${lang}/${path}`);
      const audit = await new AxeBuilder({ page })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22a',
          'wcag22aa',
        ])
        .analyze();
      expect(audit.violations, `${lang}/${path}`).toEqual([]);
      for (const a of await page.locator('a[href^="mailto:"]').all()) {
        const address = new URL((await a.getAttribute('href'))!);
        expect(address.pathname).toBe('licensing@arkiveglobal.com');
        expect(address.searchParams.has('body')).toBe(false);
        if (address.search)
          expect(
            address.searchParams.get('subject')?.startsWith('ARKIVE GLOBAL — '),
          ).toBe(true);
      }
    }
});
test('preflight: legacy anchors remain below sticky navigation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const anchor of ['about', 'scope', 'licensing', 'contact']) {
      await page.goto(`/#${anchor}`);
      const target = page.locator(`#${anchor}`);
      await expect(target).toBeInViewport();
      const top = await target.evaluate((el) => el.getBoundingClientRect().top);
      const bottom = await page
        .locator('header')
        .evaluate((el) => el.getBoundingClientRect().bottom);
      expect(top).toBeGreaterThanOrEqual(bottom - 1);
    }
  }
});
test('preflight: index compatibility, unknown URL status, storage and Open Graph assets', async ({
  page,
  request,
}) => {
  expect((await request.get('/index.html')).status()).toBe(200);
  expect((await request.get('/not-a-published-page/')).status()).toBe(404);
  for (const lang of ['ko', 'en']) {
    await page.goto(`/${lang}/`);
    const og = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content');
    expect((await request.get(new URL(og!).pathname)).status()).toBe(200);
    expect(
      await page.evaluate(() => ({
        local: localStorage.length,
        session: sessionStorage.length,
        cookies: document.cookie,
      })),
    ).toEqual({ local: 0, session: 0, cookies: '' });
  }
});
