---
name: run-fintech-dashboard
description: Build, run, and drive the Finovo fintech-dashboard (Next.js 14 web app). Use when asked to start the dashboard, run its dev server, build it, typecheck it, take a screenshot of its UI, or interact with the running app headlessly.
---

Finovo is a Next.js 14 (App Router) + Tailwind + Recharts analytics dashboard. There's no test suite — you drive it by starting the dev server and pointing a headless Playwright Chromium at it via the committed **`.claude/skills/run-fintech-dashboard/driver.mjs`**, which renders the page, toggles dark mode, sorts the transactions table, and writes screenshots.

All paths below are relative to `fintech-dashboard/` (the unit dir).

## Prerequisites

- **Node 22**, npm 10 (already present in this container).
- A **Chromium binary**. This container ships Playwright browsers at `/opt/pw-browsers` (env `PLAYWRIGHT_BROWSERS_PATH`); the driver auto-discovers `/opt/pw-browsers/chromium-*/chrome-linux/chrome`. No `apt-get` was needed. If you're somewhere without it, point `PW_CHROME=/path/to/chrome` at any Chrome/Chromium.

> Do **not** run `npx playwright install` — the Playwright CDN (`cdn.playwright.dev`) is blocked by the egress proxy (403). Use the pre-installed browser.

## Setup

```bash
npm install
```

`playwright-core` is already a devDependency (used only by the driver). We deliberately use `playwright-core`, not `playwright`, because the latter's postinstall tries to download browsers and fails behind the proxy.

## Build

Verified to pass:

```bash
npm run typecheck   # tsc --noEmit, exits 0
npm run build       # next build, prerenders / and /_not-found, exits 0
```

> **Never run `npm run build` while `npm run dev` is running.** They share the `.next/` dir; the build overwrites it and the live dev server starts serving 404s for its own chunks. If that happens: stop dev, `rm -rf .next`, restart dev.

## Run (agent path)

Start the dev server, wait for the port, then run the driver:

```bash
# 1. launch dev server in the background
npm run dev > /tmp/fintech-dev.log 2>&1 &

# 2. poll the port (first compile takes ~7s; don't use a fixed sleep)
timeout 60 bash -c 'until curl -sf http://localhost:3000 >/dev/null 2>&1; do sleep 1; done'

# 3. drive it
node .claude/skills/run-fintech-dashboard/driver.mjs smoke
```

Expected output ends with `PASS — no console errors` (exit 0). Screenshots land in **`/tmp/fintech-shots/`**:

| file | what it shows |
|---|---|
| `01-dashboard-light.png` | full dashboard, light mode, charts painted |
| `02-dashboard-dark.png`  | after toggling dark mode |
| `03-table-sorted.png`    | transactions table sorted by Amount (desc) |

Driver subcommands:

| command | what it does |
|---|---|
| `node .claude/skills/run-fintech-dashboard/driver.mjs smoke` | full scripted flow above; exits non-zero on a real console error |
| `node .claude/skills/run-fintech-dashboard/driver.mjs shot <url> <out.png>` | one full-page screenshot |
| `node .claude/skills/run-fintech-dashboard/driver.mjs eval <url> "<jsExpr>"` | eval JS in the page, print JSON result |

**Stop the server by port** — `fuser -k 3000/tcp`. (`npm run dev` spawns a child `next-server` that holds the port; killing npm's PID leaves it running, so kill by port instead.)

> Do **NOT** `pkill -f 'next dev'` or `pkill -f next`. The agent's own launcher process has "next" in its command line, so the pattern kills the agent — the symptom is a Bash call dying with exit code 144. `fuser -k 3000/tcp` only touches the port listener and is safe.

## Run (human path)

```bash
npm run dev    # → serves http://localhost:3000; open in a browser; Ctrl-C to stop
```

Useless headless (it just waits for a browser), which is why the agent path drives Chromium instead.

## Gotchas

- **Recharts animates on mount.** A screenshot taken right after load catches empty axes / no donut. The driver waits via `waitForFunction` until ≥6 `path.recharts-curve, path.recharts-sector` nodes exist before the first shot. If you screenshot the page yourself, wait the same way or you'll capture blank charts.
- **Google Fonts are blocked by the proxy.** `fonts.googleapis.com` → `ERR_CONNECTION_CLOSED`, plus a favicon 404. Both are harmless — the app falls back to system fonts and renders fine. The driver filters exactly these from its console-error check; don't "fix" them.
- **React controlled inputs:** to fill the search box / form fields, use Playwright `fill`/`type` (the driver does) — setting `el.value` via `eval` won't fire React's onChange.
- **`.next` corruption** — see the Build note above; the classic symptom is the dev server logging 404s for `/_next/static/chunks/*`.

## Troubleshooting

- **`waitForFunction: Timeout 15000ms exceeded` in the driver, or dev server logs `GET /_next/static/chunks/... 404`**: the `.next` dir is stale/corrupt (usually from running `next build` over a live dev server). Fix: `kill "$(cat /tmp/fintech-dev.pid)"; rm -rf .next`, restart dev, rerun.
- **`Executable doesn't exist at .../chromium-1228/...`**: bundled Playwright expects a browser build that isn't installed. The driver already overrides `executablePath` to the `/opt/pw-browsers/chromium-*` that *is* present; if your env differs, set `PW_CHROME=/path/to/chrome`.
- **Bash call exits 144 for no obvious reason**: you ran `pkill -f next` and killed the agent. Stop the server with `fuser -k 3000/tcp` instead (see above).
