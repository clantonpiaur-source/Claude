import { ArrowUpRight, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const bars = [42, 55, 48, 67, 60, 78, 72, 90];

/** Decorative product preview — a stylized balance card used in the hero. */
export function HeroPreview() {
  return (
    <div className="relative" aria-hidden>
      {/* Glow */}
      <div className="absolute -inset-4 rounded-[2rem] bg-secondary/20 blur-2xl" />

      <div className="relative rounded-2xl border border-white/10 bg-card p-5 shadow-2xl">
        {/* Balance card */}
        <div className="rounded-xl bg-gradient-to-br from-primary to-[#0b2a6b] p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-white/70">
              Total balance
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-0.5 text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" /> +12.4%
            </span>
          </div>
          <div className="tabular mt-3 text-3xl font-semibold">
            {formatCurrency(2847500)}
          </div>
          <div className="mt-6 flex items-end justify-between gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm bg-white/30"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* Two stat tiles */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="text-xs text-muted-foreground">Revenue (MTD)</div>
            <div className="tabular mt-1 text-lg font-semibold text-foreground">
              {formatCurrency(482300)}
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-success">
              <ArrowUpRight className="h-3 w-3" /> 8.1%
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="text-xs text-muted-foreground">Active accounts</div>
            <div className="tabular mt-1 text-lg font-semibold text-foreground">12,408</div>
            <div className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-success">
              <ArrowUpRight className="h-3 w-3" /> 4.6%
            </div>
          </div>
        </div>
      </div>

      {/* Floating transaction chip */}
      <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-xl sm:block">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-success/15 text-success">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Payout settled</div>
            <div className="tabular text-sm font-semibold text-foreground">
              +{formatCurrency(18420)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
