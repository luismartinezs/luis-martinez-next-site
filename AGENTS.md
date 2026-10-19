# webdevluis.com

Static personal site and blog built with Zola. Start with `docs/spec.md` (routes, content model, decisions).

- Build: `./build` · Preview: `./dev` (http://localhost:8932) · Gate: `./verify` (must pass before shipping)
- Posts are page bundles: `content/blog/<slug>/index.md` + images next to it. Plain Markdown; no Tera in content.
- Templates use Tera 2 components (`templates/components.html`), not macros/shortcodes.
- Architecture and hosting defaults: doctrine `software-architecture`, `rendering-models`, `infra`.
