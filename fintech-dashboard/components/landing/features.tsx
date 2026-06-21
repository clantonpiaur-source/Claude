import {
  LineChart,
  Zap,
  Wallet,
  ShieldCheck,
  RefreshCw,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: LineChart,
    title: "Real-time analytics",
    body: "Live KPIs, cash-flow trends, and portfolio allocation update the moment money moves — no overnight batch jobs.",
  },
  {
    icon: Zap,
    title: "Instant payments",
    body: "Send payouts and settle invoices in seconds with smart routing across rails and currencies.",
  },
  {
    icon: Wallet,
    title: "Unified accounts",
    body: "Connect every bank, card, and wallet into one balance you can actually reconcile and trust.",
  },
  {
    icon: RefreshCw,
    title: "Automated reconciliation",
    body: "Rules-based matching closes your books continuously, so month-end takes minutes instead of days.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in controls",
    body: "Approval workflows, spend limits, and role-based access keep every transaction within policy.",
  },
  {
    icon: Globe,
    title: "Global by default",
    body: "Hold and move 30+ currencies with transparent FX and local payout coverage in 120 countries.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything your finance stack needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One platform to move money, watch the numbers, and stay in control —
            replacing the spreadsheet sprawl.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6 transition-shadow hover:shadow-md">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-mono text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
