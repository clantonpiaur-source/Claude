import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Repeat, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { cn, formatCurrency } from "@/lib/utils";
import type { Kpi } from "@/lib/data";

const icons: Record<Kpi["icon"], LucideIcon> = {
  balance: Wallet,
  revenue: TrendingUp,
  mrr: Repeat,
  churn: Users,
};

export function KpiCard({ label, value, deltaPct, currency, suffix, icon, spark }: Kpi) {
  const positive = deltaPct >= 0;
  // For churn, "down" is good — but we keep the rule simple and honest: the
  // arrow + sign always reflect the raw delta direction (paired with color).
  const Icon = icons[icon];
  const display = currency
    ? formatCurrency(value)
    : `${value.toLocaleString("en-US")}${suffix ?? ""}`;

  return (
    <Card interactive className="group relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/15">
            <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          </span>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </div>

        {/* Status pairs color WITH icon + sign — never color alone */}
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
            positive
              ? "bg-success/10 text-success ring-success/20"
              : "bg-danger/10 text-danger ring-danger/20"
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
          )}
          <span className="tabular">
            {positive ? "+" : ""}
            {deltaPct}%
          </span>
        </span>
      </div>

      <p className="tabular mt-4 text-[1.75rem] font-semibold leading-none text-foreground">
        {display}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-xs text-muted-foreground">vs last month</p>
        <Sparkline
          data={spark}
          color={positive ? "var(--color-success)" : "var(--color-danger)"}
          className="h-8 w-24 shrink-0"
        />
      </div>
    </Card>
  );
}
