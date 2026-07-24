# 8. API Specification

Lumina exposes **REST** (resource CRUD, webhooks, uploads) and **GraphQL** (flexible reads, federation). Base URL: `https://api.lumina.cloud/v1`. GraphQL: `https://api.lumina.cloud/graphql`.

**Conventions:** JSON; UUID ids; cursor pagination (`?cursor=&limit=`); `X-Tenant` resolved from token; ISO-8601 timestamps; idempotency via `Idempotency-Key` header on writes; standard errors `{error:{code,message,details,requestId}}`; rate limits via `X-RateLimit-*` headers.

---

## 8.1 Authentication

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | Password login → tokens |
| POST | `/auth/token/refresh` | Rotate refresh → new access |
| POST | `/auth/logout` | Revoke session |
| GET | `/auth/sso/:provider/start` | Begin SAML/OIDC flow |
| GET | `/auth/sso/:provider/callback` | Complete SSO |
| POST | `/auth/mfa/verify` | Verify TOTP/SMS/email code |
| POST | `/auth/passkey/register` · `/auth/passkey/authenticate` | WebAuthn |
| GET | `/auth/me` | Current user + memberships |
| POST | `/scim/v2/Users` · `/scim/v2/Groups` | SCIM provisioning |

Authorization: `Authorization: Bearer <jwt>` or `Authorization: ApiKey <key>`. Scopes enforced per endpoint (RBAC/ABAC).

## 8.2 Organizations & Workspaces

| Method | Endpoint |
|--------|----------|
| GET/POST | `/orgs` · `GET/PATCH/DELETE /orgs/:id` |
| GET | `/orgs/:id/usage` · `/orgs/:id/audit-logs` |
| GET/POST | `/orgs/:id/workspaces` · `GET/PATCH/DELETE /workspaces/:id` |
| GET/PATCH | `/workspaces/:id/branding` · `/workspaces/:id/domains` |
| GET/POST | `/workspaces/:id/locales` |
| GET/POST | `/workspaces/:id/roles` · `/workspaces/:id/members` |
| POST | `/workspaces/:id/members/invite` · `/members/:id/role` |

## 8.3 Knowledge Bases & Categories

| Method | Endpoint |
|--------|----------|
| GET/POST | `/workspaces/:id/kbs` · `GET/PATCH/DELETE /kbs/:id` |
| GET/POST | `/kbs/:id/categories` · `GET/PATCH/DELETE /categories/:id` |
| PATCH | `/categories/:id/move` (reparent/reorder) |
| GET | `/kbs/:id/tree` (nested category+article tree) |

## 8.4 Articles

| Method | Endpoint | Notes |
|--------|----------|------|
| GET | `/kbs/:id/articles` | list, filters: status, category, tag, locale, q |
| POST | `/kbs/:id/articles` | create draft |
| GET | `/articles/:id` | includes content, metrics |
| PATCH | `/articles/:id` | update (autosave uses PATCH + version) |
| DELETE | `/articles/:id` | soft delete |
| POST | `/articles/:id/publish` · `/unpublish` · `/archive` |
| POST | `/articles/:id/schedule` | `{publishAt, expiresAt}` |
| GET | `/articles/:id/versions` · `GET /versions/:vid` |
| POST | `/articles/:id/versions/:vid/restore` |
| GET | `/articles/:id/diff?from=&to=` |
| POST | `/articles/:id/branch` · `/merge` |
| GET/POST | `/articles/:id/comments` · `PATCH /comments/:id/resolve` |
| GET/POST | `/articles/:id/translations` · `PATCH /translations/:id` |
| POST | `/articles/:id/tags` · `DELETE /articles/:id/tags/:tagId` |
| GET | `/articles/:id/metrics` (health, quality, popularity...) |
| GET | `/articles/:id/links/broken` |

## 8.5 Media & Uploads

| Method | Endpoint |
|--------|----------|
| POST | `/uploads/presign` → `{url, storageKey, headers}` (direct-to-S3) |
| POST | `/uploads/complete` → creates `attachment`, triggers scan/transcode |
| GET | `/attachments/:id` · `DELETE /attachments/:id` |

## 8.6 Search

| Method | Endpoint | Notes |
|--------|----------|------|
| GET | `/search?q=&kb=&locale=&filters=&mode=hybrid` | hybrid keyword+vector |
| POST | `/search/ask` | `{question, kb, locale}` → RAG cited answer (streamed) |
| GET | `/search/suggest?q=` | instant/typeahead |
| GET | `/articles/:id/related` | semantic related |
| GET | `/search/analytics/zero-results` | content gaps |

## 8.7 AI

| Method | Endpoint | Notes |
|--------|----------|------|
| POST | `/ai/write` | `{prompt, outline?, tone?}` → draft (stream) |
| POST | `/ai/transform` | `{articleId|text, action}` action ∈ rewrite/improve/summarize/expand/explain/tone |
| POST | `/ai/translate` | `{articleId, targetLocales[], glossaryId?}` |
| POST | `/ai/generate` | `{type}` type ∈ faq/troubleshooting/decision-tree/diagram/release-notes/seo/metadata/tags |
| POST | `/ai/chat` | `{conversationId?, message, kbScope}` → RAG chat (SSE stream, tools) |
| GET | `/ai/conversations` · `/ai/conversations/:id` |
| GET/PATCH | `/workspaces/:id/ai/config` | model, provider, governance |
| GET | `/orgs/:id/ai/usage` | tokens, cost, latency, by feature |
| POST | `/ai/moderate` | classify content for policy |

**Streaming:** `/ai/*` support `Accept: text/event-stream`; events: `token`, `source`, `tool_call`, `done`, `error`.

## 8.8 Workflow

| Method | Endpoint |
|--------|----------|
| GET/POST | `/workspaces/:id/workflows` · `GET/PATCH /workflows/:id` |
| POST | `/articles/:id/workflow/submit` |
| POST | `/workflow-instances/:id/approve` · `/reject` · `/reassign` |
| GET | `/me/tasks` (my approvals/reviews) |

## 8.9 Users, Comments, Notifications

| Method | Endpoint |
|--------|----------|
| GET/PATCH | `/users/:id` · `/users/:id/preferences` |
| GET | `/notifications` · `POST /notifications/:id/read` · `POST /notifications/read-all` |
| GET/PATCH | `/me/notification-preferences` |

## 8.10 Analytics

| Method | Endpoint |
|--------|----------|
| GET | `/analytics/overview?range=&kb=` |
| GET | `/analytics/articles/top` · `/articles/low-quality` |
| GET | `/analytics/search` · `/analytics/search/failed` |
| GET | `/analytics/ai-usage` · `/analytics/productivity` · `/analytics/sla` |
| GET | `/analytics/feedback` · `/analytics/nps` |
| POST | `/analytics/export` (CSV/PDF, async → download URL) |

## 8.11 Admin, API Keys, Webhooks, Integrations

| Method | Endpoint |
|--------|----------|
| GET/POST | `/orgs/:id/api-keys` · `DELETE /api-keys/:id` |
| GET/POST | `/orgs/:id/webhooks` · `PATCH/DELETE /webhooks/:id` · `POST /webhooks/:id/test` |
| GET | `/orgs/:id/audit-logs?filters=` |
| GET/PATCH | `/orgs/:id/feature-flags` · `/orgs/:id/security` |
| GET/POST | `/workspaces/:id/integrations` · `DELETE /integrations/:id` |
| GET/POST | `/orgs/:id/billing/*` (subscription, invoices, usage) |

## 8.12 Webhook Events

`article.created|updated|published|unpublished|archived` · `version.created` · `comment.created` · `workflow.stage_changed|approved|rejected` · `translation.completed` · `search.zero_result` · `ai.limit_reached` · `member.added|role_changed` · `feedback.received`.
Payload: signed (`X-Lumina-Signature: sha256=...`), `{event, timestamp, orgId, data}`; retries with exponential backoff; delivery log queryable.

## 8.13 GraphQL (excerpt)

```graphql
type Query {
  me: User!
  workspace(id: ID!): Workspace
  knowledgeBase(id: ID!): KnowledgeBase
  article(id: ID!): Article
  articles(kbId: ID!, filter: ArticleFilter, first: Int, after: String): ArticleConnection!
  search(q: String!, mode: SearchMode = HYBRID, kbId: ID, locale: String): SearchResult!
  analyticsOverview(range: DateRange!, kbId: ID): AnalyticsOverview!
}

type Mutation {
  createArticle(input: CreateArticleInput!): Article!
  updateArticle(id: ID!, patch: JSON!): Article!
  publishArticle(id: ID!, schedule: ScheduleInput): Article!
  restoreVersion(articleId: ID!, versionId: ID!): Article!
  submitWorkflow(articleId: ID!): WorkflowInstance!
  aiTransform(input: AITransformInput!): AIResult!         # streamed via @defer
  translateArticle(id: ID!, locales: [String!]!): [Translation!]!
}

type Subscription {
  articlePresence(articleId: ID!): PresenceEvent!
  aiStream(requestId: ID!): AIToken!
  notifications: Notification!
}
```

Federation: subgraphs per service (identity, content, search, ai, analytics) composed by Apollo Gateway into one supergraph. Persisted queries + APQ for performance; depth/complexity limits and per-tenant cost budgets guard abuse.

## 8.14 Versioning & Deprecation

- URL-versioned REST (`/v1`), additive changes preferred; breaking changes → `/v2` with 12-month deprecation window and `Sunset` headers.
- GraphQL evolves via `@deprecated`; no breaking field removals without notice.
- OpenAPI 3.1 spec published; SDKs generated from it; changelog + migration guides in Developer Portal.
