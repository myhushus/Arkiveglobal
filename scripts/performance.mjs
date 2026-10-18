import lighthouse from 'lighthouse';
import { existsSync } from 'node:fs';
import { launch } from 'chrome-launcher';
import { writeFile, mkdir } from 'node:fs/promises';
await mkdir('.artifacts/performance', { recursive: true });
const chrome = await launch({
  chromePath: existsSync(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  )
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : undefined,
  chromeFlags: ['--headless'],
});
try {
  const summaries = [];
  for (const lang of ['en', 'ko']) {
    const result = await lighthouse(`http://127.0.0.1:4321/${lang}/`, {
      port: chrome.port,
      output: ['html', 'json'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      logLevel: 'error',
    });
    await writeFile(`.artifacts/performance/${lang}.html`, result.report[0]);
    await writeFile(`.artifacts/performance/${lang}.json`, result.report[1]);
    const { lhr } = result;
    const summary = {
      lang,
      mode: 'Lighthouse mobile simulation; localhost; single run',
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([k, v]) => [
          k,
          Math.round(v.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          'first-contentful-paint',
          'largest-contentful-paint',
          'total-blocking-time',
          'cumulative-layout-shift',
          'speed-index',
          'total-byte-weight',
        ].map((k) => [k, lhr.audits[k]?.displayValue]),
      ),
      failed: Object.values(lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 1 &&
            a.details?.type !== 'opportunity',
        )
        .map((a) => ({ id: a.id, title: a.title, value: a.displayValue })),
    };
    summaries.push(summary);
    console.log(JSON.stringify(summary));
  }
  await writeFile(
    '.artifacts/performance/summary.json',
    JSON.stringify(summaries, null, 2),
  );
} finally {
  chrome.kill();
}
