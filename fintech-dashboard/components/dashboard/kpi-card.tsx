import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

type Props = {
  label: string;
  value: number;
  deltaPct: number;
  currency?: boolean;
  suffix?: string;
};

export function KpiCard({ label, value, deltaPct, currency, suffix }: Props) {
  const positive = deltaPct >= 0;
  const display = currency
    ? formatCurrency(value)
    : `${value.toLocaleString("en-US")}${suffix ?? ""}`;

  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="tabular mt-2 text-2xl font-semibold text-foreground">{display}</p>
      {/* Status pairs color WITH icon + sign — never color alone */}
      <div
        className={cn(
          "mt-3 inline-flex items-center gap-1 text-sm font-medium",
          positive ? "text-success" : "text-danger"
        )}
      >
        {positive ? (
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        ) : (
          <ArrowDownRight className="h-4 w-4" aria-hidden />
        )}
        <span className="tabular">
          {positive ? "+" : ""}
          {deltaPct}%
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </Card>
  );
}
