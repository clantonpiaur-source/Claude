# 3. Functional Requirements

Requirements use IDs (`FR-<area>-<n>`) and MoSCoW priority (M=Must, S=Should, C=Could). All features are multi-tenant and permission-aware unless noted.

---

## 3.1 Organizations, Workspaces & Tenancy

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-ORG-1 | Support **unlimited organizations**, each fully isolated (data, users, billing, branding). | M |
| FR-ORG-2 | Each org has **multiple workspaces**; each workspace maps to a product/team/audience. | M |
| FR-ORG-3 | Each workspace can host **multiple documentation sites** (public/private/internal). | M |
| FR-ORG-4 | Per-workspace **custom branding** (logo, colors, fonts, favicon, theme). | M |
| FR-ORG-5 | Per-workspace **separate permissions, AI models, analytics, and domains**. | M |
| FR-ORG-6 | Custom domains + subdomains with automated TLS (ACME). | M |
| FR-ORG-7 | Org/workspace provisioning via UI and API (self-serve + SCIM). | M |
| FR-ORG-8 | Data residency selection per org (US/EU/APAC). | S |
| FR-ORG-9 | Workspace templates for rapid new-space setup. | S |

## 3.2 User Types & Roles

Supported roles (mapped to RBAC in §10): **Super Admin, Organization Owner, Workspace Admin, Content Manager, Technical Writer, Reviewer, Translator, Support Team, Reader, External Customer, Guest, Developer, API Consumer.**

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-USR-1 | Predefined roles above, each with a default permission set. | M |
| FR-USR-2 | **Custom roles** with granular permissions (ABAC attributes). | M |
| FR-USR-3 | Role assignment scoped at org, workspace, category, or article level. | M |
| FR-USR-4 | Invite via email, SSO auto-provision (SCIM), or bulk CSV. | M |
| FR-USR-5 | Guest/external access with time-boxed, link-scoped permissions. | S |
| FR-USR-6 | User groups/teams for bulk permission management. | M |

## 3.3 Knowledge Base Types

Lumina supports all KB archetypes: **Public KB, Private KB, Internal KB, Employee Wiki, API Docs, Developer Portal, SOP Library, Policies, Training Manuals, HR Manuals, IT Documentation, Troubleshooting, Release Notes, Product Guides, FAQs, Decision Trees, Interactive Guides.**

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-KB-1 | Create KBs of any archetype from templates or blank. | M |
| FR-KB-2 | Per-KB visibility: public, private (auth required), internal (org-only), or password-protected. | M |
| FR-KB-3 | API Docs: OpenAPI import → interactive reference with try-it console. | S |
| FR-KB-4 | Decision Trees & Interactive Guides: branching, condition-driven flows. | S |
| FR-KB-5 | Release Notes: timeline view, tags (feature/fix/breaking), RSS/subscribe. | S |

## 3.4 Content Editor

Enterprise block-based editor (hybrid WYSIWYG + Markdown), real-time collaborative.

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-ED-1 | **WYSIWYG + Markdown** parity; paste Markdown, edit visually, export Markdown. | M |
| FR-ED-2 | **Slash commands** (`/`) to insert any block; command palette for actions. | M |
| FR-ED-3 | **Drag & drop** to reorder blocks and upload files. | M |
| FR-ED-4 | Blocks: paragraph, headings, lists, **tables**, **callouts**, **tabs**, **cards**, **code blocks** (syntax highlight, 100+ langs), **math** (KaTeX), quotes, dividers, toggles/accordions, columns. | M |
| FR-ED-5 | Diagrams: **Mermaid** and **PlantUML** rendered inline; editable source. | M |
| FR-ED-6 | Media: **images, video, audio, PDF, Excel, PowerPoint, attachments**, with inline preview. | M |
| FR-ED-7 | Embeds: **YouTube, Loom, Figma, Miro, Canva**, generic oEmbed, iframe (allowlisted). | M |
| FR-ED-8 | **Interactive widgets** (API try-it, code sandbox, forms, buttons). | S |
| FR-ED-9 | **Reusable snippets**, **variables** (org/workspace/article scope), **templates**, **content blocks**. | M |
| FR-ED-10 | **Conditional content** (show/hide by role, locale, platform, or reader attribute). | S |
| FR-ED-11 | **Live preview** & **split view** (edit/preview side by side). | M |
| FR-ED-12 | **Autosave** (debounced + on blur), draft recovery, **offline editing** (local persistence, sync on reconnect). | M |
| FR-ED-13 | **Collaborative editing** (CRDT, presence cursors, live selections). | M |
| FR-ED-14 | **Comments, @mentions, suggestions, track changes**, resolve threads. | M |
| FR-ED-15 | Word count, reading time, outline/TOC, find-replace, keyboard shortcuts. | M |
| FR-ED-16 | AI inline assist (see §3.9) accessible via `/ai` or selection toolbar. | M |
| FR-ED-17 | Accessibility: full keyboard operation, screen-reader friendly blocks. | M |

## 3.5 Content Management

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-CM-1 | **Categories** with **nested folders** and **unlimited hierarchy**; drag-drop reorder. | M |
| FR-CM-2 | **Collections** (cross-category groupings), **tags**, **labels**, custom **metadata** fields. | M |
| FR-CM-3 | **SEO**: meta title/description, OG/Twitter cards, canonical, sitemap, structured data (Article/FAQ schema). | M |
| FR-CM-4 | **Slug manager**, **redirects** (301/302), automatic redirect on slug change. | M |
| FR-CM-5 | **Duplicate detection** (semantic similarity) and **broken-link** scanner. | S |
| FR-CM-6 | Automated scores: **Article health**, **AI quality**, **reading time**, **difficulty**, **popularity**, **freshness**. | M |
| FR-CM-7 | Bulk operations (move, tag, publish, delete, reassign owner). | M |
| FR-CM-8 | Content ownership + review-due dates with reminders. | S |

## 3.6 Workflow & Publishing

States: **Draft → Review → Legal Review → Technical Review → Approval → Publish → Archive → Expired.**

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-WF-1 | Configurable **workflow builder** (states, transitions, gates) per workspace. | M |
| FR-WF-2 | **Approval matrix** (roles/users required per stage; parallel or sequential). | M |
| FR-WF-3 | **Scheduled publishing** and scheduled unpublish/expiry. | M |
| FR-WF-4 | **Automation rules** (e.g., "on publish → notify Slack; on stale → assign review"). | S |
| FR-WF-5 | Notifications on state changes to assignees/watchers. | M |
| FR-WF-6 | SLA timers per stage; escalation on breach. | S |
| FR-WF-7 | Content expiry with auto-archive + owner notification. | M |

## 3.7 Version Control

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-VC-1 | **Git-style versioning** — every save creates an immutable revision. | M |
| FR-VC-2 | **Compare versions** (visual diff, block & text level). | M |
| FR-VC-3 | **Restore** any prior version. | M |
| FR-VC-4 | **Branch & merge** content (e.g., draft a v2 while v1 stays live). | S |
| FR-VC-5 | **Audit logs** of who changed what/when; **timeline** view per article. | M |
| FR-VC-6 | Version labels/tags (e.g., "Published 2.1"), release channels. | S |

## 3.8 Search

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-SR-1 | **Enterprise hybrid search** = keyword (BM25) + **semantic/vector** fused (RRF). | M |
| FR-SR-2 | **Typo tolerance**, synonyms, stemming, language-aware analyzers. | M |
| FR-SR-3 | **AI Search** — natural-language questions return a direct, cited answer (RAG). | M |
| FR-SR-4 | **Instant search** (as-you-type), keyboard-navigable, facets/filters. | M |
| FR-SR-5 | **Related** and **suggested** articles (embedding similarity). | M |
| FR-SR-6 | Permission-aware results (never leak private content). | M |
| FR-SR-7 | **Search analytics** incl. **zero-result / failed-search** analysis → content-gap suggestions. | M |
| FR-SR-8 | Scoped search (KB, workspace, org, or global for internal users). | M |
| FR-SR-9 | Localized search per active locale. | S |

## 3.9 AI Features (Assistant "Lux")

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-AI-1 | **Write article** from prompt/outline; **rewrite**, **improve grammar**, **summarize**, **expand**, **explain**, **change tone**. | M |
| FR-AI-2 | **Translate** content; **AI translation** with glossary + human review loop. | M |
| FR-AI-3 | **Convert SOP** (paste process → structured SOP); **generate FAQs**, **troubleshooting guides**, **decision trees**. | S |
| FR-AI-4 | **Generate diagrams/flowcharts/decision trees** (Mermaid/PlantUML from text). | S |
| FR-AI-5 | **Suggest tags/categories**, **generate metadata**, **SEO optimization**. | M |
| FR-AI-6 | **Duplicate detection**, **content-health analysis**, **detect outdated content**. | S |
| FR-AI-7 | **Generate release notes** from changelog/commits/version diffs. | S |
| FR-AI-8 | **Chat with documentation / Document Q&A** — **RAG over enterprise content**, cited, permission-aware. | M |
| FR-AI-9 | **Private AI / BYO-LLM** — per-workspace model selection incl. self-hosted. | M |
| FR-AI-10 | **AI moderation, governance, and analytics** (usage, cost, quality, audit). | M |
| FR-AI-11 | Streaming responses; **function calling** for actions (create draft, add tag, open workflow). | M |
| FR-AI-12 | Provenance chips: every AI output links to source articles + confidence. | M |

## 3.10 Analytics

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-AN-1 | Dashboard: **views, unique visitors, searches, failed searches, popular articles**. | M |
| FR-AN-2 | **Low-quality / low-health articles**, **reader feedback** (👍/👎 + comments), **NPS**. | M |
| FR-AN-3 | **Content health**, **AI usage**, **team productivity**, **publishing velocity**, **SLA** compliance. | M |
| FR-AN-4 | Filters by time, KB, locale, author, category; export CSV/PDF; scheduled reports. | M |
| FR-AN-5 | Real-time active-reader view; funnel from search → article → resolution. | S |
| FR-AN-6 | Warehouse export (Snowflake/BigQuery) + embeddable analytics API. | C |

## 3.11 Multi-Language

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-ML-1 | **Automatic translation** (AI) with per-locale variants linked to source. | M |
| FR-ML-2 | **Human review** workflow for translations; translation memory/glossary. | M |
| FR-ML-3 | **Locale management** (add/remove locales, fallback chains, default). | M |
| FR-ML-4 | **RTL support** (Arabic, Hebrew) across editor and reader. | M |
| FR-ML-5 | **Localized URLs**, **localized search**, **localized AI** answers. | M |
| FR-ML-6 | Out-of-sync indicators when source changes after translation. | S |

## 3.12 Branding & Delivery Sites

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-BR-1 | Per-site theme editor (logo, colors, fonts, favicon, custom CSS/JS allowlist). | M |
| FR-BR-2 | Custom domain + auto TLS; homepage builder; nav/footer editor. | M |
| FR-BR-3 | Reader features: TOC, breadcrumbs, dark mode, feedback, print/PDF, share. | M |
| FR-BR-4 | Password-protected & JWT-gated private sites; embeddable widget/help center. | S |
| FR-BR-5 | SSR/ISR for SEO + speed; edge-cached; Core Web Vitals optimized. | M |

## 3.13 API, SDKs & Developer Platform

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-API-1 | **REST** + **GraphQL** APIs covering all resources (§8). | M |
| FR-API-2 | **Webhooks** (events + signed payloads + retries). | M |
| FR-API-3 | **SDKs** (TS/JS, Python, Go), **CLI**, **OpenAPI** spec, **Developer Portal**. | M |
| FR-API-4 | **API keys** + **OAuth** apps; scoped tokens; per-key rate limits & usage. | M |
| FR-API-5 | Sandbox environment + interactive API explorer. | S |

## 3.14 Integrations

Native integrations: **Slack, Microsoft Teams, Jira, Confluence, GitHub, GitLab, Azure DevOps, Salesforce, Zendesk, Freshdesk, HubSpot, Intercom, Zapier, Power Automate, Google Drive, OneDrive, Dropbox, SharePoint.**

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-INT-1 | OAuth-based install per workspace; scoped permissions. | M |
| FR-INT-2 | Slack/Teams: search & AI answers in-channel; publish notifications. | M |
| FR-INT-3 | Jira/GitHub/GitLab/Azure DevOps: link issues/PRs, generate release notes. | S |
| FR-INT-4 | Zendesk/Freshdesk/Intercom/Salesforce/HubSpot: surface KB in agent console; deflection. | S |
| FR-INT-5 | Storage (Drive/OneDrive/Dropbox/SharePoint): import/sync docs. | S |
| FR-INT-6 | Zapier/Power Automate: triggers & actions for no-code automation. | S |
| FR-INT-7 | Content import from Confluence/Notion/Document360/Zendesk/Markdown/Word. | M |

## 3.15 Admin Console

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-ADM-1 | **Organization & workspace management**, member/role administration. | M |
| FR-ADM-2 | **Billing, subscriptions, usage** metering (seats, storage, AI tokens, docs). | M |
| FR-ADM-3 | **Security** settings (SSO, MFA, IP allowlists, session policy), **audit logs**. | M |
| FR-ADM-4 | **Feature flags**, **API management**, **AI usage/limits**, **storage**, **domains**, **email templates**. | M |
| FR-ADM-5 | Super Admin (platform) console: tenant ops, impersonation (audited), health, quotas. | M |

## 3.16 Notifications

| ID | Requirement | Pri |
|----|-------------|-----|
| FR-NT-1 | In-app, email, Slack/Teams, mobile push, webhook channels. | M |
| FR-NT-2 | Per-user preferences, digests, quiet hours; localized templates. | M |
| FR-NT-3 | Events: mentions, comments, assignments, approvals, publishes, SLA breaches, AI limits. | M |
