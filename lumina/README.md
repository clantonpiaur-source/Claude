# LUMINA — Enterprise Knowledge Cloud

> **Software Requirements Specification (SRS) & System Design**
> Version 1.0 · Status: Approved for Implementation · Classification: Internal

**Lumina** is a production-grade, multi-tenant enterprise Knowledge Management Platform designed to serve **millions of documents** across **thousands of organizations**. It combines a world-class authoring experience, hybrid + semantic AI search, a governed enterprise AI assistant (RAG), granular access control, and a public/private documentation delivery engine — surpassing Document360, GitBook Enterprise, Confluence, Notion Wiki, and Zendesk Guide.

*"Where enterprise knowledge comes to light."*

---

## Document Map

This SRS is split into focused, implementation-ready documents. Read in order or jump directly.

| # | Section | File |
|---|---------|------|
| — | Brand & Design System | [`docs/brand-design-system.md`](docs/brand-design-system.md) |
| — | System Architecture (diagrams) | [`docs/system-architecture.md`](docs/system-architecture.md) |
| — | UI Screen Inventory (desktop + mobile) | [`docs/ui-screens.md`](docs/ui-screens.md) |
| 1 | Executive Summary | [`docs/01-executive-summary.md`](docs/01-executive-summary.md) |
| 2 | Product Vision | [`docs/02-product-vision.md`](docs/02-product-vision.md) |
| 3 | Functional Requirements | [`docs/03-functional-requirements.md`](docs/03-functional-requirements.md) |
| 4 | Non-Functional Requirements | [`docs/04-non-functional-requirements.md`](docs/04-non-functional-requirements.md) |
| 5 | UX Specification | [`docs/05-ux-specification.md`](docs/05-ux-specification.md) |
| 6 | UI Component Library | [`docs/06-ui-component-library.md`](docs/06-ui-component-library.md) |
| 7 | Database Schema (ERD) | [`docs/07-database-schema.md`](docs/07-database-schema.md) |
| 8 | API Specification | [`docs/08-api-specification.md`](docs/08-api-specification.md) |
| 9 | AI Architecture | [`docs/09-ai-architecture.md`](docs/09-ai-architecture.md) |
| 10 | Security Architecture | [`docs/10-security-architecture.md`](docs/10-security-architecture.md) |
| 11 | Infrastructure Architecture | [`docs/11-infrastructure-architecture.md`](docs/11-infrastructure-architecture.md) |
| 12 | DevOps Pipeline | [`docs/12-devops-pipeline.md`](docs/12-devops-pipeline.md) |
| 13 | Development Roadmap | [`docs/13-development-roadmap.md`](docs/13-development-roadmap.md) |
| 14 | Testing Strategy | [`docs/14-testing-strategy.md`](docs/14-testing-strategy.md) |
| 15 | Deployment Strategy | [`docs/15-deployment-strategy.md`](docs/15-deployment-strategy.md) |
| 16 | Scaling Strategy | [`docs/16-scaling-strategy.md`](docs/16-scaling-strategy.md) |
| 17 | Cost Estimates | [`docs/17-cost-estimates.md`](docs/17-cost-estimates.md) |
| 18 | Future Enhancements | [`docs/18-future-enhancements.md`](docs/18-future-enhancements.md) |

---

## Platform at a Glance

| Pillar | What it delivers |
|--------|------------------|
| **Authoring** | Block-based hybrid WYSIWYG/Markdown editor, real-time collaboration (CRDT), slash commands, 40+ block types, reusable snippets, variables, conditional content |
| **Delivery** | Multi-tenant public docs sites, private/internal KBs, custom domains, per-workspace branding, localized URLs, SSR + edge-cached |
| **Search** | Hybrid (BM25 + vector) search, semantic re-ranking, typo tolerance, instant search, natural-language Q&A |
| **AI** | Governed RAG assistant, BYO-LLM, AI writing/translation/tagging/health scoring, streaming + function calling, AI governance & audit |
| **Workflow** | Configurable multi-stage approval workflows, scheduled publishing, automation rules, approval matrices |
| **Governance** | RBAC + ABAC, SSO/SAML/OIDC, MFA/passkeys, audit logs, data residency, SOC 2 / ISO 27001 / GDPR alignment |
| **Extensibility** | REST + GraphQL APIs, webhooks, SDKs, CLI, 18+ native integrations, marketplace |

## Reference Tech Stack (summary)

- **Frontend:** Next.js 15 (App Router) · React 19 · TypeScript · TailwindCSS · shadcn/ui · Framer Motion · TanStack Query · Zustand
- **Backend:** NestJS · Node.js · GraphQL (Apollo) + REST · Prisma · PostgreSQL 16 · Redis · OpenSearch · MinIO/S3 · RabbitMQ · BullMQ · WebSockets (Socket.IO/y-websocket)
- **AI:** OpenAI · Anthropic Claude · Google Gemini · DeepSeek · Mistral · Llama/Ollama · pgvector + Qdrant/Pinecone · RAG · function calling · streaming
- **Auth:** OAuth2/OIDC · SAML · Azure AD/Entra · Google · Microsoft · GitHub · MFA · Passkeys (WebAuthn) · JWT · RBAC/ABAC
- **Infra:** Docker · Kubernetes · Terraform · GitHub Actions · AWS/Azure/GCP · Cloudflare (CDN/WAF)

See [`docs/system-architecture.md`](docs/system-architecture.md) for the full architecture and diagrams.
