import { en } from './en';
import { ko } from './ko';
export const languages = ['en', 'ko'] as const;
export type Lang = (typeof languages)[number];
export const slugs = [
  '',
  'about',
  'technology',
  'licensing',
  'contact',
  'privacy',
] as const;
export type Page = (typeof slugs)[number];
export const content = { en, ko };
export const site = 'https://arkiveglobal.com';
export const email = 'licensing@arkiveglobal.com';
export const href = (lang: Lang, page = '') =>
  `/${lang}/${page ? `${page}/` : ''}`;
export const mail = (subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(`ARKIVE GLOBAL — ${subject}`)}`;
// Fail builds for missing translations or uneven repeated content (not just missing keys).
function validatePair(a: unknown, b: unknown, path = 'content'): void {
  if (typeof a === 'string') {
    if (typeof b !== 'string' || !a.trim() || !b.trim())
      throw new Error(`Missing translation: ${path}`);
  } else if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length)
      throw new Error(`Translation item mismatch: ${path}`);
    a.forEach((value, i) => validatePair(value, b[i], `${path}[${i}]`));
  } else if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object')
      throw new Error(`Missing translation object: ${path}`);
    for (const key of Object.keys(a))
      validatePair(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        `${path}.${key}`,
      );
  }
}
validatePair(en, ko);
