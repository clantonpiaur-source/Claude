# Brand & Design System — LUMINA

## 1. Product Name & Positioning

**Name:** **Lumina** (full: *Lumina Enterprise Knowledge Cloud*)
**Rationale:** "Lumina" evokes *illumination, clarity, and intelligence* — the act of turning scattered organizational knowledge into a single, luminous source of truth. It is short, ownable, pronounceable in every major locale, and reads as premium/enterprise (cf. Linear, Vercel, Stripe naming conventions).

**Tagline:** *"Where enterprise knowledge comes to light."*
**Positioning statement:** *For enterprises drowning in fragmented documentation, Lumina is the AI-native knowledge cloud that unifies authoring, delivery, search, and governance — so every employee and customer finds the right answer in seconds.*

## 2. Logo Concept

**Mark:** An abstract **aperture/prism** formed by three overlapping arcs radiating from a central point of light — simultaneously reading as (a) a rising sun/dawn (illumination), (b) a camera aperture (focus/clarity), and (c) an open book spine when rotated. The negative space at the center forms a subtle **"L"**.

- **Primary lockup:** Icon + wordmark "lumina" in lowercase, geometric sans.
- **Icon-only:** Used for app icon, favicon, avatars (rounded-square container, 22% corner radius).
- **Construction:** Built on an 8pt grid; arcs at 120° rotational symmetry; center light node is a radial gradient (Aurora → Solar).
- **Clear space:** Minimum padding = height of the "u" x-height on all sides.
- **Motion signature:** On load, the three arcs draw in sequentially (stroke-dashoffset) and the center node blooms — a 900ms brand animation reused as the app splash/loader.

```
        ╱◜◝╲
      ◜   ◦   ◝      ◦ = luminous core (Aurora→Solar gradient)
      ╲   │   ╱      arcs = knowledge converging to light
        ╲◟◞╱          lumina
```

**Logo don'ts:** never stretch, never place the gradient core on low-contrast backgrounds, never recolor arcs outside brand palette, never add drop shadows to the mark.

## 3. Brand Colors

### Core palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--brand-aurora` | Aurora (primary) | `#5B5BD6` | Primary actions, brand accent, active states |
| `--brand-aurora-hover` | Aurora Hover | `#4A4AC4` | Hover on primary |
| `--brand-solar` | Solar | `#F2A93B` | Logo core, highlights, AI accent |
| `--brand-violet` | Deep Violet | `#3A2E6E` | Headers, dark surfaces |
| `--brand-ink` | Ink | `#0E0E1A` | Primary text (light mode), dark bg base |

### Semantic palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg-canvas` | `#FBFBFD` | `#0B0B12` | App background |
| `--bg-surface` | `#FFFFFF` | `#14141F` | Cards, panels |
| `--bg-surface-2` | `#F5F5F8` | `#1C1C29` | Elevated/hover surfaces |
| `--border-subtle` | `#E7E7EE` | `#26263A` | Dividers, input borders |
| `--text-primary` | `#0E0E1A` | `#EDEDF5` | Body text |
| `--text-secondary` | `#5A5A6E` | `#A0A0B8` | Muted text |
| `--accent` | `#5B5BD6` | `#8B8BF0` | Links, focus |
| `--success` | `#12A150` | `#3DD68C` | Published, healthy |
| `--warning` | `#D97706` | `#FBBF24` | Needs review, stale |
| `--danger` | `#E5484D` | `#FF6369` | Errors, destructive |
| `--info` | `#0091FF` | `#52A9FF` | Info, tips |
| `--ai-glow` | `linear-gradient(135deg,#5B5BD6,#8B5CF6,#F2A93B)` | same | AI surfaces, assistant |

### Data-viz categorical scale (WCAG-safe, colorblind-tested)
`#5B5BD6` · `#12A150` · `#F2A93B` · `#E5484D` · `#0091FF` · `#8B5CF6` · `#EC4899` · `#14B8A6`

**Contrast:** All text/background pairings meet **WCAG 2.1 AA** (≥4.5:1 body, ≥3:1 large/UI). Aurora on white = 5.9:1.

## 4. Typography

| Role | Typeface | Notes |
|------|----------|-------|
| Display / Headings | **Geist** (or Inter Display fallback) | Geometric, tight tracking on H1/H2 |
| Body / UI | **Inter** | Variable, `font-feature-settings: 'cv11','ss01'` |
| Monospace / Code | **Geist Mono** / JetBrains Mono | Code blocks, API refs, variables |
| Reader (docs prose) | **Inter** at 1.125rem / 1.7 line-height | Optimized for long-form reading |

**Type scale (1.250 major-third):**

| Token | Size | Line | Weight | Use |
|-------|------|------|--------|-----|
| `display` | 48px | 1.1 | 700 | Marketing, empty states |
| `h1` | 32px | 1.2 | 700 | Page titles |
| `h2` | 24px | 1.3 | 600 | Section titles |
| `h3` | 20px | 1.4 | 600 | Sub-sections |
| `body-lg` | 18px | 1.7 | 400 | Reader prose |
| `body` | 15px | 1.6 | 400 | App UI default |
| `sm` | 13px | 1.5 | 400 | Metadata, captions |
| `xs` | 12px | 1.4 | 500 | Labels, badges |
| `code` | 13.5px | 1.6 | 450 | Inline & block code |

## 5. Design Language

**Principles:**
1. **Clarity over decoration** — content is the interface (Notion/Linear ethos).
2. **Calm surfaces, decisive accents** — neutral canvas, single confident Aurora accent, Solar reserved for AI.
3. **Motion with meaning** — 150–250ms ease-out transitions; motion communicates state, never decorates.
4. **Depth via light, not heavy shadow** — subtle elevation, optional glassmorphism on overlays (`backdrop-blur-xl`, 8–12% white/black tint).
5. **Keyboard-first** — every primary action reachable via command palette (`⌘K`) and shortcut.
6. **Density modes** — Comfortable / Compact toggle for power users.

**Signature elements:**
- **Glassmorphic command palette & AI panel** — frosted overlay with Aurora glow ring.
- **AI surfaces** carry the `--ai-glow` gradient hairline border to visually distinguish generated/assisted content.
- **Focus rings:** 2px Aurora, 2px offset, always visible for keyboard nav.
- **Radii:** `sm 6px` (inputs) · `md 10px` (cards) · `lg 16px` (modals) · `full` (avatars/pills).
- **Elevation:** `e1` cards, `e2` popovers, `e3` modals, `e4` command palette — each a defined shadow token in light and a border-glow token in dark.

## 6. Design System (Tokens)

Three-layer token architecture (primitive → semantic → component), delivered as:
- **`@lumina/tokens`** — Style Dictionary source of truth (JSON) → outputs CSS variables, Tailwind config, TS types, iOS/Android.
- **Tailwind preset** — `tailwind-preset-lumina` consumed by all apps.
- **Themes:** Light, Dark, and per-workspace **white-label** overrides (brand color injection at runtime via CSS variables + `data-theme`).

**Accessibility baseline:** WCAG 2.1 AA, full keyboard operability, `prefers-reduced-motion` honored, `prefers-color-scheme` default, ARIA on all interactive components, min 44×44px touch targets, RTL-complete (logical properties throughout).

## 7. Voice & Tone

- **Product voice:** confident, precise, human — "helpful senior colleague," never salesy in-product.
- **AI assistant persona ("Lux"):** concise, cites sources, admits uncertainty, never fabricates. Always shows provenance chips linking to source articles.
- **Empty states & errors:** action-oriented, one-line cause + one-line fix, optional "Ask Lux."
