import { languages, slugs, href, site } from '../content';
import { publishedTechnologies } from '../content/technologies';
export function GET() {
  const paths = [
    ...slugs,
    ...publishedTechnologies.map((t) => `technology/${t.slug}`),
  ];
  const urls = languages
    .flatMap((lang) =>
      paths.map(
        (p) =>
          `<url><loc>${site}${href(lang, p)}</loc>${languages.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${site}${href(l, p)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${site}${href('en', p)}"/></url>`,
      ),
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
