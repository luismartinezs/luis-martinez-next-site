+++
title = "The Optimal Stack for Building with Claude Code (November 2026 Update)"
description = "Six months after my first take, most of the stack changed. Rust and Axum on the backend, plain DOM and CSS in the browser, Zola for static sites, and deploys from your own machine. What changed, what the experiments showed, and what stayed."
date = 2026-11-08

[extra]
tags = ["claude code", "ai development", "architecture", "devops", "rust", "axum", "zola", "typescript", "vps"]
category = "Development"
+++

*What I'd build with today when coding agents write and maintain all of the code.*

---

In April I wrote [The Optimal Tech Stack, Architecture, and DevOps Setup for Building with Claude Code](@/blog/optimal-stack-for-claude-code/index.md).

TypeScript everywhere. Astro, Vue and Tailwind on the frontend. Hono, Bun and Drizzle on the backend. One file per feature. GitHub Actions to deploy.

Six months and a few experiments later, I'd change most of it.

Not because those tools are bad. They work, and my older apps still run on them. I changed my mind about what you should optimize FOR.

**Tl,dr:**

- Pick the stack for the finished system, not for how familiar or popular it is. When the agent writes all the code, human familiarity stops mattering.
- Backend: Rust + Axum + sqlx + PostgreSQL.
- Browser: strict TypeScript + plain DOM + plain CSS. No UI framework by default. Rust/Wasm in a worker only for heavy computation.
- Static sites: Zola. Server-rendered pages: Askama templates in the same Axum process.
- Structure: a modular monolith split by domain. Few, cohesive files, but no "one file per feature" rule.
- One `./verify` gate the agent runs before every commit.
- Ops: one VPS, Caddy, systemd, Postgres. Deploy from your machine with `./deploy`, as an immutable release. No GitHub Actions.
- These are defaults for NEW projects. Working apps keep their stack.

---

## What changed since April?

The old post rested on two principles: full context in one load, and types as prediction constraints.

But there was a third one hiding underneath: pick what is most represented in training data. Popular framework, more examples, better output.

That's the one that broke.

Think about who the stack is for. In my setup the agent writes the code, the agent maintains it, and I don't review it line by line. I own the product decisions.

So "my team knows React", "it's easy to hire for", "it's nice to type" are not criteria anymore. Nobody on the team is typing.

What's left is what you want from the finished thing:

- Is it correct?
- Is it fast and cheap to run?
- Do its dependencies keep their APIs still?
- Can correctness be checked objectively, by a machine?
- Is it simple to operate and to recover?

Agent speed matters too. It just doesn't override those.

The second thing I got wrong: I tuned the stack to Claude Code's internals. Context window size, autocompaction buffers, how many tokens a re-injected file costs. Those numbers change every release.

A stack should outlive the agent version you built it with.

The principle that survived is "types as prediction constraints". It got a different emphasis though. Types still steer the agent, but the bigger win is the compiler as a verifier the agent can't argue with.

---

## What did the experiments show?

I didn't want to swap one set of opinions for another, so I ran some comparisons. Same task, different stacks, agents doing all the work.

October 2026:

- **Two small SaaS apps, Rust vs Node.** Both passed. The Rust versions used substantially less memory and handled more requests per second. Agent effort was comparable.
- **Three frontends for a calculation-heavy app** (React, React + Rust/Wasm, Leptos + Rust/Wasm). All passed initial and maintenance checks. Rust calculations were faster. Leptos showed no overall advantage.
- **Five UIs for the same screen.** Plain DOM came out correct, compact and smallest to download. Interaction latency hit the measurement floor for all five.
- **A mobile habit tracker on Android** (Flutter, Compose, Expo). All passed. Flutter needed the least agent effort. Compose used less memory and shipped a smaller APK.

Then in November, the one that surprised me the most.

Two stacks, both optimized by agents who knew what they were doing:

- **Good DX:** Solid + Three.js with WebGPU, workers, shared memory.
- **Zero DX:** vanilla JS writing directly to DOM text nodes, a Rust/Wasm feed in a worker, raw WebGPU.

The app: a 2,000-row live market grid taking 120,000 updates per second, next to a particle simulation of up to 2 million particles.

Both held 240 fps with zero missed frames. So the question became: what did each one cost?

<figure class="chart">
  <p class="fig-title">Same cost to build, cheaper to change</p>
  <p class="fig-sub">Agent cost in weighted tokens. The feature was sortable columns plus a sector highlight, 4 fresh-agent runs per side.</p>
  <div class="legend"><span><i class="sw-b"></i>Good DX</span><span><i class="sw-c"></i>Zero DX</span></div>
  <div class="tiles">
    <div class="tile"><div class="k">Building it from scratch</div><div class="pair"><span><i class="sw-b"></i><b>6.73M</b></span><span><i class="sw-c"></i><b>6.82M</b></span></div><div class="d">about equal</div></div>
    <div class="tile"><div class="k">Adding one feature (median)</div><div class="pair"><span><i class="sw-b"></i><b>0.93M</b></span><span><i class="sw-c"></i><b>0.54M</b></span></div><div class="d">about 40% less</div></div>
    <div class="tile"><div class="k">Code shipped to the browser, gzipped</div><div class="pair"><span><i class="sw-b"></i><b>196 KB</b></span><span><i class="sw-c"></i><b>21 KB</b></span></div><div class="d">9× smaller</div></div>
    <div class="tile"><div class="k">Main-thread work, ms per second</div><div class="pair"><span><i class="sw-b"></i><b>333</b></span><span><i class="sw-c"></i><b>291</b></span></div><div class="d">13% less</div></div>
  </div>
  <p class="fig-sub flow-sub2">Code files each run touched to add the feature</p>
  <div class="files">
    <div class="who"><b>Good DX</b>14–15 files</div>
    <div class="sq b" aria-label="14 to 15 files"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="maybe"></i></div>
    <div class="who"><b>Zero DX</b>4 files</div>
    <div class="sq c" aria-label="4 files"><i></i><i></i><i></i><i></i></div>
  </div>
  <figcaption>Both codebases were about the same size in bytes (64 KB vs 55 KB). The difference was <b>27 files vs 6</b>.</figcaption>
</figure>

So the framework didn't make the agent faster to build, and it made the agent SLOWER to change things. The cost tracked file count and indirection, not code size.

Two more findings worth knowing.

**The gap came from the DOM layer, not from Rust.** Swapping the simulation implementation changed nothing on the main thread.

**Expertise beat the stack.** This one I didn't expect:

<figure class="chart">
  <p class="fig-title">Expertise beat the stack</p>
  <p class="fig-sub">Main-thread work, ms per second. Lower is better.</p>
  <div class="hbars">
    <span class="hb-l">Good DX, first correct build</span><span class="hb-t"><i class="b faint" style="width:100%"></i></span><b>~600</b>
    <span class="hb-l">Good DX, after cross-review</span><span class="hb-t"><i class="b" style="width:55.5%"></i></span><b>333</b>
    <span class="hb-l">Zero DX, final</span><span class="hb-t"><i class="c" style="width:48.5%"></i></span><b>291</b>
  </div>
  <figcaption>Fixes found in cross-review saved about <b>265 ms/s</b>. Switching the whole stack saved about <b>40</b> more.</figcaption>
</figure>

I wrote the full experiment up in [Dropping the framework barely sped up my app. Here's what did.](@/blog/dropping-the-framework-web-performance/index.md)

Now the caveats, because they matter.

These are small apps, one agent model, short time spans. They say nothing about large, long-lived interfaces with dozens of screens, forms-heavy UI, big refactors, or human maintainers. They are not language rankings.

They were enough to change my DEFAULTS. Not enough to call anything proven.

---

## So what is the stack?

It depends on what you're building. Here are my defaults:

| You're building | Default |
|---|---|
| Backend, API, SaaS | Rust + Axum + Tokio + sqlx + PostgreSQL |
| Static site | Zola + HTML/CSS + a little TypeScript |
| Forms, tables, account pages | Axum + Askama templates + small TypeScript modules |
| Dynamic browser app | Strict TypeScript + DOM + CSS; Rust/Wasm worker for heavy computation |
| Android and iOS | Flutter |
| Android only | Kotlin + Compose |
| iOS only | Swift + SwiftUI |
| Desktop app | Tauri + Rust core + TypeScript/DOM/CSS |
| CLI | Rust + clap |

Zola, Tauri and the CLI choice are still provisional. I haven't tested them as hard as the rest.

And notice what's NOT on the list as a default: Astro, Vue, React, Svelte, Solid, Tailwind, Node, Bun. They're still fine in projects that already use them, and a project can pick one when it has a concrete reason. I just don't start there anymore.

### Why Rust on the backend?

Three reasons.

**The compiler is a verifier.** A whole category of mistakes (wrong types, missing cases, use after move, data races) gets rejected before anything runs. The agent gets the error, reads it, fixes it. That loop is cheap and it's objective. No "it looks right to me".

**The database gets checked too.** With sqlx, your SQL is checked against the real schema at compile time:

```rust
async fn get_project(
    State(db): State<PgPool>,
    Path(id): Path<i64>,
) -> Result<Json<Project>, AppError> {
    let project = sqlx::query_as!(
        Project,
        "SELECT id, name, created_at FROM projects WHERE id = $1",
        id
    )
    .fetch_one(&db)
    .await?;

    Ok(Json(project))
}
```

Rename `name` in a migration and this stops compiling. The agent finds out right away, not from a 500 in production.

(You generate sqlx's offline metadata and check it against your migrations, so production builds never need database credentials.)

**It's cheap to run.** Lower memory means more apps on one small VPS. That's real money when you run many small products.

Now you will say: but Rust is hard to write!

For whom?

That's the human-familiarity argument again. In my tests the agent effort was comparable. The hard part of Rust (making the compiler happy) is exactly the part that protects you.

### Why no UI framework?

The default is strict TypeScript, the DOM, and CSS.

A few rules make this work:

- Keep authoritative state in ONE place and derive the rest.
- Patch the parts of the page that changed. Don't re-render the whole page and lose the user's focus, selection or half-typed input.
- Tie every event listener, timer and worker to a lifecycle, and clean it up.
- Ignore stale async responses (track a request id). Cancelling alone doesn't guarantee correctness.

And one rule that keeps this honest: add a framework when real update or lifecycle complexity justifies it. Don't build your own private React just to keep the "vanilla" label.

For heavy computation, use a worker. Reach for Rust/Wasm when the worker itself is the measured bottleneck, not before.

### Why plain CSS instead of Tailwind?

In April I said "Never write a CSS file. Not even one."

Yeah. About that.

The argument for Tailwind was that the model has seen `flex items-center gap-4` a million times. That's the popularity argument again, and I dropped it.

Plain CSS has no build step, no dependency to upgrade, no class-name vocabulary on top of the platform. Custom properties, nesting, `:has()` and container queries cover what I used Tailwind for.

This blog dropped Tailwind when I moved it off Next.js. I don't miss it.

### Why Zola for static sites?

Because a blog doesn't need a JavaScript runtime.

This site used to be Next.js 14 + Storyblok + Redux + a PWA plugin, deployed as Netlify functions. For 23 posts.

The home page shipped about 195 KB of compressed JavaScript. The sitemap endpoint returned `{}`. There were 25 type errors hidden behind `ignoreBuildErrors`.

Now it's Zola: one binary, Markdown files, HTML templates. The home page ships about 1.5 KB of my own JavaScript (theme toggle, mobile menu, table of contents), plus the analytics script.

### What about server-rendered pages?

You don't need a separate Node server for SSR.

If the product already has an Axum backend, it renders the HTML with Askama templates in the same process. Forms post to it. Small TypeScript modules enhance what needs enhancing.

No React Server Components, no Server Actions, no metaframework, no GraphQL, unless the product has a specific reason for one.

Choose the rendering model per route. Marketing pages can be static, the account page server-rendered, and the dashboard a client-side app. One product, no religion.

---

## How should you lay out the codebase?

### One file per feature?

The old post said: one file per feature slice. `auth.ts`, `payments.ts`, `dashboard.ts`.

The instinct was right. The rule was too rigid.

The November experiment actually confirmed the instinct: every extra file a change crosses costs the agent reads and edits. 4 files vs 15 was a 40% cost difference.

But a hard "one file per feature" rule makes you cram unrelated things together when a feature grows.

What I do now: a modular monolith organized by domain capability. Auth, billing, projects, notifications.

- A small domain is one Rust module.
- A bigger one can split HTTP handling, persistence and business rules.
- Split where there's a real responsibility or verification boundary. Not to hit a file count.
- Don't scatter each feature across global `controllers/`, `services/`, `repositories/` folders. (That part of the old post still holds.)

Folders, created only when needed:

| Path | What lives there |
|---|---|
| `apps/api/` | Rust backend and its Askama templates |
| `apps/app/` | Browser UI |
| `apps/site/` | Static website |
| `crates/domain/` | Domain logic shared across targets, if genuinely shared |
| `crates/worker/` | Wasm worker, if needed |
| `contracts/` | API contract generation and fixtures |
| `tests/e2e/` | User-visible behavior checks (Playwright) |
| `docs/` | Spec, decisions, plans, runbook |
| `scripts/` | Stable verification and ops entry points |

### What happened to the shared types package?

In April: `packages/api-types` with Zod schemas, shared by frontend and backend.

The goal hasn't changed: never define the same type twice. Two copies WILL drift, and a drifted type misleads the agent.

The mechanism changed. Now there's one authoritative contract per boundary. Usually the Rust request and response types, with TypeScript bindings generated from them. A check fails the build if the generated files drift.

And remember: generated types don't validate anything at runtime. Webhooks, vendor responses, uploads, config, LLM output. All untrusted, all validated.

### Pin versions and read the docs for the version you have

This one wasn't in the old post at all, and it's one of the most useful rules I have.

Agents guess APIs from memory. Their memory is a blend of every version of a library they ever saw. So they write code for v4 against your v5, it fails, they guess again, it fails again.

The rule:

- Pin toolchains and dependencies. Commit the lockfiles.
- Before relying on an API, check the installed version and read ITS docs, or its types or source.
- After a failed guess, stop guessing. Read the reference.
- Prefer libraries whose APIs don't churn. Low churn is now a selection criterion.

---

## How does the agent know it's done?

"The agent said it works" is not evidence. Neither is "it compiles".

The loop I want for every change:

<figure class="chart">
  <p class="fig-title">The life of a change</p>
  <p class="fig-sub">What has to happen before the agent may call a change done</p>
  <ol class="flow">
    <li class="flow-group">Before any code</li>
    <li><span class="mk mk-you"></span><b>Requirement</b><span>You write down what should observably happen. The agent builds against that, not against its own guess.</span></li>
    <li class="flow-group">The agent's loop</li>
    <li><span class="mk mk-agent"></span><b>Change</b><span>One coherent change, in the project's existing stack</span></li>
    <li><span class="mk mk-check"></span><b>Static checks</b><span><code>./check</code>: types, lint, the compiler. Fast, and it can't be talked into a pass</span></li>
    <li><span class="mk mk-check"></span><b>Targeted tests</b><span><code>./test</code> for what changed, against a real PostgreSQL</span></li>
    <li><span class="mk mk-agent"></span><b>Run the real app</b><span><code>./dev</code>, then Playwright or a browser. Does it actually do the thing?</span></li>
    <li><span class="mk mk-agent"></span><b>Evidence</b><span>Output, logs, a screenshot. Something you can check, not "it should work"</span></li>
    <li class="flow-group">The gate</li>
    <li><span class="mk mk-check"></span><b>./verify, then commit</b><span>Quiet when green, detailed when red. Red goes back to Change</span></li>
  </ol>
  <div class="legend flow-legend"><span><span class="mk mk-agent"></span>the agent works</span><span><span class="mk mk-check"></span>a machine checks</span><span><span class="mk mk-you"></span>you decide</span></div>
  <figcaption>Three steps are checks a machine runs. "The agent said it works" is not one of them.</figcaption>
</figure>

Every repository exposes the same small set of scripts:

```sh
./dev       # run locally
./check     # types, lint
./test      # tests
./verify    # the gate
./deploy
./rollback
./status
./logs
```

`./verify` is the authoritative gate. It must pass before anything ships.

Make it quiet when it passes and detailed when it fails. A green run that prints 400 lines eats context for nothing. (The context window idea from the old post survives here.)

For this blog, `./verify` typechecks the TypeScript, builds the site, and checks the built output: internal links and anchors, that every old URL still resolves, sitemap coverage, title, description, canonical and og:image on every page.

### What goes in the docs?

- `AGENTS.md` / `CLAUDE.md`: a SHORT entry point. Commands, pointers to the real docs, and the rules that fail silently. One file holds the text, the other is a symlink to it. Two copies drift. I've seen it in my own repos.
- `docs/spec.md`: what the product does.
- `docs/decisions.md`: dated entries, newest last. Each says the requirement, the choice, why, and what would reopen it.
- `docs/plans/<task>.md`: for long work. Goal, acceptance criteria, current state, what's left.

Conversation memory is not project state. If the next session needs to know it, it goes in a file.

---

## What about DevOps?

The bones stayed: one VPS, Caddy, systemd, PostgreSQL. How releases get there changed a lot.

### Why no GitHub Actions anymore?

The old pipeline had two problems. It installed and ran from source on the production server. And it put GitHub between you and your own server.

The new one runs from the agent's working environment:

<figure class="chart">
  <p class="fig-title">Where each deploy step runs</p>
  <p class="fig-sub">April's GitHub Actions pipeline next to November's <code>./deploy</code></p>
  <div class="flow-pair">
    <div>
      <p class="flow-head">April 2026</p>
      <ol class="flow compact">
        <li class="flow-group">GitHub Actions runner</li>
        <li><span class="mk mk-check"></span><b>Typecheck</b></li>
        <li><span class="mk mk-agent"></span><b>Build the frontend</b></li>
        <li class="flow-group">On the VPS, over SSH</li>
        <li><span class="mk mk-prod"></span><b>git pull</b><span>source code lands on production</span></li>
        <li><span class="mk mk-prod"></span><b>Install dependencies</b><span>the package registry is in the deploy path</span></li>
        <li><span class="mk mk-agent"></span><b>Restart the service</b><span>and hope</span></li>
      </ol>
    </div>
    <div>
      <p class="flow-head">November 2026</p>
      <ol class="flow compact">
        <li class="flow-group">On your machine</li>
        <li><span class="mk mk-check"></span><b>Refuse a dirty working tree</b><span>every release is an exact commit</span></li>
        <li><span class="mk mk-check"></span><b>./verify</b></li>
        <li><span class="mk mk-agent"></span><b>Build an immutable release</b><span>binaries, static files, migrations, VERSION, MANIFEST</span></li>
        <li class="flow-group">On the VPS</li>
        <li><span class="mk mk-agent"></span><b>Upload the release</b></li>
        <li><span class="mk mk-check"></span><b>Run migrations</b><span>a failure stops the deploy</span></li>
        <li><span class="mk mk-agent"></span><b>Switch the current symlink, restart</b></li>
        <li class="flow-group">From outside</li>
        <li><span class="mk mk-check"></span><b>Readiness check</b><span><code>/api/healthz</code> returns 200</span></li>
        <li><span class="mk mk-check"></span><b>Public smoke test</b><span>the real URL, as a user</span></li>
      </ol>
    </div>
  </div>
  <div class="legend flow-legend"><span><span class="mk mk-agent"></span>a step</span><span><span class="mk mk-check"></span>a check that can stop the deploy</span><span><span class="mk mk-prod"></span>building from source on production</span></div>
  <figcaption>In April, production pulled source and installed packages. Now it only receives a finished release, with checks before and after.</figcaption>
</figure>

The server never runs `git pull`, `npm install` or a build. It receives a finished artifact: binaries, static files, migrations, plus a `VERSION` (the commit SHA) and a `MANIFEST` (checksums, toolchain versions, target).

GitHub is just a remote. Deploys keep working when Actions is down. You don't even need to push before deploying.

The governing principle: production should be simpler than development.

### How do releases and rollbacks work?

<figure class="chart">
  <p class="fig-title">Deploy and rollback move one symlink</p>
  <p class="fig-sub">Releases sit side by side in <code>/srv/apps/myapp/releases/</code>, one folder per commit</p>
  <div class="rel-rows">
    <span class="rel-label">Deploy <code>c</code></span>
    <div class="rel"><span>commit-a</span><span>commit-b</span><span class="on">commit-c<em>current</em></span></div>
    <span class="rel-label">Roll back</span>
    <div class="rel"><span>commit-a</span><span class="on">commit-b<em>current</em></span><span>commit-c</span></div>
  </div>
  <figcaption>systemd and Caddy only ever point at <code>/srv/apps/myapp/current</code>. A deploy moves the link to the new release and restarts. A rollback moves it back. Release <code>c</code> stays on disk.</figcaption>
</figure>

Nothing is copied or rebuilt to roll back, so it takes seconds.

One honest limit: a symlink can't undo a destructive database migration. So migrations are expand/contract (add the new column, migrate, remove the old one later) whenever rollback matters.

And keep old hashed assets reachable for a while after a deploy, or users with an open tab get broken chunks.

### What does the server run?

<figure class="chart">
  <p class="fig-title">One box, and what lives off it</p>
  <p class="fig-sub">One Ubuntu LTS VPS for many small products</p>
  <div class="infra">
    <div class="infra-box infra-vps">
      <p class="infra-h">On the VPS</p>
      <div class="layer"><b>Caddy</b><span>TLS, static files, routes <code>/api</code> to the backends</span></div>
      <div class="layer"><b>Your apps</b><span>Static files and binaries from the current release; one Unix user and one <code>/etc/&lt;app&gt;/</code> secrets file each</span></div>
      <div class="layer"><b>systemd</b><span>One service per backend, timers for scheduled jobs</span></div>
      <div class="layer"><b>PostgreSQL</b><span>One database and one role per app</span></div>
    </div>
    <div class="infra-box infra-off">
      <p class="infra-h">Off the box</p>
      <div class="layer"><b>Axiom</b><span>Logs, shipped from journald by Vector</span></div>
      <div class="layer"><b>Sentry</b><span>Errors from users' browsers</span></div>
      <div class="layer"><b>Uptime monitor</b><span>Probes the public URLs and <code>/api/healthz</code></span></div>
      <div class="layer"><b>Cloudflare R2</b><span>Nightly <code>pg_dump</code> of each database</span></div>
      <div class="layer"><b>Tailscale</b><span>Admin SSH over a private network</span></div>
    </div>
  </div>
  <p class="nots"><span>Not by default</span><s>PM2</s><s>Docker deploys</s><s>Kubernetes</s><s>Redis</s><s>Message brokers</s><s>CI/CD platforms</s></p>
  <figcaption>What has to keep running sits on the box. What has to survive the box going down sits off it.</figcaption>
</figure>

Add any of the struck-out ones when a concrete requirement shows up. Not before.

systemd still runs every backend. The unit got stricter:

```ini
[Unit]
Description=myapp
After=network-online.target postgresql.service
Wants=network-online.target

[Service]
Type=simple
User=myapp
Group=myapp
WorkingDirectory=/srv/apps/myapp/current
EnvironmentFile=/etc/myapp/myapp.env
ExecStart=/srv/apps/myapp/current/bin/myapp
Restart=on-failure
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

Differences from April:

- **Each app gets its own Unix user.** One compromised app shouldn't expose every other app's secrets.
- **Secrets live in `/etc/<app>/`**, readable only by that app. Not in the project folder.
- **It runs a binary from the current release**, not `bun run src/index.ts` from a git checkout.
- **Scheduled work is a systemd timer** running a `oneshot` service. Not cron, not a scheduler inside the API process. Give it an `OnFailure=` alert, or a failed run alerts nobody.

### What changed about SERVER.md?

In April I suggested a SERVER.md with a table of every project, domain, port and service.

That table is wrong the day someone forgets to update it.

Now SERVER.md explains the structure and how to find the truth. For anything you can query, it documents the command instead of the answer:

| Question | Command that answers it |
|---|---|
| Is the app running? | `systemctl status myapp` |
| What did it log? | `journalctl -u myapp` |
| What's in the database? | `psql` |
| What's listening on which port? | `ss -ltnp` |
| Disk and memory? | `df -h`, `free -h` |
| Is the proxy config valid? | `caddy validate --config /etc/caddy/Caddyfile` |
| Does the app answer? | `curl -fsS https://myapp.com/api/healthz` |
| Which release is live? | `readlink /srv/apps/myapp/current` |

Live truth beats documentation.

Same idea everywhere, and it's the rule I'd tattoo on every agent: verify outputs, not intentions.

- Don't trust the build config, inspect the artifact.
- Don't trust the service file, inspect the running service.
- Don't trust "deploy succeeded", probe production.
- Don't trust the backup job, restore the backup.

### How do you know production is healthy?

- **A readiness endpoint.** Every backend exposes `/api/healthz`. It runs a cheap, bounded Postgres query and returns 200 or 503, with `Cache-Control: no-store`. Not behind rate limiting.
- **Structured JSON logs** to stdout. journald captures them, Vector ships them off the box to Axiom. Debugging a sick server shouldn't depend on logs stored on that same server.
- **Browser errors** go to Sentry. A frontend that fails silently in users' browsers isn't observable.
- **External uptime monitoring**, from outside the VPS, on the same URLs users hit.
- **Nightly `pg_dump` to R2**, per app, with an alert on failure.

And test your restores. A backup proves a file was written. A restore proves you can recover.

(I'm not fully there myself. Restore tests are still a thing I run by hand.)

---

## What stayed the same?

More than it looks:

- One cheap VPS for many small products. Scale vertically first.
- systemd, Caddy, PostgreSQL.
- One source of truth for the data model and for API types.
- Few, cohesive files. Fewer files per change.
- Strict types everywhere.
- Infrastructure as files the agent can read.

## What about the apps I already built?

They stay as they are.

My deployed backends still run on Bun and Hono. They work. Rewriting them in Rust to match a new default would be busywork with real risk.

A migration needs a real reason: a problem, a measurable benefit, tests covering the behavior, a cutover plan and a rollback plan. Memory pressure, latency, recurring breakage, maintenance cost. "The new doctrine says Rust" is not on that list.

New discoveries update the defaults for NEW work. They don't trigger a rewrite of everything.

---

## Reference: April vs now

| Concern | April 2026 | November 2026 | Why |
|---|---|---|---|
| Selection criteria | Training data coverage | Correctness, runtime cost, API churn, verifiability | Nobody is typing |
| Backend | Hono + Bun | Rust + Axum + Tokio | Compiler as verifier, less memory |
| Database access | Drizzle | sqlx + SQL migrations | Queries checked against the schema |
| Database | PostgreSQL | PostgreSQL | Unchanged |
| Static site | Astro | Zola | No JS runtime for content |
| Browser UI | Vue islands | Strict TS + DOM | Cheaper changes, smaller bundles |
| Server-rendered pages | Astro | Askama in the Axum process | No separate frontend server |
| Styling | Tailwind | Plain CSS | Platform first, no build step |
| Shared types | Zod package | One contract per boundary, generated bindings | No handwritten duplicates |
| Code layout | One file per feature slice | Modular monolith by domain, few cohesive files | Split at real boundaries |
| Quality gate | Typecheck in CI | `./verify` before every commit | Objective, quiet on success |
| Deploy | GitHub Actions + SSH + `git pull` | Local `./deploy`, immutable release, symlink switch | No builds on prod, instant rollback |
| Process manager | systemd | systemd + per-app users + timers | Isolation, no cron |
| Reverse proxy | Caddy | Caddy | Unchanged |
| SERVER.md | Inventory table | Where truth lives + commands | Live truth beats documentation |
| Observability | Not covered | Vector → Axiom, Sentry, uptime, readiness | Debug from off the box |

---

## Frequently Asked Questions

### Isn't Rust slower for the agent to write?

Not in my tests. Agent effort for the Rust and Node SaaS apps was comparable. Rust takes more compile iterations, but each one catches something that would otherwise show up at runtime.

### Is this specific to Claude Code?

No. I use the same defaults with Codex. That's partly the point: the old post was tuned to one tool's internals, and those change every release. Correctness, verification and simple ops don't.

### When would you use a UI framework?

When the app's update and lifecycle logic gets complex enough that plain modules keep breaking, or you'd otherwise end up writing your own framework. Measure the pain first.

### Should I migrate my Next.js app?

Only if it's causing you a concrete problem. I moved this blog because it had real bugs, shipped 195 KB of JS for static text, and had two content sources. If yours works, keep shipping features on it.

### What if I'm a human writing the code myself?

Then this isn't your list. Your familiarity, your team and your hiring pool are real criteria for you. These defaults assume the agent writes and maintains everything.

Happy shipping (again)!

---

## Links

- [The original April 2026 post](@/blog/optimal-stack-for-claude-code/index.md): the version this one replaces
- [https://www.getzola.org](https://www.getzola.org) Zola, the static site generator behind this blog
- [https://github.com/tokio-rs/axum](https://github.com/tokio-rs/axum) Axum, the Rust web framework
- [https://github.com/launchbadge/sqlx](https://github.com/launchbadge/sqlx) sqlx, compile-time checked SQL for Rust
- [https://github.com/askama-rs/askama](https://github.com/askama-rs/askama) Askama, type-checked HTML templates for Rust
- [https://caddyserver.com](https://caddyserver.com) Caddy, the reverse proxy with automatic HTTPS

> [!NOTE]
> This post was written with help from AI (Claude).
