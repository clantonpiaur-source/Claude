# 17. Cost Estimates

Indicative figures (USD) for planning; actuals depend on cloud, region, negotiated rates, and scale. Two lenses: **build cost** (team + timeline) and **run cost** (infra + AI at scale).

---

## 17.1 Build Cost (14-month delivery)

Assumes a ~30-person org across the 9 phases (§13).

| Role | Count | Blended annual (loaded) | 14-mo cost |
|------|-------|--------------------------|-----------|
| Eng Lead / Architect | 2 | $260k | $607k |
| Senior Backend | 6 | $210k | $1,470k |
| Senior Frontend | 4 | $200k | $933k |
| AI/ML Engineer | 3 | $230k | $805k |
| DevOps/SRE | 3 | $210k | $735k |
| Security Engineer | 2 | $220k | $513k |
| QA/SDET | 3 | $170k | $595k |
| Product Manager | 2 | $200k | $467k |
| Designer (UX/UI) | 2 | $190k | $443k |
| DevRel/Docs | 1 | $170k | $198k |
| Eng Manager | 2 | $240k | $560k |
| **Subtotal (people)** | **30** | | **≈ $7.33M** |
| Tooling/SaaS (CI, monitoring, design, security) | | | ≈ $250k |
| Compliance (SOC 2/ISO audits, pen tests) | | | ≈ $200k |
| Contingency (~10%) | | | ≈ $780k |
| **Total build (Year 1)** | | | **≈ $8.5M** |

## 17.2 Run Cost — Infrastructure (monthly, illustrative)

### Startup scale (~100 orgs, ~500k docs, moderate traffic)

| Component | Est. monthly |
|-----------|-------------|
| Kubernetes compute (services + workers) | $6k |
| PostgreSQL/Citus (multi-AZ + replicas) | $4k |
| Redis cluster | $1.2k |
| OpenSearch | $3k |
| Vector store (Qdrant/pgvector) | $1.5k |
| ClickHouse | $1.5k |
| Object storage + egress | $1.5k |
| Cloudflare (CDN/WAF/edge) | $1k |
| RabbitMQ | $0.6k |
| Observability (logs/metrics/traces) | $2k |
| Vault/KMS, misc | $0.7k |
| **Infra subtotal** | **≈ $24.5k** |

### Growth scale (~2k orgs, ~10M docs, high traffic, multi-region)

| Component | Est. monthly |
|-----------|-------------|
| Compute (multi-region, autoscaled) | $45k |
| Postgres/Citus (sharded + replicas) | $30k |
| OpenSearch (hot/warm) | $22k |
| Vector store | $12k |
| Redis | $7k |
| ClickHouse | $10k |
| Object storage + CDN egress | $14k |
| Cloudflare enterprise | $6k |
| Observability | $10k |
| Misc (MQ, Vault, backups, DR) | $8k |
| **Infra subtotal** | **≈ $164k** |

## 17.3 Run Cost — AI (variable, usage-driven)

| Driver | Lever | Notes |
|--------|-------|-------|
| Embeddings | Batch + cache; small models | One-time per doc + re-embed on change |
| RAG chat / search-ask | Semantic cache (≥30% cut), routing | Cheap model for simple, strong for complex |
| Writing/translation | On-demand; BYO keys shift cost to customer | Enterprise often uses own contracts |
| Self-hosted (Ollama/vLLM) | GPU pool autoscale | For regulated/high-volume tenants |

**Illustrative:** at growth scale, managed-LLM spend of **$40k–$120k/mo** depending on adoption; BYO-LLM and self-hosting materially reduce Lumina-borne cost. Semantic caching, routing, prompt compression are primary cost controls (target ≥30–40% reduction).

## 17.4 Cost Optimization Levers

- **CDN offload ≥90%** of read traffic → minimal origin compute for readers.
- **Spot/burstable** nodes for stateless/async; scale-to-zero idle workers.
- **Storage tiering** (hot→infrequent→archive); compress + dedupe attachments.
- **AI:** routing, semantic cache, batching, BYO-LLM, self-hosting for heavy tenants.
- **Right-sizing** via VPA; per-tenant cost attribution to inform pricing/limits.
- **Reserved/committed-use** discounts for baseline capacity.

## 17.5 Unit Economics (planning)

- Target infra+AI cost per active org kept well below plan price; enterprise (BYO-LLM, dedicated) priced to cover isolation overhead.
- Usage meters (seats, storage, AI tokens, docs) enable metered/overage billing aligning cost with revenue.
- Gross-margin goal ≥75% at growth scale via caching/offload/routing.
