# 6. UI Component Library

Built on **shadcn/ui + Radix primitives + TailwindCSS + Framer Motion**, driven by `@lumina/tokens`. All components are typed (TS), themeable (light/dark/white-label), accessible (WCAG AA), and RTL-safe.

Package: **`@lumina/ui`** — consumed by portal, reader, docs sites, and admin.

---

## 6.1 Foundations (tokens)

| Category | Tokens |
|----------|--------|
| Color | brand, semantic, surface, text, border, ai-glow (see brand doc) |
| Spacing | 4pt base: `0,1,2,3,4,6,8,12,16,24,32,48,64` |
| Radius | `sm 6 · md 10 · lg 16 · full` |
| Elevation | `e0–e4` (shadow in light, border-glow in dark) |
| Typography | display/h1–h3/body/sm/xs/code (see brand doc) |
| Motion | `fast 150 · base 200 · slow 300`, ease-out/spring |
| Z-index | base, dropdown, sticky, overlay, modal, popover, toast, tooltip |

## 6.2 Primitives

`Button` (variants: primary/secondary/ghost/danger/ai; sizes sm/md/lg; loading; icon) · `IconButton` · `Input` · `Textarea` · `Select` · `Combobox` · `Checkbox` · `Radio` · `Switch` · `Slider` · `Badge` · `Tag/Chip` · `Avatar` (+ group/stack) · `Tooltip` · `Kbd` · `Spinner` · `Skeleton` · `Divider` · `Progress` · `ScrollArea`.

## 6.3 Layout

`AppShell` (rails + content) · `Sidebar` (collapsible, nested) · `Topbar` · `Panel` · `SplitPane` · `ResizablePanels` · `Grid` · `Stack` · `Card` · `Section` · `EmptyState` · `PageHeader` (title, breadcrumbs, actions).

## 6.4 Navigation

`CommandPalette` (⌘K; groups, fuzzy, recents, contextual actions) · `Breadcrumbs` · `Tabs` · `TreeView` (category tree: drag-drop, virtualized, keyboard) · `WorkspaceSwitcher` · `Pagination` · `Stepper` · `NavMenu`.

## 6.5 Overlays

`Dialog/Modal` · `Drawer/Sheet` · `Popover` · `DropdownMenu` · `ContextMenu` · `HoverCard` · `Toast` · `AlertDialog` · `Tooltip`. All focus-trapped, ESC-dismiss, scroll-locked, portal-rendered.

## 6.6 Data Display

`DataTable` (sort, filter, column pin/resize, row select, bulk actions, virtualized, server-side) · `List` · `DescriptionList` · `Stat/KPI` · `Timeline` · `Feed` · `Calendar` · `TagCloud` · `HealthMeter` (radial score) · `DiffViewer` (block/text) · `CodeBlock` (Shiki highlight, copy, line numbers, filename) · `Markdown` renderer.

## 6.7 Charts (`@lumina/charts`)

Recharts-based, tokenized palette, accessible (aria table fallback): `LineChart` · `AreaChart` · `BarChart` · `Sparkline` · `Funnel` · `Heatmap` · `Donut` · `KPICard`. Skeleton + empty + error states built-in; light/dark aware.

## 6.8 Forms

`Form` (react-hook-form + zod) · `FormField` · `Label` · `HelpText` · `ErrorText` · `FieldGroup` · `FileUpload` (drag-drop, progress, presigned) · `ColorPicker` · `DateTimePicker` · `SlugInput` (auto-slug + validation) · `MetadataEditor` · `PermissionMatrix`.

## 6.9 Editor Components (`@lumina/editor`)

TipTap/ProseMirror + Yjs CRDT core.

| Component | Purpose |
|-----------|---------|
| `EditorRoot` | Document editor host, CRDT-bound |
| `SlashMenu` | Insert blocks (grouped, searchable) |
| `BubbleToolbar` | Selection formatting + AI actions |
| `BlockHandle` | Drag/duplicate/turn-into/comment |
| `Block.*` | paragraph, heading, list, table, callout, tabs, card, toggle, columns, code, math, image, video, audio, file, embed, mermaid, plantuml, snippet, variable, conditional, divider, quote, button, api-explorer |
| `PresenceLayer` | Cursors, selections, avatars |
| `CommentThread` | Inline comments + resolve |
| `SuggestionMode` | Track-changes/suggestions |
| `VersionDiff` | Compare/restore |
| `AIInlinePanel` | Streaming AI assist in-context |

## 6.10 AI Components (`@lumina/ai`)

`AssistantPanel` (docked/full, glassmorphic, ai-glow) · `ChatMessage` (streaming, markdown, code) · `SourceChips` (provenance) · `PromptSuggestions` · `ModelSelector` · `TokenMeter` · `AIActionMenu` (insert/copy/create-draft) · `ConfidenceBadge` · `Feedback` (👍/👎 + reason).

## 6.11 Reader / Docs Site Components

`DocLayout` (tree + content + TOC) · `ArticleRenderer` · `TOC` (scrollspy) · `SearchOverlay` · `LocaleSwitcher` · `ThemeToggle` · `FeedbackWidget` · `RelatedArticles` · `Breadcrumbs` · `NextPrev` · `HelpWidget` (embeddable) · `Callout` · `Tabs` · `CodeGroup` · `Banner`.

## 6.12 Feedback & Status

`Toast` · `Banner` · `InlineAlert` · `ProgressBar` · `StatusDot` (draft/review/published/archived/expired) · `HealthBadge` · `LoadingOverlay` · `ErrorBoundary`.

## 6.13 Component Contract & Quality

- **API convention:** controlled + uncontrolled, `asChild` composition, `className` passthrough, ref-forwarding.
- **States:** default, hover, focus-visible, active, disabled, loading, error, selected.
- **Docs:** Storybook per component with a11y notes, do/don't, tokens used, RTL preview.
- **Testing:** unit (Vitest + Testing Library), interaction (Storybook play), visual regression (Chromatic), a11y (axe) — all in CI.
- **Distribution:** versioned packages; changesets; codemods for breaking changes.
