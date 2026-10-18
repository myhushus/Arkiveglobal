import type { Lang } from './index';
/** Only approved, public information belongs in this repository. Never add NDA material. */
export interface Technology {
  slug: string;
  approvedForPublication: boolean;
  reviewedOn: string;
  field: 'software' | 'intelligence' | 'mechanical' | 'consumer';
  translations: Record<
    Lang,
    {
      title: string;
      summary: string;
      problem: string;
      application: string;
      rights: string;
      disclosure: string;
    }
  >;
}
// Intentionally empty. No verified individual technology records have been supplied.
export const technologies: Technology[] = [];
export const publishedTechnologies = technologies.filter(
  (t) => t.approvedForPublication,
);
