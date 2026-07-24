# UI Screen Inventory (Desktop + Mobile)

Every screen with layout intent, key components (from §6), and mobile adaptation. Wireframes are described as annotated layouts; production designs live in Figma (`@lumina/ui` tokens).

Legend: **D** = desktop, **M** = mobile.

---

## 1. Authentication

**Login / SSO** — centered card on branded canvas; email + password, "Continue with SSO," social buttons, passkey option, MFA step-up.
- D: split hero (brand left, form right). M: full-width stacked, large tap targets.

**MFA / Passkey**, **Accept Invite**, **Reset Password**, **SCIM/JIT onboarding** — minimal focused cards.

## 2. Dashboard (Home)

Personalized widget grid: *Your tasks*, *Needs review*, *Stale content*, *Top articles*, *AI usage*, *Publishing velocity*.
- **Components:** `PageHeader`, `Stat/KPI`, charts, `Feed`, `EmptyState`.
- D: 3-pane shell (nav rail + content); 12-col widget grid. M: single column, bottom tab bar, collapsible KPIs.

## 3. Knowledge Base

**KB List** — cards/table of KBs (type, visibility, articles, health).
**Category + Article Explorer** — left `TreeView` (nested, drag-drop), center article list (`DataTable`: status, health, updated, author; filters + bulk actions), right preview.
- D: three panes. M: drill-down navigation (tree → list → article), swipe actions.

**Category Manager** — reorder tree, edit metadata, move/merge, SEO defaults.

## 4. Editor

Full-height editor: top bar (title, status pill, save state, publish/submit, share), center `EditorRoot` with `SlashMenu`/`BubbleToolbar`/`BlockHandle`, right panel tabs (Comments · Versions · Info/SEO · AI).
- **Components:** `@lumina/editor`, `PresenceLayer`, `AIInlinePanel`, `VersionDiff`.
- D: editor + collapsible right panel + optional split preview. M: full-screen editor, panels as bottom sheets, touch block handles, focus mode.

**Version History / Diff** — timeline list + side-by-side `DiffViewer`, restore.

## 5. Workflow

**My Tasks** — assigned reviews/approvals list with SLA.
**Workflow Board** — kanban by stage (draft→review→…→published); drag to transition.
**Workflow Builder** — visual states/transitions/approval matrix + automation rules.
- M: list-based board, stage filter chips.

## 6. Search

**Instant overlay** (⌘K/⌘/) — as-you-type, grouped results, keyboard nav, tabs (All · Articles · AI Answer), facets.
**Full search results page** — filters sidebar + results + AI answer panel.
- M: full-screen search sheet, sticky input, facet drawer.

## 7. AI Assistant (Lux)

Docked glassmorphic panel + full-screen mode: chat stream, `SourceChips`, `PromptSuggestions`, `AIActionMenu`, `ModelSelector`, `TokenMeter`, `ConfidenceBadge`, `Feedback`.
- D: right dock or center full-screen. M: full-screen chat with sticky composer.

## 8. Analytics

Overview dashboard (views, visitors, searches, failed searches, popular/low-quality, feedback, NPS, content health, AI usage, productivity, SLA, publishing velocity); date/KB/locale filters; export.
- **Components:** charts, `KPICard`, `DataTable`, `Funnel`, `Heatmap`.
- Detail views: Search analytics (zero-results/content gaps), AI usage, Content health.
- M: stacked KPI cards + swipeable charts.

## 9. Localization

Locale manager (list, default, fallback, RTL); translation queue (source vs. target, out-of-sync badges); glossary/translation memory; per-article translation status.
- M: locale list + per-article translation drill-down.

## 10. Integrations

Marketplace grid of integrations (installed/available), per-integration config, connection status/health.
- M: card list + config sheets.

## 11. Settings (Workspace)

Tabs: **General**, **Branding** (logo/colors/fonts/favicon/custom CSS, live preview), **Domains** (custom domain + TLS status), **Locales**, **Members & Roles** (`PermissionMatrix`), **AI** (provider/model/governance), **API & Webhooks** (`api_key`, webhook config + delivery log), **Notifications**.
- M: sectioned list navigation.

## 12. User Management

Members table (role, status, last active, groups), invite flow, bulk CSV, role editor (RBAC + ABAC attributes), groups/teams.

## 13. Admin Console (Org)

Org overview, **Billing/Subscriptions/Usage** (seats, storage, AI tokens, docs; invoices), **Security** (SSO, MFA, IP allowlists, session policy), **Audit Logs** (filter/export), **Feature Flags**, **AI Usage/Limits**, **Storage**, **Domains**, **Email Templates**.
- M: read-first with key actions; heavy config nudged to desktop.

## 14. Super Admin (Platform)

Tenant operations, health/quotas, impersonation (audited), feature-flag control, system status. Internal, desktop-first.

## 15. Reader / Docs Site (Public/Private)

**Home** (homepage builder output: hero, featured categories, search).
**Article** — left category tree, center `ArticleRenderer`, right `TOC` (scrollspy); breadcrumbs, feedback, next/prev, related, share, print/PDF, locale + theme toggle.
**Search results**, **AI chat widget**, **404/redirect**.
- D: three-column doc layout. M: collapsible tree drawer, sticky search, floating TOC button, large readable type, offline-cached recents.

## 16. Onboarding & Empty States

First-run wizard (create workspace → KB → first article, optional AI-assisted); contextual empty states with primary CTA + "Ask Lux."

---

## Responsive & A11y Notes (all screens)

- Breakpoints `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`; three-pane → single-pane with bottom tabs on mobile.
- Light/dark/white-label theming; density modes on data-heavy screens.
- Keyboard: ⌘K palette + documented shortcuts (`?` cheat sheet); visible focus; ARIA landmarks/live regions; RTL mirroring; 44×44px min touch targets; WCAG 2.1 AA throughout.
