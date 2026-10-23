# webdevluis.com

Luis Martinez's personal site and blog: https://www.webdevluis.com

Static site built with [Zola](https://www.getzola.org/) 0.23.6, plain CSS and one small TypeScript module.
No framework runtime, no CMS: content is Markdown in this repo.

## Requirements

- Zola 0.23.6 (`zola --version`)
- Node 24 (only to compile `src/*.ts` with the pinned TypeScript)
- Python 3 (only for `./verify`)

## Commands

| Command | What it does |
|---|---|
| `./dev` | Compile TS and serve with live reload on http://localhost:8942 |
| `./build` | Production build into `public/` |
| `./check` | Typecheck + Zola internal link/anchor check |
| `./verify` | `./check`, `./build`, then output invariants (legacy URLs, sitemap, SEO tags, local refs) |

## Writing a post

1. Create `content/blog/<slug>/index.md`; the folder name is the URL (`/blog/<slug>/`).
2. Put images in the same folder and reference them as `/blog/<slug>/<file>.webp`.
3. Front matter:

```toml
+++
title = "Headline shown on the page"
description = "Meta description and social preview text"
date = 2026-10-19

[extra]
featured_image = "cover.webp"     # in the post folder; used for the card, hero and og:image
show_featured_image = true        # show it as the hero on the post page
featured_alt = "Describe the image"
card_title = "Shorter title"      # optional: home page card title if it differs
seo_title = "Custom <title>"      # optional
+++
```

4. Side notes: `> [!NOTE]` or `> [!WARNING]` blockquotes. Code fences take a language (`bash`, `ts`, ...);
   an unknown language fails the build.
5. Run `./verify`.

## Resume data

`data/resume.json` and `data/resume-react-typescript.json` are copies of
[luismartinezs/resume-json](https://github.com/luismartinezs/resume-json). Refresh them with
`scripts/sync-resume` and commit the result.
