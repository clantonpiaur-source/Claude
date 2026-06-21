# Meridian — Fintech SaaS

A marketing **landing page** (`/`) plus a real-time financial analytics **dashboard** (`/dashboard`), built with **Next.js 14 (App Router) + Tailwind CSS + shadcn-style components + Recharts**, implementing the **UI/UX Pro Max** design system (style: *Data-Dense Dashboard*).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page — hero, features, how-it-works, stats, security, pricing, testimonial, CTA, footer |
| `/dashboard` | The product: KPIs, charts, goals, and transactions |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`.

## Design system

Tokens live in `app/globals.css` (`:root` for light, `.dark` for dark mode) and are wired into Tailwind in `tailwind.config.ts`.

| Token | Light | Role |
|-------|-------|------|
| `--color-primary` | `#1E40AF` | Primary actions, active nav |
| `--color-secondary` | `#3B82F6` | Links, secondary series |
| `--color-accent` | `#D97706` | CTAs, highlights (WCAG-adjusted) |
| `--color-success / warning / danger` | green / amber / red | Financial status |

- **Fonts:** Fira Code (headings/numbers) + Fira Sans (body).
- **Tabular figures:** the `.tabular` utility keeps prices/metrics aligned and jitter-free on update.

## Structure

```
app/
  layout.tsx          # root + globals + metadata
  page.tsx            # landing page composition
  dashboard/page.tsx  # dashboard composition
components/
  ui/                 # shadcn-style primitives (card, button, badge)
  landing/            # header, hero, features, pricing, footer, …
  dashboard/          # sidebar, topbar, kpi-card, charts, table
lib/
  data.ts             # mock data — swap for your API
  utils.ts            # cn(), currency/number formatters
```

## Widgets (mapped from the chart database)

- **KPI cards** — value + trend delta (color paired with ↑/↓ icon, never color alone)
- **Revenue vs Expenses** — area/line trend; series differ by color *and* dash style
- **Portfolio Allocation** — donut (≤5 slices)
- **Goals vs Target** — bullet-style progress (values always visible, AAA)
- **Transactions** — sortable (`aria-sort`), filterable, bulk-select, mobile horizontal scroll, empty state

## Accessibility & UX baked in

- 4.5:1 text contrast, visible focus rings, keyboard-navigable controls
- 44px+ touch targets, mobile bottom nav (≤5 items), safe-area padding
- `prefers-reduced-motion` respected globally
- Light + dark mode designed together (toggle in the top bar)
