# System Architecture — LUMINA

Lumina is a **cloud-native, multi-tenant, microservices** platform deployed on Kubernetes across multiple regions. This document presents the end-to-end architecture with diagrams for every major subsystem.

---

## 1. High-Level System Architecture

```mermaid
flowchart TB
    subgraph Edge["🌐 Edge / CDN — Cloudflare"]
        WAF[WAF + DDoS + Bot Mgmt]
        CDN[CDN Cache + Edge KV]
        IMG[Image/Asset Optimization]
    end

    subgraph Clients["Clients"]
        WebApp["Admin/Portal Web App<br/>(Next.js 15)"]
        DocsSite["Public Docs Sites<br/>(Next.js SSR/ISR)"]
        Mobile["Mobile Apps<br/>(React Native / Expo)"]
        SDKs["SDKs / CLI / API Consumers"]
    end

    subgraph Gateway["API Gateway Layer"]
        LB[Load Balancer]
        APIGW["API Gateway<br/>(Kong/Envoy)<br/>authn · rate limit · routing"]
        GQL["GraphQL Federation<br/>(Apollo Gateway)"]
    end

    subgraph Services["Microservices (NestJS)"]
        Auth[Auth & Identity]
        Org[Org / Workspace]
        Content[Content & Editor]
        Search[Search Service]
        AI[AI Orchestrator]
        Workflow[Workflow & Publishing]
        Analytics[Analytics]
        Notify[Notification]
        Media[Media/Asset]
        Billing[Billing]
        Integrations[Integrations Hub]
    end

    subgraph Async["Async / Eventing"]
        MQ[(RabbitMQ<br/>events)]
        BullMQ[(BullMQ / Redis<br/>jobs)]
        WS[WebSocket Gateway<br/>+ y-websocket CRDT]
    end

    subgraph Data["Data Layer"]
        PG[(PostgreSQL 16<br/>+ pgvector<br/>Citus sharding)]
        Redis[(Redis Cluster<br/>cache · sessions · pub/sub)]
        OS[(OpenSearch<br/>hybrid search)]
        Vector[(Qdrant / Pinecone<br/>vector store)]
        Obj[(MinIO / S3<br/>object storage)]
        CH[(ClickHouse<br/>analytics events)]
    end

    subgraph External["External AI / Providers"]
        LLM["LLM Providers<br/>OpenAI · Claude · Gemini<br/>DeepSeek · Mistral · Ollama"]
        Emb[Embedding Models]
    end

    Clients --> Edge --> LB --> APIGW
    APIGW --> GQL
    APIGW --> Services
    GQL --> Services
    Services --> MQ
    Services --> BullMQ
    WebApp <-.->|realtime| WS
    Services --> PG
    Services --> Redis
    Search --> OS
    Search --> Vector
    AI --> Vector
    AI --> LLM
    AI --> Emb
    Media --> Obj
    Analytics --> CH
    Workflow --> MQ
    Notify --> MQ
```

---

## 2. Frontend Architecture

```mermaid
flowchart LR
    subgraph Next["Next.js 15 App Router"]
        RSC[React Server Components]
        Client[Client Components]
        Edge[Edge Middleware<br/>auth · tenant resolve · i18n]
        ISR[ISR / Streaming SSR]
    end
    subgraph State["Client State"]
        RQ[TanStack Query<br/>server cache]
        Z[Zustand<br/>UI/ephemeral state]
        Y[Yjs CRDT<br/>collab doc state]
    end
    subgraph UI["UI System"]
        Shad[shadcn/ui + Radix]
        Tw[TailwindCSS + tokens]
        FM[Framer Motion]
    end
    Browser --> Edge --> RSC --> Client
    Client --> RQ --> APIGW[(API Gateway)]
    Client --> Z
    Client --> Y --> WS[(y-websocket)]
    Client --> UI
```

**Key decisions:** RSC for read-heavy reader/portal pages (SEO + speed); client components for editor/dashboards; Edge Middleware resolves tenant from host/subdomain, enforces auth, sets locale; ISR + on-demand revalidation for published docs.

---

## 3. Backend / Microservices Architecture

```mermaid
flowchart TB
    APIGW[API Gateway] --> AuthS
    APIGW --> ContentS
    APIGW --> SearchS
    APIGW --> AIS
    APIGW --> AnalyticsS

    subgraph Core["Core Domain Services (NestJS, per-service DB schema)"]
        AuthS[Identity & Access]
        OrgS[Org/Workspace/Tenant]
        ContentS[Content · Versions · Editor]
        WorkflowS[Workflow · Publishing]
        SearchS[Search Indexing/Query]
        AIS[AI Orchestrator]
        AnalyticsS[Analytics/Reporting]
        NotifyS[Notifications]
        MediaS[Media/Asset]
        BillingS[Billing/Subscription]
        IntegS[Integrations]
    end

    ContentS -- domain events --> Bus[(Event Bus · RabbitMQ)]
    Bus --> SearchS
    Bus --> AIS
    Bus --> AnalyticsS
    Bus --> NotifyS
    Bus --> WorkflowS

    ContentS --> Jobs[(BullMQ)]
    Jobs --> Workers[Background Workers<br/>indexing · embeddings · exports · webhooks]
```

**Patterns:** Domain-driven bounded contexts · database-per-service (logical schema isolation, shared cluster) · transactional outbox for reliable events · CQRS for analytics read models · saga orchestration for cross-service workflows (publish, org-provisioning).

---

## 4. Database Architecture

```mermaid
flowchart TB
    subgraph OLTP["OLTP — PostgreSQL 16 (Citus)"]
        Coord[Coordinator]
        S1[(Shard: tenants A–H)]
        S2[(Shard: tenants I–P)]
        S3[(Shard: tenants Q–Z)]
        Coord --> S1 & S2 & S3
        PGV[pgvector: per-tenant embeddings]
    end
    subgraph Cache["Redis Cluster"]
        C1[Cache] & C2[Sessions] & C3[PubSub] & C4[Rate-limit]
    end
    subgraph Analytics["ClickHouse"]
        Events[events · pageviews · searches]
    end
    subgraph Search["OpenSearch + Qdrant"]
        Idx[Article index per tenant/lang]
        Vec[Vector collections per tenant]
    end
    App[Services] --> Coord
    App --> Cache
    App --> Events
    App --> Search
```

**Tenancy model:** Hybrid — **shared DB with `tenant_id` on every row + Postgres Row-Level Security (RLS)**, sharded by `tenant_id` via Citus for horizontal scale. Enterprise/regulated tenants can be promoted to **dedicated schema or dedicated cluster** (data residency). Read replicas per region.

---

## 5. Search Engine Architecture

```mermaid
flowchart LR
    Doc[Article Published/Updated] --> Bus[(Event Bus)]
    Bus --> Indexer[Indexing Worker]
    Indexer --> Chunk[Chunk + Clean]
    Chunk --> BM25[OpenSearch<br/>BM25 + analyzers/typo]
    Chunk --> Emb[Embedding Model]
    Emb --> VDB[(Vector Store)]

    Query[User Query] --> QP[Query Planner]
    QP --> BM25
    QP --> VDB
    BM25 --> Fusion[Reciprocal Rank Fusion]
    VDB --> Fusion
    Fusion --> Rerank[Cross-encoder Re-ranker]
    Rerank --> Results[Ranked Results + Facets]
    Query -. NL question .-> AIS[AI Answer / RAG]
```

**Hybrid search:** keyword (BM25, synonyms, typo tolerance, language analyzers) + dense vector retrieval, fused via **RRF**, optionally re-ranked by a cross-encoder; NL questions route to RAG for a direct answer with citations. Per-tenant, per-language indices; permission-filtered at query time.

---

## 6. AI Services Architecture

```mermaid
flowchart TB
    Client[Editor / Assistant / Search] --> AIGW[AI Orchestrator]
    AIGW --> Policy[Governance & Policy<br/>PII redaction · model allowlist · quotas]
    Policy --> Router[Model Router<br/>task→model, cost/latency aware]
    Router --> Prov{Provider}
    Prov --> OpenAI & Claude & Gemini & DeepSeek & Mistral & Ollama[Ollama self-host]
    AIGW --> RAG[RAG Pipeline]
    RAG --> Retrieve[Retriever] --> VDB[(Vector Store)]
    RAG --> Context[Context Builder<br/>permission-aware]
    AIGW --> Tools[Function Calling / Tools]
    AIGW --> Stream[SSE/WS Streaming]
    AIGW --> Cache[Semantic Cache · Redis]
    AIGW --> Obs[AI Observability<br/>traces · cost · evals]
```

See [`09-ai-architecture.md`](09-ai-architecture.md) for full detail (RAG, BYO-LLM, governance, evals).

---

## 7. Authentication Architecture

```mermaid
flowchart TB
    User --> Edge[Edge Middleware]
    Edge --> AuthS[Auth Service]
    AuthS --> IdP{Identity Providers}
    IdP --> OIDC[OAuth2/OIDC]
    IdP --> SAML[SAML 2.0]
    IdP --> Azure[Azure AD / Entra]
    IdP --> Google & MS & GitHub
    AuthS --> MFA[MFA: TOTP/SMS/Email]
    AuthS --> Passkey[Passkeys · WebAuthn]
    AuthS --> Tokens[JWT access + rotating refresh]
    Tokens --> Redis[(Session/Refresh store)]
    AuthS --> RBAC[RBAC + ABAC Policy Engine]
    RBAC --> OPA[OPA / Cerbos policies]
```

Access = short-lived JWT (15m) + rotating refresh (device-bound); SSO via SAML/OIDC per org; SCIM 2.0 for user provisioning; step-up MFA for sensitive actions.

---

## 8. CDN & Storage Architecture

```mermaid
flowchart LR
    subgraph CF[Cloudflare]
        WAF[WAF/DDoS] --> Cache[Edge Cache]
        Cache --> Workers[Edge Workers<br/>signed URLs · A/B · redirects]
        KV[Edge KV: published routes/redirects]
    end
    subgraph Store[Object Storage]
        S3[(S3 / MinIO)]
        Tiers[Hot / Infrequent / Glacier lifecycle]
    end
    Reader[Reader/Portal] --> CF
    CF --> SSR[Next.js SSR/ISR]
    Upload[Uploads] --> MediaS[Media Service] --> Presign[Presigned URL] --> S3
    S3 --> CF
```

Direct-to-S3 presigned uploads; virus scan + MIME validation; automatic image transcode (AVIF/WebP) and responsive derivatives; CDN in front of both static assets and rendered pages.

---

## 9. Analytics Pipeline

```mermaid
flowchart LR
    Web[Web/Reader beacon] --> Collect[Collector API<br/>edge, batched]
    App[Service events] --> Bus[(RabbitMQ)]
    Collect --> Stream[Kafka/Redpanda stream]
    Bus --> Stream
    Stream --> CH[(ClickHouse)]
    CH --> Agg[Materialized rollups]
    Agg --> Dash[Analytics Dashboards]
    CH --> Export[Warehouse export · Snowflake/BigQuery]
```

Privacy-first (cookieless option, IP anonymization, DNT honored). Event schema versioned; rollups for views/searches/feedback; real-time + historical.

---

## 10. Notification Services

```mermaid
flowchart LR
    Event[(Event Bus)] --> Notify[Notification Service]
    Notify --> Pref[Preference & Digest Engine]
    Pref --> Channels{Channels}
    Channels --> Email[Email · SES/SendGrid]
    Channels --> InApp[In-app · WebSocket]
    Channels --> Slack & Teams
    Channels --> Webhook[Webhooks]
    Channels --> Push[Mobile Push · FCM/APNs]
    Notify --> Templates[Localized templates]
```

Deduplication, batching/digests, quiet hours, per-user + per-workspace preferences, delivery tracking with retries (BullMQ).

---

## 11. Queue Services

```mermaid
flowchart TB
    subgraph RabbitMQ["RabbitMQ — Event Bus (pub/sub, fan-out)"]
        Ex[Topic Exchanges] --> Q1[search.index] & Q2[ai.embed] & Q3[notify] & Q4[analytics] & Q5[webhook]
    end
    subgraph BullMQ["BullMQ — Job Queues (Redis)"]
        J1[embeddings] & J2[exports/PDF] & J3[imports] & J4[translations] & J5[health-scoring] & J6[scheduled-publish]
    end
    Services --> Ex
    Services --> BullMQ
    BullMQ --> Workers[Autoscaled Workers KEDA]
    Ex --> Consumers[Service Consumers]
```

**RabbitMQ** = inter-service domain events (at-least-once, DLQ, idempotent consumers). **BullMQ** = scheduled/retryable background jobs with priorities, rate limiting, and KEDA-driven worker autoscaling.

---

## 12. Load Balancer & API Gateway

```mermaid
flowchart TB
    DNS[Cloudflare DNS/Anycast] --> GLB[Global LB / GSLB]
    GLB --> R1[Region us-east] & R2[Region eu-west] & R3[Region ap-south]
    R1 --> Ingress[K8s Ingress · Envoy]
    Ingress --> GW[API Gateway: Kong/Envoy]
    GW --> AuthN[JWT/OIDC verify]
    GW --> RL[Rate limiting/quotas]
    GW --> Route[Routing + canary]
    GW --> REST[REST services]
    GW --> GQLF[Apollo Federation]
```

Layer-7 gateway handles authn, per-tenant/per-key rate limiting, request validation, canary/blue-green routing, and observability (OpenTelemetry). GraphQL federation composes a single supergraph from subgraph services.

---

## 13. Deployment Topology (multi-region)

```mermaid
flowchart TB
    subgraph Global
        CF[Cloudflare Edge] --> GSLB[GSLB]
    end
    subgraph us-east-1["Region: us-east-1 (primary)"]
        EKS1[EKS Cluster] --> PG1[(PG primary + replicas)]
        EKS1 --> OS1[(OpenSearch)]
        EKS1 --> R1[(Redis)]
    end
    subgraph eu-west-1["Region: eu-west-1 (EU residency)"]
        EKS2[EKS Cluster] --> PG2[(PG primary + replicas)]
        EKS2 --> OS2[(OpenSearch)]
    end
    GSLB --> EKS1 & EKS2
    PG1 -. async DR replication .-> DR[(Cross-region DR)]
```

Active-active by region with tenant residency pinning; per-region data planes; global control plane for provisioning/billing. See [`11-infrastructure-architecture.md`](11-infrastructure-architecture.md) and [`16-scaling-strategy.md`](16-scaling-strategy.md).
