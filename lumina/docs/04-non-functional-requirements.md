# 4. Non-Functional Requirements

IDs use `NFR-<area>-<n>`. Targets are SLOs enforced via monitoring (§11/§12).

## 4.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-PERF-1 | P95 API latency (reads) | < 150 ms |
| NFR-PERF-2 | P95 search latency (hybrid) | < 200 ms |
| NFR-PERF-3 | P95 published-page TTFB (edge cached) | < 100 ms |
| NFR-PERF-4 | Editor keystroke-to-render | < 16 ms (60fps) |
| NFR-PERF-5 | AI first-token latency (streaming) | < 800 ms |
| NFR-PERF-6 | Reader Largest Contentful Paint | < 1.5 s (p75) |
| NFR-PERF-7 | Search index freshness (publish → searchable) | < 5 s |

## 4.2 Scalability

| ID | Requirement |
|----|-------------|
| NFR-SCALE-1 | Support ≥ **10,000 organizations** and ≥ **50M articles** platform-wide. |
| NFR-SCALE-2 | Horizontal scale of all stateless services (HPA/KEDA); no single bottleneck. |
| NFR-SCALE-3 | Postgres sharded (Citus) by tenant; per-tenant indices in OpenSearch/vector store. |
| NFR-SCALE-4 | Handle 100k concurrent readers per large tenant with edge caching. |
| NFR-SCALE-5 | Ingest 10k document imports/min per worker pool (autoscaled). |

## 4.3 Availability & Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-AVAIL-1 | Platform availability (control plane) | 99.99% |
| NFR-AVAIL-2 | Published docs availability (edge) | 99.995% |
| NFR-AVAIL-3 | RPO (recovery point objective) | ≤ 5 min |
| NFR-AVAIL-4 | RTO (recovery time objective) | ≤ 30 min |
| NFR-AVAIL-5 | Multi-AZ by default; multi-region for enterprise tier. | — |
| NFR-AVAIL-6 | Graceful degradation: search/AI failures never block reading published content. | — |

## 4.4 Security & Privacy

| ID | Requirement |
|----|-------------|
| NFR-SEC-1 | Encryption in transit (TLS 1.3) and at rest (AES-256, KMS-managed keys, per-tenant envelope keys). |
| NFR-SEC-2 | RBAC + ABAC on every request; deny-by-default; Postgres RLS as defense-in-depth. |
| NFR-SEC-3 | SSO (SAML/OIDC), MFA, passkeys, SCIM provisioning. |
| NFR-SEC-4 | Full **audit logging** (immutable, exportable) of security-relevant events. |
| NFR-SEC-5 | Secrets in Vault/KMS; no secrets in code or images; automatic rotation. |
| NFR-SEC-6 | WAF, rate limiting, bot protection, IP allow/deny lists. |
| NFR-SEC-7 | Data residency (US/EU/APAC); PII minimization; DSR (export/delete) automation. |
| NFR-SEC-8 | Compliance alignment: **SOC 2 Type II, ISO 27001, GDPR, CCPA**; HIPAA-ready path. |

## 4.5 Compliance & Governance

| ID | Requirement |
|----|-------------|
| NFR-GOV-1 | Configurable data retention & legal hold. |
| NFR-GOV-2 | AI governance: model allowlists, prompt/response logging, PII redaction, opt-out of training. |
| NFR-GOV-3 | Tenant-scoped audit exports; tamper-evident logs (hash-chained). |
| NFR-GOV-4 | Consent & cookie management for public sites. |

## 4.6 Accessibility

| ID | Requirement |
|----|-------------|
| NFR-A11Y-1 | **WCAG 2.1 AA** across admin, editor, and reader surfaces. |
| NFR-A11Y-2 | Full keyboard operability; visible focus; logical tab order. |
| NFR-A11Y-3 | Screen-reader support (ARIA), reduced-motion, high-contrast, RTL. |
| NFR-A11Y-4 | Automated a11y tests (axe) in CI + periodic manual audits. |

## 4.7 Usability

| ID | Requirement |
|----|-------------|
| NFR-UX-1 | Command palette (⌘K) reaches every primary action. |
| NFR-UX-2 | New author publishes first article in < 10 min without training. |
| NFR-UX-3 | Responsive from 320px → ultrawide; mobile-optimized reader & search. |
| NFR-UX-4 | Consistent design system; light/dark; density modes. |

## 4.8 Maintainability & Observability

| ID | Requirement |
|----|-------------|
| NFR-OBS-1 | OpenTelemetry traces/metrics/logs across all services; RED + USE dashboards. |
| NFR-OBS-2 | Structured JSON logging, correlation IDs, tenant tagging. |
| NFR-OBS-3 | Error budgets + SLO alerting; on-call runbooks. |
| NFR-OBS-4 | Code: typed end-to-end (TS), ≥ 80% coverage on core services, ADRs for decisions. |

## 4.9 Internationalization

| ID | Requirement |
|----|-------------|
| NFR-I18N-1 | Full UI localization; locale-aware dates/numbers; RTL. |
| NFR-I18N-2 | Unicode throughout; per-locale search analyzers and AI. |

## 4.10 Cost Efficiency

| ID | Requirement |
|----|-------------|
| NFR-COST-1 | AI model routing to optimize cost/latency; semantic caching to cut token spend ≥ 30%. |
| NFR-COST-2 | Storage tiering (hot/cold/archive); CDN offload ≥ 90% of read traffic. |
| NFR-COST-3 | Autoscaling to zero for idle async workers; per-tenant cost attribution. |

## 4.11 Portability & Extensibility

| ID | Requirement |
|----|-------------|
| NFR-PORT-1 | Cloud-agnostic via Terraform modules (AWS/Azure/GCP). |
| NFR-PORT-2 | Full data export (Markdown + assets + metadata) — no lock-in. |
| NFR-PORT-3 | Plugin/marketplace API for third-party extensions (Phase 8). |
