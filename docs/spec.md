# webdevluis.com — spec

Personal site of Luis Martinez: blog, portfolio, about, resume. Public, read-only, no accounts, no backend.

## Routes

All routes are build-time static HTML (doctrine `rendering-models`: small public site, infrequent edits).
Freshness: rebuild on publication. No private data anywhere.

| Route | Source | Template | Notes |
|---|---|---|---|
| `/` | `content/_index.md` + all posts | `index.html` | Hero + post cards, newest first |
| `/blog/<slug>/` | `content/blog/<slug>/index.md` | `post.html` | Page bundle; images colocated |
| `/blog/` | — | — | Not rendered (`render = false`); posts are listed on `/` |
| `/about/` | `content/about.md` | `about.html` | |
| `/portfolio/` | `content/portfolio/_index.md` (items in `[extra]`) | `portfolio.html` | |
| `/portfolio/weather/` | `content/portfolio/weather.md` | `weather.html` | Static showcase of a past project |
| `/resume/` | `data/resume.json` | `resume.html` | Print CSS replaces the old print page |
| `/resume/react-typescript/` | `data/resume-react-typescript.json` | `resume-page.html` | |
| `/resume/print/`, `/resume/react-typescript/print/` | Zola `aliases` | — | Redirect pages to the resume (old print URLs) |
| `/atom.xml`, `/sitemap.xml`, `/robots.txt` | generated | `robots.txt` | |
| `/api/make-sitemap` | `static/_redirects` | — | Netlify 301 to `/sitemap.xml` (old sitemap URL) |
| `/sw.js` | `static/sw.js` | — | Retires the old next-pwa service worker; remove after ~2027-04 |

## Behaviour

- Theme: light/dark toggle, stored in `localStorage["dark-mode"]` (same key as the old site); with no stored
  choice the system preference applies. Applied before first paint by an inline script in `base.html`.
- Mobile (< 1024px): nav collapses behind a menu button; without JS the links show inline.
- Code highlighting: Zola/giallo with `github-light`/`github-dark` CSS classes; the theme toggle switches
  which stylesheet is active.
- Analytics: Umami (cookieless). Browser errors: Sentry loader script (lazy-loads the SDK on first error).
  Both are only included in `zola build` output, not `zola serve`.

## Verification

`./verify` must pass. It checks: TypeScript types, Zola internal links and anchors, that every URL in
`tests/legacy-urls.txt` still resolves, sitemap coverage, title/description/canonical/og:image/single `<h1>`
on every page, no broken local `src`/`href`, and no leftovers of the old stack in attribute values.

## Decision record: Next.js + Storyblok → Zola (2026-10-19)

- **Problem:** Next 14 Pages Router + Storyblok + Redux + next-pwa on Netlify functions for a 23-post blog.
  Live bugs: sitemap endpoint returned `{}` (and robots.txt pointed at a disallowed path), placeholder social
  metadata (`yourdomain.com`), 25 type errors hidden by `ignoreBuildErrors`, two content sources.
  ~195 KB of compressed JS on the home page. Storyblok was no longer used for new posts.
- **Choice:** Zola static site per doctrine `software-architecture` (static site default). Plain CSS replaces
  Tailwind; TypeScript (pinned 5.9.3, compiled by `tsc`) for the three interactive controls.
- **Migration:** 19 Storyblok posts exported from the live pages' embedded JSON and converted to Markdown;
  images downloaded from Cloudinary as WebP into the post bundles. 4 MDX posts converted to Markdown.
  Text parity against the live site was checked per post (≥ 97% word-sequence match; differences are the
  date line and syntax-highlighter tokenisation).
- **Behaviour changes:** URLs now end in `/` (canonical updated; hosts redirect the slashless form).
  Resume tabs became one page with section links; the print page became print CSS.
  YouTube embeds dropped `cc_lang_pref=nl` and `disablekb=1`. Cookie banner removed (Umami is cookieless).
- **Rollback:** the previous Next.js build stays deployable from git history (`main` before the merge);
  on Netlify, republish the last Next.js deploy from the Deploys list.
