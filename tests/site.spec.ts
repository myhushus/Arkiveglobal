import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const pages = [
  '',
  'about/',
  'technology/',
  'licensing/',
  'contact/',
  'privacy/',
];
for (const lang of ['en', 'ko']) {
  test(`${lang}: all pages, accessible semantics and no overflow`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const path of pages) {
      await page.goto(`/${lang}/${path}`);
      await expect(page.locator('h1')).toHaveCount(1);
      for (const width of [320, 375, 390, 640, 768, 900, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const dimensions = await page.evaluate(() => ({
          viewport: innerWidth,
          document: document.documentElement.scrollWidth,
        }));
        expect(
          dimensions.document,
          `${lang}/${path} at ${width}`,
        ).toBeLessThanOrEqual(dimensions.viewport);
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      const axe = await new AxeBuilder({ page })
        .withTags([
          'wcag2a',
          'wcag2aa',
          'wcag21a',
          'wcag21aa',
          'wcag22a',
          'wcag22aa',
        ])
        .analyze();
      expect(
        axe.violations,
        JSON.stringify(
          axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ),
      ).toEqual([]);
      const other = lang === 'en' ? 'ko' : 'en';
      await expect(page.locator('.language-link')).toHaveAttribute(
        'href',
        `/${other}/${path}`,
      );
    }
    expect(errors).toEqual([]);
  });
  test(`${lang}: mobile menu, keyboard, FAQ, email and reduced motion`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/${lang}/`);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    const summary = page.locator('.mobile-menu summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
    await page.keyboard.press('Escape');
    await expect(summary).toBeFocused();
    await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
    await summary.click();
    await page
      .locator('.mobile-menu nav a')
      .filter({ hasText: lang === 'en' ? 'Licensing' : '라이선싱' })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/licensing/`));
    await page.locator('.faq summary').first().focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.faq details').first()).toHaveAttribute(
      'open',
      '',
    );
    await page.goto(`/${lang}/contact/`);
    await expect(page.locator('form')).toHaveCount(0);
    for (const link of await page.locator('.inquiry-types a').all())
      expect(await link.getAttribute('href')).toMatch(
        /^mailto:licensing@arkiveglobal.com\?subject=/,
      );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe('auto');
    const axe = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ])
      .analyze();
    expect(axe.violations).toEqual([]);
  });
  test(`${lang}: landscape and enlarged text`, async ({ page }) => {
    for (const path of pages) {
      await page.setViewportSize({ width: 740, height: 360 });
      await page.goto(`/${lang}/${path}`);
      await page.addStyleTag({ content: 'html {font-size:200% !important}' });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(740);
    }
  });
}
test('legacy anchors and share metadata', async ({ page }) => {
  for (const anchor of ['top', 'about', 'scope', 'licensing', 'contact']) {
    await page.goto(`/#${anchor}`);
    await expect(page.locator(`#${anchor}`)).toHaveCount(1);
  }
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://arkiveglobal.com/en/',
  );
});
test('screenshots and no external requests', async ({ page }) => {
  const remote: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4321')) remote.push(r.url());
  });
  await fs.mkdir('.artifacts/screenshots', { recursive: true });
  for (const lang of ['en', 'ko'])
    for (const [label, width, height] of [
      ['desktop', 1440, 1000],
      ['mobile', 390, 844],
    ] as const) {
      await page.setViewportSize({ width, height });
      await page.goto(`/${lang}/`);
      await page.screenshot({
        path: `.artifacts/screenshots/${lang}-home-${label}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `.artifacts/screenshots/${lang}-home-${label}-viewport.png`,
      });
      for (const path of pages.filter(Boolean)) {
        await page.goto(`/${lang}/${path}`);
        await page.screenshot({
          path: `.artifacts/screenshots/${lang}-${path.replace('/', '')}-${label}.png`,
          fullPage: true,
        });
      }
    }
  await page.goto('/ko/contact/');
  await page.screenshot({
    path: '.artifacts/screenshots/ko-contact-mobile.png',
    fullPage: true,
  });
  expect(remote).toEqual([]);
});
test('JavaScript disabled: navigation, language, FAQ and legacy anchors', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/ko/licensing/');
  await page.locator('.mobile-menu summary').click();
  await expect(page.locator('.mobile-menu nav')).toBeVisible();
  await page.locator('.faq summary').first().click();
  await expect(page.locator('.faq details').first()).toHaveAttribute(
    'open',
    '',
  );
  await page.locator('.language-link').click();
  await expect(page).toHaveURL(/\/en\/licensing\//);
  await context.close();
});
