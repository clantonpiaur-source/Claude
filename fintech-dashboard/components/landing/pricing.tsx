import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/mo",
    blurb: "For founders getting their finances in order.",
    features: [
      "Up to 2 connected accounts",
      "Real-time dashboard",
      "Basic reconciliation",
      "Email support",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$49",
    cadence: "/mo",
    blurb: "For scaling teams that move money daily.",
    features: [
      "Unlimited connected accounts",
      "Automated payouts & rules",
      "Approval workflows",
      "Multi-currency (30+)",
      "Priority support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "For organizations with advanced controls.",
    features: [
      "SAML SSO & SCIM",
      "Custom approval policies",
      "Dedicated success manager",
      "99.99% uptime SLA",
      "Audit & compliance exports",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free and upgrade as you grow. No setup fees, no hidden FX
            markups, cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm",
                t.featured
                  ? "border-primary shadow-md ring-1 ring-primary"
                  : "border-border"
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-mono text-lg font-semibold text-foreground">
                {t.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="tabular font-mono text-4xl font-semibold text-foreground">
                  {t.price}
                </span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/dashboard" className="mt-6">
                <Button
                  variant={t.featured ? "accent" : "outline"}
                  className="h-11 w-full text-base"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
