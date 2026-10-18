# Content governance

The authoritative starting point is the original published English and Korean website at baseline commit 91a68d2. New copy reorganizes and explains that business description without adding patent counts, customers, offices, dates of incorporation or deal claims.

## Editing a core page

Edit the appropriate language file in src/content/. `ko` conforms to the English shape through TypeScript. Run the checks after either language changes. Similar-length copy is not required: layouts must reflow. Do not put markup in text strings.

## Adding a technology

No detail pages are currently published. To add one:

1. Obtain approval for the exact public record and both translations. Never store confidential material even with approvedForPublication=false: this repository is public.
2. Add a Technology record to src/content/technologies.ts, with a stable lowercase slug, field, review date and both translations.
3. Use specific, verified rights language. Do not equate a pending application, ownership or a license to other rights.
4. Set approvedForPublication=true only after review. The common template, index and sitemap generate both language routes.
5. Run all checks; the static verifier checks the sitemap against generated language pages. Check each new detail page with axe and keyboard review.
6. Record the source and approver in the operator's appropriate records, not confidential attachments in the public repository.

## Email and privacy

Contact links encode only inquiry subjects, never visitor information. No on-site form exists. Do not promise a response deadline without operator agreement. The owner has confirmed that licensing@arkiveglobal.com is not operated for now. Keep its address and links, disclose the limitation, and do not perform delivery tests, change DNS or introduce email services. This is not a release blocker. Confirm any applicable entity disclosures using actual operator information. Provider, retention and inquiry-processing procedures are needed only if a real contact channel is introduced. Any future form or analytics feature requires updating both privacy pages based on actual processing.
