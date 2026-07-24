# 11. Infrastructure Architecture

Cloud-native on **Kubernetes**, provisioned by **Terraform**, cloud-agnostic (AWS primary; Azure/GCP modules), fronted by **Cloudflare**.

---

## 11.1 Topology

```mermaid
flowchart TB
    subgraph CF[Cloudflare: DNS · WAF · CDN · Edge Workers]
    end
    CF --> GSLB[Global Server Load Balancing]
    subgraph Region[Region (e.g. us-east-1)]
        subgraph K8s[EKS/AKS/GKE Cluster]
            Ingress[Ingress · Envoy/NGINX] --> Mesh[Service Mesh · Istio mTLS]
            Mesh --> API[API Gateway pods]
            Mesh --> Svcs[Domain service pods · HPA]
            Mesh --> Workers[Async workers · KEDA]
            Mesh --> WS[WebSocket/CRDT pods]
        end
        subgraph Managed[Managed Data Services]
            PG[(PostgreSQL/Citus · Multi-AZ + replicas)]
            Redis[(Redis Cluster)]
            OS[(OpenSearch)]
            VDB[(Qdrant)]
            CH[(ClickHouse)]
            MQ[(RabbitMQ)]
        end
        S3[(Object Storage · S3/MinIO)]
        Vault[(Vault/KMS)]
        Svcs --> Managed
        Svcs --> S3
        Svcs --> Vault
    end
    GSLB --> Ingress
```

## 11.2 Compute & Orchestration

- **Kubernetes** per region; node pools: general (services), memory-optimized (search/AI workers), burstable (async), optional GPU (self-hosted LLM/embeddings).
- **HPA** on CPU/RPS/latency for stateless services; **KEDA** scales workers on queue depth (RabbitMQ/BullMQ). Scale-to-zero for idle job pools.
- **Cluster autoscaler / Karpenter** for node elasticity; spot instances for stateless/async with graceful drain.
- Pod Disruption Budgets, anti-affinity, topology spread across AZs.

## 11.3 Data Services

| Store | Role | HA/Scale |
|-------|------|----------|
| PostgreSQL 16 + Citus | OLTP, source of truth | Multi-AZ, sync replica + async read replicas, sharded by tenant, PITR |
| pgvector / Qdrant | Embeddings/vector search | Per-tenant collections, replicated |
| Redis Cluster | Cache, sessions, pub/sub, rate-limit, BullMQ | Multi-AZ, AOF+RDB |
| OpenSearch | Hybrid search index | Multi-node, per-tenant/lang indices, hot/warm tiers |
| ClickHouse | Analytics events | Sharded/replicated, TTL tiering |
| RabbitMQ | Event bus | Quorum queues, mirrored |
| S3/MinIO | Blobs/assets | 11x9s durability, lifecycle tiering, versioning |
| Vault/KMS | Secrets/keys | HA, auto-unseal |

## 11.4 Networking

- Private VPC, isolated subnets (public ingress, private services, private data).
- Cloudflare edge: DNS (Anycast), WAF/DDoS, CDN, edge KV for published routes/redirects, edge workers for signed URLs & A/B.
- Service mesh mTLS + authz; egress gateway with provider allowlists (AI, email).
- Custom domains per tenant via CNAME + automated ACME TLS (cert-manager / Cloudflare for SaaS).

## 11.5 Multi-Region & Residency

- Region-pinned tenants (US/EU/APAC); data plane fully in-region for regulated data.
- Global control plane (provisioning, billing, feature flags) with regional data planes.
- GSLB routes readers to nearest healthy region; published content served from edge globally regardless of origin region.
- Cross-region DR replication within jurisdiction only.

## 11.6 Environments

| Env | Purpose | Notes |
|-----|---------|-------|
| Preview (ephemeral) | Per-PR review | Namespaced, seeded data, auto-teardown |
| Dev | Integration | Shared, continuous deploy from `main` |
| Staging | Pre-prod, perf/security | Prod-like, anonymized data |
| Production | Live | Multi-region, canary/blue-green |

## 11.7 Observability

- **OpenTelemetry** traces/metrics/logs → Grafana/Tempo/Loki/Prometheus (or Datadog).
- RED (rate/errors/duration) per service, USE for resources; SLO dashboards + error budgets.
- Alerting (PagerDuty), synthetic monitoring (search, publish, AI), real-user monitoring (Core Web Vitals), tenant-tagged.

## 11.8 Cost & Efficiency Controls

- Right-sized requests/limits, VPA recommendations; spot for stateless; storage lifecycle tiering; CDN offload ≥90%.
- Per-tenant cost attribution (labels + usage meters); AI cost via routing + semantic cache.

## 11.9 IaC & Provisioning

- **Terraform** modules per cloud (network, cluster, data services, DNS, secrets); remote state + locking; policy-as-code (OPA/Sentinel).
- Helm/Argo CD for app delivery (GitOps); environment promotion via Git.
- Tenant provisioning automated (workspace, indices, vector collection, buckets, DNS) via saga.
